<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="8">
          <div class="inputBox">
            <div class="label">客户名称</div>
            <el-select v-model="data.customerName" >
              <el-option
                v-for="item in options.customerNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="inputBox">
            <div class="label">品牌</div>
            <el-select v-model="data.brandName" >
              <el-option
                v-for="item in options.brandNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="inputBox">
            <div class="label">服装类型</div>
            <el-select v-model="data.clothingType" >
              <el-option
                v-for="item in options.clothingTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="8">
          <div class="inputBox">
            <div class="label">系列名称</div>
            <el-select v-model="data.rangeName" >
              <el-option
                v-for="item in options.rangeNameTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="inputBox">
            <div class="label">订单款号</div>
            <el-input v-model="data.styleNumber" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin: 50px 0 10px 0">
        <el-col :span="3" :offset="10">
          <el-button type="primary" @click="store">保存</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="info" @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        customerName: "",
        brandName: "",
        clothingType: "",
        rangeName: "",
        styleNumber: "",
      },
      options: {
        customerNameOptions: [
          {
            value: 1,
            label: "A客户"
          },
          {
            value: 2,
            label: "B客户"
          },
        ],
        brandNameOptions: [
          {
            value: 1,
            label: "X品牌"
          },
          {
            value: 2,
            label: "Y品牌"
          },
        ],
        clothingTypeOptions: [
          {
            value: 1,
            label: "时装"
          },
          {
            value: 2,
            label: "精品"
          },
          {
            value: 3,
            label: "品牌"
          },
        ],
        rangeNameTypeOptions: [
          {
            value: 1,
            label: "Fall-2019(07/08/09)"
          },
          {
            value: 2,
            label: "Spring-2019(01/02/03)"
          },
          {
            value: 3,
            label: "Winter-2019(10/11/12)"
          },
        ],
      },
    };
  },
  created: function () {
    const that = this;
    console.log("进入添加款式页面");
  },
  methods: {
    // 保存按钮点击
    store(){
      const that = this;
      console.log("保存按钮点击");
      this.$message({
        message: '成功保存款式信息',
        type: 'success'
      });
    },
    // 取消按钮点击
    cancel(){
      const that = this;
      console.log("取消按钮点击");
      that.$router.push({
        path: `/PlanService/StyleManagement`,
      });
    }
  }
}
</script>


<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .inputBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    .label {
      font-size: 14px;
      min-width: 75px;
      text-align: center;
    }
    .el-input {
      width: 300px;
      min-width: 75px;
    }
    .el-select {
      width: 300px;
      min-width: 75px;
    }
  }
  .block {
    padding: 30px 0;
    text-align: center;
  }
}
</style>