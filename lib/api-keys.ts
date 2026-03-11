import crypto from "crypto"

// Generate a secure random API key
export function generateApiKey(length = 32): string {
  return crypto.randomBytes(length).toString("hex")
}

// Hash an API key for storage (never store raw API keys)
export function hashApiKey(apiKey: string): string {
  return crypto.createHash("sha256").update(apiKey).digest("hex")
}

// Verify an API key against its hash
export function verifyApiKey(providedKey: string, storedHash: string): boolean {
  const providedHash = hashApiKey(providedKey)
  return crypto.timingSafeEqual(Buffer.from(providedHash, "hex"), Buffer.from(storedHash, "hex"))
}
