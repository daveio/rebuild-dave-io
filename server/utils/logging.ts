import type { H3Event } from "h3"

export function logResponse(event: H3Event, data: unknown, code: number, error?: string | null) {
  if (!error) {
    error = null
  }
  const { method, path, headers } = event
  const logJSON = JSON.stringify({
    data,
    code,
    method,
    path,
    headers,
    error,
  })
  if (error !== null) {
    console.log(logJSON)
  } else {
    console.error(logJSON)
  }
}
