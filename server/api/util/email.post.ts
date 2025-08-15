export default defineEventHandler(async (event) => {
  const { token } = await readBody(event)

  if (!token) {
    throw createError({
      statusCode: 422,
      statusMessage: "Token not provided.",
    })
  }

  // Use the built-in Turnstile verification from @nuxtjs/turnstile
  const validationResult = await verifyTurnstileToken(token)

  // Logic was inverted - should fail if NOT successful
  if (!validationResult.success) {
    throw createError({
      statusCode: 403,
      statusMessage: "Token validation failed.",
    })
  }

  // Return the email after successful verification
  return {
    email: "dave@dave.io",
    success: true,
  }
})
