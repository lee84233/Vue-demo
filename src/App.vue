<template>
  <div id="app">
    <router-view />
    <!-- progressbar -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.$Progress.start();
  },
  mounted() {
    this.$Progress.finish();
  }
};
</script>
