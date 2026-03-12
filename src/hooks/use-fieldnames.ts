import { useSyncExternalStore } from "react"

import { FieldValues, Path, UseFormReturn } from "react-hook-form"

export const useFieldNames = <T extends FieldValues>({
  control,
  getValues,
}: {
  control: UseFormReturn<T>["control"]
  getValues: UseFormReturn<T>["getValues"]
}) =>
  useSyncExternalStore(
    (callback) => {
      const sub = control._subjects.state.subscribe({
        next: () => {
          // check if the operation below is needed
          // check if name (from argument { name }) is in control._names.array, if it is trigger the callback
          control._removeUnmounted()
          callback()
        },
      })
      return () => sub.unsubscribe()
    },
    () =>
      [...control._names.mount].filter(
        (n) => getValues(n as Path<T>) != undefined
      )
  )
