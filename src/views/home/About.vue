<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{text || '-'}}</p>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      text: process.env.VUE_APP_TITLE
    };
  }
};
</script>
