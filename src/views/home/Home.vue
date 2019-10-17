<template>
  <div class="home">
    <h1>Home页</h1>
    <button @click="switchLanguage">发起一个HTTP请求</button>
  </div>
</template>

<script>
import {api1} from '@/service/api';

export default {
  name: 'home',
  components: {},
  mounted() {},
  methods: {
    switchLanguage() {
      api1({a: 1, b: 2}).then((res) => {
        console.log(res);
      });
    }
  }
};
</script>
