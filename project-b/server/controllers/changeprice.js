const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {bookid,price} = ctx.request.body
    
    try {
        await mysql('books')
                .where({id: bookid})
                .update({new_price: parseInt(price)})
        ctx.state.data = {
            code: 0,
            msg: 'success'
            }        
    }
    catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '非法输入'
            }
        }
    }
    
    

    // ctx.state.data = {
    //     list: books
    // }
}