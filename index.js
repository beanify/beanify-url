const beanifyPlugin = require("beanify-plugin")


module.exports = beanifyPlugin((beanify, opts, done) => {
    beanify.addHook('onRoute', ({ route, log },next) => {

        const urlSegs=route.$options.url.split('.');
        const paramsTokens=[]

        urlSegs.forEach((seg,idx,arr)=>{
            if(seg.startsWith(":")){
                arr[idx]='*'
                paramsTokens.push({
                    idx,
                    name:seg.substr(1)
                })
            }
        })

        route.$options.url=urlSegs.join('.')
        route.$paramsToken=paramsTokens

        next()
    })

    beanify.addHook('onHandler',({context,req,log},next)=>{
        const {$paramsToken}=context;
        const {fromUrl}=req
    
        const urlSegs=fromUrl.split('.')
        req.params={}

        $paramsToken.forEach((tk)=>{
            req.params[tk.name]=urlSegs[tk.idx]
        })

        next()
    })

    done()
}, {
    name: 'beanify-url'
})