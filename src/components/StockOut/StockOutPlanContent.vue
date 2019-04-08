<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <div class="searchOptions">
        <el-row :gutter="10">
          <!-- 搜索输入部分 -->
          <el-col :span="22">
            <!-- 第一行 -->
            <el-row :gutter="10" style="padding-bottom: 10px">
              <!-- <el-col :span="6">
                <div class="inputBox">
                  <div class="label">物料类型</div>
                  <div class="inputBar">
                    <el-input v-model=searchOptions.searchParams.materialType placeholder="请输入物料类型"></el-input>
                  </div>
                </div>
              </el-col> -->
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">物料编码</div>
                  <el-input v-model=searchOptions.searchParams.materialCode placeholder="请输入物料编码"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">助记码</div>
                  <el-input v-model=searchOptions.searchParams.mnemonic placeholder="请输入助记码"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">SPU编码</div>
                  <el-input v-model=searchOptions.searchParams.spuCode placeholder="请输入SPU编码"></el-input>
                </div>
              </el-col>
            </el-row>
            <!-- 第二行 -->
            <el-row :gutter="10" style="padding-bottom: 10px">
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">SPU名称</div>
                  <el-input v-model=searchOptions.searchParams.spuName placeholder="请输入SPU名称"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">物料分类</div>
                  <!-- <el-input v-model=searchOptions.searchParams.materialCategory placeholder="请输入物料分类"></el-input> -->
                  <el-cascader
                    :options="searchOptions.options.catOptions"
                    expand-trigger="hover"
                    v-model="searchOptions.searchParams.materialCategorys">
                  </el-cascader>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">物料描述</div>
                  <el-input v-model=searchOptions.searchParams.description placeholder="请输入物料描述"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">仓库</div>
                  <el-select class="inputBar" v-model="searchOptions.searchParams.warehouseId" filterable placeholder="请选择仓库">
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
            <!-- 第三行 -->
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
                  <el-select class="inputBar" v-model="searchOptions.searchParams.supplierId" filterable placeholder="请选择供应商">
                    <el-option
                      v-for="item in searchOptions.options.supplierOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="inputBox">
                  <div class="label">客户</div>
                  <el-select class="inputBar" v-model="searchOptions.searchParams.clientId" filterable placeholder="请选择客户">
                    <el-option
                      v-for="item in searchOptions.options.clientOptions"
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
            <el-button type="primary" icon="el-icon-search" @click="updatePlanTableData">搜索</el-button>
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
              label="出库计划流水号"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="stockOutType"
              label="出库类型"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="vouchType"
              label="依赖单据类型"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="vouchSerialNo"
              label="依赖单据编码"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="dept"
              label="发起部门"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="owner"
              label="发起人"
              min-width="90"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="planStockOutDateStr"
              label="发起时间"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="realStockOutDateStr"
              label="出库时间"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="warehouse"
              label="发货仓库"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="deliverWay"
              label="发货方式"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="receiver"
              label="收货人"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="receiveAddr"
              label="收货地址"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button @click="handlePlanTableStockOutFunction(scope.row)" type="text" size="small">出库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
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
            min-width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="format"
            label="规格"
            min-width="220"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="unit"
            label="计量单位"
            min-width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="stockOutNum"
            label="出库数量（元）"
            min-width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="singlePrice"
            label="单价（元）"
            min-width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="stockOutPrice"
            label="出库金额（元）"
            min-width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="note"
            label="备注"
            min-width="120"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import TypeSwitch from '../../api/StockOut/typeSwitch';
