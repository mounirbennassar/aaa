/**
 * Simple in-memory fixed-window rate limiter.
 *
 * NOTE: state lives in a single process. On serverless platforms (e.g. Vercel)
 * each warm instance keeps its own counters, so this only limits within one
 * instance — it blunts naive brute-force / spam but is not a hard global limit.
 * For production-grade, multi-instance limiting back this with Upstash Redis
 * (@upstash/ratelimit) using the same key scheme.
 */

type Entry = { count: number; resetAt: number }

const store = new Map<string, Entry>()

export type RateLimitResult = {
  ok: boolean
  remaining: number
  retryAfter: number // seconds until the window resets
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: limit - 1, retryAfter: 0 }
  }

  entry.count += 1
  if (entry.count > limit) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }
  return { ok: true, remaining: limit - entry.count, retryAfter: 0 }
}

type HeaderLike = Headers | Record<string, string | string[] | undefined>

/** Best-effort client IP extraction from request headers (Request or NextAuth req). */
export function getClientIp(headers: HeaderLike): string {
  const get = (k: string): string | undefined => {
    if (typeof (headers as Headers).get === 'function') {
      return (headers as Headers).get(k) ?? undefined
    }
    const v = (headers as Record<string, string | string[] | undefined>)[k]
    return Array.isArray(v) ? v[0] : v
  }
  const forwarded = get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || get('x-real-ip') || 'unknown'
}
