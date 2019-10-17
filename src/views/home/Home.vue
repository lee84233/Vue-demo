<template>
  <div class="home">
    <button @click="switchLanguage">发起一个HTTP请求</button>
  </div>
</template>

<script>
import {switchLanguage, getAll} from '@/service/user';

export default {
  name: 'home',
  components: {},
  mounted() {},
  methods: {
    switchLanguage() {
      switchLanguage({a: 1, b: 2}).then((res) => {
        console.log(res);
      });
    }
  }
};
</script>
