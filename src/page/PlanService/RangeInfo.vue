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
            <el-input v-model="data.rangeName" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="inputBox">
            <div class="label">系列款数</div>
            <el-input v-model="data.rangeAmount" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="24">
          <div class="inputBox"> 
            <div class="label">备注</div>
            <el-input v-model="data.rangeNote" type="textarea" :rows="3" placeholder="请输入" ></el-input>
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
        rangeAmount: "",
        rangeNote: "",
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
      },
      controlData: {
        ifRangeAdd: false,
        ifRangeChange: false,
      },
    };
  },
  created: function () {
    const that = this;
    console.log("进入系列信息页面");
    var result = {};
    result = that.$route.query;
    if (result.hasOwnProperty("ifRangeAdd")){
      that.controlData.ifRangeAdd = result["ifRangeAdd"];
      console.log("当面页面用于添加系列");
    }
    if (result.hasOwnProperty("ifRangeChange")){
      that.controlData.ifRangeChange = result["ifRangeChange"];
      console.log("当面页面用于修改系列");
      that.data = result;
    }
  },
  methods: {
    // 保存按钮点击
    store(){
      const that = this;
      console.log("保存按钮点击");
      if(that.controlData.ifRangeAdd === true){
          this.$message({
          message: '成功保存系列信息',
          type: 'success'
        });
      }
      if(that.controlData.ifRangeChange === true){
          this.$message({
          message: '成功修改系列信息',
          type: 'success'
        });
      }
    },
    // 取消按钮点击
    cancel(){
      const that = this;
      console.log("取消按钮点击");
      that.$router.push({
        path: `/PlanService/RangeManagement`,
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