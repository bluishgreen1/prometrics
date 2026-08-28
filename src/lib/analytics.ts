let lastTrackedPath: string | null = null;

export function trackPageView(pagePath: string): void {
  if (pagePath === lastTrackedPath) return;
  lastTrackedPath = pagePath;

  const payload = JSON.stringify({ path: pagePath, referrer: document.referrer });

  if (navigator.sendBeacon) {
    const sent = navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
    if (sent) return;
  }

  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}
