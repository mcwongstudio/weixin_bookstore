const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    try{
        const {openid1, openid2, chatstr, chatstr2} = ctx.request.body
    const todo1 = await mysql('chat')
        .select('*')
        .where({openid1: openid1})
        .andWhere({openid2: openid2})

    if(openid1==openid2){
        
      
        if(todo1.length){
            await mysql('chat')
                .where({openid1: openid1})
                .andWhere({openid2: openid2})
                .update({
                    chat: chatstr
                })
        }else{
            await mysql('chat')
                .insert({
                    index: 0,
                    openid1: openid1,
                    openid2: openid2,
                    chat: chatstr
                })
        }
    }

    else{
        //我方
        if(todo1.length){
        await mysql('chat')
            .where({openid1: openid1})
            .andWhere({openid2: openid2})
            .update({
                chat: chatstr
            })
        }else{
        await mysql('chat')
            .insert({
                index: 0,
                openid1: openid1,
                openid2: openid2,
                chat: chatstr
            })
        }


        //对方
        const todo2 = await mysql('chat')
        .select('*')
        .where({openid1: openid2})
        .andWhere({openid2: openid1})
        if((todo2.length==1&&openid1!=openid2)||todo2.length==2){
        //已存在字段
        await mysql('chat')
            .where({openid1: openid2})
            .andWhere({openid2: openid1})
            .update({
                chat: chatstr2  
            })
        }else{
        //创建字段
        await mysql('chat')
            .insert({
                index: 0,
                openid1: openid2,
                openid2: openid1,
                chat: chatstr2
            })
        }
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

