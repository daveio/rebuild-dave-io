import { ok } from "../utils/response"

export default defineEventHandler(async (event) => {
  return ok(event, {
    message: "pong",
  })
})
