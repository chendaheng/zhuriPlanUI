<template>
  <!-- <div style="padding: 0px 20px;color: red;">出库计划的演示</div> -->
  <div style="padding: 0px 20px;">
    <el-tabs v-model="stockOutType" type="border-card" @tab-click="changeStockOutType">
      <el-tab-pane label="销售出库" name="1">
        <StockOutPlanContent preDefinedType="1" :paramsType=stockOutType></StockOutPlanContent>
      </el-tab-pane>
      <el-tab-pane label="生产出库" name="2">
        <StockOutPlanContent preDefinedType="2" :paramsType=stockOutType></StockOutPlanContent>
      </el-tab-pane>
      <el-tab-pane label="调拨出库" name="3">
        <StockOutPlanContent preDefinedType="3" :paramsType=stockOutType></StockOutPlanContent>
      </el-tab-pane>
      <el-tab-pane label="其他出库" name="4">
        <StockOutPlanContent preDefinedType="4" :paramsType=stockOutType></StockOutPlanContent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import StockOutPlanContent from '@/components/StockOut/StockOutPlanContent';
export default {
  name: 'StockOutPlan',
  components: {
    StockOutPlanContent
  },
  data () {
    return {
      stockOutType: '1',
    };
  },
  methods: {
    changeStockOutType (tab, event) {
      this.stockOutType = tab.name;
    }
  }
}
</script>

<style lang="less" scoped>

</style>
