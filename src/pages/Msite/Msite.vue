<template>
  <div class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" to="/search"  slot="search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>

      <router-link class="header_login" to="/login" slot="login">
        <span class="header_login_text">登录|注册</span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container" v-if="categorys.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index2) in categorys" :key="index2">
              <div class="food_container">
                <img :src="imgBaseUrl+c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper'  // 引入swiper的js库
  import 'swiper/dist/css/swiper.min.css' // 引入swiper的样式文件

  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'

  export default {

    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },

    mounted () {

      //异步获取食品分类列表
      this.$store.dispatch('getCategorys')
      // 异步获取shops
      this.$store.dispatch('getShops')

      // 创建swiper对象, 实现轮播效果
     /* new Swiper('.swiper-container', { // 配置对象
        loop: true, // 是否循环轮播,
        pagination: { // 指定分页器容器
          el: '.swiper-pagination',
        },
      })*/
    },

    computed: {
      ...mapState(['address', 'categorys']),

      categorysArr () {
        const arr = [] // 二维数组
        const {categorys} = this // 所有分类的一维数组
        let smallArr = [] // 内部的小数组
        const max = 8 //小数组的最大长度是8

        // 遍历所有分类
        categorys.forEach(c => {

          // 如果smallArr是一个空数组, 将小数组保存到二维数组
          if(smallArr.length===0) {
            arr.push(smallArr)
          }

          // 将分类保存到小数组中
          smallArr.push(c)

          // 一旦小数组满了, 准备一个新的
          if(smallArr.length===max) {
            smallArr = []
          }

        })

        return arr  // [[{分类对象}, {分类对象}], [{分类对象}]]
      }
    },

    watch: {
      // 更新状态之后, 会异步更新界面
      categorys (value) { // categorys发生了变化(从后台获取到了数据)
        /*setTimeout(() => {
          new Swiper('.swiper-container', { // 配置对象
            loop: true, // 是否循环轮播,
            pagination: { // 指定分页器容器
              el: '.swiper-pagination',
            },
          })
        }, 200)*/
        this.$nextTick(() => { // 回调函数在DOM更新之后立即调用
          new Swiper('.swiper-container', { // 配置对象
            loop: true, // 是否循环轮播,
            pagination: { // 指定分页器容器
              el: '.swiper-pagination',
            },
          })
        })

      }
    },

    components: {
      HeaderTop,
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
