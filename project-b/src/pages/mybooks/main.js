import Vue from 'vue'
import Mybooks from './Mybooks'

const mybooks = new Vue(Mybooks)

mybooks.$mount()

export default {
    config: {
        "navigationBarBackgroundColor": "#00CED1",
        "navigationBarTextStyle": "light",
        "navigationBarTitleText": "我的图书",
        "backgroundColor": "#B0C4DE",
        "backgroundTextStyle": "dark",
        
        enablePullDownRefresh: true
      }
}
