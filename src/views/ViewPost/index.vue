<template>
  <div class="view-post-container d-flex w-full">
    <div class="tool-tip" @click="highlightText">
      <q-chip v-model="showHighlighter" color="white" text-color="black">
        <img height="20" width="20" src="@/assets/highlighter.png" />
        <div class="highlight">Highlight</div>
      </q-chip>
    </div>
    <div class="content-container">
      <div class="title">{{ post.title }}</div>
      <div class="author">
        {{ post.author_name }} {{ formatDate(post.created_date) }}
      </div>
      <div class="content selectable-area" v-html="highlightedText()"></div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";

export default {
  name: "ViewPost",
  computed: {},
  data() {
    return {
      post: {},
      showHighlighter: false,
      selectedText: "",
      selectedWords: [],
    };
  },
  methods: {
    ...mapActions({
      getPostById: "getPostById",
      saveHighlightedText: "saveHighlightedText",
    }),
    formatDate(date) {
      return moment(date).format("DD MMM, YY");
    },
    async getPost() {
      if (this.$route.query.selectedWord) {
        this.selectedWords = [
          ...this.selectedWords,
          this.$route.query.selectedWord,
        ];
        this.post = await this.getPostById(this.$route.query.postId);
      }
      if (this.$route.query.postId) {
        this.post = await this.getPostById(this.$route.query.postId);
      }
    },
    highlightedText() {
      if (!this.selectedWords.length) {
        return this.post.content;
      }
      let content = this.post.content;
      this.selectedWords.forEach((word) => {
        content = content.replace(
          new RegExp(word, "i"),
          '<span style="background-color: black; color: white; border-radius: 4px; font-weight: 600; ">' +
            word +
            "</span>"
        );
      });
      return content;
    },
    highlightText() {
      this.saveHighlightedText(this.selectedText);
      this.selectedWords = [...this.selectedWords, this.selectedText];
      this.showHighlighter = false;
    },
    watchSelection() {
      const element = document.querySelectorAll(".selectable-area");
      element.forEach((elm) => {
        elm.addEventListener("mouseup", this.textSelected);
      });
    },
    textSelected(event) {
      const tooltip = document.querySelector(".tool-tip");
      const selectedText = window.getSelection().toString().trim();
      let pattern = new RegExp(/^[a-z0-9]+$/i);
      if (pattern.test(selectedText)) {
        const x = event.pageX;
        const y = event.pageY;
        tooltip.style.left = `${x + 10}px`;
        tooltip.style.top = `${y - 180}px`;
        tooltip.style.display = "block";
        this.showHighlighter = true;
        this.selectedText = selectedText;
      } else {
        tooltip.style.display = "none";
        this.showHighlighter = false;
      }
    },
  },
  async mounted() {
    await this.getPost();
    this.watchSelection();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.view-post-container {
  background: $primary-color;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 132px);
  .content-container {
    width: 50%;
    @media (max-width: 1400px) {
      width: 60%;
    }
    @media (max-width: 1000px) {
      width: 100%;
    }
    margin: 60px;
    .title {
      font-weight: bold;
      font-size: 44px;
    }
    .author {
      font-weight: bold;
      font-size: 13px;
    }
    .content {
      font-weight: bold;
      margin-top: 20px;
      padding: 0 0 0 10px;
      border-left: 10px solid black;
      border-radius: 20px;
      font-size: 18px;
      line-height: 32px;
    }
  }
  .tool-tip {
    position: absolute;
    display: none;
    z-index: 100;
    cursor: pointer;
  }
  .highlight {
    font-weight: 800;
    margin-left: 8px;
  }
}
</style>
