# beanify-url

Tool for using `url` as parameter delivery method

```bash
npm i beanify-url --save
```

with yarn

```bash
yarn add beanify-url
```

## Usage

```javascript
const Beanify = require('beanify')
const Url = require('beanify-url')
const beanify = Beanify({})

beanify
  .register(Url)
  .route({
    url: 'math.:action',
    handler (req, rep) {
      rep.send(req.params) // { action: 'sub' } { action: 'add' }
    }
  })
  .ready(async e => {
    console.log(e && e.message)
    beanify.print()
    await beanify.inject({
      url: 'math.sub'
    })
    await beanify.inject({
      url: 'math.add'
    })
  })
```

## Request Decorators

- `params`: get the parameters passed through `url`

## Using `beanify-ajv`

### Usage

```javascript
const Beanify = require('beanify')
const Url = require('beanify-url')
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
```

### Route Decorators

- `schema`: options
  - `params`: to check `req.params` field.check [here](https://json-schema.org/)
