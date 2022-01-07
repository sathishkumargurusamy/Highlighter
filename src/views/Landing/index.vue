<template>
  <div class="banner w-full align-center">
    <div class="content w-full">
      Medium is a place to write, read, and connect
      <q-btn
        @click="$router.push({ name: 'CreatePost' })"
        size="20px" 
        outline
        rounded
        color="black"
        label="Create Post"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Landing",
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
.banner {
  height: 500px;
  background: $primary-color;
  .content {
    font-size: 50px;
    width: 500px;
  }
}
</style>
