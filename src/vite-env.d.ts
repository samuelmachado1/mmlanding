/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BONDE_AVATAR_EMBED_URL?: string;
  readonly VITE_GOOGLE_FORM_ACTION_URL?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_NOME?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_EMAIL?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_WHATSAPP?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_UF?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_MUNICIPIO?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_NOVIDADES?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_CAMPANHA_DIGITAL?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_CAMPANHA_RUA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
