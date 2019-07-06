const { mysql } = require('../qcloud')

module.exports = async (ctx) => {

    try{
        const {sell_openid, my_openid} = ctx.request.body
    
        const res1 = await mysql('cSessionInfo')
            .select('user_info')
            .where({open_id: my_openid})
        const json1 = JSON.parse(res1[0].user_info)

        const res2 = await mysql('cSessionInfo')
            .select('user_info')
            .where({open_id: sell_openid})
        const json2 = JSON.parse(res2[0].user_info)

        ctx.state.data = {
            myUrl: json1.avatarUrl,
            sellUrl: json2.avatarUrl,
            sellnickName: json2.nickName
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