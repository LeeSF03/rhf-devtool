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
  type FieldValues,
  UseFormReturn,
  useController,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form"

import { useFieldNames } from "../hooks/use-fieldnames"
import { toJson } from "../utils/json"
import { styles } from "./styles"
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
    <section>
      <h3 style={styles.sectionTitle}>Meta</h3>
      <p style={styles.preBlock}>isDirty: {meta.isDirty}</p>
      <p style={styles.preBlock}>isValid: {meta.isValid}</p>
      <p style={styles.preBlock}>isSubmitting: {meta.isSubmitting}</p>
      <p style={styles.preBlock}>isSubmitted: {meta.isSubmitted}</p>
      <p style={styles.preBlock}>submitCount: {meta.submitCount}</p>
    </section>
  )
})

export const RHFValuesSnapshot = memo(function ValuesSnapshot() {
  const { control } = useDevtool()
  const values = useWatch({ control })
  const valuesJson = useMemo(() => toJson(values), [values])

  return (
    <section>
      <h3 style={styles.sectionTitle}>Values</h3>
      <pre style={styles.preBlock}>{valuesJson}</pre>
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
    fieldState: { error, isTouched, isDirty, invalid },
  } = useController({ control, name })

  const info = useMemo(() => {
    const hasError = error !== undefined && error !== null

    return {
      value,
      error: hasError ? error : null,
      isDirty,
      isTouched,
      isValid: !invalid,
    }
  }, [error, invalid, isDirty, isTouched, value])

  return (
    <details style={styles.fieldRow}>
      <summary style={styles.fieldRowSummary}>{name}</summary>
      <div style={styles.fieldRowBodyContainer}>
        <p style={styles.fieldRowBody}>value: {info.value}</p>
        <p style={styles.fieldRowBody}>error: {info.error?.message}</p>
        <p style={styles.fieldRowBody}>isDirty: {info.isDirty}</p>
        <p style={styles.fieldRowBody}>isTouched: {info.isTouched}</p>
        <p style={styles.fieldRowBody}>isValid: {info.isValid}</p>
      </div>
    </details>
  )
})

export const RHFFieldStateList = memo(function FieldStateList() {
  const { control, getValues } = useDevtool()
  const fieldNames = useFieldNames({ control, getValues })

  return (
    <section>
      <details open>
        <summary style={styles.stateListSummary}>
          Field States ({fieldNames.length})
        </summary>
        <div style={styles.stateList}>
          {fieldNames.length === 0 ? (
            <p style={styles.emptyNotice}>No field states available yet.</p>
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
    <div
      className="devtool-panel-container"
      style={{ ...styles.panelContainer, ...style }}
      {...props}
    >
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
    <section style={{ ...styles.panel, ...style }} {...props}>
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
    <h2 style={{ ...styles.panelTitle, ...style }} {...props}>
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
    <div style={{ ...styles.panelContent, ...style }} {...props}>
      {children}
    </div>
  )
})

export type RHFDevToolContext = {
  openPanel: boolean
  toggleOpenPanel: () => void
} & UseFormReturn<FieldValues>

export const DevtoolContext = createContext<RHFDevToolContext | null>(null)

export const useDevtool = () => {
  const context = useContext(DevtoolContext)
  if (!context)
    throw new Error(
      "useDevtoolControl must be used within a DevtoolContext.Provider"
    )
  const { control, openPanel, toggleOpenPanel, ...methods } = context

  return useMemo(
    () => ({ control, openPanel, toggleOpenPanel, ...methods }),
    [control, openPanel, toggleOpenPanel, methods]
  )
}

export const DevtoolProvider = memo(function DevtoolProvider({
  defaultOpen = false,
  methods,
  children,
}: PropsWithChildren<{
  defaultOpen?: boolean
  // for some reason, ```undefined``` needs to be explicitly defined to prevent typecheck error
  methods?: UseFormReturn<FieldValues> | undefined
}>) {
  const [_open, _setOpen] = useState(defaultOpen)
  const defaultMethods = useFormContext()
  const _methods = methods ?? defaultMethods

  const _toggleOpenPanel = useCallback(
    () => _setOpen((previous) => !previous),
    [_setOpen]
  )

  if (!_methods)
    throw new Error(
      "RHFDevToolProvider requires to be in a FormProvider or passed in object returned from useForm as props"
    )

  const value = useMemo(
    () =>
      ({
        openPanel: _open,
        toggleOpenPanel: _toggleOpenPanel,
        ..._methods,
      }) satisfies RHFDevToolContext,
    [_methods, _open, _toggleOpenPanel]
  )

  return (
    <DevtoolContext.Provider value={value}>{children}</DevtoolContext.Provider>
  )
})
