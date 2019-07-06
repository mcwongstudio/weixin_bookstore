const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {openid, bookid} = ctx.request.body
    const res = await mysql('start')
        .where({bookid: bookid})
        .andWhere({openid:openid})
    console.log(res.length)
    try{
        if(res.length){
            await mysql('start')
                .where({
                    openid:openid
                })
                .andWhere({
                    bookid: bookid
                })
                .del()
        }else{
            await mysql('start')
                .insert({
                    openid:openid,
                    bookid:bookid
                })
        }
    }
    catch(e){
            ctx.state = {
                code: -1,
                data: {
                    title,
                    msg: 'Error:' + e.sqlMessage
                }
            }
        }
}