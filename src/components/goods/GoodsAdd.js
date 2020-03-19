export default {
  data() {
    return {
      activeIndex: 1,
      activeName: "three",
      addGoodsForm: {
        goods_name: "",
        goods_cat: [],
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: [],
        radio: true
      },
      //级联
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
      //配置
      defaultProps: {
        value: "cat_id",
        label: "cat_name"
      },
      //图片
      dialogImageUrl: "",
      dialogVisible: false,
      headers: {
        Authorization: localStorage.getItem("token")
      },
      //富文本编辑器
      editorOption: {
        placeholder: "请输入你的密码"
      }
    };
  },
  created() {
    this.loadLevelData();
  },
  methods: {
    clickTables(tab) {
      console.log(tab.index);
      this.activeIndex = +tab.index + 1;
    },
    next(index, name) {
      this.activeIndex = index;
      this.activeName = name;
    },
    //获取级联选择数据
    async loadLevelData() {
      let res = await this.$axios.get("categories", {
        params: {
          type: 3
        }
      });
      console.log(res);
      this.options = res.data.data;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传图片
    uploadImg(res) {
      console.log(res.data.tmp_path);
      this.addGoodsForm.pics.push({
        pic: res.data.tmp_path
      });
    },
    async addGoodsTrue() {
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      } = this.addGoodsForm;
      let res = await this.$axios.post("goods", {
        goods_name,
        goods_cat: goods_cat.join(","),
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      });
      console.log(res);
      if (res.data.meta.status == 201) {
        alert("成功");
        this.$router.push("/goods");
      }
    }
  }
};
