<template>
  <div style="padding: 0px 20px">
    <el-tabs v-model="stockOutType" type="border-card" @tab-click="changeStockOutType">
      <el-tab-pane label="销售出库" name="1">
        <StockOutListContent preDefinedType="1" :paramsType=stockOutType></StockOutListContent>
      </el-tab-pane>
      <el-tab-pane label="生产出库" name="2">
        <StockOutListContent preDefinedType="2" :paramsType=stockOutType></StockOutListContent>
      </el-tab-pane>
      <el-tab-pane label="调拨出库" name="3">
        <StockOutListContent preDefinedType="3" :paramsType=stockOutType></StockOutListContent>
      </el-tab-pane>
      <el-tab-pane label="其他出库" name="4">
        <StockOutListContent preDefinedType="4" :paramsType=stockOutType></StockOutListContent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import StockOutListContent from "@/components/StockOut/StockOutListContent";
export default {
  name: "StockOutList",
  components: {
    StockOutListContent
  },
  data() {
    return {
      stockOutType: '1',
    };
  },
  methods: {
    changeStockOutType (tab, event) {
      this.stockOutType = tab.name;
    }
  }
};
</script>

<style lang="less" scoped>
</style>


