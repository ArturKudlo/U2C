/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Memo = (Component: any, propsAreEqual?: any | undefined) => {
  const memoized = memo(Component, propsAreEqual)

  Object.defineProperty(memoized, 'displayName', {
    set(value) {
      Component.displayName = value
    },
    get() {
      return Component.displayName
    },
  })

  return memoized
}