import KeyReplace from '../../api/StockOut/keyReplace';
export default {
  name: "StockOutPlanContent",
  data() {
    return {
      searchOptions: {
        searchParams: {
          // materialType: "",
          materialCode: "",
          mnemonic: "",
          spuCode: "",
          spuName: "",
          materialCategorys: [],
          description: "",
          warehouseId: "",
          dateRange: "",
          supplierId: "",
          clientId: "",
        },
        options: {
          warehouseOptions: [
            {
              value: 1,
              label: "仓库1"
            },
            {
              value: 2,
              label: "仓库2"
            }
          ],
          supplierOptions: [
            {
              value: 1,
              label: "供应商1"
            },
            {
              value: 2,
              label: "供应商2"
            }
          ],
          clientOptions: [
            {
              value: 1,
              label: "客户1"
            },
            {
              value: 2,
              label: "客户2"
            }
          ],
          deptOptions: [],
          memberOptions: [],
          addressOptions: [],
          catOptions: [],
        },
      },
      plans: {
        plans: [
          {
            planSerialNo: "1",
            stockOutType: "类型1",
            vouchType: "类型1",
            vouchSerialNo: "123",
            dept: "部门1",
            owner: "发起人1",
            planStockOutDateStr: "2018-09-01",
            realStockOutDateStr: "2018-09-08",
            warehouse: "仓库1",
            deliverWay: "方式1",
            receiver: "收货人1",
            receiveAddr: "收货地址1",
            note: "备注1"
          },
          {
            planSerialNo: "2",
            stockOutType: "类型2",
            vouchType: "类型2",
            vouchSerialNo: "223",
            dept: "部门2",
            owner: "发起人2",
            planStockOutDateStr: "2018-10-01",
            realStockOutDateStr: "2018-10-08",
            warehouse: "仓库2",
            deliverWay: "方式2",
            receiver: "收货人2",
            receiveAddr: "收货地址2",
            note: "备注2"
          }
        ],
        pagination: {
          currentPage: 1,
          pageSizes: [10, 20, 30, 50, 100],
          pageSize: 10,
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
            stockOutNum: "200",
            singlePrice: "20元/米",
            stockOutPrice: "4000",
            note: "备注1"
          },
          {
            index: "2",
            materialCode: "20001",
            format: "规格2",
            unit: "米",
            stockOutNum: "200",
            singlePrice: "20元/米",
            stockOutPrice: "4000",
            note: "备注2"
          }
        ],
      },
      controlData: {
        hasUpdated: false,
      },
    };
  },
  created: function () {
    const that = this;
    console.log(`paramsType`, that.paramsType);
    if (that.preDefinedType === that.paramsType) {
      that.updatePlanTableData();
    }
  },

  props: ['preDefinedType', 'paramsType'],
  methods: {
    // ------------------------------------ 工具函数 ------------------------------------
    deleteEmptyChildren(data) {
      var that = this;
      // console.log(`data = `, data);
      delete data.value;
      data["value"] = data["id"];
      delete data.id;
      if (data.children.length === 0) {
        delete data.children;
      } else {
        for (let idx in data.children) {
          that.deleteEmptyChildren(data.children[idx]);
        }
      }
    },
    loadAllCatOptions() {
      var that = this;
      that.$axios
        .get(`${window.$config.HOST}/warehouse/stockOut/getAllMaterialCategoryInfo`)
        .then(response => {
          console.log(`response cat options`, response);
          that.deleteEmptyChildren(response.data[0]);
          that.searchOptions.options.catOptions = response.data;
        })
        .catch(error => {
          console.log("在获取所有物料分类信息的时候发生错误！");
          that.$message({
            type: 'error',
            msg: '在获取所有物料分类信息的时候发生错误！'
          });
          // CommonApi.handleError(error, that, "在获取所有物料分类信息的时候发生错误，错误为：");
        })
    },
    getWarehouseOptions() {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllWarehouseSelectOptionsInWarehouse`)
        .then(response => {
          that.searchOptions.options.warehouseOptions = response.data;
        })
        .catch(error => {
          console.log(`加载仓库选项信息出错，错误为：`, error);
        });
    },
    getClientOptions() {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllClientSelectOptionsInWarehouse`)
        .then(response => {
          that.searchOptions.options.clientOptions = response.data;
        })
        .catch(error => {
          console.log(`加载客户选项信息出错，错误为：`, error);
        });
    },
    getSupplierOptions() {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllSupplierSelectOptionsInWarehouse`)
        .then(response => {
          that.searchOptions.options.supplierOptions = response.data;
        })
        .catch(error => {
          console.log(`加载供应商选项信息出错，错误为：`, error);
        });
    },
    getDeptOptions() {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllDeptSelectOptionsInWarehouse`)
        .then(response => {
          that.searchOptions.options.deptOptions = response.data;
        })
        .catch(error => {
          console.log(`加载部门选项信息出错，错误为：`, error);
        });
    },
    getMemberOptions() {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllMemberSelectOptionsInWarehouse`)
        .then(response => {
          that.searchOptions.options.memberOptions = response.data;
        })
        .catch(error => {
          console.log(`加载人员选项信息出错，错误为：`, error);
        });
    },
    getAddressOptions() {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllAddressSelectOptionsInWarehouse`)
        .then(response => {
          that.searchOptions.options.addressOptions = response.data;
        })
        .catch(error => {
          console.log(`加载地址选项信息出错，错误为：`, error);
        });
    },
    getAllSelectOptions() {
      const that = this;
      that.getWarehouseOptions();
      that.getClientOptions();
      that.getSupplierOptions();
      that.getDeptOptions();
      that.getMemberOptions();
      that.getAddressOptions();
      that.loadAllCatOptions();
    },
    collectSearchOptions() {
      let result = {};
      const that = this;
      for (let key in that.searchOptions.searchParams) {
        if (that.searchOptions.searchParams[key] !== "") {
          if (key === 'materialCategorys') {
            let curCategory = that.searchOptions.searchParams['materialCategorys'];
            result['materialCategory'] = curCategory[curCategory.length - 1];
          } else {
            result[key] = that.searchOptions.searchParams[key];
          }
        }
      }
      return result;
    },
    getAllWarehouseStockOutPlan(params, callback) {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllWarehouseStockOutPlan`, {
          pageNum: 1,
          singlePageNum: that.plans.pagination.pageSize,
          stockOutType: that.paramsType,
        })
        .then(response => {
          // console.log(`加载成功，出库类别为：` + that.paramsType);
          console.log(`返回成功，结果为：`, response);
          that.plans.pagination.total = response.data.totalResultNum;
          that.plans.plans = response.data.plans;
          that.plans.plans = that.plans.plans.map((value, index, array) => {
            value['stockOutType'] = TypeSwitch.stockOutTypeSwitch(value['stockOutType'], 1);
            value['vouchType'] = TypeSwitch.relatedVouchSwitch(value['vouchType'], 1);
            return value;
          });
          that.plans.plans = KeyReplace.planKeyReplaceArr('warehouseId', 'warehouse', that.searchOptions.options.warehouseOptions, that.plans.plans);
          that.plans.plans = KeyReplace.planKeyReplaceArr('deptId', 'dept', that.searchOptions.options.deptOptions, that.plans.plans);
          that.plans.plans = KeyReplace.planKeyReplaceArr('deptId', 'dept', that.searchOptions.options.deptOptions, that.plans.plans);
          that.plans.plans = KeyReplace.planKeyReplaceArr('ownerId', 'owner', that.searchOptions.options.memberOptions, that.plans.plans);
          that.plans.plans = KeyReplace.planKeyReplaceArr('receiverId', 'receiver', that.searchOptions.options.clientOptions, that.plans.plans);
          that.plans.plans = KeyReplace.planKeyReplaceArr('receiveAddrId', 'receiveAddr', that.searchOptions.options.addressOptions, that.plans.plans);
        })
        .catch(error => {
          console.log(`加载出错，加载类别为` + that.paramsType, error);
        });
      if (callback !== undefined)
        return callback();
    },
    getWarehouseStockOutPlanByParams(params, callback) {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getWarehouseStockOutPlanByParams`, params)
        .then(response => {
          console.log(`加载成功，出库类别为：` + that.paramsType);
          console.log(`返回成功，结果为：`, response);
          that.plans.pagination.total = response.totalResultNum;
          that.plans.plans = response.data.plans;
          that.plans.plans = that.plans.plans.map((value, index, array) => {
            value['stockOutType'] = TypeSwitch.stockOutTypeSwitch(value['stockOutType'], 1);
            value['vouchType'] = TypeSwitch.relatedVouchSwitch(value['vouchType'], 1);
            return value;
          });
          that.plans.plans = KeyReplace.planKeyReplaceArr('warehouseId', 'warehouse', that.searchOptions.options.warehouseOptions, that.plans.plans);
          that.plans.plans = KeyReplace.planKeyReplaceArr('deptId', 'dept', that.searchOptions.options.deptOptions, that.plans.plans);
          that.plans.plans = KeyReplace.planKeyReplaceArr('deptId', 'dept', that.searchOptions.options.deptOptions, that.plans.plans);
          that.plans.plans = KeyReplace.planKeyReplaceArr('ownerId', 'owner', that.searchOptions.options.memberOptions, that.plans.plans);
          that.plans.plans = KeyReplace.planKeyReplaceArr('receiverId', 'receiver', that.searchOptions.options.clientOptions, that.plans.plans);
          that.plans.plans = KeyReplace.planKeyReplaceArr('receiveAddrId', 'receiveAddr', that.searchOptions.options.addressOptions, that.plans.plans);
        })
        .catch(error => {
          console.log(`加载出错，加载类别为` + that.paramsType, error);
        });
      if (callback !== undefined)
        return callback();
    },
    getWarehouseStockOutPlanDetailsByParams(params, callback) {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getWarehouseStockOutPlanDetailByParams`, params)
        .then(response => {
          console.log(`加载计划明细成功，加载流水号为：`, params.planSerialNo, `，回复为：`, response);
          let resultArray = [];
          let planDetails = response.data.planDetails;
          let materials = response.data.materials;
          for (let i in planDetails) {
            let tmp = {};
            tmp['index'] = parseInt(i) + 1;
            tmp['materialCode'] = materials[i]['materialCode'];
            tmp['format'] = materials[i]['materialFormat'];
            tmp['unit'] = materials[i]['unitName'];
            tmp['stockOutNum'] = planDetails[i]['stockOutQuantity'];
            tmp['singlePrice'] = planDetails[i]['stockOutCost'] / tmp['stockOutNum'];
            tmp['stockOutPrice'] = planDetails[i]['stockOutCost'];
            tmp['note'] = planDetails[i]['note'];
            resultArray.push(tmp);
          }
          that.planDetails.hasPlanDetails = true;
          that.planDetails.planDetails = resultArray;
        })
        .catch(error => {
          console.log(`加载计划明细时出错，加载流水号为：`, params.planSerialNo);
        });
      if (callback !== undefined)
        return callback();
    },
    // ------------------------------------ 业务函数 ------------------------------------
    updatePlanTableData() {
      const that = this;
      that.getAllSelectOptions();
      if (that.controlData.hasUpdated === false) {
        //! getAllStockOutPlan
        let params = {
          pageNum: 1,
          singlePageNum: that.plans.pagination.pageSize,
          stockOutType: that.paramsType,
        };
        that.getAllWarehouseStockOutPlan(params, () => {
          that.controlData.hasUpdated = true;
        });
      } else {
        //! getStockOutPlanByParams
        let params = that.collectSearchOptions();
        let emptyFlag = false;
        if (Object.getOwnPropertyNames(params).length === 0) {
          emptyFlag = true;
        }
        params['stockOutType'] = that.paramsType;
        params['pageNum'] = that.plans.pagination.currentPage;
        params['singlePageNum'] = that.plans.pagination.pageSize;
        console.log(`params`, params);
        if (emptyFlag) {
          that.getAllWarehouseStockOutPlan(params);
        } else {
          that.getWarehouseStockOutPlanByParams(params);
        }
      }
    },
    handlePlanTableClick(row, event, column) {
      console.log(`row`, row);
      console.log(`column`, column);
      if (column !== undefined && column.label !== "操作") {
        const that = this;
        let planSerialNo = row.planSerialNo;
        let params = {
          planSerialNo: planSerialNo,
        };
        that.getWarehouseStockOutPlanDetailsByParams(params, () => {
          that.planDetails.hasPlanDetails = true;
        });
      }
    },
    handlePlanTableStockOutFunction(row) {
      const that = this;
      console.log(`row = `, row);
      console.log(`点击了本行的出库按钮`);
      let path = '';
      switch (that.preDefinedType) {
        case '1':
          path = '/stockout/stockoutsales';
          break;
        case '2':
          path = '/stockout/stockoutproduction';
          break;
        case '3':
          path = '/stockout/stockouttransfer';
          break;
        default:
          path = '/stockout/stockoutgeneral';
          break;
      }
      that.$router.push({
        path: path,
        query: {
          vouchSerialNo: row.vouchSerialNo,
          vouchType: TypeSwitch.relatedVouchSwitch(row.vouchType.toString(), 0).toString(),
          isCreated: true,
        },
      });
    },
  },
  watch: {
    paramsType: function (val) {
      const that = this;
      console.log(`paramsType`, val);
      if (val === that.preDefinedType) {
        that.updatePlanTableData();
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
