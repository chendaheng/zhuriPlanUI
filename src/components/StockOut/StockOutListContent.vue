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
            <el-button type="primary" icon="el-icon-search" @click="updateRecordTableData">搜索</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card style="margin-bottom: 20px">
      <div class="records">
        <div class="recordTables" style="padding-bottom: 10px">
          <el-table
            :data=records.records
            border
            :stripe='true'
            :highlight-current-row='true'
            @row-click='handleRecordTableClick'
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="stockOutSerialNo"
              label="出库单号"
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
              prop="vouchSerialNo"
              label="关联单据号"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="vouchType"
              label="关联单据类型"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="stockOutDateStr"
              label="出库时间"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="warehouse"
              label="出库仓库"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="operUser"
              label="出库人员"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="dept"
              label="出库部门"
              min-width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="partner"
              label="收货单位"
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
              width="200">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleListStockOut(scope.row)">修改</el-button>
                <!-- <el-button type="text" size="small">审核</el-button> -->
                <el-button type="text" size="small" @click="handleListPick(scope.row)">分拣</el-button>
                <el-button type="text" size="small" @click="handleListDeliver(scope.row)">发货</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            @size-change='handlePaginationSizeChange'
            :current-page=records.pagination.currentPage
            :page-sizes=records.pagination.pageSizes
            :page-size=records.pagination.pageSize
            layout="total, sizes, prev, pager, next, jumper"
            :total=records.pagination.total>
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-card style="margin-bottom: 20px" v-show="recordDetails.hasRecordDetails">
      <div class="recordDetails">
        <el-table
          :data=recordDetails.recordDetails
          border
          :stripe='true'
          :highlight-current-row='true'
          style="width: 100%">
          <el-table-column
            fixed="left"
            type="index"
            width="90">
          </el-table-column>
          <el-table-column
            prop="materialCode"
            label="物料编码"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="batchCode"
            label="批号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="unit"
            label="计量单位"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="stockOutQuantity"
            label="出库数量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="taxPrice"
            label="含税单价"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="stockOutPrice"
            label="出库金额"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="stockOutTaxPrice"
            label="含税金额"
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
import TypeSwitch from '../../api/StockOut/typeSwitch';
export default {
  name: "StockOutListContent",
  data () {
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
          dateRange: "",
          supplierId: "",
          clientId: "",
          warehouseId: "",
        },
        options: {
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
          catOptions: [],
        },
      },
      records: {
        records: [
          {
            stockOutSerialNo: '1001',
            stockOutType: '类型1',
            vouchSerialNo: '101',
            vouchType: '类型1',
            stockOutDateStr: '2018-01-01',
            warehouse: '仓库1',
            operUser: '张三',
            dept: '仓库一部',
            partner: '浙江仓库',
            note: '备注1',
          },
          {
            stockOutSerialNo: '2001',
            stockOutType: '类型2',
            vouchSerialNo: '201',
            vouchType: '类型2',
            stockOutDateStr: '2018-02-01',
            warehouse: '仓库2',
            operUser: '李四',
            dept: '仓库二部',
            partner: '浙江仓库',
            note: '备注2',
          },
          {
            stockOutSerialNo: '3001',
            stockOutType: '类型3',
            vouchSerialNo: '301',
            vouchType: '类型3',
            stockOutDateStr: '2018-03-01',
            warehouse: '仓库3',
            operUser: '王五',
            dept: '仓库三部',
            partner: '浙江仓库',
            note: '备注3',
          },
        ],
        pagination: {
          currentPage: 1,
          pageSizes: [10, 20, 30, 50, 100],
          pageSize: 10,
          total: 400,
        }
      },
      recordDetails: {
        hasRecordDetails: false,
        recordDetails: [
          {
            index: 1,
            materialCode: '10001',
            batchCode: '1001',
            unit: '米',
            stockOutNum: 10,
            price: '10元/米',
            taxPrice: '12元/米',
            stockOutPrice: 100,
            stockOutTaxPrice: 120,
            note: '备注1',
          },
          {
            index: 2,
            materialCode: '20001',
            batchCode: '2001',
            unit: '米',
            stockOutNum: 20,
            price: '20元/米',
            taxPrice: '22元/米',
            stockOutPrice: 400,
            stockOutTaxPrice: 440,
            note: '备注2',
          },
          {
            index: 3,
            materialCode: '30001',
            batchCode: '3001',
            unit: '米',
            stockOutNum: 10,
            price: '30元/米',
            taxPrice: '33元/米',
            stockOutPrice: 300,
            stockOutTaxPrice: 330,
            note: '备注3',
          },
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
      that.updateRecordTableData();
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
    getAllSelectOptions() {
      const that = this;
      that.getWarehouseOptions();
      that.getClientOptions();
      that.getSupplierOptions();
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
    getAllWareHouseStockOutRecord(params, callback) {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllWarehouseStockOutRecord`, params)
        .then(response => {
            console.log(`加载成功，出库类别为：` + that.paramsType);
            console.log(`返回成功，结果为：`, response);
            that.records.pagination.total = response.data.totalResultNum;
            that.records.records = response.data.records;
            that.records.records = that.records.records.map((value, index, array) => {
              value['stockOutType'] = TypeSwitch.stockOutTypeSwitch(value['stockOutType'], 1);
              value['vouchType'] = TypeSwitch.relatedVouchSwitch(value['vouchType'], 1);
              return value;
            });
        })
        .catch(error => {
          console.log(`加载出错，加载类别为` + that.paramsType, error);
        });
      if (callback !== undefined)
        return callback();
    },
    getWarehouseStockOutRecordByParams(params, callback) {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getWarehouseStockOutRecordByParams`, params)
        .then(response => {
          console.log(`加载成功，出库类别为：` + that.paramsType);
          console.log(`返回成功，结果为：`, response);
          that.records.pagination.total = response.totalResultNum;
          that.records.records = response.data.records;
          that.records.records = that.records.records.map((value, index, array) => {
            value['stockOutType'] = TypeSwitch.stockOutTypeSwitch(value['stockOutType'], 1);
            value['vouchType'] = TypeSwitch.relatedVouchSwitch(value['vouchType'], 1);
            return value;
          });
        })
        .catch(error => {
          console.log(`加载出错，加载类别为` + that.paramsType, error);
        });
      if (callback !== undefined)
        return callback();
    },
    getWarehouseStockOutRecordDetailByParams(params, callback) {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getWarehouseStockOutRecordDetailByParams`, params)
        .then(response => {
          console.log(`加载记录明细时成功，出库单号为：`, params.stockOutSerialNo);
          console.log(response);
          that.recordDetails.hasRecordDetails = true;
          that.recordDetails.recordDetails = response.data.recordDetails;
          for (let idx in that.recordDetails.recordDetails) {
            that.recordDetails.recordDetails[idx]["unit"] = response.data.materials[idx]['unitName'];
          }
        })
        .catch(error => {
          console.log(`加载记录明细时出错，出库单号为：`, params.stockOutSerialNo);
        });
      if (callback !== undefined)
        return callback();
    },
    // ------------------------------------ 业务函数 ------------------------------------
    updateRecordTableData() {
      const that = this;
      that.getAllSelectOptions();
      if (that.controlData.hasUpdated === false) {
        //! getWarehouseStockOutRecordByParams，因为是查询所有的，所以只需要提供出库类别
        let params = {
          pageNum: 1,
          singlePageNum: that.records.pagination.pageSize,
          stockOutType: that.paramsType,
        }
        that.getAllWareHouseStockOutRecord(params);
        that.controlData.hasUpdated = true;
      } else {
        //! getWarehouseStockOutRecordByParams，带详细参数的查询，要求搜索要求必须存在
        let params = that.collectSearchOptions();
        let emptyFlag = false;
        if (Object.getOwnPropertyNames(params).length === 0) {
          emptyFlag = true;
        }
        params['stockOutType'] = that.paramsType;
        params['pageNum'] = that.records.pagination.currentPage;
        params['singlePageNum'] = that.records.pagination.pageSize;
        that.recordDetails.hasRecordDetails = false;
        if (emptyFlag) {
          that.getAllWareHouseStockOutRecord(params);
        } else {
          that.getWarehouseStockOutRecordByParams(params);
        }
      }
    },
    handleRecordTableClick(row, event, column) {
      console.log(`row`, row);
      if (column.label !== '操作') {
        const that = this;
        let stockOutSerialNo = row.stockOutSerialNo;
        let params = {
          stockOutSerialNo: stockOutSerialNo,
        };
        that.recordDetails.hasRecordDetails = false;
        that.getWarehouseStockOutRecordDetailByParams(params);
      }
    },
    handlePaginationSizeChange(pageSize) {
      const that = this;
      that.updateRecordTableData();
    },
    handleListStockOut(row) {
      const that = this;
      console.log(`待处理行信息为：`, row);
      let stockOutSerialNo = row.stockOutSerialNo;
      let id = row.id;
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
          stockOutSerialNo: stockOutSerialNo,
          recordId: id,
          isCreated: false,
          vouchType: that.preDefinedType,
        },
      });
    },
    handleListPick(row) {
      const that = this;
      console.log(`待处理行信息为：`, row);
      let stockOutSerialNo = row.stockOutSerialNo;
      let path = '/stockout/stockoutpickandpack';
      that.$router.push({
        path: path,
        query: {
          stockOutSerialNo: stockOutSerialNo,
        },
      });
    },
    handleListDeliver(row) {
      const that = this;
      console.log(`待处理行信息为：`, row);
      let stockOutSerialNo = row.stockOutSerialNo;
      let path = '/stockout/stockoutdeliver';
      that.$router.push({
        path: path,
        query: {
          stockOutSerialNo: stockOutSerialNo,
        },
      });
    }
  },
  watch: {
    paramsType: function (val) {
      const that = this;
      console.log(`paramsType`, val);
      if (val === that.preDefinedType) {
        console.log(`preDefinedType matched!`);
        that.updateRecordTableData();
      }
    }
  },
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
.records {
  .recordTables {
    max-height: 550px;
  }
  .pagination {
    display: flex;
    flex-direction: row-reverse;
  }
}
.recordDetails {
  max-height: 550px;
}
</style>
