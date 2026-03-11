export function toJson(value: unknown) {
  const seen = new WeakSet<object>()

  return JSON.stringify(
    value,
    (_key, nextValue) => {
      if (nextValue instanceof Date) return nextValue.toISOString()
      if (typeof nextValue === "object" && nextValue !== null) {
        if (seen.has(nextValue)) return "[Circular]"
        seen.add(nextValue)
      }
      return nextValue
    },
    2
  )
}
