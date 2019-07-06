import Vue from 'vue'
import Collection from './Collection'

const collection = new Vue(Collection)

collection.$mount()

export default {
    config: {
      "navigationBarBackgroundColor": "#00CED1",
      "navigationBarTextStyle": "light",
      "navigationBarTitleText": "收藏",
      "backgroundColor": "#B0C4DE",
      "backgroundTextStyle": "dark",
      enablePullDownRefresh: true
    }
  }