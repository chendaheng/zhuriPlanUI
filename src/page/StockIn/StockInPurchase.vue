<template>
  <div class="body">
    <el-card class="box-card">
      <el-col :span="21">
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="bar">
              <div class="title">入库单号</div>
              <el-input v-model="warehouseStockInRecord.params.entrySerialNo" clearable placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">入库日期</div>
              <el-date-picker
                v-model="warehouseStockInRecord.params.entryDate"
                type="date"
                placeholder="选择日期"
                clearable>
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">入库人</div>
              <el-select v-model="warehouseStockInRecord.params.operUser" clearable placeholder="请选择">
                <el-option
                  v-for="item in warehouseStockInRecord.options.operUserOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="bar">
              <div class="title">收入仓库</div>
              <el-select v-model="warehouseStockInRecord.params.warehouse" clearable placeholder="请选择">
                <el-option
                  v-for="item in warehouseStockInRecord.options.warehouseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">部门</div>
              <el-select v-model="warehouseStockInRecord.params.dept" clearable placeholder="请选择">
                <el-option
                  v-for="item in warehouseStockInRecord.options.deptOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">供应商</div>
              <el-select v-model="warehouseStockInRecord.params.delivery" clearable placeholder="请选择">
                <el-option
                  v-for="item in warehouseStockInRecord.options.deliveryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="bar">
              <div class="title">关联订单</div>
              <el-input v-model="warehouseStockInRecord.params.vouchSerialNo" clearable placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col :span="16">
            <el-button type="text" disabled>查看关联订单</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="bar">
              <div class="title">备注</div>
              <el-input v-model="warehouseStockInRecord.params.note" type="textarea" :rows="3" style="margin-left:20px"></el-input>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" style="width: 100%; margin: 0 15px 30px" @click="createStockInFormClick">创建入库单</el-button>
        <!-- <div v-else>
          <el-button type="success" style="width: 100%; margin: 0 15px 30px" @click="shelfDetail">上架</el-button>
          <el-button type="danger" style="width: 100%; margin: 0 15px 10px">确认入库</el-button>
        </div> -->
      </el-col>
    </el-card>
    <el-card class="box-card" v-show="controlData.hasDetails">
      <el-row :gutter="10">
        <el-col :span="2">
          <el-button type="info" size="small" disabled>添加</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" size="small" disabled>删除</el-button>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title" style="min-width: 50px">条码</div>
            <el-input v-model="barCode" clearable placeholder="扫描条码增加数据" style="margin-left: 0"></el-input>
          </div>
        </el-col>
        <el-col :span="12" :offset="2">
          <div class="bar">
            <div class="title" style="width: 100px">入库金额：</div>
            <div style="font-size: 18px;margin-right: 30px;width: 100px">{{ammount}}元</div>
            <div class="title" style="width: 180px">入库金额（含税）：</div>
            <div style="font-size: 18px;width: 100px">{{taxAmmount}}元</div>
          </div>
        </el-col>
      </el-row>
      <el-table
        :data="warehouseStockInRecord.details"
        max-height="400"
        border
        @selection-change="changeCheckBoxFun"
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px">
        <el-table-column width="50" type="selection" align="center"></el-table-column>
        <el-table-column prop="materialCode" label="商品编号" align="center"></el-table-column>
        <el-table-column prop="materialName" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="format" label="规格" align="center"></el-table-column>
        <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
        <el-table-column prop="batchCode" label="批号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.batchCode"></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="entryQuantity" label="入库数量" align="center"></el-table-column> -->
        <el-table-column prop="entryQuantity" label="入库数量" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.entryQuantity"></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="price" label="单价" align="center"></el-table-column> -->
        <el-table-column prop="price" label="单价" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="ammount" label="金额" align="center"></el-table-column>
        <el-table-column prop="ticket" label="开票" align="center"></el-table-column>
        <el-table-column prop="tax" label="税率" align="center"></el-table-column>
        <!-- <el-table-column prop="taxPrice" label="含税单价" align="center"></el-table-column> -->
        <el-table-column prop="taxPrice" label="含税单价" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.taxPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="taxAmmount" label="含税金额" align="center"></el-table-column>
        <el-table-column prop="note" label="备注" align="center"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      warehouseStockInRecord: {
        params: {
          planSerialNo: '',
          entrySerialNo: '',
          entryType: '',
          vouchSerialNo: '',
          vouchType: '',
          warehouse: '',
          dept: '',
          operUser: '',
          delivery: '',
          entryDate: '',
          note: '',
        },
        details:[
          {
            materialCode: '',
            materialName: '',
            format: '',
            unit: '',
            batchCode: '',
            entryQuantity: '',
            price: '',
            ammount: '',
            ticket: '',
            tax: '',
            taxPrice: '',
            taxAmmount: '',
            note: '',
          }
        ],
        options: {
          operUserOptions: [
            {
              value: 333001,
              label: "入库人员1"
            },
            {
              value: 333002,
              label: "入库人员2"
            },
            {
              value: 333003,
              label: "入库人员3"
            },
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
          deptOptions: [
            {
              value: 333111,
              label: "入库部门1"
            },
            {
              value: 333112,
              label: "入库部门2"
            },
            {
              value: 333113,
              label: "入库部门3"
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
        },
      },
      multipleSelection: [],
      controlData:{
        hasDetails: true,
        isFromPlan :false,
        isFromTest: false,
        stockInCount: 0,
        DetailDataCount: 0,
        qualityTestSerialNo: "",
      },
      barCode: '',
      ammount: 0,
      taxAmmount: 0,
      // warehouseStockInRecordDetail: [],
    }
  },
  created() {
    // 获取入库记录数据
    const that = this;
    // that.warehouseStockInRecord.params = that.$route.params;
    console.log("进入入库画面");
    console.log(`route` + that.$route);
    that.controlData.isFromPlan = false;
    that.controlData.isFromTest = false;
    var result = {};
    result = that.$route.query;
    if (result != null){
      that.controlData.isFromPlan = result["isFromPlan"];
      that.controlData.isFromTest = result["isFromTest"];
    }
    console.log(`isFromPlan控制数据为` + that.controlData.isFromPlan);
    console.log(`isFromTest控制数据为` + that.controlData.isFromTest);
    that.getLastStockInRecordId();
    if(that.controlData.isFromPlan == true){
      console.log("数据从计划页面读取");
      var i = 0;
      that.warehouseStockInRecord.params = result;
      for (let key in that.warehouseStockInRecord.params){
        if (key === "warehouseId"){
          that.warehouseStockInRecord.params.warehouse = parseInt(result["warehouseId"]);
        }
        if (key === "deptId"){
          that.warehouseStockInRecord.params.dept = parseInt(result["deptId"]);
        }
        if (key === "deliveryId"){
          that.warehouseStockInRecord.params.delivery = parseInt(result["deliveryId"]);
        }
        if (key === "note"){
          that.warehouseStockInRecord.params.note = "";
        }
      }
      console.log("所加载的入库记录信息如下");
      console.log(that.warehouseStockInRecord.params);
      console.log(that.warehouseStockInRecord.params.warehouse);
      let params = {
          planSerialNo: result["planSerialNo"],
          // needEntryQuantity: 1
      }
      that.getStockInPlanDetailByPlanSerialNo(params);
    }
    if(that.controlData.isFromTest == true){
      console.log("数据从检验列表页面读取");
      that.controlData.qualityTestSerialNo = result["qualityTestSerialNo"];
      let params = {
        qualityTestSerialNo: that.controlData.qualityTestSerialNo,
      }
      that.getPlanDataByQualityTestSerialNo(params);
    }
  },
  computed: {
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
    ///// di
    // init() {
    //   const that = this;
    //   that.warehouseStockInRecordDetail.forEach(element => {
    //     // 将table中ammount,tax,taxAmmount属性更新
    //     element.ammount = element.entryQuantity * element.price;
    //     element.tax = (element.taxPrice-element.price)/element.price*100 + '%';
    //     element.taxAmmount = element.entryQuantity * element.taxPrice;
    //     // 获取总入库金额和总入库（含税）金额
    //     that.ammount += element.ammount;
    //     that.taxAmmount += element.taxAmmount;
    //   });
    // },
    ///// di
    // ------------------------------------ 工具函数 ------------------------------------
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
    // 改变时间格式
    changeDate(date){
      // var date = new Date(date);
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
    // 睡眠
    sleep(numberMillis) {
      var now = new Date();
	    var exitTime = now.getTime() + numberMillis;
	    while (true) {
		    now = new Date();
		    if (now.getTime() > exitTime)
		    return;
	    }
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
    // 获取最后一条入库记录的id
    getLastStockInRecordId(){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/getLastStockInRecordId`)
        .then(response => {
          // console.log(response.data);
          that.controlData.stockInCount = parseInt(response.data) + 1;
          console.log("stockInCount:" + that.controlData.stockInCount);
          console.log(`获取最后一条入库记录的id成功`);
        })
    },
    // 根据入库计划流水号获取相应的入库计划明细(入库计划流水号跳转时传递)
    getStockInPlanDetailByPlanSerialNo(params){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/getStockInPlanDetailByPlanSerialNo`, params)
        .then(response => {
          var result = response.data;
          for (var i = 0; i < result.length; i++){
            var thisResult = result[i];
            result[i]["note"] = "";
            result[i]["materialName"] = "商品名称" + result[i]["materialCode"];
            if (thisResult.hasOwnProperty("specification")){ // 规格
              var format = thisResult["specification"];
              result[i]["format"] = format.toString();
            }
            if (thisResult.hasOwnProperty("unitId")){
              var unit = thisResult["unitId"];
              result[i]["unit"] = "计量单位" + unit.toString();
            }
          }
          that.warehouseStockInRecord.details = result;
          that.warehouseStockInRecord.params.entrySerialNo = "entry" + (that.controlData.stockInCount).toString();
          console.log(`加载计划部分读取的明细成功，加载流水号为：`, params.planSerialNo);
        })
        .catch(error => {
            console.log(`加载计划部分读取的明细失败，流水号为：`, params.planSerialNo);
        });
    },
    // 增加入库记录
    addWarehouseStockInRecord(params){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/addWarehouseStockInRecord`, params)
        .then(response => {
          if(response.data === 1){
            console.log(`成功新增`+ (response.data).toString() +`条入库记录`);
            // 新增入库记录明细
            var addDetailData = that.multipleSelection;
            that.controlData.DetailDataCount = addDetailData.length;
            for (var i = 0; i < addDetailData.length; i++){
              console.log(i);
              var result = addDetailData[i];
              let stockInDetailParams = {
                entrySerialNo:  "entry" + (that.controlData.stockInCount).toString(),
                materialCode: result.materialCode,
                batchCode: result.batchCode,
                unitId: parseInt(result.unitId),
                entryQuantity: result.entryQuantity,
                restQuantity: result.entryQuantity, // 剩余数量添加记录时和入库数量一样
                price : result.price,
                taxPrice: result.taxPrice,
                note: result.note
              }
              console.log("入库记录明细params");
              console.log(stockInDetailParams);
              that.addWarehouseStockInRecordDetail(stockInDetailParams);
            }
          }
        })
        .catch(error => {
          console.log(`新增入库记录失败`);
          this.$message.error('新增入库记录失败');
        });
    },
    // 增加入库记录明细
    addWarehouseStockInRecordDetail(params){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/addWarehouseStockInRecordDetail`, params)
        .then(response => {
          if(response.data === 1){
            console.log(`成功新增`+ (response.data).toString() +`条入库记录明细`);
            that.controlData.DetailDataCount = that.controlData.DetailDataCount-1;
            console.log(`当前DetailDataCount的值为`+ that.controlData.DetailDataCount);
            if(that.controlData.DetailDataCount === 0){
              // 更新入库计划
              console.log(`planSerialNo`,that.warehouseStockInRecord.params.planSerialNo);
              let updateParams = {
                planSerialNo: that.warehouseStockInRecord.params.planSerialNo,
                operation: 3,
              }
              console.log("更新入库计划params",updateParams);
              that.updateStockInPlanByParams(updateParams);
              this.$message({
                message: '已成功保存入库信息',
                type: 'success'
              });
            }
          }
          
        })
        .catch(error => {
          console.log(`新增入库记录明细失败`);
        });
    },
    //根据检验单号获取入库计划信息
    getPlanDataByQualityTestSerialNo(params){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/getPlanDataByQualityTestSerialNo`, params)
        .then(response => {
          var result = response.data;
          var json0 = result[0];
          if(json0.hasOwnProperty("outPlanParams")){
            this.$message({
              message: '该检验单没有对应的计划,可能为非计划收货',
              type: 'warning'
            });
            let getOutPlanDataParams = {
              qualityTestSerialNo: that.controlData.qualityTestSerialNo,
            }
            that.getOutPlanDataByQualityTestSerialNo(getOutPlanDataParams);
          }
          else{
            // 计划数据
            var planData = result[0];
            planData[0]["operUserId"] = "";
            planData[0]["note"] = "";
            planData[0]["entrySerialNo"] = "entry" + (that.controlData.stockInCount).toString();
            if (planData[0].hasOwnProperty("warehouseId")){
              planData[0]["warehouse"] = planData[0]["warehouseId"];
            }
            if (planData[0].hasOwnProperty("deliveryId")){
              planData[0]["delivery"] = planData[0]["deliveryId"];
            }
            console.log(`显示的计划数据如下`);
            console.log(planData[0]);
            that.warehouseStockInRecord.params = planData[0];
            // 计划明细数据
            var planDetailData = result[1];
            console.log(planDetailData);
            for (var i = 0; i < planDetailData.length; i++){
              var thisResult = planDetailData[i];
              planDetailData[i]["note"] = "";
              planDetailData[i]["materialName"] = "商品名称" + planDetailData[i]["materialCode"];
              if (thisResult.hasOwnProperty("specification")){ // 规格
                var format = thisResult["specification"];
                planDetailData[i]["format"] = format.toString();
              }
              if (thisResult.hasOwnProperty("unitId")){
                var unit = thisResult["unitId"];
                planDetailData[i]["unit"] = "计量单位" + unit.toString();
              }
            }
            that.warehouseStockInRecord.details = planDetailData;
            console.log(`获取的入库计划流水号：` + that.warehouseStockInRecord.params.planSerialNo);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 根据检验单号获取非计划收货信息
    getOutPlanDataByQualityTestSerialNo(params){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/getPlanDataByQualityTestSerialNo`, params)
        .then(response => {
          var result = response.data;
          // 非计划收货数据
          var outplanData = result[1];
          outplanData[0]["entrySerialNo"] = "entry" + (that.controlData.stockInCount).toString();
          outplanData[0]["note"] = "";
          that.warehouseStockInRecord.params = outplanData[0];
          // 非计划收货数据明细
          var outplanDataDetail = result[2];
          for (var i = 0; i < outplanDataDetail.length; i++){
            var thisResult = outplanDataDetail[i];
            if (thisResult.hasOwnProperty("unitId")){
              var unit = thisResult["unitId"];
              outplanDataDetail[i]["unit"] = "计量单位" + unit.toString();
            }
            outplanDataDetail[i]["entryQuantity"] = 0;
            outplanDataDetail[i]["price"] = 0;
            outplanDataDetail[i]["taxPrice"] = 0;
            outplanDataDetail[i]["note"] = "";
          }
          that.warehouseStockInRecord.details = outplanDataDetail;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // ------------------------------------ 业务函数 ------------------------------------
    // 创建入库单按钮点击
    createStockInFormClick(){
      const that = this;
      console.log(`创建入库单按钮点击`);
      var currentdate = that.getNowFormatDate();
      console.log(`当前系统时间为` + currentdate);
      var stockInData = that.warehouseStockInRecord.params;
      var dateError = 0;
      try{
        var date = that.changeDate(stockInData.entryDate);
        console.log("选择的入库日期为" + date);
        if(date > currentdate){
          console.log("入库日期不能为未来日期");
          this.$message.error("入库日期不能为未来日期");
          dateError = 1;
        }
      }
      catch(err){
        console.log("入库日期缺失");
        this.$message.error("入库日期缺失");
        dateError = 2;
      }
      if (dateError == 0){
        // 新增入库记录
        let stockInParams = {
          entrySerialNo:  stockInData.entrySerialNo,
          entryType: stockInData.entryType,
          vouchSerialNo: stockInData.vouchSerialNo,
          vouchType: stockInData.vouchType,
          warehouseId: stockInData.warehouse,
          deptId: stockInData.dept,
          operUserId :stockInData.operUser,
          deliveryId: stockInData.delivery,
          entryDate: date,
          result: 1,
          note: stockInData.note
        }
        console.log("入库记录params");
        console.log(stockInParams);
        if(that.multipleSelection.length === 0){
          this.$message({
            message: '请选中需要入库的物料信息',
            type: 'warning'
          });
        }
        else{
          that.addWarehouseStockInRecord(stockInParams);
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
        width: 80px;
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
