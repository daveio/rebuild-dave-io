import { DateTime } from "luxon"
import type { H3Event } from "h3"

export interface UnblockRequest {
  domain: string
  profileId: string
  permanent: boolean
}

interface CtrldRule {
  id: string
  do: number
  status: number
  hostnames: string[]
  ttl?: number
}

/**
 * Fetch all rules for a specific profile
 */
async function getRules(profileId: string, apiKey: string): Promise<CtrldRule[]> {
  try {
    const response = await $fetch<{ body: { rules: CtrldRule[] } }>(
      `https://api.controld.com/profiles/${profileId}/rules`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    )
    return response.body?.rules || []
  } catch (error) {
    console.error("Failed to fetch rules:", error)
    return []
  }
}

/**
 * Find a rule by domain in the list of rules
 */
function findRuleByDomain(rules: CtrldRule[], domain: string): CtrldRule | undefined {
  return rules.find((rule) =>
    rule.hostnames?.some(
      (hostname) =>
        hostname === domain ||
        hostname === `*.${domain}` ||
        (hostname.startsWith("*.") && domain.endsWith(hostname.substring(2))),
    ),
  )
}

/**
 * Delete a specific rule by ID
 */
async function deleteRule(profileId: string, ruleId: string, apiKey: string): Promise<void> {
  try {
    await $fetch(`https://api.controld.com/profiles/${profileId}/rules/${ruleId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    })
    console.log(`Successfully deleted existing rule ${ruleId}`)
  } catch (error) {
    console.error(`Failed to delete rule ${ruleId}:`, error)
    // Continue even if delete fails - we'll try to create the new rule anyway
  }
}

export async function unblockDomain(request: UnblockRequest, apiKey: string) {
  // First, check for existing rules for this domain
  const existingRules = await getRules(request.profileId, apiKey)
  const existingRule = findRuleByDomain(existingRules, request.domain)

  // If an existing rule is found, delete it first
  if (existingRule) {
    console.log(`Found existing rule for ${request.domain}, removing it first`)
    await deleteRule(request.profileId, existingRule.id, apiKey)
  }

  // Now create the new unblock rule
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
