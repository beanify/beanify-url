import { Beanify } from 'beanify'
import { JSONSchemaType } from 'ajv'
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

declare module 'beanify-ajv' {
  interface AjvRouteOptions {
    params?: JSONSchemaType<Record<string, any>, true>
  }
}
