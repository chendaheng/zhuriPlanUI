<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">关联类型</div>
            <el-select v-model="outPlanReceive.params.vouchType" clearable placeholder="请选择">
              <el-option
                v-for="item in outPlanReceive.options.vouchTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">关联单号</div>
            <el-input v-model="outPlanReceive.params.vouchSerialNo" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">到货日期</div>
            <el-date-picker v-model="outPlanReceive.params.receivingDate" type="date" placeholder="请选择日期"></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">接收仓库</div>
            <el-select v-model="outPlanReceive.params.warehouse" clearable placeholder="请选择">
              <el-option
                v-for="item in outPlanReceive.options.warehouseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">收货地址</div>
            <el-select v-model="outPlanReceive.params.receivingAddr" clearable placeholder="请选择">
              <el-option
                v-for="item in outPlanReceive.options.receivingAddrOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">收货人</div>
            <el-select v-model="outPlanReceive.params.operUser" clearable placeholder="请选择">
              <el-option
                v-for="item in outPlanReceive.options.operUserOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">发货单位</div>
            <el-select v-model="outPlanReceive.params.delivery" clearable placeholder="请选择">
              <el-option
                v-for="item in outPlanReceive.options.deliveryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">发货地址</div>
            <el-select v-model="outPlanReceive.params.deliveryAddr" clearable placeholder="请选择">
              <el-option
                v-for="item in outPlanReceive.options.deliveryAddrOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">附件id</div>
            <el-input v-model="outPlanReceive.params.attachmentId" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <div class="bar">
            <div class="title">收货备注</div>
            <el-input v-model="outPlanReceive.params.note" type="textarea" clearable :rows="3" style="margin-left: 30px"></el-input>
          </div>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button type="primary" @click="receiveClick()">确认收货</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row>
        <el-col :span="2">
          <el-button type="primary" size="medium" @click="addDetailClick()">新增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" size="medium" @click="delDetailClick()">删除</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="outPlanDetail"
        max-height="400"
        border
        @selection-change="changeCheckBoxFun"
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px">
        <el-table-column width="50" type="selection" align="center"></el-table-column>
        <el-table-column prop="materialCode" label="物料编码" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.materialCode"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="specification" label="规格" align="center"></el-table-column>
        <el-table-column prop="unit" label="计量单位" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.unit">
              <el-option label="计量单位1" value="1"></el-option>
              <el-option label="计量单位2" value="2"></el-option>
              <el-option label="计量单位3" value="3"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="receivingQuantity" label="到货数量" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.receivingQuantity"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" align="center"></el-table-column>
        <el-table-column prop="totalPrice" label="到货总金额" align="center"></el-table-column>
        <el-table-column prop="note" label="备注" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.note"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      outPlanReceive: {
        params: {
          vouchType: "",
          vouchSerialNo: "",
          receivingDate: "",
          warehouse: "",
          receivingAddr: "",
          operUser: "",
          delivery: "",
          deliveryAddr: "",
          attachmentId: 0,
          note: "",
        },
        options: {
          vouchTypeOptions: [
            {
              value: 1,
              label: "采购单号"
            },
            {
              value: 2,
              label: "委托加工单号"
            },
            {
              value: 3,
              label: "生产单号"
            },
            {
              value: 4,
              label: "销售单号"
            },
            {
              value: 5,
              label: "生产退回单号"
            },
            {
              value: 6,
              label: "其他入库单号"
            }
          ],
          warehouseOptions: [
            {
              value: 3331,
              label: "仓库1"
            },
            {
              value: 3332,
              label: "仓库2"
            },
            {
              value: 3333,
              label: "仓库3"
            }
          ],
          receivingAddrOptions: [
            {
              value: 33100,
              label: "接收地址1"
            },
            {
              value: 33200,
              label: "接收地址2"
            },
            {
              value: 33300,
              label: "接收地址3"
            },
          ],
          operUserOptions: [
            {
              value: 3301,
              label: "收货人1"
            },
            {
              value: 3302,
              label: "收货人2"
            },
            {
              value: 3303,
              label: "收货人3"
            }
          ],
          deliveryOptions: [
            {
              value: 66601,
              label: "苏州供应商"
            },
            {
              value: 66602,
              label: "无锡供应商"
            },
          ],
          deliveryAddrOptions: [
            {
              value: 666010,
              label: "苏州制造工厂"
            },
            {
              value: 666020,
              label: "无锡制造工厂"
            },
          ],
        }
      },
      value: '',
      outPlanDetail: [
        {
          index: 0,
          materialCode: '',
          specification: '',
          unit: '',
          receivingQuantity: '',
          price: '',
          totalPrice: '',
          note: '',
        },
        // {
        //   materialCode: '',
        //   specification: '',
        //   unit: '',
        //   receivingQuantity: '',
        //   price: '',
        //   totalPrice: '',
        //   note: '',
        // }
      ],
      multipleSelection: [],
      controlData:{
        receivingCount: 0,
        qualityTestCount: 0,
        isAddreceivingRecord: false,
        isAddreceivingRecordDetail: false,
        receiveDetailCount: 0,
        testDetailCount: 0,
        indexCount: 0,
      },
    };
  },
  created: function (){
    const that = this;
    console.log("进入非计划收货画面");
    that.controlData.isAddreceivingRecord = false;
    that.controlData.isAddreceivingRecordDetail = false;
    console.log("重置标志位成功");
    that.getLastReceivingRecord();
    that.getLastQualityTestRecordId();
  },
  methods: {
    // 选择框改变监控
    changeCheckBoxFun(val){
      const that = this;
      that.multipleSelection = val;
      console.log("changeCheckBox所选中的内容如下");
      console.log(that.multipleSelection);
      console.log("changeCheckBox所选中的内容的长度为",that.multipleSelection.length);
    },
    // ------------------------------------ 工具函数 ------------------------------------
    // 改变时间格式
    changeDate(date){
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var second= date.getSeconds();
      second = minute < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+ second;
    },
    // 获取系统时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
      return currentdate;
    },
    // 获取最后一条收货记录的id
    getLastReceivingRecord(){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/getLastReceivingRecordId`)
        .then(response => {
          // console.log(response.data);
          that.controlData.receivingCount = parseInt(response.data) + 1;
          console.log("receivingCount:" + that.controlData.receivingCount);
          console.log(`获取最后一条收货记录的id成功`);
        })
        .catch(error => {
          console.log(`获取最后一条收货记录的id失败`);
        });
    },
    // 获取最后一条检验记录的id
    getLastQualityTestRecordId(){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/getLastQualityTestRecordId`)
        .then(response => {
          // console.log(response.data);
          that.controlData.qualityTestCount = parseInt(response.data) + 1;
          console.log("qualityTestCount:" + that.controlData.qualityTestCount);
          console.log(`获取最后一条检验记录的id成功`);
        })
        .catch(error => {
          console.log(`获取最后一条检验记录的id失败`);
        });
    },
    // 新增收货记录
    addReceivingRecord(params){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/addReceivingRecord`, params)
        .then(response => {
         if(response.data === 1){
          console.log(`成功新增`+ (response.data).toString() +`条收货记录`);
            // 新增检验记录
            let qualityTestRecordParams = {
              qualityTestSerialNo: "test" + (that.controlData.qualityTestCount).toString(),
              receivingSerialNo: "receive" + (that.controlData.receivingCount).toString(),
            }
            console.log("检验记录params");
            console.log(qualityTestRecordParams);
            that.addQualityTestRecord(qualityTestRecordParams);
            var outPlanDetailData = that.multipleSelection;
            that.controlData.receiveDetailCount = outPlanDetailData.length;
            that.controlData.testDetailCount = outPlanDetailData.length;
            for (var i = 0; i < outPlanDetailData.length; i++){
              var result = outPlanDetailData[i];
              // 新增收货记录明细
              let receivingRecordDetailsParams = {
                receivingSerialNo: "receive" + (that.controlData.receivingCount).toString(),
                planSerialNo: "noPlan",
                materialCode: result.materialCode,
                unitId: parseInt(result.unit),
                receivingQuantity: parseInt(result.receivingQuantity),
                note: result.note,
              }
              console.log("收货记录明细Params");
              console.log(receivingRecordDetailsParams);
              that.addReceivingRecordDetail(receivingRecordDetailsParams);
              // 新增检验记录明细
              let qualityTestRecordDetailParams = {
                qualityTestSerialNo: "test" + (that.controlData.qualityTestCount).toString(),
                receivingSerialNo: "receive" + (that.controlData.receivingCount).toString(),
                materialCode: result.materialCode,
                unitId: parseInt(result.unit),
                qualityTestQuantity: parseInt(result.receivingQuantity),
                result: "未检验",
              }
              console.log("检验记录明细params");
              console.log(qualityTestRecordDetailParams);
              that.addQualityTestRecordDetail(qualityTestRecordDetailParams);
            }
          } 
        })
        .catch(error => {
          console.log(`新增收货记录失败`, error);
          this.$message.error('收货出错');
        });
    },
    // 新增收货记录明细
    addReceivingRecordDetail(params){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/addReceivingRecordDetail`, params)
        .then(response => {
          if(response.data === 1){
            console.log(`成功新增`+ (response.data).toString() +`条收货记录明细`);
            that.controlData.receiveDetailCount = that.controlData.receiveDetailCount - 1;
            if(that.controlData.receiveDetailCount === 0){
              this.$message({
                message: '此次非计划收货成功',
                type: 'success'
              });
            }
          }
        })
        .catch(error => {
          console.log(`新增收货记录明细失败`,error);
          this.$message.error('收货出错');
        });
    },
    // 新增检验记录
    addQualityTestRecord(params){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/addQualityTestRecord`, params)
        .then(response => {
          if(response.data === 1){
            console.log(`成功新增`+ (response.data).toString() +`条检验记录`);
          }
        })
        .catch(error => {
          console.log(`新增检验记录失败`);
        });
    },
    // 新增检验记录明细
    addQualityTestRecordDetail(params){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/addQualityTestRecordDetail`, params)
        .then(response => {
          if(response.data === 1){
            console.log(`成功新增`+ (response.data).toString() +`条检验记录明细`);
            that.controlData.testDetailCount = that.controlData.testDetailCount - 1;
            if(that.controlData.testDetailCount === 0){
              console.log(`成功自动保存对应的检验信息`);
            }
          }
        })
        .catch(error => {
          console.log(`新增检验记录明细失败`);
        });
    },
    // ------------------------------------ 业务函数 ------------------------------------
    // 确认收货
    receiveClick(){
      const that = this;
      console.log(`确认收货按钮点击`);
      var currentdate = that.getNowFormatDate();
      console.log(`当前系统时间为` + currentdate);
      var receivingRecordsData = that.outPlanReceive.params;
      var dateError = 0;
      try{
        var date = that.changeDate(receivingRecordsData.receivingDate);
        console.log("选择的收货日期为" + date);
        if(date > currentdate){
            console.log("收货日期不能为未来日期");
            this.$message.error("收货日期不能为未来日期");
            dateError = 1;
          }
      }
      catch(err){
        console.log("收货日期缺失");
        this.$message.error("收货日期缺失");
        dateError = 2;
      }
      if(dateError == 0){
        // 新增收货记录
        let receivingRecordParams = {
          receivingSerialNo: "receive" + (that.controlData.receivingCount).toString(),
          planSerialNo: "noPlan",
          vouchSerialNo: receivingRecordsData.vouchSerialNo,
          vouchType: receivingRecordsData.vouchType,
          entryType: receivingRecordsData.vouchType, // entryType和vouchType一样
          deliveryId: receivingRecordsData.delivery,
          deliveryAddrId: receivingRecordsData.deliveryAddr,
          receivingDate: date,
          warehouseId: receivingRecordsData.warehouse,
          receivingAddrId: receivingRecordsData.receivingAddr,
          operUserId: receivingRecordsData.operUser,
          attachmentId: receivingRecordsData.attachmentId,
          note: receivingRecordsData.note,
          noPlanFlag: 0,
        }
        console.log("收货记录params");
        console.log(receivingRecordParams);
        if(that.multipleSelection.length === 0){
          this.$message({
            message: '请选中收入的物料信息',
            type: 'warning'
          });
        }
        else{
          that.addReceivingRecord(receivingRecordParams);
        }
      }
    },
    // 新增按钮点击
    addDetailClick(){
      const that = this;
      console.log(`新增按钮点击`);
      that.controlData.indexCount = that.controlData.indexCount + 1;
      let newDetailParams = {
        index: that.controlData.indexCount,
        materialCode: '',
        specification: '',
        unit: '',
        receivingQuantity: '',
        price: '',
        totalPrice: '',
        note: '',
      }
      that.outPlanDetail.push(newDetailParams);
      console.log(`当前Detail的个数为`,that.outPlanDetail.length);
    },
    // 删除按钮点击
    delDetailClick(){
      const that = this;
      console.log(`删除按钮点击`);
      if(that.multipleSelection.length === 0){
        this.$message({
          message: '未选择任何选项，无法删除',
          type: 'warning'
        });
      }
      else{
        console.log(`有数据被选中`);
        for (var i = 0; i < that.multipleSelection.length; i++){
          var result = that.multipleSelection[i];
          var delIndex = result["index"];
          console.log('delIndex',delIndex);
          for(var j = 0; j < that.outPlanDetail.length; j++){
            var delResult = that.outPlanDetail[j];
            if (delResult["index"] === delIndex){
              that.outPlanDetail.splice(j,1);
            }
          }
        }
      }
    }  
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .el-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        font-size: 18px;
        width: 90px;
        min-width: 50px;
        text-align: center;
      }
      .el-input {
        width: 70%;
        min-width: 80px;
        margin-left: 20px;
      }
      .el-select {
        width: 70%;
        min-width: 80px;
        margin-left: 20px;
      }
    }
  }
}
</style>
