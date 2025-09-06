import { ok } from "../../utils/response"
import { unblockDomain } from "../../utils/ctrld"
import type { ctrldUnblockRequest } from "~~/shared/types/ctrld"

export default defineEventHandler(async (event) => {
  const { domain, auth, profile, permanent } = await readBody<ctrldUnblockRequest>(event)

  console.log("Received unblock request:", { domain, auth, profile, permanent })

  if (auth !== useRuntimeConfig(event).ctrldAuthKey) {
    return error(event, {}, "Invalid auth", 401)
  }

  // Add runtime validation
  const profiles = {
    main: "751219lhr3b5",
    permissive: "753829amsizb",
    parents: "753215amsnk2",
  }

  if (!profiles[profile as keyof typeof profiles]) {
    return error(event, {}, `Invalid profile: ${profile}`, 400)
  }

  const profileId = profiles[profile as keyof typeof profiles]

  // let's roll

  try {
    const response = await unblockDomain({ domain, profileId, permanent }, useRuntimeConfig(event).ctrldApiKey)
    return ok(event, { message: "Override created successfully", data: response })
  } catch (err: unknown) {
    return error(event, {}, `Failed to create override: ${err instanceof Error ? err.message : "Unknown error"}`, 500)
  }
})
