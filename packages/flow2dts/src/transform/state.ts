import { Visitor, types as t } from "@babel/core"
import { POLYFILL_TYPES } from "./polyfillTypes"

export interface State {
  polyfillTypes: Set<typeof POLYFILL_TYPES[number]>
}

export function combineVisitorsSafe(...visitors: Visitor<State>[]): Visitor<State> {
  const combined: Visitor<State> = {}
  for (const visitor of visitors) {
    const k1 = Object.keys(combined)
    const k2 = Object.keys(visitor)
    for (const f1 of k1) {
      if (k2.includes(f1)) {
        throw new Error(`${f1} has already been defined in other visitors.`)
      }
    }
    Object.assign(combined, visitor)
  }
  return combined
}
