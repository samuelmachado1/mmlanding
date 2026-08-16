import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { GoogleDecoder } = require('google-news-url-decoder') as {
  GoogleDecoder: new () => {
    decode: (url: string) => Promise<{ status: boolean; decoded_url?: string }>;
  };
};

let decoder: InstanceType<typeof GoogleDecoder> | null = null;

function getDecoder(): InstanceType<typeof GoogleDecoder> {
  if (!decoder) decoder = new GoogleDecoder();
  return decoder;
}

export function isGoogleNewsUrl(url: string): boolean {
  return /news\.google\.com/i.test(url);
}

export async function decodeGoogleNewsUrl(url: string): Promise<string | null> {
  if (!isGoogleNewsUrl(url)) return null;

  try {
    const result = await getDecoder().decode(url);
    if (result.status && result.decoded_url && !isGoogleNewsUrl(result.decoded_url)) {
      return result.decoded_url;
    }
  } catch {
    // Decoder is best-effort; callers fall back to the original URL.
  }

  return null;
}
