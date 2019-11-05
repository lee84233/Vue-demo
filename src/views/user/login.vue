<template>
  <div class="login-page">
    <div class="container">
      <h1 class="title">Please Sign In</h1>
      <form class="form" method="post" action="/api/login">
        <div :class="['form-item', userName.error ? 'error' : '']">
          <div class="form-item_context">
            <svg-icon class-name="form-item_icon" icon-name="user" />
            <input type="text" class="form-item_input" v-model="userName.value" @change="required('userName')" placeholder="请输入用户名" />
          </div>
          <span class="form-item_error">请输入用户名</span>
        </div>
        <div :class="['form-item', password.error ? 'error' : '']">
          <div class="form-item_context">
            <svg-icon class-name="form-item_icon" icon-name="password" />
            <input type="password" class="form-item_input" v-model="password.value" @change="required('password')" placeholder="请输入密码" />
          </div>
          <span class="form-item_error">请输入密码</span>
        </div>
        <button class="form-btn" @click="onSubmit" type="button">登 录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      userName: {
        value: '',
        error: false
      },
      password: {
        value: '',
        error: false
      }
    };
  },
  methods: {
    onSubmit() {
      this.required('userName');
      this.required('password');

      if (!this.userName.error && !this.password.error) {
        // 添加token、userName
        this.$store.commit('setToken', 'your token');
        this.$store.commit('setUserName', 'your name');

        // 跳转
        let url = (this.$route.query && this.$route.query.redirect) || '/';
        this.$router.push(url);
      }
    },
    required(key) {
      let value = this[key].value.trim();
      if (value) {
        this[key].error = false;
      } else {
        this[key].error = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/modules/_variable.scss";
$bgColor: #304fff;
$width: 500px;

.login-page {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background-color: $bgColor;
  .container {
    position:absolute;
    left: 50%;
    top: 100px;
    margin-left: -($width / 2);
    width: $width;
  }
  .title {
    margin-bottom: 50px;
    color: #fff;
    text-align: center;
    line-height: 1;
    font-size: 28px;
    font-weight: 500;
  }

  .form {
    padding: 50px 80px;
    background-color: #fff;
    border-radius: 4px;
  }
  .form-item {
    position: relative;
    margin-bottom: 30px;
    &.error {
      .form-item_context {
        border-color: $danger;
      }
      // .form-item_icon {
      //   color: $danger;
      // }
      .form-item_error {
        display: block;
      }
    }
  }
  .form-item_context {
    display: flex;
    align-items: center;
    border: 1px solid #dcdfe6;
    border-radius: 100px;
    overflow: hidden;
  }
  .form-item_icon {
    flex: 0 0 auto;
    width: 36px;
    text-align: center;
    font-size: 18px;
    color: $fontDefaultColor;
  }
  .form-item_input {
    flex: 1 1 auto;
    padding: 10px 20px 10px 0;
    line-height: 20px;
    border: none;
  }
  .form-item_error {
    display: none;
    position: absolute;
    left: 0;
    top: 47px;
    color: $danger;
    font-size: 12px;
    line-height: 1;
  }

  .form-btn {
    display: block;
    width: 50%;
    padding: 10px 0;
    margin: 50px auto 0;
    color: #fff;
    line-height: 18px;
    border: none;
    background-color: darken($color: $bgColor, $amount: 5%);
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.4s;
    &:hover {
      background-color: $bgColor;
    }
  }
}
</style>
