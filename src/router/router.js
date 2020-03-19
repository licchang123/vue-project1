//引入
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/login/Login.vue";
import Home from "../components/home/Home.vue";
import Users from "../components/users/Users.vue";
import Roles from "../components/roles/Roles.vue";
import Rights from "../components/Rights/Rights.vue";
import Categories from "../components/Categories/Categories.vue";
import Goods from "../components/goods/Goods.vue";
import GoodsAdd from "../components/goods/GoodsAdd.vue";
Vue.use(VueRouter);
//实例化router
const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", name: "login", component: Login },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        { path: "/users/:page?", name: "users", component: Users },
        { path: "/roles", name: "roles", component: Roles },
        { path: "/rights", name: "rights", component: Rights },
        { path: "/categories", name: "categories", component: Categories },
        { path: "/goods", name: "goods", component: Goods },
        { path: "/goods-add", name: "good-add", component: GoodsAdd }
      ]
    }
  ]
});
//前置导航守卫是router的一个方法
//to :目标路由对象
//from:来源路由对象
//next()下一步
router.beforeEach((to, from, next) => {
  //如果是登录页面，下一步
  if (to.path === "/login") {
    next();
  } else {
    //如果是非登录页面
    const token = localStorage.getItem("token");
    token ? next() : next("/login");
  }
});
//导出
export default router;
