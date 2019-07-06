const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    
    const {limit} = ctx.request.body
    const books = await mysql('books')
        .select('*')
        .limit(limit)


    ctx.state.data = {
        list: books
    }
}
