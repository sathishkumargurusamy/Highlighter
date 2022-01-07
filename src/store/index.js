import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    posts: [],
    highlightedWords: [],
  },
  getters: {
    posts: ({ posts }) => posts,
    highlightedWords: ({ highlightedWords }) => new Set(highlightedWords),
  },
  mutations: {
    createNewPost(storeState, payload) {
      storeState.posts = [...storeState.posts, payload];
    },
    editPostById(storeState, payload) {
      const actualPostIndex = storeState.posts.findIndex(
        (post) => post.id === payload.id
      );
      storeState.posts[actualPostIndex] = payload;
    },
    deletePostById(storeState, id) {
      storeState.posts = storeState.posts.filter((post) => {
        return post.id !== id;
      });
    },
    saveHighlightedText(storeState, payload) {
      storeState.highlightedWords = [...storeState.highlightedWords, payload];
    },
  },
  actions: {
    createNewPost({ commit }, payload) {
      commit("createNewPost", payload);
    },
    getPostById({ state }, id) {
      return state.posts.find((post) => post.id === id);
    },
    editPostById({ commit }, payload) {
      commit("editPostById", payload);
    },
    deletePostById({ commit }, payload) {
      commit("deletePostById", payload);
    },
    saveHighlightedText({ commit }, payload) {
      commit("saveHighlightedText", payload);
    },
  },
});
