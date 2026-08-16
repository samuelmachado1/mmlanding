import { createRequire } from 'node:module';

type GoogleDecoderInstance = {
  decode: (url: string) => Promise<{ status: boolean; decoded_url?: string }>;
};

let decoder: GoogleDecoderInstance | null = null;

function getDecoder(): GoogleDecoderInstance | null {
  if (decoder) return decoder;

  try {
    const require = createRequire(import.meta.url);
    const { GoogleDecoder } = require('google-news-url-decoder') as {
      GoogleDecoder: new () => GoogleDecoderInstance;
    };
    decoder = new GoogleDecoder();
    return decoder;
  } catch (error) {
    console.error('google-news-url-decoder unavailable:', error);
    return null;
  }
}

export function isGoogleNewsUrl(url: string): boolean {
  return /news\.google\.com/i.test(url);
}

export async function decodeGoogleNewsUrl(url: string): Promise<string | null> {
  if (!isGoogleNewsUrl(url)) return null;

  try {
    const instance = getDecoder();
    if (!instance) return null;

    const result = await instance.decode(url);
    if (result.status && result.decoded_url && !isGoogleNewsUrl(result.decoded_url)) {
      return result.decoded_url;
    }
  } catch {
    // Decoder is best-effort; callers fall back to the original URL.
  }

  return null;
}
