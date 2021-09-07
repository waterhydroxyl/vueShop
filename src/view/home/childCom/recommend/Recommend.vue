<template>
  <div class="recommends">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="recommends-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt class="recommends-img" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    recommends: {
      type: Array,
      default: []
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.recommends {
  margin-top: 6px;
  display: flex;
  padding-bottom: 4px;
  border-bottom: 8px solid #ededed;

  .recommends-item {
    flex: 1;
    text-align: center;
    font-size: 12px;
    img {
      width: 70%;
      margin-bottom: 5px;
    }
  }
}
</style>
