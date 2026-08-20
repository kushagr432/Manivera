/**
 * Safely extract a human-readable message from a caught value.
 *
 * TypeScript types `catch` bindings as `unknown` under `strict`, because a
 * thrown value is not guaranteed to be an Error. This narrows it without
 * resorting to `any`.
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return String(error)
}
