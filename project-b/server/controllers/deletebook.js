const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const bookid = ctx.request.body.bookid
    
    const res = await mysql('books')
        .where({id: bookid})
        .del()

    // ctx.state.data = {
    //     list: books
    // }
}