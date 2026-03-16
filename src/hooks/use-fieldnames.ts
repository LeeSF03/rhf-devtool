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
      next: ({ name }) => {
        if (name && control._names.array.has(name))
          _setFieldNames([...control._names.mount])
      },
    })
    return subscription.unsubscribe
  }, [control, _setFieldNames])

  return _fieldNames.filter(
    (name) => get(control._formValues, name) !== undefined
  )
}
