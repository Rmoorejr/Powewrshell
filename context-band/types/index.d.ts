export type Usage = { tokens: number; window: number; percent: number }

declare module 'claude-code' {
  interface PluginState {
    'context-band': { usage: Usage | null }
  }
}
