const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {openid} = ctx.request.body
    const bookid = await mysql('start')
        .select('bookid')
        .where({openid: openid})
    var l = []
    for(let i in bookid){
        let book = await mysql('books').select('*').where({id: bookid[i].bookid})
        if(book.length){
            l.push(book[0])
        }
       
    }

    ctx.state.data = {
        booklist: l
    }
}
