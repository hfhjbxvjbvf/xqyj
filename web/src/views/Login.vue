<template>
  <div class="container">
    <div class="login-box">
      <form @submit.prevent="submitForm" v-if="islogin === 2">
        <h2>登录</h2>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-envelope"></i></span>
          <input
            type="email"
            v-model="UserInfo.email"
            required
            placeholder="Email"
          />
        </div>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-lock"></i></span>
          <input
            type="password"
            v-model="UserInfo.password"
            placeholder="Password"
            required
          />
        </div>
        <div class="input-box captcha-box"  style="display: flex; align-items: center;">
          <img :src="captchaUrl" alt="Captcha" @click="refreshCaptcha" style="margin-right: 10px;" />
          <input type="text" v-model="captcha" placeholder="验证码" required style="width: 100px;" />
        </div>
        <div class="remember-forget">
          <label>
            <input type="checkbox" v-model="rememberMe" />
            记住我
          </label>
          <a @click="() => (islogin = 0)">忘记密码</a>
        </div>
        <button type="submit" @click="login">登录</button>
        <div class="register-link" @click="() => (islogin = 1)">
          <a>注册</a>
        </div>
      </form>

      <form v-else-if="islogin === 1">
        <h2>注册</h2>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-user"></i></span>
          <input
            type="text"
            v-model="UserInfo.name"
            required
            placeholder="用户名"
          />
        </div>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-envelope"></i></span>
          <input
            type="email"
            v-model="UserInfo.email"
            required
            placeholder="邮箱"
          />
        </div>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-phone"></i></span>
          <input
            type="text"
            v-model="UserInfo.phone"
            placeholder="手机号"
            required
          />
        </div>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-lock"></i></span>
          <input
            type="password"
            v-model="UserInfo.password"
            placeholder="密码"
            required
          />
        </div>
        <div class="input-box captcha-box" style="display: flex; align-items: center;">
          <img :src="captchaUrl" alt="Captcha" @click="refreshCaptcha" style="margin-right: 10px;" />
          <input type="text" v-model="captcha" placeholder="验证码" required style="width: 100px;" />
        </div>
        <button type="submit" @click="register">注册</button>
        <button type="submit" @click="islogin = 2" style="margin-top: 15px">
          返回
        </button>
      </form>

      <form v-else>
        <h2>忘记密码</h2>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-envelope"></i></span>
          <input
            type="email"
            v-model="UserInfo.email"
            required
            placeholder="邮箱"
          />
        </div>
        <div class="input-box">
          <span class="icon"><i class="fa-solid fa-phone"></i></span>
          <input
            type="text"
            v-model="UserInfo.phone"
            placeholder="手机号"
            required
          />
        </div>
        <button type="submit" @click="forgotPassword">确定</button>
        <button type="submit" @click="islogin = 2" style="margin-top: 15px">
          返回
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      UserInfo: {
        name: '',
        password: '',
        phone: '',
        email: '',
      },
      captcha: '',
      captchaUrl: `/auth/captcha?t=${Date.now()}`,
      rememberMe: false,
      islogin: 1,
    }
  },
  methods: {
    //登入
    async login() {
      this.checkCode()
      try {
        const res = await this.$http.post('/auth/login', {
          ...this.UserInfo,
        })

        localStorage.setItem('user', JSON.stringify(res.data))
        this.$router.push('/')
      } catch (error) {
        console.error('登录失败', error)
        console.log(error.response.status)
        if (error.response.status === 400) {
          this.$message.error('用户名或密码错误')
        } else {
          this.$message.error('登录失败')
        }
      }
    },
    //注册
    async register() {
      this.checkCode()
      await this.$http
        .post('/auth/register', this.UserInfo)
        .then((response) => {
          const staus = response.status
          //console.log('注册状态码:', staus);
          this.$message({
            message: '恭喜你，注册成功',
            type: 'success',
          })
        })
        .catch((error) => {
          const staus = error.response.status
          console.log('注册状态码:', staus)
          switch (staus) {
            case 400:
              this.$message({
                message: '邮箱已经存在',
                type: 'warning',
              })
              break
            case 401:
              this.$message({
                message: '手机号已经存在',
                type: 'warning',
              })
              break
            case 409:
              alert('用户已存在')
              break
            default:
              alert('注册失败')
              break
          }
        })
      refreshCaptcha()
      this.islogin = 2;
    },
    //忘记密码
    async forgotPassword() {
      try {
        await this.$http.post('/auth/forgot-password', {
          email: this.UserInfo.email,
          phone: this.UserInfo.phone,
        })
        alert('重置密码链接已发送到您的邮箱')
      } catch (error) {
        console.error('忘记密码失败', error)
      }
    },
    //验证码刷新
    async refreshCaptcha() {
      try {
        const res = await this.$http.get('/auth/captcha')
        // 将SVG内容转为Base64
        const svgContent = res.data
        const base64Svg = btoa(unescape(encodeURIComponent(svgContent))) // 转换为Base64
        this.captchaUrl = `data:image/svg+xml;base64,${base64Svg}` // 设置Base64格式的URL
        //console.log("验证码URL:", this.captchaUrl);
      } catch (error) {
        console.error('刷新验证码失败', error)
      }
    },
    //验证码校验

    //后台校验速度过慢，需要加一个加载动画
    async checkCode() {
      try {
        await this.$http.post('/auth/verify', {
          inputCaptcha: this.captcha
        })
        this.$message({
          type: 'success',
          message: '验证码校验成功'
        })
        this.login()
      }catch (error) {
        console.error('验证码校验失败', error)
        this.$message({
          type: 'error',
          message: '验证码校验失败'
        })
        this.refreshCaptcha()
      }
    },

    submitForm() {
      console.log('Submitting Form')
    },
  },
  mounted() {
    this.refreshCaptcha()
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

/* Custom CSS */
.container {
  width: 100%;
  height: 100vh;
  background: url('../assets/images/bg-img.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container .login-box {
  position: relative;
  width: 390px;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(15px);
  padding-top: 5px;
  padding-bottom: 5px;
}

.login-box h2 {
  font-size: 28px;
  color: #fff;
  text-align: center;
}

.login-box .input-box {
  position: relative;
  width: 310px;
  margin: 30px 0;
  border-bottom: 2px solid #fff;
}

.input-box input {
  width: 100%;
  height: 40px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: #fff;
  padding: 0 35px 0 5px;
}

.input-box input::placeholder {
  color: #f9f9f9;
}

.input-box .icon {
  position: absolute;
  right: 8px;
  color: #fff;
  font-size: 18px;
  line-height: 50px;
}

.login-box .remember-forget {
  margin: -15px 0 15px;
  font-size: 15px;
  color: #fff;
  display: flex;
  justify-content: space-between;
}

.remember-forget label input {
  margin-right: 3px;
}

.login-box button {
  width: 100%;
  height: 40px;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 16px;
  color: #000;
  transition: all 0.5s;
}

.login-box button:hover {
  background: #1f73c9;
  color: #fff;
}

.login-box .register-link {
  font-size: 15px;
  color: #fff;
  text-align: center;
  margin: 20px 0 10px;
}

.remember-forget a,
.register-link a {
  color: #fff;
  text-decoration: none;
}

.remember-forget a:hover,
.register-link a:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 460px) {
  .container .login-box {
    width: 350px;
  }

  .login-box .input-box {
    width: 290px;
  }
}

@media (max-width: 360px) {
  .container .login-box {
    width: 100%;
    height: 100vh;
    border: none;
  }
}
</style>
