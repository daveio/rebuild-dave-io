import { DateTime } from "luxon"
import type { H3Event } from "h3"

export interface UnblockRequest {
  domain: string
  profileId: string
  permanent: boolean
}

export async function unblockDomain(request: UnblockRequest, apiKey: string) {
  let expiry: number = 0

  if (!request.permanent) {
    expiry = DateTime.now().plus({ minutes: 15 }).toUnixInteger()
  }

  const body: { do: 1; status: 1; hostnames: string[]; ttl?: number } = {
    do: 1,
    status: 1,
    hostnames: [request.domain],
  }

  if (!request.permanent) {
    body.ttl = expiry
  }

  // TODO: expired unblocks don't get cleaned up, so we'll need to check for them before we write a new unblock

  return await $fetch(`https://api.controld.com/profiles/${request.profileId}/rules`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  })
}

export async function checkDomain(event: H3Event, domain: string) {
  console.log(event)
  return { safe: true, reasoning: `${domain}: AI checks not yet implemented` }
}
