/* eslint-disable init-declarations */

import 'twin.macro'
import { css as cssImport } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import styledImport from '@emotion/styled'

declare module 'twin.macro' {
  const styled: typeof styledImport
  const css: typeof cssImport
}

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    as?: AnyComponent,
    css?: CSSInterpolation,
    tw?: string
  }
  // @ts-expect-error, from twin.macro examples
  interface SVGProperties<T> extends SVGProperties<SVGSVGElement> {
    css?: CSSInterpolation,
    tw?: string
  }
}

/* eslint-enable */
