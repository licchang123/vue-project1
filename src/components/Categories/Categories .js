import Vue from "vue";
import ElTreeGrid from "element-tree-grid";
Vue.component(ElTreeGrid.name, ElTreeGrid);
export default {
  data() {
    return {
      CatData: [
        {
          cat_name: "",
          cat_deleted: "",
          cat_level: ""
        }
      ],
      addCatdialogFormVisible: false,
      addCatform: {
        cat_name: "",
        cat_pid_arr: []
      },
      //级联选择器
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则"
            }
          ]
        }
      ],
      //级联选择器的配置对象
      defaultProps: {
        value: "cat_id",
        label: "cat_name"
      }
    };
  },
  created() {
    this.loadCatData();
    this.loadCatData2();
  },
  methods: {
    async loadCatData() {
      let res = await this.$axios.get("categories");
      console.log(res);
      this.CatData = res.data.data;
    },
    addCat() {
      this.addCatdialogFormVisible = true;
    },
    //获取二级联动
    async loadCatData2() {
      let res = await this.$axios.get("categories", {
        params: {
          type: 2
        }
      });
      console.log(res);
      this.options = res.data.data;
    },
    //点击确定发送请求，需要把添加的商品发送后台
    async cliAddCat() {
      const { cat_name, cat_pid_arr } = this.addCatform;
      let res = await this.$axios.post("categories", {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
        cat_name: cat_name,
        cat_level: cat_pid_arr.length
      });
      console.log(res);
      if (res.data.meta.status == 201) {
        this.addCatdialogFormVisible = false;
        this.$message({
          showClose: true,
          message: "添加成功",
          type: "success",
          duration: 800
        });
        this.loadCatData();
      }
    }
  }
};
