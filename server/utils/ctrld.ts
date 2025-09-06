import { DateTime } from "luxon"
import type { H3Event } from "h3"

export interface UnblockRequest {
  domain: string
  profileId: string
  permanent: boolean
}

export interface DeleteCustomRuleResponse {
  body: [] // always an empty array it seems
  success: boolean
  message: string
}

function normaliseDomain(domain: string): string {
  // Remove www prefix
  if (domain.startsWith("www.")) {
    domain = domain.slice(4)
  }
  // Remove trailing slash
  if (domain.endsWith("/")) {
    domain = domain.slice(0, -1)
  }
  return domain
}

export async function unblockDomain(request: UnblockRequest, apiKey: string) {
  let expiry: number = 0

  if (!request.permanent) {
    expiry = DateTime.now().plus({ minutes: 15 }).toUnixInteger()
  }

  const body: { do: 1; status: 1; hostnames: string[]; ttl?: number } = {
    do: 1,
    status: 1,
    hostnames: [normaliseDomain(request.domain)],
  }

  if (!request.permanent) {
    body.ttl = expiry
  }

  if (!(await ensureRuleDeleted(request, apiKey))) {
    console.error(
      `Failed to ensure deletion of existing override for ${request.domain} on profile ${request.profileId}, proceeding anyway...`,
    )
  }

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

async function ensureRuleDeleted(request: UnblockRequest, apiKey: string) {
  const normalisedDomain = normaliseDomain(request.domain)

  const response = (await $fetch(`https://api.controld.com/profiles/${request.profileId}/rules/${normalisedDomain}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  })) as DeleteCustomRuleResponse // idempotent; succeeds anyway if no deletion

  return response.success
}

export async function checkDomain(event: H3Event, domain: string) {
  console.log(event)
  return { safe: true, reasoning: `${domain}: AI checks not yet implemented` }
}
