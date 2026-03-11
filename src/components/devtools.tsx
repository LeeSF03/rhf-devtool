"use client"

import {
  type PropsWithChildren,
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react"

import {
  type Control,
  type FieldValues,
  useController,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form"

import { toJson } from "../utils/json"
import { styles } from "./styles"

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
  // replace json stringify because json serialization and deserialization are expensive
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
  const { getValues } = useFormContext()
  const { control } = useDevtool()
  const fieldNames = useSyncExternalStore(
    (callback) => {
      const sub = control._subjects.state.subscribe({
        next: () => {
          control._removeUnmounted()
          callback()
        },
      })
      return () => sub.unsubscribe()
    },
    () => control._names.mount
  )

  // Don't memoize this as fieldNames (control._names.mount) reference is stable and won't reevaluate useMemoed filteredFieldNames when field states change. We want to reflect new fields as they are added or removed.
  const filteredFieldNames = [...fieldNames].filter(
    (n) => getValues(n) != undefined
  )

  return (
    <section>
      <details open>
        <summary style={styles.stateListSummary}>
          Field States ({filteredFieldNames.length})
        </summary>
        <div style={styles.stateList}>
          {filteredFieldNames.length === 0 ? (
            <p style={styles.emptyNotice}>No field states available yet.</p>
          ) : (
            filteredFieldNames.map((name) => (
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
        type="button"
        style={{ ...styles.toggleButton, ...style }}
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
    <div style={{ ...styles.panelContainer, ...style }} {...props}>
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
  control: Control<FieldValues, any, FieldValues>
  openPanel: boolean
  toggleOpenPanel: () => void
}

export const DevtoolContext = createContext<RHFDevToolContext | null>(null)

export const useDevtool = () => {
  const context = useContext(DevtoolContext)
  if (!context)
    throw new Error(
      "useDevtoolControl must be used within a DevtoolContext.Provider"
    )
  const { control, openPanel, toggleOpenPanel } = context

  return useMemo(
    () => ({ control, openPanel, toggleOpenPanel }),
    [control, openPanel, toggleOpenPanel]
  )
}

export type RHFDevToolProps = {
  title?: string
  defaultOpen?: boolean
  showValues?: boolean
  control?: Control<FieldValues, any, FieldValues> | undefined
}

export const DevtoolProvider = memo(function DevtoolProvider({
  defaultOpen = false,
  control,
  children,
}: PropsWithChildren<RHFDevToolProps>) {
  const [_open, _setOpen] = useState(defaultOpen)
  const defaultControl = useFormContext<FieldValues>().control

  const _control = useMemo(
    () => control ?? defaultControl,
    [control, defaultControl]
  )
  const _toggleOpenPanel = useCallback(
    () => _setOpen((previous) => !previous),
    [_setOpen]
  )

  const value = useMemo(
    () => ({
      control: _control,
      openPanel: _open,
      toggleOpenPanel: _toggleOpenPanel,
    }),
    [_control, _open, _toggleOpenPanel]
  )

  if (!control && !defaultControl)
    throw new Error(
      "RHFDevTool requires a control prop or a parent FormProvider"
    )

  return (
    <DevtoolContext.Provider value={value}>{children}</DevtoolContext.Provider>
  )
})
