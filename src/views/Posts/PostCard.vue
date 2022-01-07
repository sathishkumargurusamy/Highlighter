<template>
  <div>
    <q-card class="my-card">
      <q-item>
        <q-item-section>
          <q-item-label class="title text-ellipsis">{{ title }}</q-item-label>
          <q-item-label caption> {{ author }} </q-item-label>
        </q-item-section>
        <q-btn color="black" label=". . .">
          <q-menu transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section @click.stop="editPost"
                  >Edit Post</q-item-section
                >
              </q-item>
              <q-item clickable>
                <q-item-section @click.stop="deletePost"
                  >Delete Post</q-item-section
                >
              </q-item>
              <q-separator />
            </q-list>
          </q-menu>
        </q-btn>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section>
          <div class="position-relative">
            <div class="content">{{ content }}</div>
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
  name: "PostCard",
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.my-card {
  margin-bottom: 30px;
  height: 180px;
  .title {
    font-weight: 600;
    font-size: 20px;
    width: 350px;
  }
  .content {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
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
