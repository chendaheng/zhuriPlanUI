<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-select v-model="receivingRecords.receivingRecordInputs.vouchType" clearable placeholder="请选择关联单据类型">
            <el-option
              v-for="item in receivingRecordOptions.vouchTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="receivingRecords.receivingRecordInputs.vouchSerialNo" clearable placeholder="请输入关联单号"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="handleVouchSerialNoSearch()">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="bar">
            <div class="title">到货日</div>
            <el-date-picker
              v-model="receivingRecords.receivingRecordInputs.receivingDate"
              type="date"
              placeholder="选择日期"
              clearable>
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">接收仓库</div>
            <el-select v-model="receivingRecords.receivingRecordInputs.warehouse" clearable placeholder="请选择">
              <el-option
                v-for="item in receivingRecordOptions.warehouseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">收货地址</div>
            <el-select v-model="receivingRecords.receivingRecordInputs.receivingAddr" clearable placeholder="请选择">
              <el-option
                v-for="item in receivingRecordOptions.receivingAddrOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">收货人</div>
            <el-select v-model="receivingRecords.receivingRecordInputs.operUser" clearable placeholder="请选择">
              <el-option
                v-for="item in receivingRecordOptions.operUserOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top: 20px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">到货状况</div>
            <el-select v-model="receivingRecords.receivingRecordInputs.receivingStatus" clearable placeholder="请选择">
              <el-option
                v-for="item in receivingRecordOptions.receivingStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">发货单位</div>
            <el-select v-model="receivingRecords.receivingRecordInputs.delivery" clearable placeholder="请选择">
              <el-option
                v-for="item in receivingRecordOptions.deliveryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">发货地址</div>
            <el-select v-model="receivingRecords.receivingRecordInputs.deliveryAddr" clearable placeholder="请选择">
              <el-option
                v-for="item in receivingRecordOptions.deliveryAddrOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">附件id</div>
            <el-input v-model="receivingRecords.receivingRecordInputs.attachmentId" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top: 20px">
        <el-col :span="12">
          <div class="bar">
            <div class="title">备注</div>
            <el-input v-model="receivingRecords.receivingRecordInputs.note" type="textarea" :rows="3" placeholder="请输入" style="margin-left:20px"></el-input>
          </div>
        </el-col>
        <el-col :span="6" style="text-align: center">
          <el-button type="text">查看原始单据</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="receiveClick()">确认收货</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-table
        :data="receivingRecords.receivingRecordDetails"
        max-height="400"
        border
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; text-align: center">
        <el-table-column label="序号" width="50" type="index" align="center"></el-table-column>
        <el-table-column prop="materialCode" label="物料编码" align="center"></el-table-column>
        <el-table-column prop="format" label="规格" align="center"></el-table-column>
        <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
        <el-table-column prop="planQuantity" label="计划到货数量" align="center"></el-table-column>
        <el-table-column prop="receivingQuantity" label="到货数量" align="center">
          <template slot-scope="scope">
            <el-input v-model="receivingRecords.receivingRecordDetails[scope.$index]['receivingQuantity']"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="到货总金额" align="center"></el-table-column>
        <el-table-column prop="note" label="备注" align="center">
          <template slot-scope="scope">
            <el-input v-model="receivingRecords.receivingRecordDetails[scope.$index]['note']"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "StockInReceiveContent",
  data() {
    return {
      searchOptions:{
          searchParams:{
            vouchType: "",
            vouchSerialNo: "",
          },
          options: {
          },
      },
      receivingRecords:{
        receivingRecordInputs: {
          planSerialNo: "",
          vouchType: "",
          vouchSerialNo: "",
          entryType:"",
          receivingDate: "",
          warehouse: "",
          receivingAddr: "",
          operUser: "",
          receivingStatus: "",
          delivery: "",
          deliveryAddr: "",
          attachmentId: "",
          note: "",
        },
        receivingRecordDetails:[
          {
            materialCode: "",
            format: "",
            unit: "",
            planQuantity: "",
            receivingQuantity: "",
            singlePrice: "",
            account: "",
            note: "",
          },
          // {
          //   materialCode: "10001",
          //   format: "规格1",
          //   unit: "米",
          //   planQuantity: "100",
          //   receivingQuantity: "0",
          //   singlePrice: "100",
          //   account: "0",
          //   note: "备注1",
          // },
          // {
          //   materialCode: "10002",
          //   format: "规格2",
          //   unit: "米",
          //   planQuantity: "200",
          //   receivingQuantity: "0",
          //   singlePrice: "200",
          //   account: "0",
          //   note: "备注2",
          // }
        ]
      },
      controlData:{
        receivingCount: 0,
        qualityTestCount: 0,
        isFromPlan :false,
        receiveDetailCount: 0,
        testDetailCount: 0,
      },
      receivingRecordOptions: {
        warehouseOptions:[
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
        deliveryOptions:[
          {
            value: 66601,
            label: "苏州供应商"
          },
          {
            value: 66602,
            label: "无锡供应商"
          },
        ],
        deliveryAddrOptions:[
          {
            value: 666010,
            label: "苏州制造工厂"
          },
          {
            value: 666020,
            label: "无锡制造工厂"
          },
        ],
        receivingAddrOptions:[
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
        operUserOptions:[
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
        receivingStatusOptions:[
          {
            value: 0,
            label: "未到货"
          },
          {
            value: 1,
            label: "部分到货"
          },
          {
            value: 2,
            label: "全部到货"
          },
          {
            value: 3,
            label: "超量到货"
          },
          {
            value: 4,
            label: "非计划收货"
          }
        ],
        vouchTypeOptions:[
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
        ]
      },
    };
  },
  created: function (){
    const that = this;
    console.log("进入收货画面");
    console.log(`route` + that.$route);
    that.controlData.isFromPlan = false;
    var result = {};
    result = that.$route.query;
    if (result != null){
      that.controlData.isFromPlan = result["isFromPlan"];
    }
    console.log(`控制数据为` + that.controlData.isFromPlan);
    that.getLastReceivingRecord();
    that.getLastQualityTestRecordId();
    if(that.controlData.isFromPlan == true){
      console.log("数据从计划页面读取");
      that.receivingRecords.receivingRecordInputs = result;
      var i = 0;
      for (let key in that.receivingRecords.receivingRecordInputs){
        if (key === "warehouseId"){
          that.receivingRecords.receivingRecordInputs.warehouse = parseInt(result["warehouseId"]);
        }
        if (key === "receivingAddrId"){
          that.receivingRecords.receivingRecordInputs.receivingAddr = result["receivingAddrId"];
        }
        if (key === "operUserId"){
          that.receivingRecords.receivingRecordInputs.operUser = result["operUserId"];
        }
        if (key === "deliveryId"){
          that.receivingRecords.receivingRecordInputs.delivery = result["deliveryId"];
        }
        if (key === "deliveryAddrId"){
          that.receivingRecords.receivingRecordInputs.deliveryAddr = result["deliveryAddrId"];
        }
        if (key === "note"){
          that.receivingRecords.receivingRecordInputs.note = "";
        }
      }
      console.log(result);
      console.log("receivingRecordInputs");
      console.log(that.receivingRecords.receivingRecordInputs);
      let params = {
        planSerialNo: result["planSerialNo"]
      }
      that.getStockInPlanDetailByPlanSerialNo(params);
    }
    else if(that.controlData.isFromPlan == false){
      console.log(`收货页面被单独使用，请进行搜索`);
    }
  },
  methods: {
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
    // 根据入库计划流水号获取相应的入库计划明细
    getStockInPlanDetailByPlanSerialNo(params, callback){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/getStockInPlanDetailByPlanSerialNo`, params)
        .then(response => {
          var result = response.data;
          for (var i = 0; i < result.length; i++){
            var thisResult = result[i];
            result[i]["note"] = "";
            if (thisResult.hasOwnProperty("specification")){
              var format = thisResult["specification"];
              result[i]["format"] = format.toString();
            }
            if (thisResult.hasOwnProperty("unitId")){
              var unit = thisResult["unitId"];
              result[i]["unit"] = "计量单位" + unit.toString();
            }
            if (thisResult.hasOwnProperty("planQuantity")){
              var stockInNum = thisResult["planQuantity"];
              result[i]["planQuantity"] = stockInNum.toString();
            }
            if (thisResult.hasOwnProperty("price")){
              var singlePrice = thisResult["price"];
              result[i]["singlePrice"] = singlePrice.toString();
            }
          }
          that.receivingRecords.receivingRecordDetails = result;
          console.log(`加载明细成功，加载流水号为：`, params.planSerialNo);
        })
        .catch(error => {
            console.log(`加载明细时出错，加载流水号为：`, params.planSerialNo);
        });
    if (callback !== undefined)
        return callback();
    },
    // 获取最后一条收货记录的id
    getLastReceivingRecord(){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/getLastReceivingRecordId`)
        .then(response => {
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
            that.controlData.receiveDetailCount = that.receivingRecords.receivingRecordDetails.length;
            that.controlData.testDetailCount = that.receivingRecords.receivingRecordDetails.length;
            console.log("需要新增" + that.receivingRecords.receivingRecordDetails.length + "条收货记录明细");
            for (var i = 0; i < that.receivingRecords.receivingRecordDetails.length; i++){
              var result = that.receivingRecords.receivingRecordDetails[i];
              // 新增收货记录明细
              let receivingRecordDetailsParams = {
                receivingSerialNo: "receive" + (that.controlData.receivingCount).toString(),
                planSerialNo: that.receivingRecords.receivingRecordInputs.planSerialNo,
                materialCode: result.materialCode,
                unitId: parseInt(result.unitId),
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
                unitId: parseInt(result.unitId),
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
          console.log(`新增收货记录失败`);
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
            that.controlData.receiveDetailCount = that.controlData.receiveDetailCount-1;
            if(that.controlData.receiveDetailCount === 0){
              // 更新入库计划的收货时间和状态
              var arrivalDate = that.changeDate(that.receivingRecords.receivingRecordInputs.receivingDate);
              let updateParams = {
                planSerialNo: that.receivingRecords.receivingRecordInputs.planSerialNo,
                operation: 1,
                arrivalDate: arrivalDate,
              }
              console.log("入库计划更新params");
              console.log(updateParams);
              that.updateStockInPlanByParams(updateParams);
              that.controlData.receivingCount += 1;
              console.log(that.controlData.receivingCount);
              this.$message({
                message: '该计划已经成功收货',
                type: 'success'
              });
            }
          }
        })
        .catch(error => {
          console.log(`新增收货记录明细失败`);
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
    // 更新入库计划
    updateStockInPlanByParams(params){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/updateStockInPlanByParams`, params)
        .then(response => {
          if(response.data === 1){
            console.log(`成功更新`+ (response.data).toString() +`条入库计划`);
          }
        })
        .catch(error => {
          console.log(`更新入库计划失败`);
        });
    },
    // 搜集搜索条件
    collectSearchOptions(){
      let result = {};
      const that = this;
      if(that.receivingRecords.receivingRecordInputs["vouchType"]!== ""){
        result["vouchType"] = that.receivingRecords.receivingRecordInputs["vouchType"];
      }
      if(that.receivingRecords.receivingRecordInputs["vouchSerialNo"]!== ""){
        result["vouchSerialNo"] = that.receivingRecords.receivingRecordInputs["vouchSerialNo"];
      }
      console.log("成功搜集搜索条件");
      console.log(result);
      return result;
    },
    // ------------------------------------ 业务函数 ------------------------------------
    // 点击搜索
    handleVouchSerialNoSearch(){
      const that = this;
      let params = that.collectSearchOptions();
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/searchStockInPlanByParams`, params)
        .then(response => {
          console.log(response.data[0]);
          // that.receivingRecords.receivingRecordInputs = response.data[0];
          that.receivingRecords.receivingRecordInputs.planSerialNo = response.data[0]["planSerialNo"];
          that.receivingRecords.receivingRecordInputs.vouchType = response.data[0]["vouchType"];
          that.receivingRecords.receivingRecordInputs.vouchSerialNo = response.data[0]["vouchSerialNo"];
          that.receivingRecords.receivingRecordInputs.entryType = response.data[0]["entryType"];
          that.receivingRecords.receivingRecordInputs.warehouse = response.data[0]["warehouseId"];
          that.receivingRecords.receivingRecordInputs.receivingAddr = response.data[0]["receivingAddrId"];
          that.receivingRecords.receivingRecordInputs.operUser = response.data[0]["operUserId"];
          that.receivingRecords.receivingRecordInputs.receivingStatus = response.data[0]["status"];
          that.receivingRecords.receivingRecordInputs.delivery = response.data[0]["deliveryId"];
          that.receivingRecords.receivingRecordInputs.deliveryAddr = response.data[0]["deliveryAddrId"];
          console.log(`搜索的数据为` + that.receivingRecords.receivingRecordInputs);
        })
        .catch(error => {
          console.log(`搜索出错，错误为：`, error);
        });
    },
    // 点击确认收货
    receiveClick(){
      const that = this;
      console.log(`确认收货按钮点击`);
      var currentdate = that.getNowFormatDate();
      console.log(`当前系统时间为` + currentdate);
      var nullCount = 0;
      for (var i = 0; i < that.receivingRecords.receivingRecordDetails.length; i++){
        var result = that.receivingRecords.receivingRecordDetails[i];
        // console.log(`循环` + i);
        if (isNaN(result.receivingQuantity) === true){
          nullCount = nullCount + 1;
        }
      }
      console.log(`nullCount的值为` + nullCount);
      if(nullCount >= 1){
        this.$message({
          message: '请输入全部物料的收货数量',
          type: 'warning'
        });
      }
      else{
        var receivingRecordsData = that.receivingRecords.receivingRecordInputs;
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
        if (dateError == 0){
          // 新增收货记录
          let receivingRecordParams = {
            receivingSerialNo: "receive" + (that.controlData.receivingCount).toString(),
            planSerialNo: receivingRecordsData.planSerialNo,
            vouchSerialNo: receivingRecordsData.vouchSerialNo,
            vouchType: receivingRecordsData.vouchType,
            entryType: receivingRecordsData.entryType,
            deliveryId: receivingRecordsData.delivery,
            deliveryAddrId: receivingRecordsData.deliveryAddr,
            receivingDate: date,
            warehouseId: receivingRecordsData.warehouse,
            receivingAddrId: receivingRecordsData.receivingAddr,
            operUserId: receivingRecordsData.operUser,
            receivingStatus: receivingRecordsData.receivingStatus,
            attachmentId: receivingRecordsData.attachmentId,
            note: receivingRecordsData.note,
          }
          console.log("收货记录params");
          console.log(receivingRecordParams);
          that.addReceivingRecord(receivingRecordParams);
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
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        font-size: 18px;
        min-width: 70px;
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
