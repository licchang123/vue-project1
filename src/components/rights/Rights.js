export default {
  data() {
    return {
      rightsData: [
        {
          authName: "商品管理",
          path: "王小虎",
          level: "1级"
        }
      ]
    };
  },
  created() {
    this.loadRightsData();
  },
  methods: {
    //请求权限列表
    async loadRightsData() {
      let res = await this.$axios.get("rights/list");
      console.log(res);
      this.rightsData = res.data.data;
    },
    indexMethod(index) {
      return index;
    }
  }
};
