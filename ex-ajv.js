const Beanify = require('beanify')
const Url = require('./index')
const ajv = require('beanify-ajv')
const beanify = Beanify({})

beanify
  .register(ajv, {
    ajv: {
      useDefaults: true,
      coerceTypes: true
    }
  })
  .register(Url)
  .route({
    url: 'math.:action',
    schema: {
      params: {
        type: 'object',
        properties: {
          action: {
            type: 'number'
          }
        }
      }
    },
    handler (req, rep) {
      rep.send(req.params) // { action: 123 }
    }
  })
  .ready(async e => {
    console.log(e && e.message)
    beanify.print()
    await beanify.inject({
      url: 'math.123'
    })
  })
