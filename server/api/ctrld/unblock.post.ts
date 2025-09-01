import { ok } from "../../utils/response"

interface UnblockBody {
  domain: string
  auth: string
  profile: string
  duration: "temporary" | "permanent"
} // should this be a shared type between the frontend and backend?

export default defineEventHandler(async (event) => {
  const { domain, auth, profile, duration } = await readBody<UnblockBody>(event)

  console.log("Received unblock request:", { domain, auth, profile, duration })

  // if auth matches runtimeconfig value
  //   if profile is in profile list (actually, let's make it a type in shared/ to avoid having to check it)
  //   same thing with duration
  //   anyway
  //
  //   create override
  //     if successful
  //       return ok
  //     if failed
  //       return error
  //
  // ps:
  // error syntax is return error(event, {}, "Unblock failed", 400)

  return ok(event, {
    message: "pong!",
  })
})
