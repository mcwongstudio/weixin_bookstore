<template>
  <div id="page">
    <Swiper :images="booksSwiper"></Swiper>
    
    <div class="search" @click="search">
      <span>书名、类型、作者</span>
      <img src="/static/img/search.png" alt="">
    </div>
    
    <Card :key="book.id" v-for="book in books" :book="book"></Card>
    <div id="finish" v-if="finish">已全部加载</div>
    <div id="toTop" v-if="top" @click="toTop">返回顶部</div>
  </div>
    
</template>

<script>
import { get,post } from '@/util'
import Card from '@/components/Card'
import Swiper from '@/components/Swiper'
export default {
  components: {
    Card,
    Swiper
  },

  data () {
    return {
      swiper_num: 4,   //轮播图数量
      card_num: 5,     //每次展示
      index: 5,
      book_len: 0,
      booksSwiper: [],
      books: [],
      limit: 0,
      finish: false,
      top: false
    }
  },

  methods: {
    search(){
      wx.navigateTo({
        url: '/pages/search/main'
      })
    },
    async getList (l) {
  
      const books = await post('/wong/booklist',{
        limit: l
      })
      this.books = books.list
      },

      async getbooksSwiper(l) {
        const books = await post('/wong/booklist',{
        limit: l
      })
      this.booksSwiper = books.list
      },

      update(){
        this.getbooksSwiper(this.swiper_num)
        this.getList(this.card_num)
      },
      display(){
        if(this.book_len==this.books.length){
        this.finish = true
        }
      },
      toTop(){
        wx.pageScrollTo({
          scrollTop: 0
        })
      }
    },
  

  onLoad () {
    this.update()
  },

  onPullDownRefresh () {
    this.update()
  },
  //触底加载
  onReachBottom () {
    this.book_len = this.books.length
    this.index += this.card_num
    this.getList(this.index)
    setTimeout(()=>{
      this.display()},1000)
  },
  onPageScroll:function(e){ // 获取滚动条当前位置
    if(e.scrollTop>100){
      this.top = true
    }
    if(e.scrollTop<80){
      this.top = false
    }
  },
}
</script>

<style>
#page{
  background-color: #f5f5f5;
  width: 750rpx;
  
}
.search{
  position: relative;
  top: 10px;
  left: 30rpx;
  margin-top:10rpx; 
  width: 680rpx;
  border-radius:5rpx;
  background-color:white;
  padding: 10rpx;

  color: #708090;
  font-size: 30rpx;
}
.search img{
  float: left;
  /* margin-top: 8rpx;  */
  margin-right: 20rpx;
  height: 40rpx;
  width: 40rpx;
}

#finish{
  color: #A9A9A9;
  text-align: center;
  font-size: 25rpx;
  padding-bottom: 20rpx;
}

#toTop{
  position: fixed;
  top: 700rpx;
  left: 675rpx;
  width: 80rpx;
  opacity:0.2;
  background-color:black;
  color: white;
  padding-left:5rpx; 
  font-size: 32rpx;
}


</style>
