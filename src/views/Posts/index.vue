<template>
  <div class="post-container f-column w-full">
    <div class="title d-flex" v-if="posts.length !== 0">Posts</div>
    <div class="no-post d-flex" v-if="posts.length === 0">No Posts!</div>
    <div v-else class="lists-container">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        :author="post.author_name"
        :content="post.content"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostCard from "./PostCard.vue";

export default {
  name: "Posts",
  components: { PostCard },
  computed: {
    ...mapGetters(["posts"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.post-container {
  background: $primary-color;
  justify-content: flex-start;
  align-items: center;
  min-height: calc(100vh - 132px);
  padding: 30px;
  .title {
    width: 50%;
    font-size: 40px;
    font-weight: 800;
    align-items: left;
    @media (max-width: 1400px) {
      width: 60%;
    }
    @media (max-width: 1000px) {
      width: 90%;
    }
  }
  .no-post {
    @extend .title;
    margin: 30px;
    align-items: center !important;
    justify-content: center;
  }
  .lists-container {
    width: 50%;
    @media (max-width: 1400px) {
      width: 60%;
    }
    @media (max-width: 1000px) {
      width: 90%;
    }
  }
}
</style>
