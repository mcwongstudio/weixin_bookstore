const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const openid =  ctx.request.body.openid

    const res = await mysql('books')
        .select('*')
        .where({openid:openid})
        
        ctx.state.data = {
            mybookinfo: res
        }
}