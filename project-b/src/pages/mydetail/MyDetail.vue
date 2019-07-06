<template>
    <div>
        
        <div>
            <div id="cpbtn" class="button" @click="change">修改价格</div>
            <div id="dbtn" class="button" @click="dowm">下架</div>
        </div>

        <div class="bookinfo">
          <img :src="imgUrl" alt="">
          <div class="title">{{title}}</div>
          <div class="author">作者：{{author}}</div>
          <div class="summary">简介：{{summary}}</div>
          <div class="tags">关键词：{{tags}}</div>
          <div id="price">
            <div class="old_price">原价：{{old_price}}</div>
            <div class="new_price">现价：{{new_price}}</div>
          </div>
          
          <div id="null"></div>
        </div>
        
    </div>
    
</template>

<script>
import {post} from "@/util"
import config from '@/config'
import {showModal,showSuccess} from '@/util'
export default {
  data() {
    return {
      sell_openid: '',
      bookid: '',
      author: '',
      title: '',
      tags: '',
      imgUrl: '',
      summary: '',
      old_price: '',
      new_price: '',
    }
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id
    this.getBookById()
  },
  methods:{
    async dowm(){
    if(config.openid){
      wx.showModal({
      title: '提示',
      content: '确定下架此书',
      success: async(res) => {
        if (res.confirm) {
          const result = await post('/wong/deletebook',{
            bookid: this.bookid
      })
          showSuccess('下架成功')
          
          setTimeout(()=>{
             this.navigateBack()},500)

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    }else{
      showModal('请先登录', '')
    }
    },
    
    change(){
        console.log('修改价格')
        wx.navigateTo({
          url:'/pages/changeprice/main?id='+this.bookid, 
})
    },
    async getBookById(){
      const bookinfo = await post('/wong/getbookbyid',{
        id:this.bookid
      })
      console.log(bookinfo.result[0])
      this.sell_openid = bookinfo.result[0].openid
      this.author = bookinfo.result[0].author
      this.title = bookinfo.result[0].title
      this.tags = bookinfo.result[0].tags
      this.imgUrl = bookinfo.result[0].image
      this.summary = bookinfo.result[0].summary
      this.old_price = bookinfo.result[0].old_price
      this.new_price = bookinfo.result[0].new_price
    },

    navigateBack(){
      //返回上一页
      wx.navigateBack({//返回
              delta:1
            })
    }
  }
};
</script>

<style>

.bookinfo{
  margin-left: 100rpx; 
  width:650rpx;
}
.bookinfo img{
  width: 350rpx;
  margin-left: 150rpx;
}
.bookinfo .title{
  margin-top: 50rpx;
  font-size: 35rpx;
  color: #B22222;
}
.bookinfo .author{
  font-size: 20rpx;
  margin-top:10rpx;
  margin-bottom: 10rpx; 
}
.bookinfo .summary{
  font-size: 25rpx;
}
.bookinfo .tags{
  font-size: 25rpx;
}
.bookinfo .old_price{
  margin-top: 30rpx;
  font-size: 25rpx;
  color: #87CEEB;
}
.bookinfo .new_price{
  font-size: 28rpx;
  color: #00BFFF;
}
#null{
  height: 150rpx;
}

.button{
  position: fixed;
  bottom: 0rpx;
  background-color: #ffffff;
  color: #ffffff;
  text-align: center;
  font-size: 30rpx;
  z-index: 9999;
  width: 250rpx;
  height: 70rpx;
  padding-top: 25rpx;
}
#cpbtn{
  background-color: #00BFFF;
  margin-left:250rpx 

}
#dbtn{
  background-color: red;
  margin-left:500rpx 
}




</style>

