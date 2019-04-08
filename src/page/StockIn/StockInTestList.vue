<template>
  <div>
    <el-card style="margin: 0 30px 20px 30px">
      <div class="searchOptions" style="padding-bottom: 10px">
        <el-row :gutter="10">
          <!-- 搜索输入部分 -->
          <el-col :span="22">
            <!-- 第一行 -->
            <el-row :gutter="10" style="padding-bottom: 10px">
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">检验员</div>
                    <el-select class="inputBar" v-model="searchOptions.searchParams.operUser" filterable placeholder="请选择检验员">
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
                  <div class="label">物料编码</div>
                    <div class="inputBar">
                      <el-input v-model=searchOptions.searchParams.materialCode placeholder="请输入物料编码"></el-input>
                    </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">SPU名称</div>
                    <div class="inputBar">
                      <el-input v-model=searchOptions.searchParams.spuName placeholder="请输入SPU名称"></el-input>
                    </div>
                </div>
              </el-col>
            </el-row>
            <!-- 第二行 -->
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="inputBox">
                  <div class="label">检验时间</div>
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
          </el-col>
          <!-- 搜索按钮部分 -->
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="handleTestTableSearch()">搜索</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card style="margin: 0 30px 20px 30px">
      <div class="tests">
        <div class="testTables" style="padding-bottom: 10px">
          <el-table
            :data="tests.tests"
            border
            :stripe='true'
            :highlight-current-row="true"
            @row-click='handleTestTableClick'
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="qualityTestSerialNo"
              label="检验单号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="receivingSerialNo"
              label="收货流水号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="qualityTestDate"
              label="检验时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="qualityTestAddr"
              label="检验场所"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="dept"
              label="检验部门"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="picker"
              label="检验领料人"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="operUser"
              label="检验员"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="affirmant"
              label="确认者"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="testStatus"
              label="检验状态"
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
                <el-button type="text" size="small" @click="handleTestTableTestFunction(scope.row)">检验</el-button>
                <el-button type="text" size="small" @click="handleTestTableStockInFunction(scope.row)">入库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page=tests.pagination.currentPage
            :page-sizes=tests.pagination.pageSizes
            :page-size=tests.pagination.pageSize
            layout="total, sizes, prev, pager, next, jumper"
            :total=tests.pagination.total>
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-card style="margin: 0 30px 20px 30px" v-show="testDetails.hasTestDetails">
      <div class="testDetails">
        <el-table
          :data=testDetails.testDetails
          border
          :stripe='true'
          :highlight-current-row='true'
          @row-click='handleTestTableClick'
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
            prop="unit"
            label="计量单位"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="qualityTestQuantity"
            label="检验数量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="qualityTestMethod"
            label="检验方法"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="qualityTestStandard"
            label="检验标准"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="entryQuantity"
            label="可入库数量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="returnQuantity"
            label="退货数量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="reason"
            label="原因"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="result"
            label="检验结果"
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
  name: 'StockInTest',
  data() {
    return {
      searchOptions: {
        searchParams: {
          operUser: "",
          materialCode: "",
          spuName: "",
          dateRange: "",
        },
        options: {
          operUserOptions: [
            {
              value: 550201,
              label: "检验员1"
            },
            {
              value: 550202,
              label: "检验员2"
            },
            {
              value: 550203,
              label: "检验员3"
            }
          ]
        }
      },
      tests: {
        tests: [
          {
            qualityTestSerialNo: "test001",
            receivingSerialNo: "receive001",
            qualityTestDate: "2018-10-01",
            qualityTestAddr: "检验场所1",
            dept: "检验部门1",
            picker: "张三",
            operUser: "王二",
            affirmant: "李四",
            testStatus: "全部通过",
            note: "备注1"
          },
          {
            qualityTestSerialNo: "test002",
            receivingSerialNo: "receive002",
            qualityTestDate: "2018-10-02",
            qualityTestAddr: "检验场所2",
            dept: "检验部门2",
            picker: "张三",
            operUser: "王二",
            affirmant: "李四",
            testStatus: "全部通过",
            note: "备注2"
          }
        ],
        testsSearchResults:[

        ],
        pagination: {
          currentPage: 1,
          pageSizes: [5, 10, 20, 30, 50],
          pageSize: 5,
          total: 400,
        }
      },
      testDetails: {
        hasTestDetails: false,
        testDetails: [
          {
            index: "1",
            materialCode: "10001",
            unit: "米",
            qualityTestQuantity: "200",
            qualityTestMethod: "方法1",
            qualityTestStandard: "标准1",
            entryQuantity: "200",
            returnQuantity: "0",
            reason: "无",
            result: "通过",
            note: "备注1"
          },
          {
            index: "2",
            materialCode: "20001",
            unit: "米",
            qualityTestQuantity: "200",
            qualityTestMethod: "方法2",
            qualityTestStandard: "标准2",
            entryQuantity: "200",
            returnQuantity: "0",
            reason: "无",
            result: "通过",
            note: "备注2"
          }
        ]
      },
      controlData: {
        hasUpdated: false,
        searchControl: false,
      },
    };
  },
  created: function () {
    const that = this;
    console.log(`进入收货检验任务列表页面`);
    let params = {
      page: 1,
      number: that.tests.pagination.pageSize,
    }
    that.getAllQualityTestRecord();
    that.getQualityTestRecordByPage(params);
  },
  methods: {
    // ------------------------------------ 工具函数 ------------------------------------
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
    //改变检验记录显示内容
    changeQualityTestRecord(result){
      for (var i = 0; i < result.length; i++){
        var thisResult = result[i];
        if (thisResult.hasOwnProperty("deptId")){
          var dept = "";
          if(parseInt(thisResult["deptId"]) != 0){
            if(parseInt(thisResult["deptId"]) == 55501){
              dept = "检验部门1";
            }
            else if(parseInt(thisResult["deptId"]) == 55502){
              dept = "检验部门2";
            }
            else if(parseInt(thisResult["deptId"]) == 55503){
              dept = "检验部门3";
            }
            else{
              dept = thisResult["deptId"];
            }
          }
          result[i]["dept"] = dept;
        }
        if (thisResult.hasOwnProperty("pickerId")){
          var picker = "";
          if (parseInt(thisResult["pickerId"]) != 0){
            if (parseInt(thisResult["pickerId"]) == 550101){
              picker = "检验领料人1";
            }
            else if (parseInt(thisResult["pickerId"]) == 550102){
              picker = "检验领料人2";
            }
            else if (parseInt(thisResult["pickerId"]) == 550103){
              picker = "检验领料人3";
            }
            else{
              picker = thisResult["pickerId"];
            }
          }
          result[i]["picker"] = picker;
        }
        if (thisResult.hasOwnProperty("operUserId")){
          var operUser = "";
          if (parseInt(thisResult["operUserId"]) != 0){
            if (parseInt(thisResult["operUserId"]) == 550201){
                operUser = "检验员1";
            }
            else if (parseInt(thisResult["operUserId"]) == 550202){
                operUser = "检验员2";
            }
            else if (parseInt(thisResult["operUserId"]) == 550203){
                operUser = "检验员3";
            }
            else{
              operUser = thisResult["operUserId"];
            }
          }
          result[i]["operUser"] = operUser;
        }
        if (thisResult.hasOwnProperty("affirmantId")){
          var affirmant = "";
          if (parseInt(thisResult["affirmantId"]) != 0){
            if (parseInt(thisResult["affirmantId"]) == 550301){
                affirmant = "确认者1";
            }
            else if (parseInt(thisResult["affirmantId"]) == 550302){
                affirmant = "确认者2";
            }
            else if (parseInt(thisResult["affirmantId"]) == 550303){
                affirmant = "确认者3";
            }
            else{
              affirmant = thisResult["affirmantId"];
            }
          }
          result[i]["affirmant"] = affirmant;
        }
        if (thisResult.hasOwnProperty("status")){
          var testStatus = "";
          if (parseInt(thisResult["status"]) == 0){
              testStatus = "未检验"
          }
          if (parseInt(thisResult["status"]) == 1){
              testStatus = "已检验"
          }
          // if (parseInt(thisResult["status"]) == 2){
          //     testStatus = "部分通过"
          // }
          // if (parseInt(thisResult["status"]) == 3){
          //     testStatus = "全部通过"
          // }
          result[i]["testStatus"] = testStatus;
        }
      }
      console.log(result);
      return result;
    },
    //获取所有的检验记录
    getAllQualityTestRecord(){
      const that = this;
      var jsonLength = 0;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/getAllQualityTestRecord`)
        .then(response => {
          for (var item in response.data){
            jsonLength++;
          }
          that.tests.pagination.total = jsonLength;
          console.log(`所有的检验记录条数为`+ that.tests.pagination.total);
        })
        .catch(error => {
          console.log(`加载所有的检验记录出错`, error);
        });
    },
    //根据页码获取检验记录
    getQualityTestRecordByPage(params){
      const that = this;
      console.log(`根据页码加载检验记录`);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/getQualityTestRecordByPage`, params)
        .then(response => {
          var result = response.data;
          // that.tests.tests = result;
          that.tests.tests = that.changeQualityTestRecord(result);
        })
        .catch(error => {
          console.log(`根据页码加载检验记录出错`, error);
        });
    },
    // 根据检验单号获取对应的检验记录明细
    getQualityTestRecordDetailByQualityTestSerialNo(params){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/getQualityTestRecordDetailByQualityTestSerialNo`, params)
        .then(response => {
          var result = response.data;
          for (var i = 0; i < result.length; i++){
            var thisResult = result[i];
            result[i]["index"] = (i + 1).toString();
            if (thisResult.hasOwnProperty("unitId")){
              var unit = thisResult["unitId"];
              result[i]["unit"] = "计量单位" + unit.toString();
            }
          }
          that.testDetails.hasTestDetails = true;
          that.testDetails.testDetails = result;
          console.log(`加载检验记录明细成功，检验单号为：`, params.qualityTestSerialNo);
        })
        .catch(error => {
          console.log(`加载检验记录明细时出错，检验单号为：`, params.qualityTestSerialNo);
        });
    },
    // 搜集搜索条件
    collectSearchOptions(){
      let result = {};
      const that = this;
      for (let key in that.searchOptions.searchParams){
        if (that.searchOptions.searchParams[key] !== "") {
          if (key === "operUser"){
            result["operUserId"] = that.searchOptions.searchParams[key];
          }
          else if (key == "dateRange"){
            var dateRange = that.searchOptions.searchParams[key];
            var DateStart = that.changeDate(dateRange[0]);
            result["DateStart"] = DateStart;
            var DateEnd = that.changeDate(dateRange[1]);
            result["DateEnd"] = DateEnd;
          }
          else{
            result[key] = that.searchOptions.searchParams[key];
          }
        }
      }
      console.log(`搜索条件如下:`);
      console.log(result);
      return result;
    },
    //根据条件搜索相应的检验记录
    searchQualityTestRecordByParams(params){
      const that = this;
      that.controlData.searchControl = true;
      var jsonLength = 0;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/searchQualityTestRecordByParams`, params)
        .then(response => {
          console.log(`搜索的数据`);
          console.log(response.data);
          for (var item in response.data){
            jsonLength++;
          }
          that.tests.pagination.total = jsonLength;
          console.log(`总共搜索出`+ that.tests.pagination.total +　`条数据`);
          that.tests.testsSearchResults = response.data;
          console.log(that.tests.testsSearchResults);
          var page = that.tests.pagination.currentPage;
          var number = that.tests.pagination.pageSize;
          that.showSearchResults(that.tests.testsSearchResults, page, number);
        })
        .catch(error => {
          console.log(`搜索检验记录出错`, error);
        });
    },
    // 显示搜索结果
    showSearchResults(result, page, size){
      const that = this;
      that.testDetails.hasTestDetails = false;
      var showResults = [];
      var lenth = that.tests.pagination.total;
      var startNum = (page - 1) * size;
      var endNum = startNum + size;
      console.log(`endNum: ` + endNum);
      if (endNum > lenth){
          endNum = lenth;
      }
      for (var i = startNum; i < endNum; i++){
        showResults.push(result[i]);
      }
      that.tests.tests = that.changeQualityTestRecord(showResults);
    },
    // ------------------------------------ 业务函数 ------------------------------------
    //点击表格加载明细
    handleTestTableClick(row, event, column){
      const that = this;
      console.log(`row`, row);
      if (column.label !== "操作"){
        console.log(`本行被点击，显示检验记录明细`);
        let params ={
          qualityTestSerialNo: row.qualityTestSerialNo,
        }
        that.getQualityTestRecordDetailByQualityTestSerialNo(params);
      }
    },
    // 当前页码改变时触发函数
    handleCurrentChange(val) {
      const that = this;
      console.log(`页码改变，当前页为: ${val}`);
      that.tests.pagination.currentPage = val;
      if (that.controlData.searchControl === false){
        let params = {
          page : that.tests.pagination.currentPage,
          number : that.tests.pagination.pageSize,
        }
        console.log(`根据页码获取数据`);
        that.getQualityTestRecordByPage(params);
      }
      else if (that.controlData.searchControl === true){
        console.log(`根据页码获取搜索到的数据`);
        var page = that.tests.pagination.currentPage;
        var number = that.tests.pagination.pageSize;
        that.showSearchResults(that.tests.testsSearchResults, page, number);
      }
    },
    // 每页条数改变时触发函数
    handleSizeChange(val){
      const that = this;
      console.log(`每页显示 ${val} 条数据`);
      that.tests.pagination.pageSize = val;
      if (that.controlData.searchControl == false){
        let params = {
          page : that.tests.pagination.currentPage,
          number : that.tests.pagination.pageSize,
        }
        console.log(`根据条数刷新数据`);
        that.getQualityTestRecordByPage(params);
      }
      else if (that.controlData.searchControl === true){
        console.log(`根据条数刷新搜索到的数据`);
        var page = that.tests.pagination.currentPage;
        var number = that.tests.pagination.pageSize;
        that.showSearchResults(that.tests.testsSearchResults, page, number);
      }
    },
    //点击检验
    handleTestTableTestFunction(row){
      const that = this;
      console.log(`row = `, row);
      console.log(`点击了本行的检验按钮`);
      var thisStatus = row.status;
      if (thisStatus === 0){
        console.log(`点击了本行的检验按钮，页面跳转`);
        that.$router.push({
          path: `/StockIn/StockInTest`,
          query: {
            qualityTestSerialNo: row.qualityTestSerialNo,
            receivingSerialNo: row.receivingSerialNo,
            isFromPlan: false,
            isFromTest: true,
          },
        });
      }
      if (thisStatus === 1){
        console.log(`该记录已经检验`);
        this.$message({
          message: '该记录已经检验',
          type: 'warning'
        });
      }
      
    },
    //点击入库
    handleTestTableStockInFunction(row){
      const that = this;
      console.log(`row = `, row);
      console.log(`点击了本行的入库按钮`);
      that.$router.push({
        path: `/StockIn/StockInPurchase`,
        query: {
          qualityTestSerialNo: row.qualityTestSerialNo,
          isFromPlan: false,
          isFromTest: true,
        }
      });
    },
    // 搜索按钮点击
    handleTestTableSearch(){
      const that = this;
      console.log(`搜索按钮点击`);
      let params = that.collectSearchOptions();
      console.log(`条件搜集完毕`);
      that.searchQualityTestRecordByParams(params);
    },
  }
}
</script>


<style lang="less" scoped>
    .searchOptions {
      margin: 20px 50px;
      padding: 0 20px;
    }
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
    .tests {
        .testTables {
            max-height: 550px;
        }
        .pagination {
            display: flex;
            flex-direction: row-reverse;
        }
    }
    .testDetails {
        max-height: 550px;
    }
</style>
