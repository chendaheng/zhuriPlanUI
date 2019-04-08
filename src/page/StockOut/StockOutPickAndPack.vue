<template>
  <div style="padding: 0px 20px">
    <StockOutPickAndPackContent :relatedParams='relatedParams'></StockOutPickAndPackContent>
  </div>
</template>

<script>
import StockOutPickAndPackContent from "@/components/StockOut/StockOutPickAndPackContent";
export default {
  name: "StockOutPickAndPack",
  components: {
    StockOutPickAndPackContent
  },
  data() {
    return {
      relatedParams: {
        stockOutSerialNo: '',
      },
    }
  },
  mounted: function () {
    const that = this;
    console.log(`route.query`, that.$route.query);
    let stockOutSerialNo = that.$route.query.stockOutSerialNo;
    if (stockOutSerialNo !== undefined) {
      that.relatedParams['stockOutSerialNo'] = stockOutSerialNo;
    }
  },
};
</script>

<style lang="less" scoped>
</style>
