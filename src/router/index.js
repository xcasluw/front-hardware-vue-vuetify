import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";
import ResetPassword from "../views/ResetPassword.vue";
import CreateAccount from "../views/CreateAccount.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/auth", name: "Auth", component: Auth },
  { path: "/reset-password", name: "ResetPassword", component: ResetPassword },
  { path: "/create-account", name: "CreateAccount", component: CreateAccount },
  { path: "/", name: "Home", component: Home },
  { path: "/home", name: "Home", component: Home },

  {
    path: "/motherboards",
    name: "Motherboards",
    component: () =>
      import(/* webpackChunkName: "motherboards" */ "../views/Motherboards.vue")
  },
  {
    path: "/processors",
    name: "Processors",
    component: () =>
      import(/* webpackChunkName: "processors" */ "../views/Processors.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
