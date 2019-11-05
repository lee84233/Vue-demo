<template>
  <div class="home">
    <h1>Home页 <small>{{title}}</small></h1>
    <!-- <button @click="switchLanguage">发起一个HTTP请求</button> -->
    <el-button type="primary" @click="switchLanguage">发起一个HTTP请求</el-button>
    <div>
      <svg-icon class-name="icon" icon-name="user" />
      <svg-icon class-name="icon" icon-name="password" />
      <hr>
      <svg-icon class-name="icon" icon-name="success" />
      <svg-icon class-name="icon" icon-name="warning" />
      <svg-icon class-name="icon" icon-name="danger" />
      <svg-icon class-name="icon" icon-name="info" />
      <svg-icon class-name="icon" icon-name="delete" />
      <svg-icon class-name="icon" icon-name="close" />
      <hr>
      <svg-icon class-name="icon" icon-name="home" />
      <svg-icon class-name="icon" icon-name="dashboard" />
      <svg-icon class-name="icon" icon-name="edit" />
      <svg-icon class-name="icon" icon-name="search" />
      <svg-icon class-name="icon" icon-name="detail" />
      <svg-icon class-name="icon" icon-name="save" />
      <svg-icon class-name="icon" icon-name="message" />
    </div>
  </div>
</template>

<script>
import {api2} from '@/api/api';

export default {
  name: 'home',
  components: {},
  mounted() {},
  data() {
    return {
      title: process.env.VUE_APP_TITLE
    };
  },
  methods: {
    switchLanguage() {
      api2({
        appid: '98892211',
        appsecret: '2WFXW4c5',
        version: 'v6'
      }).then((res) => {
        // console.log(res);
      }).catch(e => {
        // console.log(e);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  width: 40px !important;
  height: 40px !important;
  margin: 10px;
  color: #666;
  cursor: pointer;
  &:hover {
    color: #333;
  }
}
</style>
