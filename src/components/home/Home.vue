<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8"><img src="../../assets/images/logo.png"/></el-col>
        <el-col :span="8"><h1>电商后台管理系统</h1></el-col>
        <el-col :span="8" class="col_r"
          >恭喜恭喜今年今年跳槽成功<a @click.prevent="logout" href="#"
            >退出</a
          ></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :router="true"
          default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menus"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              index="users"
              v-for="item1 in item.children"
              :key="item1.id"
              :index="'/' + item1.path"
              >{{ item1.authName }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 自组件的出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: []
    };
  },
  created() {
    this.loadMenusData();
  },
  methods: {
    logout() {
      this.$confirm("此操作将永久退出该账户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        //点击确定的时候走的then
        .then(() => {
          localStorage.removeItem("token");
          this.$message({
            type: "success",
            message: "退出成功!",
            duration: 800
          });
          //跳转到登录到页面
          this.$router.push("/login");
        })
        //当点击了取消走的是catch
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消成功",
            duration: 800
          });
        });
    },
    //左侧菜单
    async loadMenusData() {
      let res = await this.$axios.get("menus");
      console.log(res);
      this.menus = res.data.data;
    }
  }
};
</script>

<style scoped>
.el-container {
  height: 100%;
  min-width: 900px;
}
.el-header {
  background: #b3c1cd;
  padding: 0;
}
.el-aside {
  background: #545c64;
}
.el-main {
  background: #eaeef1;
}
h1 {
  color: #fff;
  text-align: center;
  line-height: 60px;
}
.col_r {
  text-align: center;
  line-height: 60px;
  padding-right: 30px;
}
.col_r a {
  color: green;
}
</style>
