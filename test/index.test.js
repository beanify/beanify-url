const Beanify=require("beanify")
const beanifyPlugin=require("beanify-plugin")
const tap=require("tap")

tap.test("beanify-url test",(t)=>{

    t.plan(4)

    const b=new Beanify({
        nats:{
            url:'nats://localhost:4222',
            user:'testuser',
            pass:'testpass'
        }
    })
    
    
    b.register(require("../index"))
    .register(beanifyPlugin((beanify,opts,done)=>{
        beanify.route({
            url:'math.:seg'
        },(req,res)=>{
            t.equal(req.params.seg,'add','check params')
            res(null,2)
        })
        done()
    })).ready((err)=>{
        t.error(err)

        b.inject({
            url:'math.add',
            body:{
                a:1,
                b:2
            }
        },(err,res)=>{
            t.error(err)
            t.equal(res,2,'check response')
            b.close()
        })

        
    })

})


