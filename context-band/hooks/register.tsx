import { atom, read, update } from 'claude-code'
import type { Register, EngineInterface } from 'claude-code'

import type { Usage } from '../types'

const usage = atom({ plugin: 'context-band', key: 'usage' } as const, null)
const isHidden = atom({ plugin: 'context-band', key: 'isHidden' } as const, false)

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`)

async function refresh($: EngineInterface) {
  const { context } = await $.session.usage()
  const tokens = context.tokens ?? 0
  const percent = context.percent ?? (context.window ? Math.round((tokens / context.window) * 100) : 0)
  const value: Usage = { tokens, window: context.window, percent }
  await update($, usage, () => value)
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'context-band',
      description: 'Turn the context band on or off (/context-band on, /context-band off)',
    })
    const result = await next(e)
    await refresh($).catch(() => undefined)
    return result
  })

  on('command.run', { command: 'context-band' }, async ($, e) => {
    const arg = e.args.trim().toLowerCase()
    const hidden = await update($, isHidden, was => (arg === 'on' ? false : arg === 'off' ? true : !was))
    await refresh($).catch(() => undefined)
    return { text: hidden ? 'Context band: OFF' : 'Context band: ON' }
  })

  on('tool.call', async ($, e, next) => {
    const result = await next(e)
    await refresh($).catch(() => undefined)
    return result
  })

  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    await refresh($).catch(() => undefined)
    return result
  })

  on('session.compact', async ($, e, next) => {
    const result = await next(e)
    await refresh($).catch(() => undefined)
    return result
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const u = await read($, usage)

    if (e.props.hasSurvey || u === null || u.window === 0 || (await read($, isHidden))) {
      return next(e)
    }

    const { Box, Text } = $.ui.resolve(e)
    const left = Math.max(u.window - u.tokens, 0)
    const color = u.percent >= 85 ? 'red' : u.percent >= 60 ? 'yellow' : 'green'
    const filled = Math.round(u.percent / 5)
    const bar = '█'.repeat(filled) + '░'.repeat(20 - filled)

    return (
      <Box>
        <Text color={color}>{bar} {u.percent}%</Text>
        <Text dimColor>  {fmt(u.tokens)} used · {fmt(left)} left of {fmt(u.window)}</Text>
      </Box>
    )
  })
}
