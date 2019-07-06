<template>
    <div>
        <!-- <div>id:{{bookid}}</div> -->
        <div id='chat' class="button" @click="buy">联系卖家</div>
        <div v-if="openid">
          <img id="start" :src="startUrl" alt="" @click="setStart">
        </div>
        <div class="bookinfo">
          <img :src="imgUrl" alt="" @click="previewImage">
          <div class="title">{{title}}</div>
          <div class="author">作者：{{author}}</div>
          <div class="summary">简介：{{summary}}</div>
          <div class="tags">关键词：{{tags}}</div>
          <div class="old_price">原价：{{old_price}}</div>
          <div class="new_price">现价：{{new_price}}</div>
          <div id="null"></div>
        </div>
    </div>
    
</template>

<script>
import {post} from "@/util"
import config from '@/config'
import {showModal} from '@/util'
export default {
  data() {
    return {
      openid: '',
      sell_openid: '',
      bookid: '',
      author: '',
      title: '',
      tags: '',
      imgUrl: '',
      summary: '',
      old_price: '',
      new_price: '',
      startUrl: '',
      start1: '/static/img/start1.png',
      start2: '/static/img/start2.png'
    };
  },
  onLoad(){
     setTimeout(()=>{
      this.getStart()},200)
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id
    this.getBookById()
  },
  methods:{

    async getStart(){
      this.openid = config.openid
      const start = await post('/wong/getstart',{
        openid: config.openid,
        bookid: this.bookid,
      })
      if(start.res.length){
        this.startUrl = this.start2
      }
      else{
        this.startUrl = this.start1
      }
    },

    async setStart(){
      const start = await post('/wong/setstart',{
        openid: config.openid,
        bookid: this.bookid,
      })
      if(this.startUrl == this.start1){
        this.startUrl = this.start2
      }
      else{
        this.startUrl = this.start1
      }
    },

    buy(){
    if(config.openid){
       wx.navigateTo({
        url:'/pages/chat/main?openid='+this.sell_openid, 
})
    }else{
      showModal('请先登录', '')
    }
      
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

    previewImage(){
        wx.previewImage({
          urls: [this.imgUrl]
        })
      }

  }
};
</script>

<style>
#start{
  margin: 20px 0 0 300px;
  width: 30px;
  height: 30px;
}
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
  width: 750rpx;
  height: 70rpx;
  padding-top: 25rpx;
}
#chat{
  background-color: red;
  /* margin-left:500rpx  */
}

</style>
