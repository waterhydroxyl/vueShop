<template>
  <div>
    <form action="">
      <div class="username">
        <slot name="name"></slot>
      </div>
      <div class="password">
        <slot name="password"></slot>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
form {
  margin-top: 20px;
}
.username {
  font-size: 16px;
  text-align: center;
}
.password {
  font-size: 16px;
  text-align: center;
}
input {
  height: 50px;
  // margin-top: 1px;
  margin-bottom: 8px;
  padding-left: 10px;
  width: 75%;
  // border: none;
}
</style>
