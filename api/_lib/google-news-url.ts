type GoogleDecoderInstance = {
  decode: (url: string) => Promise<{ status: boolean; decoded_url?: string }>;
};

let decoderPromise: Promise<GoogleDecoderInstance | null> | null = null;

async function getDecoder(): Promise<GoogleDecoderInstance | null> {
  if (!decoderPromise) {
    decoderPromise = import('google-news-url-decoder')
      .then((module) => {
        const { GoogleDecoder } = module as {
          GoogleDecoder: new () => GoogleDecoderInstance;
        };
        return new GoogleDecoder();
      })
      .catch((error) => {
        console.error('google-news-url-decoder unavailable:', error);
        return null;
      });
  }

  return decoderPromise;
}

export function isGoogleNewsUrl(url: string): boolean {
  return /news\.google\.com/i.test(url);
}

export async function decodeGoogleNewsUrl(url: string): Promise<string | null> {
  if (!isGoogleNewsUrl(url)) return null;

  try {
    const instance = await getDecoder();
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
