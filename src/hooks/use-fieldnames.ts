import { useEffect, useState } from "react"

import { UseFormReturn, get } from "react-hook-form"

export const useFieldNames = ({
  control,
}: {
  control: UseFormReturn["control"]
}) => {
  const [_fieldNames, _setFieldNames] = useState<string[]>(() => [
    ...control._names.mount,
  ])
  useEffect(() => {
    const subscription = control._subjects.state.subscribe({
      next: ({ name, type }) => {
        /**
         * Only update the lists when field arrays are changed
         * or when a new field name is added
         * or when type is undefined to ensure the ui is showing the latest state
         * */
        if (
          type === undefined ||
          (name &&
            (control._names.array.has(name) || !control._names.mount.has(name)))
        )
          _setFieldNames([...control._names.mount])
      },
    })
    return subscription.unsubscribe
  }, [control, _setFieldNames])

  return _fieldNames.filter(
    (name) => get(control._formValues, name) !== undefined
  )
}
