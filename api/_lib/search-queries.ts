export const DEFAULT_SEARCH_QUERIES = [
  'Max Maciel deputado',
  'Deputado Max Maciel',
  'Max Maciel CTM',
  'Max Maciel comissão transporte',
  'Max Maciel tarifa zero',
];

export function getSearchQueries(): string[] {
  const raw = process.env.GOOGLE_NEWS_QUERIES?.trim() ?? process.env.GOOGLE_CSE_QUERIES?.trim();
  if (!raw) return DEFAULT_SEARCH_QUERIES;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (
      Array.isArray(parsed) &&
      parsed.every((entry) => typeof entry === 'string' && entry.length > 0)
    ) {
      return parsed;
    }
  } catch {
    // fall through to defaults
  }

  return DEFAULT_SEARCH_QUERIES;
}
