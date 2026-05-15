const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'

function getSanityConfig() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const token = process.env.SANITY_API_READ_TOKEN

  if (!projectId || !dataset) {
    return null
  }

  return { projectId, dataset, token }
}

export async function fetchFromSanity<T>(query: string, tags: string[] = []): Promise<T | null> {
  const config = getSanityConfig()
  if (!config) return null

  const base = `https://${config.projectId}.api.sanity.io/v${API_VERSION}/data/query/${config.dataset}`
  const url = `${base}?query=${encodeURIComponent(query)}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(config.token ? { Authorization: `Bearer ${config.token}` } : {}),
    },
    next: {
      revalidate: 120,
      tags,
    },
  })

  if (!response.ok) {
    return null
  }

  const json = (await response.json()) as { result?: T }
  return json.result ?? null
}

export function isSanityConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET)
}
