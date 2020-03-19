// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router/router.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/common.css";
import axios from "axios";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(VueQuillEditor /* { default global options } */);

//基准路径
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
//把axios挂在Vue实例的原型上
Vue.prototype.$axios = axios;
//解决每次请求时携带token的问题，可以使用请求拦截器
axios.interceptors.request.use(
  function(config) {
    config.headers.Authorization = localStorage.getItem("token");

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
//响应拦截器，解决token失效的问题
axios.interceptors.response.use(
  function(response) {
    //方式1
    if (response.data.meta.status == 100010) {
      this.$router.push("/login");
    }
    //方式二
    // if (response.data.data.token) {
    //   localStorage.setItem("token", token);
    // }
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  el: "#app",
  components: { App },
  template: "<App/>"
});
