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
                                    <div class="label">采购订单号</div>
                                    <div class="inputBar">
                                        <el-input v-model=searchOptions.searchParams.vouchSerialNo placeholder="请输入采购订单号"></el-input>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="inputBox">
                                    <div class="label">物料编码</div>
                                    <el-input v-model=searchOptions.searchParams.materialCode placeholder="请输入物料编码"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="inputBox">
                                    <div class="label">SPU名称</div>
                                    <el-input v-model=searchOptions.searchParams.spuName placeholder="请输入SPU名称"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="inputBox">
                                    <div class="label">仓库</div>
                                    <el-select class="inputBar" v-model="searchOptions.searchParams.warehouse" filterable placeholder="请选择仓库">
                                        <el-option
                                            v-for="item in searchOptions.options.warehouseOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                        </el-row>
                        <!-- 第二行 -->
                        <el-row :gutter="10">
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
                            <el-col :span="6">
                                <div class="inputBox">
                                    <div class="label">供应商</div>
                                    <el-select class="inputBar" v-model="searchOptions.searchParams.supplier" filterable placeholder="请选择供应商">
                                        <el-option
                                            v-for="item in searchOptions.options.supplierOptions"
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
                        <el-button type="primary" icon="el-icon-search" @click="handlePlanTableSearch()">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card style="margin-bottom: 20px">
            <div class="plans">
                <div class="planTables" style="padding-bottom: 10px">
                    <el-table
                        :data="plans.plans"
                        border
                        :stripe='true'
                        :highlight-current-row="true"
                        @row-click='handlePlanTableClick'
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                            width="55">
                         </el-table-column>
                        <el-table-column
                            prop="planSerialNo"
                            label="入库计划流水号"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="stockInType"
                            label="入库类型"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="vouchSerialNo"
                            label="关联单据编码"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="planStatus"
                            label="计划状态"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="dept"
                            label="发起部门"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="owner"
                            label="发起人"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="startDate"
                            label="发起时间"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="arrivalDate"
                            label="到货时间"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="delivery"
                            label="发货单位"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="deliveryAddr"
                            label="发货地址"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="warehouse"
                            label="接收仓库"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="receivingAddr"
                            label="收货地址"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="operUser"
                            label="收货人"
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
                                <el-button type="text" size="small" @click="handlePlanTableReceiveFunction(scope.row)">收货</el-button>
                                <el-button type="text" size="small" @click="handlePlanTableTestFunction(scope.row)">检验</el-button>
                                <el-button type="text" size="small" @click="handlePlanTableStockInFunction(scope.row)">入库</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 分页 -->
                <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page=plans.pagination.currentPage
                        :page-sizes=plans.pagination.pageSizes
                        :page-size=plans.pagination.pageSize
                        layout="total, sizes, prev, pager, next, jumper"
                        :total=plans.pagination.total>
                    </el-pagination>
                </div>
            </div>
        </el-card>
        <el-card style="margin-bottom: 20px" v-show="planDetails.hasPlanDetails">
            <div class="planDetails">
                <el-table
                    :data=planDetails.planDetails
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
                        prop="stockInNum"
                        label="入库数量"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="singlePrice"
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
    name: "StockInPlanContent",
    data() {
        return {
            searchOptions: {
                searchParams: {
                    vouchSerialNo: "",
                    materialCode: "",
                    spuName: "",
                    warehouse: "",
                    dateRange: "",
                    supplier: "",
                },
                options: {
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
            plans: {
                plans: [
                    {
                        planSerialNo: "plan001",
                        stockInType: "采购入库",
                        vouchType: 1,
                        vouchSerialNo: "pur001",
                        planStatus: "未到货",
                        dept: "部门1",
                        owner: "发起人1",
                        startDate: "2018-10-01",
                        arrivalDate: "2018-10-03",
                        delivery: "江阴供应商",
                        deliveryAddr: "江苏江阴",
                        warehouse: "仓库1",
                        receivingAddr: "收货地址1",
                        operUser: "收货人1",
                        note: "备注1"
                    },
                    {
                        planSerialNo: "plan002",
                        stockInType: "采购入库",
                        vouchType: 1,
                        vouchSerialNo: "pur002",
                        planStatus: "未到货",
                        dept: "部门2",
                        owner: "发起人2",
                        startDate: "2018-10-02",
                        arrivalDate: "2018-10-05",
                        delivery: "杭州供应商",
                        deliveryAddr: "浙江杭州",
                        warehouse: "仓库2",
                        receivingAddr: "收货地址2",
                        operUser: "收货人2",
                        note: "备注2"
                    }
                ],
                plansSearchResults:[

                ],
                pagination: {
                    currentPage: 1,
                    pageSizes: [5, 10, 20, 30, 50],
                    pageSize: 5,
                    total: 400,
                }
            },
            planDetails: {
                hasPlanDetails: false,
                planDetails: [
                    {
                        index: "1",
                        materialCode: "10001",
                        format: "规格1",
                        unit: "米",
                        stockInNum: "100",
                        singlePrice: "20元/米",
                        taxPrice: "22元/米",
                        note: "备注1"
                    },
                    {
                        index: "2",
                        materialCode: "10002",
                        format: "规格2",
                        unit: "米",
                        stockInNum: "200",
                        singlePrice: "30元/米",
                        taxPrice: "33元/米",
                        note: "备注2"
                    }
                ],
            },
            controlData: {
                searchControl: false,
                // hasUpdated: false,
            },
        };
    },
    created: function () {
        const that = this;
        console.log(`paramsType`, that.paramsType);
        console.log(`preDefinedType`, that.preDefinedType);
        if (that.preDefinedType === that.paramsType) {
            console.log('获取类型'+that.paramsType+'的所有入库计划');
            let params = {
                page : 1,
                number : that.plans.pagination.pageSize,
                entryType : parseInt(that.paramsType)
            }
            that.getAllStockInPlanByEntryType(params);
            that.getStockInPlanByPage(params);
        }
        // console.log(`stockInType` + stockInType);
    },
    // preDefinedType:事先已经定义好了 paramsType:根据tabs切换进行改变
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
        // 根据入库类型获得所有的入库计划
        getAllStockInPlanByEntryType(params, callback){
            const that = this;
            var jsonLength = 0;
            that.$axios
                .post(`${window.$config.HOST}/warehouse/stockIn/getAllStockInPlanByEntryType`, params)
                .then(response => {
                    for (var item in response.data){
                        jsonLength++;
                    }
                    that.plans.pagination.total = jsonLength;
                    // that.plans.plans = response.data;
                    console.log(`该入库类型下所有的计划数量为`+ that.plans.pagination.total);
                })
                .catch(error => {
                    console.log(`加载出错，加载类别为` + that.paramsType, error);
                });
            if (callback !== undefined)
                return callback();
        },
        // 改变入库计划显示内容
        changeStockInPlan(result){
            for (var i = 0; i < result.length; i++){
                var thisResult = result[i];
                if (thisResult.hasOwnProperty("entryType")){
                    // console.log(`i = `+ i);
                    var stockInType = "";
                    if (parseInt(thisResult["entryType"]) == 1){
                        stockInType = "采购入库";
                        // console.log(stockInType);
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
                if (thisResult.hasOwnProperty("status")){
                    var planStatus = "";
                    if (parseInt(thisResult["status"]) == 0){
                        planStatus = "未到货"
                    }
                    if (parseInt(thisResult["status"]) == 1){
                        planStatus = "已收货"
                    }
                    if (parseInt(thisResult["status"]) == 2){
                        planStatus = "已检验"
                    }
                    if (parseInt(thisResult["status"]) == 3){
                        planStatus = "已入库"
                    }
                    if (parseInt(thisResult["status"]) == 4){
                        planStatus = "确认入库"
                    }
                    result[i]["planStatus"] = planStatus;
                }
                if (thisResult.hasOwnProperty("deptId")){
                    var dept = thisResult["deptId"];
                    result[i]["dept"] = dept.toString();
                    if (parseInt(thisResult["deptId"]) == 99901){
                        dept = "发起部门1"
                    }
                    if (parseInt(thisResult["deptId"]) == 99902){
                        dept = "发起部门2"
                    }
                    if (parseInt(thisResult["deptId"]) == 99903){
                        dept = "发起部门3"
                    }
                    result[i]["dept"] = dept;
                }
                if (thisResult.hasOwnProperty("onwerId")){
                    var onwer = thisResult["onwerId"];
                    // var onwer = '';
                    result[i]["owner"] = onwer.toString();
                    if (parseInt(thisResult["onwerId"]) == 9901){
                        onwer = "发起人1"
                    }
                    if (parseInt(thisResult["onwerId"]) == 9902){
                        onwer = "发起人2"
                    }
                    if (parseInt(thisResult["onwerId"]) == 9903){
                        onwer = "发起人3"
                    }
                    result[i]["owner"] = onwer;
                }
                if (thisResult.hasOwnProperty("deliveryId")){
                    var delivery = '';
                    result[i]["delivery"] = delivery.toString();
                    if (parseInt(thisResult["deliveryId"]) == 66601){
                        delivery = "苏州供应商"
                    }
                    if (parseInt(thisResult["deliveryId"]) == 66602){
                        delivery = "无锡供应商"
                    }
                    result[i]["delivery"] = delivery;
                }
                if (thisResult.hasOwnProperty("deliveryAddrId")){
                    var deliveryAddr = '';
                    result[i]["deliveryAddr"] = deliveryAddr.toString();
                    if (parseInt(thisResult["deliveryAddrId"]) == 666010){
                        deliveryAddr = "苏州制造工厂"
                    }
                    if (parseInt(thisResult["deliveryAddrId"]) == 666020){
                        deliveryAddr = "无锡制造工厂"
                    }
                    result[i]["deliveryAddr"] = deliveryAddr;
                }
                if (thisResult.hasOwnProperty("warehouseId")){
                    var warehouse = '';
                    // result[i]["warehouse"] = warehouse.toString();
                    if (parseInt(thisResult["warehouseId"]) == 3331){
                        warehouse = "仓库1"
                    }
                    if (parseInt(thisResult["warehouseId"]) == 3332){
                        warehouse = "仓库2"
                    }
                    if (parseInt(thisResult["warehouseId"]) == 3333){
                        warehouse = "仓库3"
                    }
                    result[i]["warehouse"] = warehouse;
                }
                if (thisResult.hasOwnProperty("receivingAddrId")){
                    var receivingAddr = thisResult["receivingAddrId"];
                    result[i]["receivingAddr"] = receivingAddr.toString();
                    if (parseInt(thisResult["receivingAddrId"]) == 33100){
                        receivingAddr = "接收地址1"
                    }
                    if (parseInt(thisResult["receivingAddrId"]) == 33200){
                        receivingAddr = "接收地址2"
                    }
                    if (parseInt(thisResult["receivingAddrId"]) == 33300){
                        receivingAddr = "接收地址3"
                    }
                    result[i]["receivingAddr"] = receivingAddr;
                }
                if (thisResult.hasOwnProperty("operUserId")){
                    var operUser = thisResult["operUserId"];
                    result[i]["operUser"] = operUser.toString();
                    if (parseInt(thisResult["operUserId"]) == 3301){
                        operUser = "收货人1"
                    }
                    if (parseInt(thisResult["operUserId"]) == 3302){
                        operUser = "收货人2"
                    }
                    if (parseInt(thisResult["operUserId"]) == 3303){
                        operUser = "收货人3"
                    }
                    result[i]["operUser"] = operUser;
                }
            }
            console.log(result);
            return result;
        },
        // 根据页码获取对应的入库计划
        getStockInPlanByPage(params, callback){
            const that = this;
            that.$axios
                .post(`${window.$config.HOST}/warehouse/stockIn/getStockInPlanByPage`, params)
                .then(response => {
                    var result = response.data;
                    that.plans.plans = that.changeStockInPlan(result);
                })
                .catch(error => {
                    console.log(error);
                });
            if (callback !== undefined)
                return callback();
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
                        result[i]["index"] = (i + 1).toString();
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
                            result[i]["stockInNum"] = stockInNum.toString();
                        }
                        if (thisResult.hasOwnProperty("price")){
                            var singlePrice = thisResult["price"];
                            result[i]["singlePrice"] = singlePrice.toString();
                        }
                    }
                    that.planDetails.hasPlanDetails = true;
                    that.planDetails.planDetails = result;
                    console.log(`加载计划明细成功，加载流水号为：`, params.planSerialNo);
                })
                .catch(error => {
                    console.log(`加载计划明细时出错，加载流水号为：`, params.planSerialNo);
                });
            if (callback !== undefined)
                return callback();
        },
        // 显示搜索结果
        showSearchResults(result, page, size){
            // console.log(`按页数显示搜索结果`);
            // console.log(result);
            const that = this;
            that.planDetails.hasPlanDetails = false;
            var showResults = [];
            var lenth = that.plans.pagination.total;
            var startNum = (page - 1) * size;
            var endNum = startNum + size;
            console.log(`endNum: ` + endNum);
            if (endNum > lenth){
                endNum = lenth;
            }
            for (var i = startNum; i < endNum; i++){
                showResults.push(result[i]);
            }
            that.plans.plans = that.changeStockInPlan(showResults);
        },
        // 根据条件搜索相应的入库计划
        searchStockInPlanByParams(params, callback){
            const that = this;
            that.controlData.searchControl = true;
            var jsonLength = 0;
            that.$axios
                .post(`${window.$config.HOST}/warehouse/stockIn/searchStockInPlanByParams`, params)
                .then(response => {
                    for (var item in response.data){
                        jsonLength++;
                    }
                    that.plans.pagination.total = jsonLength;
                    console.log(`总共搜索出`+ that.plans.pagination.total + `条数据`);
                    that.plans.plansSearchResults = response.data;
                    console.log(that.plans.plansSearchResults);
                    var page = that.plans.pagination.currentPage;
                    var number = that.plans.pagination.pageSize;
                    that.showSearchResults(that.plans.plansSearchResults, page, number);
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
                    else if (key === "supplier"){
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
            console.log(result);
            return result;
        },
        // ------------------------------------ 业务函数 ------------------------------------
        // 点击本行的收货触发函数
        handlePlanTableReceiveFunction(row) {
            const that = this;
            console.log(`row = `, row);
            var thisStatus = row.status;
            console.log(`该计划的状态标志为` + row.status);
            if (thisStatus === 0){
                console.log(`点击了本行的收货按钮，页面跳转`);
                that.$router.push({
                    path: `/StockIn/StockInReceive`,
                    query: {
                        planSerialNo: row.planSerialNo,
                        entryType: row.entryType,
                        vouchType: row.vouchType,
                        vouchSerialNo: row.vouchSerialNo,
                        warehouseId: row.warehouseId,
                        receivingAddrId: row.receivingAddrId,
                        operUserId: row.operUserId,
                        deliveryId: row.deliveryId,
                        deliveryAddrId: row.deliveryAddrId,
                        isFromPlan: true,
                    },
                });
            }
            if (thisStatus === 1){
                console.log(`该计划已经收货,无法进行收货操作`);
                this.$message({
                    message: '该计划已经收货,无法进行收货操作',
                    type: 'warning'
                });
            }
            if (thisStatus === 2){
                console.log(`该计划已经检验,无法进行收货操作`);
                this.$message({
                    message: '该计划已经检验,无法进行收货操作',
                    type: 'warning'
                });
            }
            if (thisStatus === 3){
                console.log(`该计划已经入库,无法进行收货操作`);
                this.$message({
                    message: '该计划已经入库,无法进行收货操作',
                    type: 'warning'
                });
            }
        },
        // 点击本行的检验触发函数
        handlePlanTableTestFunction(row) {
            const that = this;
            // console.log(`row = `, row);
            var thisStatus = row.status;
            console.log(`该计划的状态标志为` + row.status);
            if (thisStatus === 0){
                console.log(`该计划未收货，请先进行收货操作`);
                this.$message({
                    message: '该计划未收货，请先进行收货操作',
                    type: 'warning'
                });
            }
            if (thisStatus === 1){
                console.log(`点击了本行的检验按钮，页面跳转`);
                that.$router.push({
                    path: `/StockIn/StockInTest`,
                    query: {
                        planSerialNo: row.planSerialNo,
                        isFromPlan: true,
                        isFromTest: false,
                    }
                });
            }
            if (thisStatus === 2){
                console.log(`该计划已经检验,无法进行检验操作`);
                this.$message({
                    message: '该计划已经检验,无法进行检验操作',
                    type: 'warning'
                });
            }
            if (thisStatus === 3){
                console.log(`该计划已经入库,无法进行检验操作`);
                this.$message({
                    message: '该计划已经入库,无法进行检验操作',
                    type: 'warning'
                });
            }
        },
        // 点击本行的入库触发函数
        handlePlanTableStockInFunction(row) {
            const that = this;
            console.log(`row = `, row);
            var thisStatus = row.status;
            console.log(`该计划的状态标志为` + row.status);
            if (thisStatus === 0){
                console.log(`该计划未收货，请先进行收货操作`);
                this.$message({
                    message: '该计划未收货，请先进行收货操作',
                    type: 'warning'
                });
            }
            if (thisStatus === 1){
                console.log(`该计划未检验，请先进行检验操作`);
                this.$message({
                    message: '该计划未检验，请先进行检验操作',
                    type: 'warning'
                });
            }
            if (thisStatus === 2){
                console.log(`点击了本行的入库按钮，页面跳转`);
                that.$router.push({
                    path: `/StockIn/StockInPurchase`,
                    query: {
                        planSerialNo: row.planSerialNo,
                        entryType: row.entryType,
                        vouchSerialNo: row.vouchSerialNo,
                        vouchType: row.vouchType,
                        warehouseId: row.warehouseId,
                        deliveryId: row.deliveryId,
                        isFromPlan: true,
                        isFromTest: false,
                    }
                });
            }
            if (thisStatus === 3){
                console.log(`该计划已经入库,无法进行入库操作`);
                this.$message({
                    message: '该计划已经入库,无法进行入库操作',
                    type: 'warning'
                });
            }
        },
        // 点击表格显示明细
        handlePlanTableClick(row, event, column){
            const that = this;
            console.log(`row`, row);
            if (column.label !== "操作") {
                console.log(`本行被点击，显示计划明细`);
                let params = {
                    planSerialNo: row.planSerialNo
                }
                that.getStockInPlanDetailByPlanSerialNo(params);
                // that.planDetails.hasPlanDetails = true;
            }
        },
        // 当前页码改变时触发函数
        handleCurrentChange(val) {
            const that = this;
            console.log(`页码改变，当前页为: ${val}`);
            that.plans.pagination.currentPage = val;
            if (that.controlData.searchControl === false){
                let params = {
                    page : that.plans.pagination.currentPage,
                    number : that.plans.pagination.pageSize,
                    entryType : parseInt(that.paramsType)
                };
                console.log(`根据页码获取数据`);
                that.getStockInPlanByPage(params);
            }
            else if (that.controlData.searchControl === true){
                console.log(`根据页码获取搜索到的数据`);
                var page = that.plans.pagination.currentPage;
                var number = that.plans.pagination.pageSize;
                that.showSearchResults(that.plans.plansSearchResults, page, number);
            }
        },
        // 每页条数改变时触发函数
        handleSizeChange(val) {
            const that = this;
            console.log(`每页 ${val} 条`);
            that.plans.pagination.pageSize = val;
            if (that.controlData.searchControl == false){
                let params = {
                    page : that.plans.pagination.currentPage,
                    number : that.plans.pagination.pageSize,
                    entryType : parseInt(that.paramsType)
                };
                console.log(`根据条数刷新数据`);
                that.getStockInPlanByPage(params);
            }
            else if (that.controlData.searchControl == true){
                console.log(`根据条数刷新搜索到的数据`);
                var page = that.plans.pagination.currentPage;
                var number = that.plans.pagination.pageSize;
                that.showSearchResults(that.plans.plansSearchResults, page, number);
            }
        },
        // 搜索按键点击触发
        handlePlanTableSearch() {
            const that = this;
            console.log(`搜索按钮点击`);
            let params = that.collectSearchOptions();
            console.log(`条件搜集完毕`);
            that.searchStockInPlanByParams(params);
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
                        number : that.plans.pagination.pageSize,
                        entryType : parseInt(that.paramsType)
                    }
                    that.getAllStockInPlanByEntryType(params);
                    that.getStockInPlanByPage(params);
                }
            }
        }
};
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
    .plans {
        .planTables {
            max-height: 550px;
        }
        .pagination {
            display: flex;
            flex-direction: row-reverse;
        }
    }
    .planDetails {
        max-height: 550px;
    }
</style>
