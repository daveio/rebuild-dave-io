import type { H3Event } from "h3"

/**
 * Logs the response details for an HTTP event, including status, data, and errors.
 * This function outputs a structured log message to the console for both successful and error responses.
 *
 * Args:
 *   event: The H3Event representing the HTTP request context.
 *   data: The response data to be logged.
 *   code: The HTTP status code of the response.
 *   error: An optional error message string, or null if no error occurred.
 *
 * Returns:
 *   None.
 */
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
