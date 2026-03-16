"use client"

import {
  type PropsWithChildren,
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

import {
  Control,
  Field,
  FieldRefs,
  get,
  useController,
  useFormContext,
  useFormState,
} from "react-hook-form"

import { useFieldNames } from "../hooks/use-fieldnames"
import "./styles.css"

export const RHFPanelMeta = memo(function PanelMeta() {
  const { control } = useDevtool()
  const { isDirty, isValid, isSubmitting, isSubmitted, submitCount } =
    useFormState({ control })

  const meta = useMemo(
    () => ({
      isDirty,
      isValid,
      isSubmitting,
      isSubmitted,
      submitCount,
    }),
    [isDirty, isSubmitted, isSubmitting, isValid, submitCount]
  )

  return (
    <section className="meta-section">
      <h3 className="meta-title">Meta</h3>
      <p className="meta-row">
        isDirty:{" "}
        <span style={{ color: !meta.isDirty ? "#bf1650" : "#1bda2b" }}>
          {String(meta.isDirty)}
        </span>
      </p>
      <p className="meta-row">
        isValid:{" "}
        <span style={{ color: !meta.isValid ? "#bf1650" : "#1bda2b" }}>
          {String(meta.isValid)}
        </span>
      </p>
      <p className="meta-row">
        isSubmitting:{" "}
        <span style={{ color: !meta.isSubmitting ? "#bf1650" : "#1bda2b" }}>
          {String(meta.isSubmitting)}
        </span>
      </p>
      <p className="meta-row">
        isSubmitted:{" "}
        <span style={{ color: !meta.isSubmitted ? "#bf1650" : "#1bda2b" }}>
          {String(meta.isSubmitted)}
        </span>
      </p>
      <p className="meta-row">
        submitCount:{" "}
        <span style={{ color: !meta.submitCount ? "#bf1650" : "#1bda2b" }}>
          {meta.submitCount}
        </span>
      </p>
    </section>
  )
})

export const RHFFieldStateRow = memo(function FieldStateRow({
  name,
}: {
  name: string
}) {
  const { control } = useDevtool()
  const {
    field: { value },
    fieldState: { error, isDirty, isTouched, invalid },
  } = useController({ control, name })

  const info = useMemo(() => {
    const hasError = error !== undefined && error !== null
    const field = get(control._fields, name) as Field | undefined

    return {
      value,
      error: hasError ? error : null,
      isDirty,
      isTouched,
      isValid: !invalid,
      ref: field?._f.ref,
    }
  }, [error, invalid, isDirty, isTouched, value, control._fields, name])

  return (
    <details className="field-row">
      <summary className="field-row-summary">
        {name}
        <button
          className="inspect-button"
          onClick={() => {
            if (info.ref && info.ref?.scrollIntoView) {
              info.ref.scrollIntoView({ behavior: "smooth", block: "center" })

              // Remove the class if it exists to allow retrigger
              info.ref.classList?.remove("flash-outline")
              // Force reflow to reset animation
              void info.ref.offsetWidth
              // Add the class to start animation
              info.ref.classList?.add("flash-outline")

              // Remove it after animation ends
              const handleAnimationEnd = () => {
                if (!info.ref) return
                info.ref.classList?.remove("flash-outline")
                info.ref.removeEventListener?.(
                  "animationend",
                  handleAnimationEnd
                )
              }
              info.ref.addEventListener?.("animationend", handleAnimationEnd)
            }
          }}
        >
          Inspect
        </button>
      </summary>
      <div className="field-row-body-container">
        {info.value !== undefined && (
          <p className="field-row-body">
            value:{" "}
            <span style={{ color: info.error ? "#bf1650" : "#1bda2b" }}>
              {info.value}
            </span>
          </p>
        )}
        <p className="field-row-body">
          error:{" "}
          <span style={{ color: info.error ? "#bf1650" : "inherit" }}>
            {info.error?.message}
          </span>
        </p>
        <p className="field-row-body">
          isDirty:{" "}
          <span style={{ color: !info.isDirty ? "#bf1650" : "#1bda2b" }}>
            {String(info.isDirty)}
          </span>
        </p>
        <p className="field-row-body">
          isTouched:{" "}
          <span style={{ color: !info.isTouched ? "#bf1650" : "#1bda2b" }}>
            {String(info.isTouched)}
          </span>
        </p>
        <p className="field-row-body">
          isValid:{" "}
          <span style={{ color: !info.isValid ? "#bf1650" : "#1bda2b" }}>
            {String(info.isValid)}
          </span>
        </p>
      </div>
    </details>
  )
})

export const RHFFieldStateList = memo(function FieldStateList() {
  const { control } = useDevtool()
  const fieldNames = useFieldNames({ control })

  return (
    <section>
      <details open>
        <summary className="state-list-summary">
          Field States ({fieldNames.length})
        </summary>
        <div className="state-list">
          {fieldNames.length === 0 ? (
            <p className="empty-notice">No field states available yet.</p>
          ) : (
            fieldNames.map((name) => (
              <RHFFieldStateRow key={name} name={name} />
            ))
          )}
        </div>
      </details>
    </section>
  )
})

export const RHFFieldStateScopedList = memo(function RHFFieldStateScopedList({
  fields,
}: {
  fields: FieldRefs
}) {
  const { control } = useDevtool()
  console.log("fields", Object.entries(control._fields))
  return Object.entries(fields).map(([name, value]) => {
    if (!value?._f) {
      const _fields = value as FieldRefs
      return <RHFFieldStateScopedList fields={_fields} />
    }
    return <RHFFieldStateRow key={name} name={name} />
  })
})

export const RHFDevToolPanelToggleButton = memo(
  function RHFDevToolPanelToggleButton({
    children,
    style,
    ...props
  }: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) {
    const { openPanel, toggleOpenPanel } = useDevtool()
    let _children = children
    if (_children === undefined)
      _children = openPanel ? "Hide Form Debug" : "Show Form Debug"

    return (
      <button
        className="toggle-button"
        type="button"
        style={style}
        onClick={toggleOpenPanel}
        {...props}
      >
        {_children}
      </button>
    )
  }
)
export const RHFDevToolPanelContainer = memo(function RHFDevToolPanelContainer({
  children,
  style,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div className="devtool-panel-container" style={style} {...props}>
      {children}
    </div>
  )
})

export const RHFDevToolPanel = memo(function RHFDevToolPanel({
  children,
  style,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  const { openPanel } = useDevtool()
  if (!openPanel) return null
  return (
    <section className="panel" style={style} {...props}>
      {children}
    </section>
  )
})

export const RHFDevToolPanelTitle = memo(function RHFDevToolPanelTitle({
  children,
  style,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) {
  return (
    <h2 className="panel-title" style={style} {...props}>
      {children}
    </h2>
  )
})

export const RHFDevToolPanelContent = memo(function RHFDevToolPanelContent({
  children,
  style,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div className="panel-content" style={style} {...props}>
      {children}
    </div>
  )
})

export type RHFDevToolContext = {
  openPanel: boolean
  toggleOpenPanel: () => void
  control: Control
}

export const DevtoolContext = createContext<RHFDevToolContext | null>(null)

export function useDevtool() {
  const ctx = useContext(DevtoolContext)
  if (!ctx)
    throw new Error("useDevtoolContext must be used within a DevtoolProvider")

  const { control, openPanel, toggleOpenPanel } = ctx

  return useMemo(
    () => ({
      control,
      openPanel,
      toggleOpenPanel,
    }),
    [control, openPanel, toggleOpenPanel]
  )
}

export const DevtoolProvider = memo(function DevtoolProvider({
  defaultOpen = false,
  children,
  control,
}: PropsWithChildren<{
  defaultOpen?: boolean
  // for some reason, ```undefined``` needs to be explicitly defined to prevent typecheck error
  control: Control | undefined
}>) {
  const [_open, _setOpen] = useState(defaultOpen)
  const { control: defaultControl } = useFormContext()
  const _control = control ?? defaultControl

  const _toggleOpenPanel = useCallback(
    () => _setOpen((previous) => !previous),
    [_setOpen]
  )

  if (!_control)
    throw new Error(
      "RHFDevToolProvider requires to be in a FormProvider or passed in object returned from useForm as props"
    )

  const value = useMemo(
    () =>
      ({
        openPanel: _open,
        toggleOpenPanel: _toggleOpenPanel,
        control: _control,
      }) satisfies RHFDevToolContext,
    [_control, _open, _toggleOpenPanel]
  )

  return (
    <DevtoolContext.Provider value={value}>{children}</DevtoolContext.Provider>
  )
})
