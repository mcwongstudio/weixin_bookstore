const { mysql } = require('../qcloud')

module.exports = async (ctx)=>{
    const find= ctx.request.body.title
    var reg = '%'+find+'%'
    if(find.length){
        const books = await mysql('books').select('*')
            .where('title','like',reg)
            .orWhere('tags','like',reg)

        ctx.state.data = {
            result: books
        }
    }
}

