export default {
  data() {
    return {
      //用户列表数据
      userData: [
        {
          username: "",
          email: "",
          mobile: ""
        }
      ],
      //总页数
      total: 0,
      pagenum: 1,
      queryText: "",
      dialogAddUserFormVisible: false,
      addUserForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 编辑用户对话框
      dialogEditUserFormVisible: false,
      editUserform: {
        id: "",
        username: "",
        email: "",
        mobile: ""
      },
      //分配角色
      dialogAssignFormVisible: false,
      assignFormUser: {
        rid: "",
        username: "",
        id: ""
      },
      //角色列表
      rolesData: [],
      //添加用户校验规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 9 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        email: [
          {
            pattern: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
            min: 5,
            max: 10,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
            min: 5,
            max: 10,
            message: "格式不正确",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    const page = this.$route.params.page;
    console.log(page);
    this.loadUserData(page);
    this.loadRolesData();
  },
  methods: {
    //加载用户数据
    loadUserData(pagenum = 1, query = "") {
      this.$axios
        .get("users", {
          params: {
            query: query,
            pagenum: pagenum,
            pagesize: 2
          }
        })
        .then(res => {
          console.log(res);
          this.userData = res.data.data.users;
          this.total = res.data.data.total;
          this.pagenum = res.data.data.pagenum;
        });
    },
    //点击的分页按钮，点击地几页显示第几页的内容
    clickCurrentPage(curpage) {
      console.log(curpage);
      this.$router.push("/users/" + curpage);
      this.loadUserData(curpage);
      //当查询内容时并点击分页按钮时，需要把查询字段以及当前点击的页数发送后台
      this.loadUserData(curpage, this.queryText);
    },
    startQuery() {
      console.log(this.queryText);
      //查询页数为1的，查询内容为t的
      this.loadUserData(1, this.queryText);
    },
    //添加用户
    showAddUserDialog() {
      this.dialogAddUserFormVisible = true;
    },
    async addUser() {
      //搜集表单数据发送请求
      let res = await this.$axios.post("users", this.addUserForm);
      console.log(res);
      if (res.data.meta.status == 201) {
        this.dialogAddUserFormVisible = false;
        this.loadUserData();
        this.$message({
          showClose: true,
          message: "恭喜登录成功",
          type: "success",
          duration: 800
        });
      } else {
        alert("添加用户失败");
      }
    },
    //对话框关闭时重置表单
    dialogClosed() {
      console.log(1111);
      this.$refs.addUserForm.resetFields();
    },
    //删除用户
    async delUser(id) {
      console.log(id);
      try {
        await this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        //发送请求删除用户
        let res = await this.$axios.delete(`users/${id}`);
        console.log(res);
        if (res.data.meta.status == 200) {
          this.loadUserData();
          this.$message({
            showClose: true,
            message: "恭喜删除成功",
            type: "success",
            duration: 800
          });
        }
      } catch (error) {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      }
    },
    //开关按钮
    async stateChanged(row) {
      console.log("111");
      const { id, mg_state: mgState } = row;
      let res = await this.$axios.put(`users/${id}/state/${mgState}`, null);
      console.log(res);
      if (res.data.meta.status == 200) {
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
          duration: 800
        });
        this.loadUserData(this.pagenum);
      }
    },
    // 显示编辑按钮对话框
    showEditUserDialog(row) {
      this.dialogEditUserFormVisible = true;
      const { username, email, mobile, id } = row;
      this.editUserform.username = username;
      this.editUserform.email = email;
      this.editUserform.mobile = mobile;
      this.editUserform.id = id;
    },
    //点击确定发送请求，把修改的数据传给后台，刷新页面
    async editUser() {
      console.log(this.editUserform);
      const { email, mobile, id } = this.editUserform;
      let res = await this.$axios.put(`users/${id}`, {
        email,
        mobile
      });
      console.log(res);
      if (res.data.meta.status == 200) {
        this.dialogEditUserFormVisible = false;
        this.loadUserData(this.pagenum);
        this.$message({
          showClose: true,
          message: "更新成功",
          type: "success",
          duration: 800
        });
      }
    },
    async loadRolesData() {
      let res = await this.$axios.get("roles");
      console.log(res);
      this.rolesData = res.data.data;
    },
    async dialogRoles(row) {
      this.dialogAssignFormVisible = true;
      console.log(row);
      const { id, username } = row;
      let res = await this.$axios.get(`users/${id}`);
      this.assignFormUser.id = id;
      this.assignFormUser.username = username;
      this.assignFormUser.rid =
        res.data.data.rid == -1 ? "" : res.data.data.rid;
    },
    async assignRolesTrue() {
      let { id, rid } = this.assignFormUser;
      let res = await this.$axios.put(`users/${id}/role`, {
        rid
      });
      console.log(res);
      if (res.data.meta.status == 200) {
        this.dialogAssignFormVisible = false;
        this.$message({
          showClose: true,
          message: "分配角色成功",
          type: "success",
          duration: 800
        });
        this.loadUserData();
      }
    }
  }
};
