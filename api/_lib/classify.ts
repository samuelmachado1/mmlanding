export type MediaTab =
  | 'entrevistas'
  | 'reportagens'
  | 'podcasts'
  | 'redes-sociais';

const PODCAST_PATTERN =
  /youtube\.com|youtu\.be|spotify\.com|open\.spotify/i;
const SOCIAL_PATTERN =
  /instagram\.com|x\.com|twitter\.com|tiktok\.com|facebook\.com/i;
const INTERVIEW_PATTERN = /entrevista|entrevist/i;

export function classifyMedia(
  title: string,
  url: string,
): { tab: MediaTab; category: string } {
  const lowerTitle = title.toLowerCase();
  const lowerUrl = url.toLowerCase();

  if (PODCAST_PATTERN.test(lowerUrl) || lowerTitle.includes('podcast')) {
    return { tab: 'podcasts', category: 'Podcasts' };
  }

  if (SOCIAL_PATTERN.test(lowerUrl)) {
    return { tab: 'redes-sociais', category: 'Redes sociais' };
  }

  if (INTERVIEW_PATTERN.test(lowerTitle)) {
    return { tab: 'entrevistas', category: 'Entrevistas' };
  }

  return { tab: 'reportagens', category: 'Reportagens' };
}
