<template>
  <div class="main-container d-flex">
    <q-card class="card-container">
      <q-card-section>
        <div class="text-h4">Post</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{
          $route.query.isEdit
            ? "Edit your post here!"
            : "Create your posts here!"
        }}
      </q-card-section>

      <q-separator inset />
      <q-card-section class="flex-col w-full">
        <q-input outlined class="title" v-model="title" label="Title" />
        <q-input outlined class="title" v-model="author_name" label="Author" />
        <q-input
          outlined
          class="title"
          v-model="content"
          label="Content"
          type="textarea"
        />
        <div class="error" v-show="wordCountCheck() < 50">
          Content should atleast contains 50 words!
        </div>
        <div class="w-full d-flex flex-end">
          <q-btn
            size="15px"
            unelevated 
            color="black"
            :label="$route.query.isEdit ? 'Edit' : 'Create'"
            :disabled="validate()"
            v-on="
              $route.query.isEdit ? { click: editPost } : { click: savePost }
            "
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CreatePost",
  data() {
    return {
      title: "",
      author_name: "",
      content: "",
      id: "",
    };
  },
  methods: {
    ...mapActions({
      createNewPost: "createNewPost",
      getPostById: "getPostById",
      editPostById: "editPostById",
    }),
    wordCountCheck() {
      return this.content.split(" ").length;
    },
    savePost() {
      this.createNewPost({
        id: Date.now().toString(),
        title: this.title,
        author_name: this.author_name,
        content: this.content,
        created_date: new Date(),
      });
      this.$router.push({ name: "Posts" });
    },
    editPost() {
      this.editPostById({
        title: this.title,
        author_name: this.author_name,
        content: this.content,
        id: this.id,
      });
      this.$router.push({ name: "Posts" });
    },
    validate() {
      if (!this.title || !this.author_name || this.wordCountCheck() < 50) {
        return true;
      }
      return false;
    },
    async isPostReceived() {
      if (this.$route.query.isEdit) {
        const selectedPost = await this.getPostById(this.$route.query.postId);
        this.title = selectedPost.title;
        this.author_name = selectedPost.author_name;
        this.content = selectedPost.content;
        this.id = selectedPost.id;
      }
    },
  },
  mounted() {
    this.isPostReceived();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
.main-container {
  background: $primary-color;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 132px);
}
.card-container {
  padding: 20px;
  margin-top: 30px;
  width: 40%;
  @media (max-width: 1400px) {
    width: 60%;
  }
  @media (max-width: 1000px) {
    width: 90%;
  }
  .title {
    margin-bottom: 20px;
  }
  ::v-deep .q-editor {
    border: none !important;
    font-size: 19px;
    margin-bottom: 20px;
  }
}
.error {
  color: red;
  font-size: 12px;
}
</style>
