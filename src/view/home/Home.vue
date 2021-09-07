<template>
  <div class="home">
    <nav-bar>
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <h2 v-show="backFont">不能再拉了哦！</h2>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="isFixed"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scrollCom"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="scrollContent"
      @pullingUp="loadMore"
    >
      <my-swiper :imgs="imgs" @swiperImageLoad="swiperImageLoad" />
      <recommend :recommends="recommends" ref="test1"></recommend>
      <feature-view ref="test2"></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backTopClick"></back-top>
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGood } from 'api/home'
import NavBar from 'components/comm/navbar/NavBar'
import TabControl from 'components/comm/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/comm/scroll/Scroll'

import Recommend from './childCom/recommend/Recommend'
import FeatureView from './childCom/featureview/FeatureView'
import BackTop from './childCom/backtop/BackTop'
import mySwiper from './childCom/mySwiper/mySwiper'

import { debounce } from '../../utils'
export default {
  components: {
    BackTop,
    Recommend,
    FeatureView,
    NavBar,
    mySwiper,
    TabControl,
    GoodsList,
    Scroll
  },
  data() {
    return {
      isShowBackTop: false,
      isTabFixed: false,
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      imgs: [],
      recommends: [],
      currentType: 'pop',
      tabOffsetTop: 0,
      saveY: 0,
      backFont: false
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGood('pop')
    this.getHomeGood('new')
    this.getHomeGood('sell')
  },
  mounted() {
    const delayRefresh = debounce(this.$refs.scrollCom.refresh1, 100)
    this.$bus.$on('itemImageLoad', () => {
      delayRefresh()
    })
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.imgs = res.data.banner.list
        this.recommends = res.data.recommend.list
        // console.log(this.recommends, this.imgs);
      })
    },
    getHomeGood(type) {
      const page = this.goods[type].page + 1
      getHomeGood(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    },

    //事件监听
    tabClick(i) {
      switch (i) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentindex = i
      this.$refs.tabControl2.currentindex = i
    },
    backTopClick() {
      // console.log("dianji");
      this.$refs.scrollCom.scrollTo(0, 0)
    },
    scrollContent(position) {
      // 显示/隐藏返回顶部
      this.isShowBackTop = -position.y > 500
      // 当滚动距离等于tabControl2.$el.offsetTop时固定隐藏的tabControl2
      this.isTabFixed = -position.y > this.tabOffsetTop
      // this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      this.backFont = position.y > 40
    },
    loadMore() {
      console.log('加载更多')
      this.getHomeGood(this.currentType)
    },
    swiperImageLoad() {
      // console.log("jiazai");
      // 轮播图的图片加载就执行，计算出tabControl2.$el.offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      console.log(this.tabOffsetTop)
    }
  },
  destroyed() {
    this.$bus.$off('itemImageLoad')
  },
  activated() {
    // console.log("activated");
    this.$refs.scrollCom.scroll.refresh()
    this.$refs.scrollCom.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    // console.log("deactivated");
    this.saveY = this.$refs.scrollCom.scroll.y
    // console.log(this.saveY);
  }
}
</script>

<style scoped>
.isFixed {
  position: absolute;
  left: 0;
  right: 0;
  top: 39px;
  z-index: 9;
}
.home {
  height: 100vh;
  position: relative;
}
h2 {
  position: absolute;
  top: 44px;
  left: 50%;
  transform: translate(-50%, 0);
}
.tabControl {
  position: relative;
  z-index: 9;
}
.nav-bar {
  background-color: deeppink;
  color: white;
}
.content {
  /* height: calc(100% - 89px); */
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 49px;
}
</style>
