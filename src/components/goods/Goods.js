import moment from "moment";
export default {
  data() {
    return {
      tableGoodsData: [
        {
          goods_name: "",
          goods_price: "",
          goods_number: "",
          add_time: ""
        }
      ]
    };
  },
  created() {
    this.loadGoodsData();
  },
  methods: {
    async loadGoodsData() {
      let res = await this.$axios.get("goods", {
        params: {
          pagenum: 1,
          pagesize: 5
        }
      });
      console.log(res);
      this.tableGoodsData = res.data.data.goods;
    },
    go2Goods() {
      this.$router.push("/goods-add");
    }
  },
  filters: {
    dateFilters(res) {
      return moment(res).format("YYYY-MM-DD");
    }
  }
};
