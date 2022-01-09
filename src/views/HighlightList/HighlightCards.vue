<template>
  <div>
    <q-card class="my-card">
      <q-item>
        <q-item-section>
          <q-item-label class="title text-ellipsis">{{ title }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section>
          <div class="position-relative">
            <div class="content" v-html="highlightText()" />
            <span class="read-more"
              >...<span @click="navigateToPost">Read More</span></span
            >
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HighlightCard",
  data() {
    return {
      contentData: "",
      query: "",
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    post: {
      type: Object,
      required: true,
    },
    selectedWord: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions({ deletePostById: "deletePostById" }),
    editPost() {
      this.$router.push({
        path: "/create",
        query: { postId: this.post?.id, isEdit: true },
      });
    },
    async deletePost() {
      await this.deletePostById(this.post?.id);
    },
    navigateToPost() {
      this.$router.push({ name: "ViewPost", query: { postId: this.post?.id } });
    },
    rearrangeContent() {
      let index = this.content.indexOf(this.selectedWord);
      if (index <= 100) {
        let firstLine = this.content.substring(0, index);
        let secondLine = this.content.substring(index, this.content.length);
        this.contentData = `${firstLine}${secondLine}`;
        return;
      }
      let firstLine = this.content.substring(index - 250, index);
      let secondLine = this.content.substring(index, this.content.length);
      this.contentData = `${firstLine}${secondLine}`;
    },
    highlightText() {
      if (!this.selectedWord) {
        return this.contentData;
      }
      return this.contentData.replace(
        new RegExp(this.selectedWord, "i"),
        '<span style="background-color: yellow; border-radius: 4px; font-weight: 600; ">' +
          this.selectedWord +
          "</span>"
      );
    },
  },
  mounted() {
    this.rearrangeContent();
    this.highlightText();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.content-hidden {
  visibility: hidden;
}
.my-card {
  margin-bottom: 30px;
  height: 150px;
  .title {
    font-weight: 600;
    font-size: 12px;
    width: 350px;
  }
  .content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 22px;
  }
  .read-more {
    position: absolute;
    background: white;
    bottom: 0;
    right: 0;
    span {
      color: blue;
      font-weight: 800;
      cursor: pointer;
    }
  }
}
</style>
