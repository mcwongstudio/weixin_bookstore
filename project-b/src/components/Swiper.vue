<template>
    <div class="swiper">
        <swiper
            :indicator-dots='true'
            indicator-color='#F8F8FF'	
            indicator-active-color='#87CEFA'
            :autoplay='true'
            :interval='3000'
            :duration='500'
            :circular='true'
            previous-margin="200rpx"
            next-margin="200rpx"
        >
            <div class="image-div" :key="image.id" v-for="image in images">
                <swiper-item>
                    <img mode="aspectFit" :src="image.image" alt="">
                </swiper-item>
                
            </div>

        </swiper>
    </div>
</template>


<script>
export default {
  props: ['images']
}
</script>


<style>
.image-div {
  width: 100%;
}

img {
  width: 100%;
}
swiper {
  height: 400rpx;
}
</style>
