export type unblockDuration = "temporary" | "permanent" | null

export type ctrldProfile = "main" | "permissive" | "parents"

export type ctrldUnblockRequest = {
  domain: string
  auth: string
  profile: ctrldProfile
  duration: unblockDuration
}
