/// <reference types="vite/client" />

declare const __SITE_LAUNCHED__: string;
declare const __LAUNCH_DATE__: string;
declare const __PREVIEW_SECRET__: string;
declare const __IS_PROD_BUILD__: boolean;

interface ImportMetaEnv {
  readonly VITE_BONDE_AVATAR_EMBED_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
