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
    participacao?: string;
    lgpd?: string;
  };
}

const UF_GOOGLE_FORM_LABELS: Record<string, string> = {
  AC: 'Acre (AC)',
  AL: 'Alagoas (AL)',
  AP: 'Amapá (AP)',
  AM: 'Amazonas (AM)',
  BA: 'Bahia (BA)',
  CE: 'Ceará (CE)',
  DF: 'Distrito Federal (DF)',
  ES: 'Espírito Santo (ES)',
  GO: 'Goiás (GO)',
  MA: 'Maranhão (MA)',
  MT: 'Mato Grosso (MT)',
  MS: 'Mato Grosso do Sul (MS)',
  MG: 'Minas Gerais (MG)',
  PA: 'Pará (PA)',
  PB: 'Paraíba (PB)',
  PR: 'Paraná (PR)',
  PE: 'Pernambuco (PE)',
  PI: 'Piauí (PI)',
  RJ: 'Rio de Janeiro (RJ)',
  RN: 'Rio Grande do Norte (RN)',
  RS: 'Rio Grande do Sul (RS)',
  RO: 'Rondônia (RO)',
  RR: 'Roraima (RR)',
  SC: 'Santa Catarina (SC)',
  SP: 'São Paulo (SP)',
  SE: 'Sergipe (SE)',
  TO: 'Tocantins (TO)',
};

function readGoogleFormEnv(): GoogleFormEnv {
  const participacao =
    import.meta.env.VITE_GOOGLE_FORM_ENTRY_PARTICIPACAO ??
    import.meta.env.VITE_GOOGLE_FORM_ENTRY_NOVIDADES;

  return {
    actionUrl: import.meta.env.VITE_GOOGLE_FORM_ACTION_URL,
    entries: {
      nome: import.meta.env.VITE_GOOGLE_FORM_ENTRY_NOME,
      email: import.meta.env.VITE_GOOGLE_FORM_ENTRY_EMAIL,
      whatsapp: import.meta.env.VITE_GOOGLE_FORM_ENTRY_WHATSAPP,
      uf: import.meta.env.VITE_GOOGLE_FORM_ENTRY_UF,
      municipio: import.meta.env.VITE_GOOGLE_FORM_ENTRY_MUNICIPIO,
      participacao,
      lgpd: import.meta.env.VITE_GOOGLE_FORM_ENTRY_LGPD,
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

function mapUfToGoogleFormValue(uf: string): string {
  return UF_GOOGLE_FORM_LABELS[uf] ?? uf;
}

export async function submitApoiadorGoogleForm(data: ApoiadorFormData): Promise<void> {
  if (!isGoogleFormConfigured()) {
    throw new Error('Google Form not configured');
  }

  const { actionUrl, entries } = readGoogleFormEnv();
  const params = new URLSearchParams();

  params.set(entries.nome!, data.nome);
  params.set(entries.email!, data.email);
  params.set(entries.whatsapp!, data.whatsapp);
  params.set(entries.uf!, mapUfToGoogleFormValue(data.uf));
  params.set(entries.municipio!, data.municipio);

  if (isNonEmpty(entries.participacao)) {
    if (data.novidades) {
      params.append(entries.participacao!, apoiadorFormContent.checkboxes.novidades);
    }
    if (data.campanhaDigital) {
      params.append(entries.participacao!, apoiadorFormContent.checkboxes.campanhaDigital);
    }
    if (data.campanhaRua) {
      params.append(entries.participacao!, apoiadorFormContent.checkboxes.campanhaRua);
    }
  }

  if (data.lgpdAceite && isNonEmpty(entries.lgpd)) {
    params.append(entries.lgpd!, apoiadorFormContent.lgpdFormValue);
  }

  await fetch(actionUrl!, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });
}
