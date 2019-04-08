<template>
  <div style="padding: 0px 20px">
    <StockOutDeliverContent :relatedParams="relatedParams"></StockOutDeliverContent>
  </div>
</template>

<script>
import StockOutDeliverContent from "@/components/StockOut/StockOutDeliverContent";
export default {
  name: 'StockOutDeliver',
  components: {
    StockOutDeliverContent,
  },
  data() {
    return {
      relatedParams: {},
    }
  },
  mounted() {
    const that = this;
    console.log(`route.query`, that.$route.query);
    let stockOutSerialNo = that.$route.query.stockOutSerialNo;
    if (stockOutSerialNo !== undefined) {
      let params = {
        stockOutSerialNo: stockOutSerialNo,
      };
      that.relatedParams = Object.assign({}, params);
    }
  }
};
</script>

<style lang="less" scoped>
</style>