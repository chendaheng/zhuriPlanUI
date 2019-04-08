<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <div class="searchOptions">
        <el-row :gutter="10">
          <!-- 搜索输入部分 -->
          <el-col :span="22">
            <!-- 第一行 -->
            <el-row :gutter="10" style="padding-bottom: 10px">
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">关联单号</div>
                  <div class="inputBar">
                    <el-input v-model=searchOptions.searchParams.vouchSerialNo placeholder="请输入关联单号"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">物料编码</div>
                  <div class="inputBar">
                    <el-input v-model=searchOptions.searchParams.materialCode placeholder="请输入物料编码"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="inputBox">
                  <div class="label">时间范围</div>
                  <el-date-picker
                  class="inputBar"
                  v-model='searchOptions.searchParams.dateRange'
                  type="daterange"
                  range-separator="至"
                  start-placeholde="开始日期"
                  end-placeholde="结束日期">
                  </el-date-picker>
                </div>
              </el-col>
            </el-row>
            <!-- 第二行 -->
            <el-row :gutter="10">
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">入库仓库</div>
                  <el-select class="inputBar" v-model="searchOptions.searchParams.warehouse" filterable placeholder="请选择入库仓库">
                    <el-option
                      v-for="item in searchOptions.options.warehouseOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">入库人员</div>
                  <el-select class="inputBar" v-model="searchOptions.searchParams.operUser" filterable placeholder="请选择入库人员">
                    <el-option
                      v-for="item in searchOptions.options.operUserOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">发货单位</div>
                  <el-select class="inputBar" v-model="searchOptions.searchParams.delivery" filterable placeholder="请选择发货单位">
                    <el-option
                      v-for="item in searchOptions.options.deliveryOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <!-- 搜索按钮部分 -->
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="handleRecordTableSearch()">搜索</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card style="margin-bottom: 20px">
      <div class="stockInRecords">
        <div class="stockInRecordTables" style="padding-bottom: 10px">
          <el-table
            :data="stockInRecords.stockInRecords"
            border
            :stripe='true'
            :highlight-current-row="true"
            @row-click='handleRecordTableClick'
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="entrySerialNo"
              label="入库单号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="stockInType"
              label="入库类型"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="vouchSerialNo"
              label="关联单号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="stockInResult"
              label="入库结果"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="entryDate"
              label="入库时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="warehouse"
              label="入库仓库"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="dept"
              label="入库部门"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="operUser"
              label="入库人员"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="delivery"
              label="发货单位"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleSheftFunction(scope.row)">上架</el-button>
                <el-button type="text" size="small" @click="handleVerifyFunction(scope.row)">确认入库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page=stockInRecords.pagination.currentPage
            :page-sizes=stockInRecords.pagination.pageSizes
            :page-size=stockInRecords.pagination.pageSize
            layout="total, sizes, prev, pager, next, jumper"
            :total=stockInRecords.pagination.total>
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-card style="margin-bottom: 20px" v-show="stockInRecordDetails.hasStockInRecordDetails">
      <div class="stockInRecordDetails">
        <el-table
          :data=stockInRecordDetails.stockInRecordDetails
          border
          :stripe='true'
          :highlight-current-row='true'
          style="width: 100%">
          <el-table-column
            fixed="left"
            label="序号"
            prop="index"
            width="90">
          </el-table-column>
          <el-table-column
            prop="materialCode"
            label="物料编码"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="format"
            label="规格"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="unit"
            label="计量单位"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="entryQuantity"
            label="入库数量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="price"
            label="物料单价"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="taxPrice"
            label="含税单价"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="note"
            label="备注"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "StockInListContent",
  data() {
    return {
      searchOptions:{
        searchParams:{
          vouchSerialNo: "", // 关联单号
          materialCode: "", // 物料编码
          warehouse: "", // 入库仓库
          operUser: "", // 入库员
          delivery: "", // 发货单位
          dateRange: "", // 时间范围
        },
        options: {
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
            },
          ],
          deliveryOptions: [
            {
              value: 66601,
              label: "苏州供应商"
            },
            {
              value: 66602,
              label: "无锡供应商"
            }
          ],
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
          supplierOptions: [
            {
              value: 66601,
              label: "苏州供应商"
            },
            {
              value: 66602,
              label: "无锡供应商"
            }
          ],
        },
      },
      stockInRecords: {
        stockInRecords:[
          {
            entrySerialNo: "entry001",
            stockInType: "采购入库",
            vouchSerialNo: "pur001",
            vouchType: 1,
            entryDate: "2018-10-03",
            warehouse: "仓库1",
            dept: "入库部门1",
            operUser: "入库员1",
            delivery: "江阴供应商",
            stockInResult: "已入库",
            note: "备注1",
          },
          {
            entrySerialNo: "entry002",
            stockInType: "采购入库",
            vouchSerialNo: "pur002",
            vouchType: 1,
            entryDate: "2018-10-06",
            warehouse: "仓库2",
            dept: "入库部门2",
            operUser: "入库员2",
            delivery: "无锡供应商",
            stockInResult: "已入库",
            note: "备注2",
          }
        ],
        stockInSearchResults: [

        ],
        pagination: {
          currentPage: 1,
          pageSizes: [5, 10, 20, 30, 50],
          pageSize: 5,
          total: 400,
        }
      },
      stockInRecordDetails:{
        hasStockInRecordDetails: false,
        stockInRecordDetails: [
          {
            index: "1",
            materialCode: "10001",
            format: "规格1",
            unit: "米",
            entryQuantity: "100",
            price: "50",
            taxPrice: "55",
            note: "备注1",
          },
          {
            index: "2",
            materialCode: "10002",
            format: "规格2",
            unit: "米",
            entryQuantity: "150",
            price: "60",
            taxPrice: "65",
            note: "备注5",
          }
        ],
      },
      controlData: {
        searchControl: false,
      },
    };
  },
  created: function () {
    const that = this;
    console.log(`paramsType`, that.paramsType);
    console.log(`preDefinedType`, that.preDefinedType);
    if (that.preDefinedType === that.paramsType) {
      console.log('获取类型'+that.paramsType+'的所有入库记录');
      let params = {
        page : 1,
        number : that.stockInRecords.pagination.pageSize,
        entryType : parseInt(that.paramsType)
      }
      that.getAllWarehouseStockInRecordByEntryType(params);
      that.getWarehouseStockInRecordByPage(params);
    }
  },
  props: ['preDefinedType', 'paramsType'],
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
    //获取当前入库类型下所有入库记录
    getAllWarehouseStockInRecordByEntryType(params){
      const that = this;
      var jsonLength = 0;
      that.$axios
      .post(`${window.$config.HOST}/warehouse/stockIn/getAllWarehouseStockInRecordByEntryType`, params)
      .then(response => {
        for (var item in response.data){
          jsonLength++;
        }
        that.stockInRecords.pagination.total = jsonLength;
        console.log(`该入库类型下所有的入库单数量为`+ that.stockInRecords.pagination.total);

      })
      .catch(error => {
        console.log(`加载出错，加载类别为` + that.paramsType, error);
      });
    },
    // 改变入库计划显示内容
    changeStockInPlan(result){
      for (var i = 0; i < result.length; i++){
        var thisResult = result[i];
        if (thisResult.hasOwnProperty("entryType")){
          var stockInType = "";
          if (parseInt(thisResult["entryType"]) == 1){
            stockInType = "采购入库";
          }
          if (parseInt(thisResult["entryType"]) == 2){
            stockInType = "委外加工入库";
          }
          if (parseInt(thisResult["entryType"]) == 3){
            stockInType = "生产入库";
          }
          if (parseInt(thisResult["entryType"]) == 4){
            stockInType = "销售退货";
          }
          if (parseInt(thisResult["entryType"]) == 5){
            stockInType = "生产退货";
          }
          if (parseInt(thisResult["entryType"]) == 6){
            stockInType = "其他入库";
          }
          result[i]["stockInType"] = stockInType;
        }
        if (thisResult.hasOwnProperty("warehouseId")){
          var warehouse = '';
          if (parseInt(thisResult["warehouseId"]) == 3331){
            warehouse = "仓库1"
          }
          else if (parseInt(thisResult["warehouseId"]) == 3332){
            warehouse = "仓库2"
          }
          else if (parseInt(thisResult["warehouseId"]) == 3333){
            warehouse = "仓库3"
          }
          else {
            warehouse = thisResult["warehouseId"].toString();
          }
          result[i]["warehouse"] = warehouse;
        }
        if (thisResult.hasOwnProperty("deptId")){
          var dept = '';
          if (parseInt(thisResult["deptId"]) == 333111){
            dept = "入库部门1";
          }
          else if (parseInt(thisResult["deptId"]) == 333112){
            dept = "入库部门2";
          }
          else if (parseInt(thisResult["deptId"]) == 333113){
            dept = "入库部门3";
          }
          else{
            dept = thisResult["deptId"].toString();
          }
          result[i]["dept"] = dept;
        }
        if (thisResult.hasOwnProperty("operUserId")){
          var operUser = '';
          if (parseInt(thisResult["operUserId"]) == 333001){
            operUser = "入库人员1";
          }
          else if (parseInt(thisResult["operUserId"]) == 333002){
            operUser = "入库人员2";
          }
          else if (parseInt(thisResult["operUserId"]) == 333003){
            operUser = "入库人员3";
          }
          else{
            operUser = thisResult["operUserId"].toString();
          }
          result[i]["operUser"] = operUser;
        }
        if (thisResult.hasOwnProperty("deliveryId")){
          var delivery = '';
          if (parseInt(thisResult["deliveryId"]) == 66601){
            delivery = "苏州供应商"
          }
          else if (parseInt(thisResult["deliveryId"]) == 66602){
            delivery = "无锡供应商"
          }
          else{
            delivery = thisResult["deliveryId"].toString();
          }
          result[i]["delivery"] = delivery;
        }
        if (thisResult.hasOwnProperty("result")){
          var stockInResult = '';
          if (parseInt(thisResult["result"]) == 0){
            stockInResult = "未入库";
          }
          if (parseInt(thisResult["result"]) == 1){
            stockInResult = "已入库";
          }
          if (parseInt(thisResult["result"]) == 2){
            stockInResult = "确认入库";
          }
          result[i]["stockInResult"] = stockInResult;
        }
      }
      console.log(result);
      return result;
    },
    // 根据页码获取对应的入库记录
    getWarehouseStockInRecordByPage(params){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/getWarehouseStockInRecordByPage`, params)
        .then(response => {
          var result = response.data;
          that.stockInRecords.stockInRecords = that.changeStockInPlan(result);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 根据入库单号获取入库记录明细
    getWarehouseStockInRecordDetailByEntrySerialNo(params){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/getWarehouseStockInRecordDetailByEntrySerialNo`, params)
        .then(response => {
          var result = response.data;
          for (var i = 0; i < result.length; i++){
            var thisResult = result[i];
            result[i]["index"] = (i + 1).toString();
            if (thisResult.hasOwnProperty("specification")){
              var format = thisResult["specification"];
              result[i]["format"] = format.toString();
            }
            if (thisResult.hasOwnProperty("unitId")){
              var unit = thisResult["unitId"];
              result[i]["unit"] = "计量单位" + unit.toString();
            }
          }
          that.stockInRecordDetails.hasStockInRecordDetails = true;
          that.stockInRecordDetails.stockInRecordDetails = result;
          console.log(`加载明细成功，加载流水号为：`, params.entrySerialNo);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 更新入库记录
    updateWarehouseStockInRecord(params){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/updateWarehouseStockInRecord`, params)
        .then(response => {
          if(response.data === 1){
            console.log(`成功更新`+ (response.data).toString() +`条入库记录`);
            this.$message({
              message: '该批物料已经确认入库',
              type: 'success'
            }); 
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 显示搜索结果
    showSearchResults(result, page, size){
      const that = this;
      that.stockInRecordDetails.hasStockInRecordDetails = false;
      var showResults = [];
      var lenth = that.stockInRecords.pagination.total;
      var startNum = (page - 1) * size;
      var endNum = startNum + size;
      console.log(`endNum: ` + endNum);
      if (endNum > lenth){
        endNum = lenth;
      }
      for (var i = startNum; i < endNum; i++){
        showResults.push(result[i]);
      }
      that.stockInRecords.stockInRecords = that.changeStockInPlan(showResults);
    },
    // 根据条件搜索相应的入库记录
    searchStockInRecordByParams(params){
      const that = this;
      that.controlData.searchControl = true;
      var jsonLength = 0;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/searchStockInRecordByParams`, params)
        .then(response => {
          for (var item in response.data){
            jsonLength++;
          }
          that.stockInRecords.pagination.total = jsonLength;
          console.log(`总共搜索出`+ that.stockInRecords.pagination.total + `条数据`);
          that.stockInRecords.stockInSearchResults = response.data;
          console.log(that.stockInRecords.stockInSearchResults);
          var page = that.stockInRecords.pagination.currentPage;
          var number = that.stockInRecords.pagination.pageSize;
          that.showSearchResults(that.stockInRecords.stockInSearchResults, page, number);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 搜集搜索条件
    collectSearchOptions(){
      let result = {};
      const that = this;
      result["entryType"] = parseInt(that.paramsType);
      for (let key in that.searchOptions.searchParams){
        if (that.searchOptions.searchParams[key] !== "") {
          if (key === "warehouse"){
            result["warehouseId"] = that.searchOptions.searchParams[key];
          }
          else if(key === "operUser"){
            result["operUserId"] = that.searchOptions.searchParams[key];
          }
          else if (key === "delivery"){
            result["deliveryId"] = that.searchOptions.searchParams[key];
          }
          else if (key === "dateRange"){
            var dateRange = that.searchOptions.searchParams[key];
            var DateStart = that.changeDate(dateRange[0]);
            result["DateStart"] = DateStart;
            var DateEnd = that.changeDate(dateRange[1]);
            result["DateEnd"] = DateEnd;
          }
          else {
            result[key] = that.searchOptions.searchParams[key];
          }
        }
      }
      console.log(`搜索条件如下`);
      console.log(result);
      return result;
    },

    // ------------------------------------ 业务函数 ------------------------------------
    // 点击表格显示明细
    handleRecordTableClick(row, event, column){
      const that = this;
      console.log(`row`, row);
      if (column.label !== "操作") {
        console.log(`本行被点击，显示入库明细`);
        let params = {
          entrySerialNo: row.entrySerialNo,
        }
        console.log(params);
        that.getWarehouseStockInRecordDetailByEntrySerialNo(params);
      }
    },
    // 当前页码改变时触发函数
    handleCurrentChange(val) {
      const that = this;
      console.log(`页码改变，当前页为: ${val}`);
      that.stockInRecords.pagination.currentPage = val;
      if (that.controlData.searchControl === false){
        let params = {
          page : that.stockInRecords.pagination.currentPage,
          number : that.stockInRecords.pagination.pageSize,
          entryType : parseInt(that.paramsType)
        }
        console.log(`根据页码获取数据`);
        that.getWarehouseStockInRecordByPage(params);
      }
      else if (that.controlData.searchControl === true){
        console.log(`根据页码获取搜索到的数据`);
        var page = that.stockInRecords.pagination.currentPage;
        var number = that.stockInRecords.pagination.pageSize;
        that.showSearchResults(that.stockInRecords.stockInSearchResults,page,number);
      }
    },
    // 每页条数改变时触发函数
    handleSizeChange(val){
      const that = this;
      console.log(`每页 ${val} 条`);
      that.stockInRecords.pagination.pageSize = val;
      if (that.controlData.searchControl == false){
        let params = {
          page : that.stockInRecords.pagination.currentPage,
          number : that.stockInRecords.pagination.pageSize,
          entryType : parseInt(that.paramsType)
        }
        console.log(`根据条数刷新数据`);
        that.getWarehouseStockInRecordByPage(params);
      }
      else if (that.controlData.searchControl === true){
        console.log(`根据条数刷新搜索到的数据`);
        var page = that.stockInRecords.pagination.currentPage;
        var number = that.stockInRecords.pagination.pageSize;
        that.showSearchResults(that.stockInRecords.stockInSearchResults,page,number);
      }
    },
    // 搜索按键点击触发
    handleRecordTableSearch(){
      const that = this;
      console.log(`搜索按钮点击`);
      let params = that.collectSearchOptions();
      console.log(`条件搜集完毕`);
      that.searchStockInRecordByParams(params);
    },
    // 点击本行的上架
    handleSheftFunction(row){
      const that = this;
      console.log(`row = `, row);
      console.log(`点击了本行的上架`);
      if(row.result === 2){
        this.$message({
          message: '该记录已经上架完毕并确认，无法再次上架',
          type: 'warning'
        });
      }
      else{
        that.$router.push({
          path: `/StockIn/StockInShelf`,
          query: {
            warehouseId: row.warehouseId,
            entrySerialNo: row.entrySerialNo,
          }
        });
      }
    },
    // 点击本行的确认入库
    handleVerifyFunction(row){
      const that = this;
      console.log(`row = `, row);
      console.log(`点击了本行的确认入库`);
      let updateParams = {
        entrySerialNo: row.entrySerialNo,
        entryType: parseInt(row.vouchType),
        result: 2,
      }
      console.log("入库计划更新params");
      console.log(updateParams);
      if(row.result === 2){
        this.$message({
          message: '该物料已经确认完毕，无法再次确认',
          type: 'warning'
        });
      }
      else{
        that.updateWarehouseStockInRecord(updateParams);
      }
    }

  },
  // 监控paramsType的变化
  watch: {
    paramsType: function (val) {
      const that = this;
      console.log(`paramsType`, val);
      if (val === that.preDefinedType) {
        let params = {
          page : 1,
          number : that.stockInRecords.pagination.pageSize,
          entryType : parseInt(that.paramsType)
        }
        that.getAllWarehouseStockInRecordByEntryType(params);
        that.getWarehouseStockInRecordByPage(params);
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .inputBox {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .label {
            padding-left: 15px;
            font-size: 14px;
            min-width: 75px;
            white-space: nowrap;
        }
        .inputBar {
            width: 100%;
        }
    }
    .stockInRecords {
        .stockInRecordTables {
            max-height: 550px;
        }
        .pagination {
            display: flex;
            flex-direction: row-reverse;
        }
    }
    .stockInRecordDetails {
        max-height: 550px;
    }
</style>
