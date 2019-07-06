<template>
  <div>
    <div class="input">
      <div>
        <input v-model="content" 
               type="text" 
               confirm-type="search" 
               :selection-start="0" 
               :focus="true"
               v-on:input="bip"
               @confirm="search($event)"
               :style="{'width':len}"
               >
      </div>
      <div v-if="content">
        <button @click="search">搜&nbsp;索</button>
      </div>
      <div id="cantfind" v-if="vif">小叮咚找不到。。。</div>
      <Card :key="book.id" v-for="book in books" :book="book"></Card>
      
    </div>
    
  </div>
</template>


<script>
import {post} from "@/util"
import Card from '@/components/Card' 
export default {
  components: {
    Card
  },
  onLoad(){

  },
  data() {
    return {
      len:'690rpx',
      content: "",
      books: [],
      vif: 0,
      empty: [{
        id: 0,
        image: '/static/img/empty.png'
      }]
    }
    
  },
  mounted () {
    
  },
  
  methods: {
    bip(){
      if(this.content){
        this.len = '550rpx'
      }else{
        this.len = '690rpx'
      }
    },
    async search() {
      // console.log(this.content)
      this.books = []
      const res = await post("/weapp/search", {
        title: this.content
      });
      if(res.result.length==0){
        this.vif = 1
        this.books = this.empty
      }
      else{
        this.vif = 0
        this.books = res.result
      }
    }
  }
};
</script>

<style>
.input input {
    padding:5px;
    margin: 10px 0 0 10px;
    height: 25px;;
    background:#F5F5F5;
    border-radius:5rpx;
    font-size: 20px;
}
.input button {
  position: absolute;
  left: 600rpx;
  top: 10px;
  font-size: 28rpx;
  height: 67rpx;
  width: 110rpx;
  text-align: center;
  color: white;
  background-color:#00CED1;
}
#cantfind{
  position: relative;
  top: 100rpx;
  left: 100rpx;
  color: #A9A9A9;
  font-size: 40rpx;
}


</style>
