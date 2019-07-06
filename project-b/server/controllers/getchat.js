const { mysql } = require('../qcloud')

module.exports = async (ctx) => {

    try{
        const {openid1, openid2} = ctx.request.body
        const chatinfo = await mysql('chat')
        .select('*')
        .where({openid1: openid1})
        .andWhere({openid2: openid2})

        //得到最大的索引index
    const indexs = await mysql('chat')
        .select('index')
        .where({openid1: openid1})
    var index = 0
    if(indexs.length){
        for (let i in indexs){
            if(indexs[i].index>index){
                index=indexs[i].index
            }
        }
    }
        ctx.state.data = {
            chatinfo,
            index
        }
    }
    catch(e){
        ctx.state = {
            code: -1,
            data: {
                
                msg: 'Error:' + e.sqlMessage
            }
        }
    }
 
}