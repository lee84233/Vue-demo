<template>
  <div class="home">
    <el-button
      type="primary"
      @click="switchLanguage"
    >发起一个HTTP请求</el-button>
    <br />
    <button @click="getAll" id="sendHttps">发起多个HTTP请求（并发请求）</button>
  </div>
</template>

<script>
import axios from 'axios';
import {switchLanguage, getAll} from '@/service/user';

export default {
  name: 'home',
  components: {},
  mounted() {
    $('#sendHttps').css({
      padding: '10px 20px',
      border: '1px solid #096'
    });
  },
  methods: {
    switchLanguage() {
      switchLanguage({a: 1, b: 2}).then((res) => {
        console.log(res);
      });
    },

    getAll() {
      getAll(
        {phone: '18765900190', password: 'Haier1111'},
        {phone: '18765432100', password: 'Haier2222'}
      ).then(
        axios.spread((res1, res2) => {
          // 两个请求现在都执行完成
          console.log('接口1的响应', res1);
          console.log('接口2的响应', res2);
        })
      );
    }
  }
};
</script>
