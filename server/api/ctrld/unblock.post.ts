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
  //   anyway.
  //   create override
  //     if successful
  //       return ok
  //     if failed
  //       return error
  //
  // ps:
  // error syntax is return error(event, {}, "Unblock failed", 400)
  //
  // secret squirrelling has found an undocumented 'ttl' field in the api request to controld
  // set it to the unix time of when you want the override to expire
  // it remains to be seen if timezones affect this, experiment
  // maybe unix time isn't affected by timezones. idk
  // with luxon: dt.toUnixInteger(); // => 1492702320

  return ok(event, {
    message: "pong!",
  })
})
