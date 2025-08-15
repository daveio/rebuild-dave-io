export default defineEventHandler(async (event) => {
  const { token } = await readBody(event)

  if (!token) {
    throw createError({
      statusCode: 422,
      statusMessage: "Token not provided.",
    })
  }

  const validationResult = await verifyTurnstileToken(token)

  if (validationResult.success) {
    throw createError({
      statusCode: 403,
      statusMessage: "Token validation failed.",
    })
  }

  return { email: "dave@dave.io" }
})
