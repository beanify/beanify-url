const beanifyPlugin = require("beanify-plugin")


module.exports = beanifyPlugin((beanify, opts, done) => {
    beanify.addHook('onRoute', (route) => {
        const urlSegs = route.url.split('.');
        const tokens = []

        urlSegs.forEach((seg, idx, arr) => {
            if (seg.startsWith(":")) {
                arr[idx] = '*'
                tokens.push({
                    idx,
                    name: seg.substr(1)
                })
            }
        })

        route.url = urlSegs.join('.')
        route.$paramsToken = tokens
    })

    beanify.addHook('onHandler', (route) => {
        const {$paramsToken,$req}=route;
        const {fromUrl}=$req

        const urlSegs=fromUrl.split('.')
        $req.params={}

        $paramsToken.forEach((tk)=>{
            $req.params[tk.name]=urlSegs[tk.idx]
        })
    })

    done()
}, {
    name: 'beanify-url',
    beanify:'^2.0.2'
})