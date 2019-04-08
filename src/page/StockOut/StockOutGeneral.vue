<template>
  <div style="padding: 0px 20px;">
    <StockOutGeneralContent
      relatedVouchLabel="关联单据编号："
      relatedVouchType='4'
      :relatedParams='relatedParams'
      @updateRelatedParams="updateRelatedParams"></StockOutGeneralContent>
  </div>
</template>

<script>
import StockOutGeneralContent from "@/components/StockOut/StockOutGeneralContent";
export default {
  name: "StockOutGeneral",
  components: {
    StockOutGeneralContent
  },
  data() {
    return {
      relatedParams: {
        isCreated: true,
      }
    }
  },
  mounted() {
    const that = this;
    console.log(`route.query`, that.$route.query);
    let isCreated = that.$route.query.isCreated;
    if (isCreated === false) {
      // 若是编辑出库单
      let stockOutSerialNo = that.$route.query.stockOutSerialNo;
      let recordId = that.$route.query.recordId;
      let vouchType = that.$route.query.vouchType;
      let tmpParams = {};
      if (stockOutSerialNo !== undefined) tmpParams['stockOutSerialNo'] = stockOutSerialNo;
      if (recordId !== undefined) tmpParams['recordId'] = recordId;
      if (vouchType !== undefined) tmpParams['vouchType'] = vouchType;
      tmpParams['isCreated'] = isCreated;
      console.log(`tmpParams = `, tmpParams);
      that.relatedParams = Object.assign({}, tmpParams);
    } else {
      // 若是新建出库单
      isCreated = true;
      let vouchSerialNo = that.$route.query.vouchSerialNo;
      let vouchType = that.$route.query.vouchType;
      let tmpParams = {};
      if (vouchSerialNo !== undefined) tmpParams['vouchSerialNo'] = vouchSerialNo;
      if (vouchType !== undefined) tmpParams['vouchType'] = vouchType;
      tmpParams['isCreated'] = isCreated;
      console.log(`tmpParams = `, tmpParams);
      that.relatedParams = Object.assign({}, tmpParams);
    }
  },
  methods: {
    updateRelatedParams (newVal) {
      const that = this;
      console.log(`emit updateRelatedParams`);
      that.relatedParams = Object.assign({}, newVal);
    }
  },
};
</script>

<style lang="less" scoped>
</style>


