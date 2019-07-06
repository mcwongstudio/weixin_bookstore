// 新增图书
const https = require('https')
const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    console.log(ctx.request.body)
    const { isbn, openid } = ctx.request.body
    if (isbn && openid) {
        const findRes = await mysql('books').select().where('isbn', isbn)
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }

        let url = 'https://api.douban.com/v2/book/isbn/' + isbn
        const bookinfo = await getJSON(url)
        var rate = bookinfo.rating.average
        const title = bookinfo.title
        const image = bookinfo.image
        const author = bookinfo.author.join(',')
        const summary = bookinfo.summary
        const old_price = bookinfo.price
        const new_price = 0
        const tags = bookinfo.tags.map(v => {
            return `${v.name}`
        }).join(' ')
        try {
            if(rate==0 || rate==''){
                rate = 10
            }
            await mysql('books').insert({
                isbn, openid, title, image, rate, tags, author, summary, old_price ,new_price
            })
            ctx.state.data = {
                code: 0,
                title,
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    title,
                    msg: '新增失败:' + e.sqlMessage
                }
            }
        }

        // console.log(rate)
        // console.log(title)
        // console.log(author)
        // console.log(tags)
        // console.log(image)
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}
