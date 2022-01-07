<template>
  <div class="header-container space-between w-full">
    <div @click="navigateTo('Landing')">
      <img class="logo cursor-pointer" src="@/assets/logo.png" alt="logoimg" />
    </div>
    <div class="menu-container d-flex">
      <div
        v-for="item in menu_items"
        :key="item.title"
        class="menu-item"
        @click="navigateTo(item.pathName)"
        :class="{ active: $route.name === item.pathName }"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menu_items: [
        {
          title: "Create Post",
          pathName: "CreatePost",
        },
        {
          title: "Posts",
          pathName: "Posts",
        },
        {
          title: "Highlights",
          pathName: "Highlights",
        },
      ],
    };
  },
  methods: {
    navigateTo(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.header-container {
  position: fixed;
  height: 132px;
  top: 0;
  z-index: 100;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.16);
  background: $white-color;
  .logo {
    height: 100px;
    padding: 0 30px;
    object-fit: contain;
    @media (max-width: 1400px) {
      height: 80px;
    }
  }
  .menu-container {
    align-items: center;
    justify-content: space-around;
    width: 30%;
    .menu-item {
      font-size: 20px;
      font-weight: 800;
      cursor: pointer;
      border-bottom: 3px solid white;
    }
    .active {
      border-bottom: 3px solid black;
      border-radius: 4px;
    }
  }
}
</style>
