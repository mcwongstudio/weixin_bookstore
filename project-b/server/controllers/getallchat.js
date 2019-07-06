const { mysql } = require('../qcloud')

module.exports = async (ctx) => {

    try{
    const openid = ctx.request.body.openid
    const allchatinfo = await mysql('chat').select('*').where({openid1: openid})
    var list = []
    for (let i in allchatinfo){
      
        var openid2info = await mysql('cSessionInfo')
            .select('user_info')
            .where({open_id: allchatinfo[i].openid2})

        
        list.push(openid2info)
        
    } 

    // 根据index排序
    // for (let i in list){
    //     for (let j=i;j<list.length;j++){
    //         if(list[i].index < list[j].index){
    //             let k = list[i]
    //             list[i] = list[j]
    //             list[j] = k
          
    //         }
    //     }
    // }
    ctx.state.data = {
        allchat: allchatinfo,
        userinfo: list,
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