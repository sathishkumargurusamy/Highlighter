<template>
  <div class="highlight-container f-column w-full">
    <div class="list-container">
      <div v-if="highlightedWords.size > 0" class="title d-flex">
        Highlights
      </div>
      <div v-if="!highlightedWords.size" class="no-post d-flex">
        No Highlights
      </div>
      <q-list
        v-for="(word, i) in highlightedWords"
        :key="word"
        bordered
        class="rounded-borders list-item"
      >
        <q-expansion-item
          expand-icon-toggle
          expand-separator
          :label="word"
          class="expansion-item"
          @show="getRelatedPosts(word, i)"
        >
          <div v-if="posts[i] && posts[i].length > 0">
            <HighlightCards
              v-for="post in posts[i]"
              :key="post.id"
              :title="post.title"
              :content="post.content"
              :post="post"
              :selectedWord="word"
            />
          </div> </q-expansion-item
      ></q-list>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import HighlightCards from "./HighlightCards";

export default {
  name: "HighlightPosts",
  data() {
    return {
      posts: [],
    };
  },
  components: { HighlightCards },
  computed: {
    ...mapGetters(["highlightedWords"]),
  },
  methods: {
    ...mapActions({ getPostByHighlight: "getPostByHighlight" }),
    async getRelatedPosts(word, index) {
      this.posts[index] = await this.getPostByHighlight(word);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
::v-deep .q-expansion-item__content {
  padding: 20px;
}
::v-deep .q-item {
  background: $white-color;
}
::v-deep .q-item__label {
  font-size: 20px;
  font-weight: 800;
  padding: 10px;
}
.highlight-container {
  background: $primary-color;
  justify-content: flex-start;
  align-items: center;
  min-height: calc(100vh - 132px);
  padding: 30px;
  .title {
    width: 50%;
    margin: 10px 0;
    font-size: 40px;
    font-weight: 800;
    align-items: left;
    margin-bottom: 30px;
    @media (max-width: 1400px) {
      width: 60%;
    }
    @media (max-width: 1000px) {
      width: 90%;
    }
  }
  .no-post {
    margin: 30px;
    width: 100%;
    font-size: 40px;
    font-weight: 800;
    align-items: center !important;
    justify-content: center;
  }
  .list-container {
    width: 60%;
    .list-item {
      margin-bottom: 20px;
    }
    @media (max-width: 1400px) {
      width: 60%;
    }
    @media (max-width: 1000px) {
      width: 90%;
    }
  }
}
</style>
