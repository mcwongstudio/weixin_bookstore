const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {openid, bookid} = ctx.request.body

    const res = await mysql('start')
        .select('*')
        .where({bookid: bookid})
        .andWhere({openid:openid})

    ctx.state.data = {res}
}