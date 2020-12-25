import { Beanify, PluginDoneCallback, PluginOptions } from 'beanify'

export type BeanifyUrl = (
  beanify: Beanify,
  opts: PluginOptions,
  done: PluginDoneCallback
) => Promise<void>
