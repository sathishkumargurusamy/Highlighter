<template>
  <div class="header-container space-between w-full">
    <div @click="navigateTo('Landing')">
      <img class="logo cursor-pointer" src="@/assets/logo.png" alt="logoimg" />
    </div>
    <!-- Desktop Menu -->
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

    <!-- Mobile Menu -->

    <div
      class="hamBurger"
      :class="{ change: isToggleOpen }"
      @click="toggleMenu"
    >
      <div class="hamBar1"></div>
      <div class="hamBar2"></div>
      <div class="hamBar3"></div>
    </div>
  </div>
  <div :class="{ 'menu-open': isToggleOpen }" class="mobile-menu-container">
    <div
      v-for="item in menu_items"
      :key="item.title"
      class="menu-item"
      @click="navigateTo(item.pathName, true)"
      :class="{ 'active-menu': $route.name === item.pathName }"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isToggleOpen: false,
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
    navigateTo(name, isMobile) {
      if(isMobile){
        this.isToggleOpen = false
      }
      this.$router.push({ name });
    },
    toggleMenu() {
      this.isToggleOpen = !this.isToggleOpen;
      this.$emit("toggleOpened", this.isToggleOpen);
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
    @media (max-width: 1160px) {
      display: none;
    }
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
  .hamBurger {
    padding: 0 20px;
    display: inline-block;
    cursor: pointer;
    @media (min-width: 1160px) {
      display: none;
    }
  }

  .hamBar1,
  .hamBar2,
  .hamBar3 {
    width: 35px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: 0.4s;
  }

  .change .hamBar1 {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-9px, 6px);
  }

  .change .hamBar2 {
    opacity: 0;
  }

  .change .hamBar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
  }
}
.mobile-menu-container {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: $primary-color;
  overflow-x: hidden;
  padding-top: 132px;
  transition: 0.5s;
  .menu-item {
    font-size: 20px;
    font-weight: 800;
    padding: 20px 30px;
  }
  .active-menu {
    border-bottom: 3px solid black;
    border-radius: 4px;
    background: $black-color;
    color: $white-color;
  }
}
.menu-open {
  width: 100%;
  height: 100vh;
}
</style>
