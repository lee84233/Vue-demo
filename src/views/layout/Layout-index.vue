<template>
  <div>
    <router-link to="/home" class="tabs">Home页</router-link>
    <router-link to="/about" class="tabs">About页</router-link>
    <transition name="page-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  display: inline-block;
  margin: 0 20px;
  padding: 20px 30px;
  text-decoration: underline;
  font-size: 16px;
}
</style>
