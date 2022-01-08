import { createWebHistory, createRouter } from "vue-router";
import LandingPage from "@/views/Landing"
import CreatePostPage from "@/views/CreatePost"
import PostsPage from "@/views/Posts"
import ViewPostPage from "@/views/ViewPost"
import HighlightPage from "@/views/HighlightList"

const routes = [
    {
        path: "/",
        name: "Landing",
        component: LandingPage,
      },
      {
        path: "/create",
        name: "CreatePost",
        component: CreatePostPage,
      },
      {
        path: "/posts",
        name: "Posts",
        component: PostsPage,
      },
      {
        path: "/post",
        name: "ViewPost",
        component: ViewPostPage,
      },
      {
        path: "/highlights",
        name: "Highlights",
        component: HighlightPage,
      },
];

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes,
});

export default router;