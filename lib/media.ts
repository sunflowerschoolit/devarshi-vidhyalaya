export function getVideoEmbedUrl(videoUrl: string): string | null {
  try {
    const url = new URL(videoUrl)
    const host = url.hostname.toLowerCase()
    const pathSegments = url.pathname.split('/').filter(Boolean)

    if (host.includes('youtube.com') || host.includes('youtu.be')) {
      let videoId = ''
      let start = ''

      if (host.includes('youtu.be')) {
        videoId = pathSegments[0] || ''
        start = url.searchParams.get('t') || ''
      } else if (pathSegments[0] === 'watch') {
        videoId = url.searchParams.get('v') || ''
        start = url.searchParams.get('t') || url.searchParams.get('start') || ''
      } else if (['embed', 'shorts', 'live'].includes(pathSegments[0] || '')) {
        videoId = pathSegments[1] || ''
        start = url.searchParams.get('start') || ''
      }

      if (videoId) {
        const embedParams = new URLSearchParams({
          rel: '0',
          modestbranding: '1',
          iv_load_policy: '3',
          playsinline: '1',
        })
        if (start) {
          const timeMatch = start.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/)
          const parsedFromHms = timeMatch
            ? (Number.parseInt(timeMatch[1] || '0', 10) * 3600) +
              (Number.parseInt(timeMatch[2] || '0', 10) * 60) +
              Number.parseInt(timeMatch[3] || '0', 10)
            : Number.NaN
          const parsed = Number.isNaN(parsedFromHms)
            ? Number.parseInt(start.replace('s', ''), 10)
            : parsedFromHms
          if (!Number.isNaN(parsed) && parsed > 0) embedParams.set('start', String(parsed))
        }
        return `https://www.youtube-nocookie.com/embed/${videoId}?${embedParams.toString()}`
      }
    }

    if (host.includes('vimeo.com')) {
      if (host === 'player.vimeo.com' && pathSegments[0] === 'video' && pathSegments[1]) {
        const embedParams = new URLSearchParams({
          title: '0',
          byline: '0',
          portrait: '0',
        })
        return `https://player.vimeo.com/video/${pathSegments[1]}?${embedParams.toString()}`
      }

      const numericId = pathSegments.find((segment) => /^\d+$/.test(segment))
      if (numericId) {
        const embedParams = new URLSearchParams({
          title: '0',
          byline: '0',
          portrait: '0',
        })
        return `https://player.vimeo.com/video/${numericId}?${embedParams.toString()}`
      }
    }

    return null
  } catch {
    return null
  }
}

export function isDirectVideoUrl(videoUrl: string): boolean {
  const withoutQuery = videoUrl.split('?')[0].toLowerCase()
  return ['.mp4', '.webm', '.ogg', '.mov'].some((extension) => withoutQuery.endsWith(extension))
}
