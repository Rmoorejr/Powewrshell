import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Reading } from '../types'

const reading = atom({ plugin: 'context-band', key: 'reading' } as const, null)
const isHidden = atom({ plugin: 'context-band', key: 'isHidden' } as const, false)

const WIDTH = 20

const compact = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'context-band',
      description: 'Toggle the context usage band above the prompt',
    })
    const { context, cost } = await $.session.usage()
    await update($, reading, () => ({ ...context, usd: cost?.usd }))

    return next(e)
  })

  on('command.run', { command: 'context-band' }, async $ => {
    const hidden = await update($, isHidden, was => !was)

    return { text: hidden ? 'Context band hidden.' : 'Context band shown.' }
  })

  on('session.measure', async ($, e, next) => {
    const next_: Reading = { ...e.context, usd: e.cost?.usd }
    await update($, reading, () => next_)

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const r = await read($, reading)
    if (e.props.hasSurvey || r === null || (await read($, isHidden))) {
      return next(e)
    }

    const { Box, Text } = $.ui.resolve(e)
    const pct = r.percent ?? 0
    const filled = Math.round((pct / 100) * WIDTH)
    const color = pct >= 85 ? 'red' : pct >= 60 ? 'yellow' : 'green'
    const used = r.tokens === undefined ? 'waiting for first response' : `${compact(r.tokens)} / ${compact(r.window)}`
    const cost = r.usd === undefined ? '' : `  $${r.usd.toFixed(2)}`

    return (
      <Box>
        <Text dimColor>ctx </Text>
        <Text color={color}>{'█'.repeat(filled)}</Text>
        <Text dimColor>{'░'.repeat(WIDTH - filled)}</Text>
        <Text color={color}> {r.percent === undefined ? '--' : `${pct}%`}</Text>
        <Text dimColor>  {used}{cost}</Text>
      </Box>
    )
  })
}
