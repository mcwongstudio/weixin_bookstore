const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const id = ctx.request.body.id

    const bookinfo = await mysql('books').select('*').where({'id': id})
    
    ctx.state.data = {
        result: bookinfo
    }
} 