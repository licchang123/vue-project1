export default {
  data() {
    return {
      rolesData: [
        {
          roleName: "",
          roleDesc: ""
        }
      ],
      dialogAssignRights: false,
      treeData: [],
      roleId: "0",
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  created() {
    this.loadRolesData();
    this.loadAllRights();
  },
  methods: {
    indexRolesMethod(index) {
      return index;
    },
    //加载角色列表数据
    async loadRolesData() {
      let res = await this.$axios.get("./roles");
      console.log(res);
      this.rolesData = res.data.data;
    },
    //获取所有的权限信息
    async loadAllRights() {
      let res = await this.$axios.get("rights/tree");
      console.log(res);
      this.treeData = res.data.data;
    },
    //显示权限分配的对话框
    assignRight(row) {
      this.dialogAssignRights = true;
      this.roleId = row.id;
      //获取最后面的权限的ID
      let keys = [];
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            keys.push(item3.id);
          });
        });
      });
      console.log(keys);

      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys);
      });
    },
    async assignRights() {
      let keys1 = this.$refs.tree.getHalfCheckedKeys();
      let keys2 = this.$refs.tree.getCheckedKeys();
      let keys = keys1.concat(keys2);
      console.log(keys);
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(",")
      });
      console.log(res);
      if (res.data.meta.status === 200) {
        this.dialogAssignRights = false;
        this.$message({
          showClose: true,
          message: "分配权限成功",
          type: "success",
          duration: 800
        });
        this.loadRolesData();
      }
    }
  }
};
