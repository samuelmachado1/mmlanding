import type { VercelRequest, VercelResponse } from '@vercel/node';

const FLICKR_USER_ID = '161649163@N04';
const FLICKR_FEED_URL = `https://www.flickr.com/services/feeds/photos_public.gne?lang=pt-br&format=json&nojsoncallback=1&id=${encodeURIComponent(FLICKR_USER_ID)}`;

interface FlickrFeedItem {
  title: string;
  link: string;
  media: { m: string };
  date_taken: string;
}

interface FlickrFeedPayload {
  items: FlickrFeedItem[];
}

function toLargeImageUrl(url: string): string {
  return url.replace(/_m\.(jpg|jpeg|png|webp)$/i, '_c.$1');
}

function photoIdFromLink(link: string): string {
  const match = link.match(/\/(\d+)\/?$/);
  return match?.[1] ?? link;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(FLICKR_FEED_URL, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Flickr feed HTTP ${response.status}`);
    }

    const payload = (await response.json()) as FlickrFeedPayload;
    const items = (payload.items ?? []).map((item) => ({
      id: photoIdFromLink(item.link),
      title: item.title?.trim() || 'Foto do mandato',
      href: item.link,
      imageUrl: toLargeImageUrl(item.media.m),
      dateTaken: item.date_taken,
    }));

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
    return res.status(200).json({
      fetchedAt: new Date().toISOString(),
      items,
    });
  } catch (error) {
    console.error('GET /api/flickr-photos failed:', error);
    const message = error instanceof Error ? error.message : 'Failed to load Flickr photos';
    return res.status(500).json({ error: message });
  }
}
