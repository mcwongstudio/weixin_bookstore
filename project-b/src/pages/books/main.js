import Vue from 'vue'
import Book from './Book'

const book = new Vue(Book)

book.$mount()
export default {
    config: {
      "navigationBarBackgroundColor": "#00CED1",
        "navigationBarTextStyle": "light",
        
        "backgroundColor": "#B0C4DE",
        "backgroundTextStyle": "dark",
        enablePullDownRefresh: true
    }
  }
  