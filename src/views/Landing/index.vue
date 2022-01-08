<template>
  <div class="landing-container">
    <div class="banner w-full exact-center">
      <q-parallax  :speed="1">
      <div class="content f-column align-center">
        This is a place to write, read, and highlight
        <q-btn
          @click="$router.push({ name: 'CreatePost' })"
          size="20px"
          outline
          color="black"
          label="Create Post"
          class="button"
        />
        </div>
      </q-parallax>
    </div>
  <Posts />
  </div>
</template>

<script>
import Posts from "@/views/Posts";

export default {
  name: "Landing",
  components: { Posts },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
.landing-container {
  min-height: calc(100vh - 132px);
}
.banner {
  justify-content: center;
  .content {
    font-size: 50px;
     text-align: center;
    .button {
      margin: 10px 0 0 0;
      width: 200px;
    }
  }
}
</style>
