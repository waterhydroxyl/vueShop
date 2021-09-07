<template>
  <div id="login">
    <nav-bar>
      <template v-slot:center>
        <div class="user_login_navbar">用户登录</div>
      </template>
    </nav-bar>

    <login-form>
      <template v-slot:name>
        <div>
          <span>用户名：</span>
          <input
            name="username"
            type="text"
            v-model="loginForm.name"
            placeholder="手机号/邮箱/会员名"
            autocomplete
          />
        </div>
      </template>
      <template v-slot:password>
        <div class="password">
          <span v-html="'&nbsp;&nbsp;&nbsp;密码：'"></span>
          <input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入登录密码"
            autocomplete
          />
        </div>
      </template>
    </login-form>

    <div>
      <!-- <span class="remember"
        ><input
          type="checkbox"
          class="rememberme"
          name="rememberme"
          id="rememberme"
        /><label class="remember_password" for="rememberme"
          >记住密码</label
        ></span
      > -->
    </div>
    <div class="login_button">
      <button type="button" @click="login">登录</button>
    </div>
    <div class="other_info">
      <span class="login_message">短信验证码登录</span>
      <span class="register" @click="toRegister">免费注册</span>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/comm/navbar/NavBar'
// import Form  from "components/content/form/Form"
import { mapActions } from 'vuex'
import LoginForm from '../../components/content/form/form.vue'
export default {
  data() {
    return {
      loginForm: {
        name: 'admin',
        password: '123456'
      }
    }
  },
  components: {
    NavBar,
    LoginForm
  },
  activated() {
    console.log(this.$route)
  },
  methods: {
    ...mapActions({ userLogin: 'login' }),
    login() {
      // console.log(this.$route);
      this.userLogin(this.loginForm)
        .then((res) => {
          console.log(res)
          console.log(this.$route.params.redirect)
          if (res === 200) {
            this.$router.push('profile')
          }
        })
        .catch((err) => {
          console.log('## ' + err)
          this.$toast.show('登录出错，请检查用户名和密码是否输入正确！' + err)
        })
    },
    toRegister() {
      this.$router.push('register')
      // alert("用户注册");
    }
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: deeppink;
  color: white;
}
/* .username {
  font-size: 16px;
  text-align: center;
}
.password {
  font-size: 16px;
  text-align: center;
}
input {
  height: 50px;
  margin-top: 1px;
  padding-left: 10px;
  width: 100%;
  border: none;
} */
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
.other_info {
  color: red;
  font-size: 16px;
}
.login_message {
  margin-left: 5px;
  float: left;
}
/* .remember {
  float: left;
  margin-top: 3px;
  margin-left: 5px;
}
.rememberme {
  position: relative;
  top: 2.5px;
  height: 14px;
  width: 14px;
  text-align: center;
}
.remember_password {
  font-size: 14px;
  line-height: 18px;
  text-align: center;
} */
.register {
  margin-right: 5px;
  float: right;
}
</style>
