<template>
  <div style="padding: 0px 20px">
    <el-tabs v-model="stockInType" type="border-card" @tab-click="changeStockInType">
      <el-tab-pane label="采购入库" name="1">
        <StockInListContent preDefinedType="1" :paramsType=stockInType></StockInListContent>
      </el-tab-pane>
      <el-tab-pane label="委外加工入库" name="2">
        <StockInListContent preDefinedType="2" :paramsType=stockInType></StockInListContent>
      </el-tab-pane>
      <el-tab-pane label="生产入库" name="3">
        <StockInListContent preDefinedType="3" :paramsType=stockInType></StockInListContent>
      </el-tab-pane> 
      <el-tab-pane label="销售退货" name="4">
        <StockInListContent preDefinedType="4" :paramsType=stockInType></StockInListContent>
      </el-tab-pane> 
      <el-tab-pane label="生产退货" name="5">
        <StockInListContent preDefinedType="5" :paramsType=stockInType></StockInListContent>
      </el-tab-pane> 
      <el-tab-pane label="其他入库" name="6">
        <StockInListContent preDefinedType="6" :paramsType=stockInType></StockInListContent>
      </el-tab-pane> 
    </el-tabs>    
  </div>
</template>

<script>
import StockInListContent from '@/components/StockIn/StockInListContent';
export default {
  name: 'StockInList',
  components: {
    StockInListContent
  },
  data () {
    return {
      stockInType: '1',
    };
  },
  created () {
    console.log(this.stockInType);
  },
  methods: {
    changeStockInType (tab, event) {
      this.stockInType = tab.name;
    }
  }
}
</script>

<style lang="less" scoped>

</style>