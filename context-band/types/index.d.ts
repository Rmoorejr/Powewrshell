export type Reading = { tokens?: number; window: number; percent?: number; usd?: number }

declare module 'claude-code' {
  interface PluginState {
    'context-band': { reading: Reading | null; isHidden: boolean }
  }
}
