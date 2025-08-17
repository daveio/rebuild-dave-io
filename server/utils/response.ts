import type { H3Event } from "h3"
import { getQuery, getRequestHeaders, getRequestURL, getRouterParams, setResponseStatus } from "h3"

function serializeEvent(event: H3Event) {
  const headers = getRequestHeaders(event)
  const query = getQuery(event)
  const params = getRouterParams(event)
  const url = getRequestURL(event)
  const { method, path } = event
  return {
    method,
    path,
    url,
    headers,
    query,
    params,
  }
}

function wrapResponse(event: H3Event, data: unknown, error?: string, code?: number) {
  if (!error) {
    error = undefined
  }
  if (!code) {
    if (error) {
      code = 500
    } else {
      code = 200
    }
  }
  setResponseStatus(event, code)
  return {
    code,
    data,
    error,
    request: serializeEvent(event),
  }
}

export function ok(event: H3Event, data: unknown, code?: number) {
  if (code) {
    return wrapResponse(event, data, undefined, code)
  } else {
    return wrapResponse(event, data, undefined)
  }
}

export function error(event: H3Event, data: unknown, error: string, code?: number) {
  if (code) {
    return wrapResponse(event, data, error, code)
  } else {
    return wrapResponse(event, data, error)
  }
}
