<template>
  <div>
    <router-link to="/home" class="tabs">Home页</router-link>
    <router-link to="/about" class="tabs">About页</router-link>
    <transition name="page-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
.tabs {
  display: inline-block;
  margin: 20px 50px;
}
</style>
