<template>
    <div>
        <Card :key="book.id" v-for="book in books" :book="book"></Card>
    </div>
</template>

<script>
import {post} from '@/util'
import config from '@/config'
import Card from '@/components/Card'
export default {
    components: {
    Card
  },
    data(){
        return{
            books: []
        }
    },
    onLoad(){
        this.getCollection()
    },

    methods:{
        async getCollection(){
            const collection = await post('/wong/getcollection',{
                openid: config.openid
            })
            this.books = collection.booklist
            
            // console.log(collection.booklist)
        }
    },

    onPullDownRefresh () {
        this.getCollection()
    }

}
</script>

<style>

</style>
