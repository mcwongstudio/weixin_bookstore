<template>
    <div>
        
        <Mycard :key="book.id" v-for="book in bookinfo" :book="book"></Mycard>
    </div>
</template>

<script>
import {post} from '@/util'
import Mycard from '@/components/Mycard'
export default {
   components: {
    Mycard
  },
    data(){
        return{
            openid: '',
            bookinfo:[]
        }
    },
    mounted(){
        this.openid = this.$root.$mp.query.openid
        this.getmybooks()
    },
    onShow(){
        this.getmybooks()
    },
    onPullDownRefresh () {
        this.getmybooks()
  },

    methods:{
        async getmybooks(){
            console.log(this.openid)
            const res = await post('/wong/getmybook',{
                openid: this.openid
            })
            this.bookinfo = res.mybookinfo   
        }
    }
}
</script>


<style>

</style>
