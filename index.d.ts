import { Beanify } from 'beanify'

import { BeanifyUrl } from './types/options'

declare const url: BeanifyUrl

export = url

declare module 'beanify' {
  interface BeanifyPlugin {
    (plugin: BeanifyUrl): Beanify
  }

  interface Request {
    params: Record<string, string>
  }
}
