<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{text || '-'}}</p>
    <hr />
    <button class="index-btn" @click="add">{{index}}</button>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      text: process.env.VUE_APP_TITLE,
      index: 0
    };
  },
  methods: {
    add() {
      ++this.index;
    }
  }
};
</script>

<style lang="scss" scoped>
.index-btn {
  padding: 10px 20px;
  margin-left: 100px;
}
</style>
