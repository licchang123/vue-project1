<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="8">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="startLogin()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        region: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //开始登录
    startLogin() {
      this.$refs.ruleForm.validate(async valid => {
        console.log(valid);
        if (!valid) {
          return alert("格式不正确");
        }
        let res = await this.$axios.post("login", this.ruleForm);
        if (res.data.meta.status == 200) {
          //保存令牌
          localStorage.setItem("token", res.data.data.token);
          this.$message({
            showClose: true,
            message: "恭喜登录成功",
            type: "success",
            duration: 800
          });
          //跳转到home页
          this.$router.push("/home");
        } else {
          this.$message({
            showClose: true,
            message: res.data.meta.msg,
            type: "error",
            duration: 800
          });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style scoped>
.el-row {
  height: 100%;
  background: #2d434c;
}
.el-col {
  background: #fff;
  padding: 20px 30px;
  border-radius: 15px;
}
</style>
