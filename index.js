const kRouteRequest = Symbol.for('route.request')
const kBeanifyAjv = Symbol.for('beanify.ajv')
const kPluginUrl = Symbol.for('beanify.plugin.url')

module.exports = async function (beanify, opts) {
  beanify.addHook('onRoute', function (route) {
    const segs = route.url.split('.')
    route[kPluginUrl] = []
    route.url = segs
      .map((seg, idx) => {
        if (seg.startsWith(':')) {
          route[kPluginUrl].push({
            index: idx,
            name: seg.substr(1)
          })
          return '*'
        }
        return seg
      })
      .join('.')
  })

  beanify.addHook('onBeforeHandler', function () {
    const req = this[kRouteRequest]
    const paths = this[kPluginUrl]

    if (paths.length > 0) {
      const segs = req.url.split('.')
      req.params = {}
      paths.forEach(path => {
        req.params[path.name] = segs[path.index]
      })
    }

    const ajv = this.$beanify[kBeanifyAjv]
    if (!ajv) {
      return
    }

    const schema = this.schema || {}
    if (schema.params) {
      const verification = ajv.compile(schema.params)
      if (!verification(req.params)) {
        const msg = verification.errors
          .map(e => {
            return `position: [params] schema path: [${e.schemaPath}] message: ${e.message}`
          })
          .join('\n')
        throw new Error(msg)
      }
    }
  })
}
