/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the chat backend (portfolio.server). Falls back to the production Render URL when unset. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
