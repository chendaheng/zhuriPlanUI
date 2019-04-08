<template>
    <div style="padding: 0px 20px">
        <el-tabs v-model="stockInType" type="border-card" @tab-click="changeStockInType">
            <el-tab-pane label="采购入库" name="1">
                <StockInPlanContent preDefinedType="1" :paramsType=stockInType></StockInPlanContent>
            </el-tab-pane>
            <el-tab-pane label="委外加工入库" name="2">
                <StockInPlanContent preDefinedType="2" :paramsType=stockInType></StockInPlanContent>
            </el-tab-pane>
            <el-tab-pane label="生产入库" name="3">
                <StockInPlanContent preDefinedType="3" :paramsType=stockInType></StockInPlanContent>
            </el-tab-pane> 
            <el-tab-pane label="销售退货" name="4">
                <StockInPlanContent preDefinedType="4" :paramsType=stockInType></StockInPlanContent>
            </el-tab-pane> 
            <el-tab-pane label="生产退货" name="5">
                <StockInPlanContent preDefinedType="5" :paramsType=stockInType></StockInPlanContent>
            </el-tab-pane> 
            <el-tab-pane label="其他入库" name="6">
                <StockInPlanContent preDefinedType="6" :paramsType=stockInType></StockInPlanContent>
            </el-tab-pane> 
        </el-tabs>    
    </div>
</template>

<script>
import StockInPlanContent from '@/components/StockIn/StockInPlanContent';
export default {
    name: 'StockInPlan',
    components: {
        StockInPlanContent
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
