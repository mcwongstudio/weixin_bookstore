<template>
    <a :href="detailUrl">
    <div>
        <div class="bookCard">
            <img :src="book.image" alt="" mode="aspectFit">
            <div class="bookinfo">
                <p class="rate">{{book.rate}}</p><Rate :value="book.rate"></Rate>
                <p class="title">{{book.title}}</p>
                <p class="author">{{book.author}}</p>
            </div>
        </div>
    </div>
    </a>
</template>



<script>
import Rate from './Rate'
export default {
  props: ['book'],
  computed:{
    detailUrl(){
      return '/pages/mydetail/main?id='+this.book.id
    }
  },
  components: {
    Rate
  }
}
</script>


<style>
.bookCard {
  margin: 50rpx auto auto 25rpx;
}
.bookCard img {
  width: 250rpx;
  /* height: auto; */
}

.bookinfo {
  width: 300rpx;
  float: right;
  margin: 50rpx 50rpx auto auto;
}

.bookinfo .rate {
  /* float: right; */
  font-size: 38rpx;
  color: cornflowerblue;
  font-family: "Courier New", Courier, monospace;
}
.bookinfo .title {
  font-size: 28rpx;
}
.bookinfo .author {
  margin-top: 10rpx;
  font-size: 25rpx;
}
</style>
