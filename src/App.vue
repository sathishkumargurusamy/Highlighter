<template>
  <div class="position-relative">
    <Header />
    <router-view class="router-container"></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import "@/styles/global.scss";

.router-container {
  margin-top: 132px;
}
</style>
