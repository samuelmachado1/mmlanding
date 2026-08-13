import type { ApoiadorFormData } from '../types/index.ts';
import { apoiadorFormContent } from '../data/content.ts';

interface GoogleFormEnv {
  actionUrl?: string;
  entries: {
    nome?: string;
    email?: string;
    whatsapp?: string;
    uf?: string;
    municipio?: string;
    novidades?: string;
    campanhaDigital?: string;
    campanhaRua?: string;
  };
}

function readGoogleFormEnv(): GoogleFormEnv {
  return {
    actionUrl: import.meta.env.VITE_GOOGLE_FORM_ACTION_URL,
    entries: {
      nome: import.meta.env.VITE_GOOGLE_FORM_ENTRY_NOME,
      email: import.meta.env.VITE_GOOGLE_FORM_ENTRY_EMAIL,
      whatsapp: import.meta.env.VITE_GOOGLE_FORM_ENTRY_WHATSAPP,
      uf: import.meta.env.VITE_GOOGLE_FORM_ENTRY_UF,
      municipio: import.meta.env.VITE_GOOGLE_FORM_ENTRY_MUNICIPIO,
      novidades: import.meta.env.VITE_GOOGLE_FORM_ENTRY_NOVIDADES,
      campanhaDigital: import.meta.env.VITE_GOOGLE_FORM_ENTRY_CAMPANHA_DIGITAL,
      campanhaRua: import.meta.env.VITE_GOOGLE_FORM_ENTRY_CAMPANHA_RUA,
    },
  };
}

function isNonEmpty(value: string | undefined): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isGoogleFormConfigured(): boolean {
  const { actionUrl, entries } = readGoogleFormEnv();
  return (
    isNonEmpty(actionUrl) &&
    isNonEmpty(entries.nome) &&
    isNonEmpty(entries.email) &&
    isNonEmpty(entries.whatsapp) &&
    isNonEmpty(entries.uf) &&
    isNonEmpty(entries.municipio)
  );
}

export async function submitApoiadorGoogleForm(data: ApoiadorFormData): Promise<void> {
  if (!isGoogleFormConfigured()) {
    throw new Error('Google Form not configured');
  }

  const { actionUrl, entries } = readGoogleFormEnv();
  const fields: Record<string, string> = {
    [entries.nome!]: data.nome,
    [entries.email!]: data.email,
    [entries.whatsapp!]: data.whatsapp,
    [entries.uf!]: data.uf,
    [entries.municipio!]: data.municipio,
  };

  if (data.novidades && isNonEmpty(entries.novidades)) {
    fields[entries.novidades!] = apoiadorFormContent.checkboxes.novidades;
  }
  if (data.campanhaDigital && isNonEmpty(entries.campanhaDigital)) {
    fields[entries.campanhaDigital!] = apoiadorFormContent.checkboxes.campanhaDigital;
  }
  if (data.campanhaRua && isNonEmpty(entries.campanhaRua)) {
    fields[entries.campanhaRua!] = apoiadorFormContent.checkboxes.campanhaRua;
  }

  await fetch(actionUrl!, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(fields),
  });
}
