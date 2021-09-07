<template>
  <div>
    <nav-bar>
      <template v-slot:center>
        <div>用户注册</div>
      </template>
    </nav-bar>
    <register-form>
      <template v-slot:name>
        <div>
          <span>用户名：</span>
          <input
            name="username"
            type="text"
            v-model="registerForm.name"
            placeholder="请输入用户名"
            autocomplete
          />
        </div>
      </template>
      <template v-slot:password>
        <div class="password">
          <span v-html="'&nbsp;&nbsp;&nbsp;密码：'"></span>
          <input
            type="password"
            v-model="registerForm.password"
            placeholder="请设置密码"
            autocomplete
          />
        </div>
      </template>
    </register-form>

    <div class="register_button">
      <button type="button" @click="register">注册并登录</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import NavBar from '../../components/comm/navbar/NavBar.vue'
import RegisterForm from '../../components/content/form/form.vue'
import { userRegister } from 'api/login.js'
export default {
  components: { NavBar, RegisterForm },
  data() {
    return {
      registerForm: {
        name: '',
        password: ''
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions({ userLogin: 'login' }),
    register() {
      userRegister(this.registerForm)
        .then(() => {
          this.$toast.show('注册成功，跳转到个人资料页...')
          this.userLogin(this.registerForm).then((res) => {
            console.log(res)
            console.log(this.$route.params.redirect)
            if (res === 200) {
              this.$router.push('profile')
            }
          })
        })
        .catch((err) => {
          this.$toast.show('注册失败，用户名已经被注册过了' + err)
        })
    }
  }
}
</script>

<style scoped lang="less">
button {
  color: white;
  border: none;
  border-radius: 5px;
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  width: 98%;
  margin: 10px 2px;
  background-color: red;
}
</style>
