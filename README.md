# beanify-url

## install

```
npm i beanify-url
```

## usage

```
const Beanify=require("beanify")
const beanifyPlugin=require("beanify-plugin")

const b=new Beanify({})

b
    .register(require("beanify-url"))
    .register(beanifyPlugin((beanify,opts,done)=>{
        beanify.route({
            url:'math.:seg'
        },(req,res)=>{
            console.log(req.params.seg=='add')
            res(null,2)
        })
        done()
    })).ready((err)=>{
        b.inject({
            url:'math.add',
            body:{
                a:1,
                b:2
            }
        },(err,res)=>{
            b.close()
        })
    })
    
```