<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  components: {},
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    })
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position)
    })
    this.scroll.on('pullingUp', () => {
      console.log('上拉上拉上拉上拉上拉上拉')
      this.$toast.show('加载中，请稍后重试...')
      this.scroll.finishPullUp()
      this.$emit('pullingUp')
    })
  },
  methods: {
    refresh1() {
      // console.log(this.scroll);
      console.log('refresh')
      this.scroll.refresh()
    },
    scrollTo(x, y, time = 300) {
      // console.log('scrollTo');
      this.scroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped></style>
