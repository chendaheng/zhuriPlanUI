<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <el-row :gutter="10">
        <!-- 出库记录部分 -->
        <el-col :span="21" class="recordInfos">
          <!-- 第一行 -->
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">出库单号：</div>
                <div class="inputBar">
                  <el-input v-model=recordInfos.params.stockOutSerialNo placeholder="请输入出库单号"></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">出库日期：</div>
                <el-date-picker
                  class="inputBar"
                  v-model=recordInfos.params.stockOutDate
                  placeholder="请选择出库日期"
                  value-format="yyyy-MM-dd"
                  format="yyyy 年 MM 月 dd 日">
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">收货人姓名：</div>
                <div class="inputBar">
                  <el-input v-model=recordInfos.params.receiver placeholder="请输入收货人"></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 第二行 -->
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">发出仓库：</div>
                <el-select class="inputBar" v-model="recordInfos.params.warehouseId" filterable placeholder="请选择仓库">
                  <el-option
                    v-for="item in recordInfos.options.warehouseOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">部门：</div>
                <el-select class="inputBar" v-model="recordInfos.params.deptId" filterable placeholder="请选择部门">
                  <el-option
                    v-for="item in recordInfos.options.deptOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">客户：</div>
                <el-select class="inputBar" v-model="recordInfos.params.partnerId" filterable placeholder="请选择客户">
                  <el-option
                    v-for="item in recordInfos.options.partnerOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <!-- 第三行 -->
          <el-row :gutter="10" style="padding-bottom: 15px">
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">出库员：</div>
                <el-select class="inputBar" v-model="recordInfos.params.operUserId" filterable disabled placeholder="请选择出库员">
                  <el-option
                    v-for="item in recordInfos.options.operUserOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">{{ relatedVouchLabel }}</div>
                <!-- <el-select class="inputBar" v-model="recordInfos.params.vouchSerialNo" filterable placeholder="请选择订单">
                  <el-option
                    v-for="item in recordInfos.options.vouchSerialNoOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select> -->
                <div class="inputBar">
                  <el-input
                    v-model=recordInfos.params.vouchSerialNo
                    placeholder="请输入关联单据号">
                  </el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="2">
              <el-button type="text">查看关联单据</el-button>
            </el-col>
          </el-row>
          <!-- 第四行 -->
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="24">
              <div class="inputBox" style="display: flex; align-items: flex-start">
                <div class="label">备注：</div>
                <div class="inputBar">
                  <el-input
                    v-model=recordInfos.params.note
                    placeholder="请输入备注"
                    type="textarea">
                  </el-input>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <!-- 功能按钮部分 -->
        <el-col :span="3" class="recordFunctions">
          <el-button type="primary" class="functionButtons" v-show="!(relatedParams.isCreated)" @click="confirmModify">确认修改</el-button>
          <el-button type="primary" class="functionButtons" v-show="relatedParams.isCreated" @click="createStockOut">创建出库单</el-button>
          <!-- <el-button type="success" class="functionButtons" v-show="!(relatedParams.isCreated)">审核出库单</el-button> -->
          <el-button type="warning" class="functionButtons" v-show="!(relatedParams.isCreated)" @click="pickAndPack">分拣</el-button>
          <el-button type="primary" class="functionButtons" v-show="!(relatedParams.isCreated)" @click="handleDeliver">提货</el-button>
          <el-button type="danger" class="functionButtons" v-show="!(relatedParams.isCreated)" @click="confirmStockOut">确认出库</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-bottom: 20px">
      <!-- 出库记录明细部分 -->
      <div class="recordDetails">
        <!-- 功能按钮以及显示信息部分 -->
        <el-row :gutter="10" style="display: flex; flex-direction: row; justify-content: center; margin-bottom: 20px">
          <el-col :span="10" class="recordDetailBarcode">
            <el-button type="primary" @click="addRecordDetail">添加</el-button>
            <el-button type="primary" @click="deleteRecordDetail">删除</el-button>
            <div class="inputBox">
              <div class="label">条码：</div>
              <div class="inputBar">
                <el-input
                  v-model=recordDetails.showParams.barcode
                  placeholder="请输入条码">
                </el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="7" :offset="7" class="recordDetailTotal">
            <div>
              <span>出库金额：</span>
              <span style="color: #00F">{{ recordDetails.showParams.stockOutTotal }}</span>
              <span>元</span>
              <span style="margin-left: 20px">出库金额（含税）：</span>
              <span style="color: #00F">{{ recordDetails.showParams.stockOutTotalWithTax }}</span>
              <span>元</span>
            </div>
          </el-col>
        </el-row>
        <!-- 出库记录明细表格部分 -->
        <el-row>
          <el-table
            :data=recordDetails.recordDetails
            border
            :stripe="true"
            :highlight-current-row="true"
            @select="handleDetailSelect"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="materialCode"
              label="物料编码"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="recordDetails.recordDetails[scope.$index]['materialCode']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="materialName"
              label="物料名称"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input :disabled="true" v-model="recordDetails.recordDetails[scope.$index]['materialName']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="format"
              label="物料规格"
              width="150"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input :disabled="true" v-model="recordDetails.recordDetails[scope.$index]['format']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="unit"
              label="计量单位"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input :disabled="true" v-model="recordDetails.recordDetails[scope.$index]['unit']"></el-input>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="storage"
              label="库位"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input :disabled="true" v-model="recordDetails.recordDetails[scope.$index]['storage']"></el-input>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="batchCode"
              label="批号"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="recordDetails.recordDetails[scope.$index]['batchCode']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="stockOutQuantity"
              label="出库数量"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="recordDetails.recordDetails[scope.$index]['stockOutQuantity']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="不含税单价"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="recordDetails.recordDetails[scope.$index]['price']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="stockOutPrice"
              label="不含税金额"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="recordDetails.recordDetails[scope.$index]['stockOutPrice']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="开票"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-checkbox v-model=scope.row.invoice></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="taxRate"
              label="税率"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="recordDetails.recordDetails[scope.$index]['taxRate']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="taxPrice"
              label="含税单价"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="recordDetails.recordDetails[scope.$index]['taxPrice']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="stockOutTaxPrice"
              label="含税金额"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="recordDetails.recordDetails[scope.$index]['stockOutTaxPrice']"></el-input>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="packNumber"
              label="装箱数量"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input :disabled="true" v-model="recordDetails.recordDetails[scope.$index]['packNumber']"></el-input>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="note"
              label="出库备注"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="recordDetails.recordDetails[scope.$index]['note']"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "StockOutGeneralContent",
  data() {
    return {
      recordInfos: {
        params: {
          stockOutSerialNo: "",
          stockOutDate: "",
          receiver: "",
          warehouseId: "",
          deptId: "",
          partnerId: "",
          vouchSerialNo: "",
          operUserId: "",
          note: "",
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
          deptOptions: [
            {
              value: 1,
              label: "部门1"
            },
            {
              value: 2,
              label: "部门2"
            }
          ],
          partnerOptions: [
            {
              value: 1,
              label: "客户1"
            },
            {
              value: 2,
              label: "客户2"
            }
          ],
          operUserOptions: [],
        },
      },
      recordDetails: {
        showParams: {
          barcode: '',
          stockOutTotal: 0,
          stockOutTotalWithTax: 0,
        },
        recordDetails: [
          {
            materialCode: '10001',
            materialName: '物料1',
            format: '规格1',
            unit: '计量单位1',
            storage: '库位1',
            batchCode: '批号1',
            stockOutQuantity: '10',
            price: '10元',
            stockOutPrice: '100',
            invoice: true,
            taxRate: '20%',
            taxPrice: '12元',
            stockOutTaxPrice: '120',
            packNumber: '10',
            note: '备注1',
          },
          {
            materialCode: '20001',
            materialName: '物料2',
            format: '规格2',
            unit: '计量单位2',
            storage: '库位2',
            batchCode: '批号2',
            stockOutQuantity: '10',
            price: '10元',
            stockOutPrice: '100',
            invoice: false,
            taxRate: '20%',
            taxPrice: '12元',
            stockOutTaxPrice: '120',
            packNumber: '10',
            note: '备注2',
          },
        ],
        emptyRecordDetail: {
          materialCode: '',
          materialName: '',
          format: '',
          unit: '',
          storage: '',
          batchCode: '',
          stockOutQuantity: '',
          price: '',
          stockOutPrice: '',
          invoice: false,
          taxRate: '',
          taxPrice: '',
          stockOutTaxPrice: '',
          packNumber: '',
          note: '',
        },
        selectedRecordDetails: [],
        curLabel: 0,
      },
    }
  },
  created: function () {
    const that = this;
    that.getSelectedOptions();
  },
  methods: {
    // ------------------------------------ 工具函数 ------------------------------------
    getWarehouseOptions() {
      const that = this;
      // console.log(`获取仓库信息中...`);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllWarehouseSelectOptionsInWarehouse`)
        .then(response => {
          // console.log(`获取仓库信息完成，结果为：`, response);
          that.recordInfos.options.warehouseOptions = response.data;
        })
        .catch(error => {
          console.log(`加载仓库信息出错，错误为：`, error);
        });
    },
    getDeptOptions() {
      const that = this;
      // console.log(`获取部门信息中...`);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllDeptSelectOptionsInWarehouse`)
        .then(response => {
          // console.log(`获取部门信息完成，结果为：`, response);
          that.recordInfos.options.deptOptions = response.data;
        })
        .catch(error => {
          console.log(`加载部门信息出错，错误为：`, error);
        });
    },
    getPartnerOptions() {
      const that = this;
      // console.log(`获取客户信息中...`);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllClientSelectOptionsInWarehouse`)
        .then(response => {
          // console.log(`获取客户信息完成，结果为：`, response);
          that.recordInfos.options.partnerOptions = response.data;
        })
        .catch(error => {
          console.log(`加载客户信息出错，错误为：`, error);
        });
    },
    getOperUserOptions() {
      const that = this;
      // console.log(`获取出库员信息中...`);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllMemberSelectOptionsInWarehouse`)
        .then(response => {
          // console.log(`获取出库员信息完成，结果为：`, response);
          that.recordInfos.options.operUserOptions = response.data;
        })
        .catch(error => {
          console.log(`加载出库员信息出错，错误为：`, error);
        });
    },
    getSelectedOptions() {
      const that = this;
      that.getWarehouseOptions();
      that.getDeptOptions();
      that.getPartnerOptions();
      that.getOperUserOptions();
    },
    // 带回调版本的根据参数获取所有信息的函数
    getAllInfoByParams(params, func) {
      const that = this;
      console.log(`getWarehouseStockOutRecordById`, params);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getWarehouseStockOutRecordById`, params)
        .then(response => {
          console.log(`获取出库记录信息结果为：`, response);
          if (response.data.records.length > 0) {
            for (let key in that.recordInfos.params) {
              that.recordInfos.params[key] = response.data.records[0][key];
            }
            let paramsDetail = {};
            paramsDetail['stockOutSerialNo'] = response.data.records[0]['stockOutSerialNo'];
            // 为了避免重复加载，回调函数被放在了获取明细信息之前
            if (func !== undefined) {
              func();
            }
            that.getWarehouseStockOutRecordDetailByParams(paramsDetail);
          } else {
            for (let key in params) {
              if (params[key] !== undefined) {
                that.recordInfos.params[key] = params[key];
              }
            }
          }
        })
        .catch(error => {
          console.log(`获取出库记录信息出错，错误为：`, error);
        });
    },
    getWarehouseStockOutRecordById(params) {
      const that = this;
      console.log(`getWarehouseStockOutRecordById`, params);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getWarehouseStockOutRecordById`, params)
        .then(response => {
          console.log(`获取出库记录信息结果为：`, response);
          for (let key in that.recordInfos.params) {
            that.recordInfos.params[key] = response.data.records[0][key];
          }
        })
        .catch(error => {
          console.log(`获取出库记录信息出错，错误为：`, error);
        });
    },
    getWarehouseStockOutRecordDetailByParams(params) {
      const that = this;
      console.log(`getWarehouseStockOutRecordDetailByParams`, params);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getWarehouseStockOutRecordDetailByParams`, params)
        .then(response => {
          console.log(`获取出库记录明细信息结果为：`, response);
          let recordDetails = response.data.recordDetails;
          that.recordDetails.curLabel = 0;
          for (let element in recordDetails) {
            recordDetails[element]['label'] = that.recordDetails.curLabel;
            that.recordDetails.curLabel += 1;
          }
          for (let element in recordDetails) {
            let boolInteger = recordDetails[element]['invoice'];
            if (boolInteger === 1) {
              boolInteger = true;
            } else {
              boolInteger = false;
            }
            recordDetails[element]['invoice'] = boolInteger;
          }
          that.completeMaterialCode(recordDetails);
          that.recordDetails.recordDetails = recordDetails;
        })
        .catch(error => {
          console.log(`获取出库记录明细出错，错误为：`, error);
        })
    },
    updateWarehouseStockOutRecordByParams(params) {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/updateWarehouseStockOutRecordByParams`, params)
        .then(response => {
          console.log(`更新出库记录结果为：`, response);
          if (response.data === 0) {
            that.$message.success(`更新出库记录成功！`);
          }
        })
        .catch(error => {
          that.$message.error(`更新出库记录信息出错！`);
          console.log(`更新出库记录信息出错，错误为：`, error);
        });
    },
    updateWarehouseStockOutDetailByParams(params) {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/updateWarehouseStockOutDetailByParams`, params)
        .then(response => {
          console.log(`更新出库记录明细信息结果为：`, response);
          if (response.data === 0) {
            that.$message.success(`更新出库记录明细成功！`);
          }
        })
        .catch(error => {
          that.$message.error(`更新出库记录明细信息时出错！`);
          console.log(`更新出库记录明细信息时出错，错误为：`, error);
        });
    },
    updateWarehouseStockOutRecordStatusByParams(params) {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/updateWarehouseStockOutRecordStatusByParams`, params)
        .then(response => {
          console.log(`更新出库记录状态结果为：`, response);
          if (response.data === 0) {
            that.$message.success(`更新出库记录状态成功！`);
          } else {
            that.$message.error(`更新出库记录状态时出错，错误码为：` + response.data);
          }
        })
        .catch(error => {
          that.$message.error(`更新出库记录状态时出错！`);
          console.log(`更新出库记录状态信息时出错，错误为：`, error);
        })
    },
    collectRecordInfoParams() {
      let params = {};
      const that = this;
      for (let key in that.recordInfos.params) {
        params[key] = that.recordInfos.params[key];
      }
      if (that.relatedParams.isCreated === false) {
        params["editFlag"] = 1;
        params["id"] = that.relatedParams.recordId;
      } else {
        params["editFlag"] = 0;
      }
      return params;
    },
    collectRecordDetails() {
      const that = this;
      let recordDetails = {
        dataArr: [],
        stockOutSerialNo: that.recordInfos.params.stockOutSerialNo,
      };
      recordDetails.dataArr = Object.assign([], that.recordDetails.recordDetails);
      for (let element in recordDetails.dataArr) {
        let intBoolean = recordDetails.dataArr[element]['invoice'];
        if (intBoolean === true) {
          intBoolean = 1;
        } else {
          intBoolean = 0;
        }
        recordDetails.dataArr[element]['invoice'] = intBoolean;
      }
      return recordDetails;
    },
    addRecordDetail() {
      const that = this;
      let params = Object.assign({}, that.recordDetails.emptyRecordDetail);
      params['label'] = that.recordDetails.curLabel;
      that.recordDetails.curLabel += 1;
      that.recordDetails.recordDetails.push(params);
    },
    deleteRecordDetail() {
      const that = this;
      let newRecordDetails = [];
      let deleteDict = {};
      let oldSelectRecordDetails = that.recordDetails.selectedRecordDetails;
      for (let element in oldSelectRecordDetails) {
        deleteDict[oldSelectRecordDetails[element]['label']] = 1;
      }
      let oldRecordDetails = that.recordDetails.recordDetails;
      for (let element in oldRecordDetails) {
        if (deleteDict[oldRecordDetails[element]['label']] !== 1) {
          newRecordDetails.push(oldRecordDetails[element]);
        }
      }
      that.recordDetails.recordDetails = Object.assign([], newRecordDetails);
    },
    handleDetailSelect(selection, row) {
      const that = this;
      that.recordDetails.selectedRecordDetails = selection;
    },
    updateRelatedParamsToFather(params) {
      const that = this;
      that.$emit('updateRelatedParams', params);
    },
    completeMaterialCode(targetArray) {
      var that = this;
      for (let index in targetArray) {
        let submitParam = [];
        let param = {
          materialCode: targetArray[index].materialCode,
          unitId: targetArray[index].unitId,
        };
        submitParam.push(param);
        that.$axios
          .post(`${window.$config.HOST}/warehouse/stockOut/getMaterialsByCodes`, submitParam)
          .then(response => {
            console.log(`response`, response);
            targetArray[index].materialName = response.data[0].materialName;
            targetArray[index].format = response.data[0].materialFormat;
            targetArray[index].unit = response.data[0].unitName;
            // console.log(`row`, row, `idx`, idx);
            console.log(`recordDetails`, targetArray);
            targetArray[index] = Object.assign({}, targetArray[index]);
          })
          .catch(error => {
            console.log(`Error in getChangeMaterialCode`, error);
          })
      }
    },
    // ------------------------------------ 业务函数 ------------------------------------
    createStockOut() {
      const that = this;
      let params = that.collectRecordInfoParams();
      params['stockOutType'] = that.relatedVouchType;
      console.log(`待传出的参数为：`, params);
      that.updateWarehouseStockOutRecordByParams(params);
    },
    confirmModify() {
      const that = this;
      let recordInfoParams = that.collectRecordInfoParams();
      let recordDetails = that.collectRecordDetails();
      recordDetails.dataArr = recordDetails.dataArr.map((value, index, array) => {
        delete value['label'];
        return value;
      });
      console.log(`待上传出库记录为：`, recordInfoParams, `待上传出库记录明细为：`, recordDetails);
      that.updateWarehouseStockOutRecordByParams(recordInfoParams);
      that.updateWarehouseStockOutDetailByParams(recordDetails);
    },
    confirmStockOut() {
      const that = this;
      let params = {};
      params['recordId'] = that.relatedParams.recordId;
      params['stockOutSerialNo'] = that.recordInfos.params.stockOutSerialNo;
      that.updateWarehouseStockOutRecordStatusByParams(params);
    },
    pickAndPack() {
      const that = this;
      let path = '/stockout/stockoutpickandpack';
      that.$router.push({
        path: path,
        query: {
          stockOutSerialNo: that.recordInfos.params.stockOutSerialNo,
        },
      });
    },
    handleDeliver() {
      const that = this;
      let stockOutSerialNo = that.recordInfos.params.stockOutSerialNo;
      let path = '/stockout/stockoutdeliver';
      that.$router.push({
        path: path,
        query: {
          stockOutSerialNo: stockOutSerialNo,
        },
      });
    },
  },
  mounted: function () {},
  props: ['relatedVouchLabel', 'relatedVouchType', 'relatedParams'],
  watch: {
    relatedParams: {
      handler: function (newVal, oldVal) {
        const that = this;
        // that.getSelectedOptions();
        console.log(`relatedParams`, newVal);
        if (newVal.isCreated !== false) {
          //* 若是新建出库单，则清空出库明细
          that.recordDetails.recordDetails = [];
          for (let key in that.recordInfos.params) {
            that.recordInfos.params[key] = '';
          }
        }
        if (that.relatedParams.vouchType !== undefined) {
          //* 若存在单据类型，则获取数据
          if (that.relatedVouchType !== that.relatedParams.vouchType) {
            console.log(`relatedVouchType = `, that.relatedVouchType, `relatedParams.vouchType`, that.relatedParams.vouchType);
            that.$message.error("出库类型不匹配！");
          }
          // 根据已有信息查询出库记录信息
          let paramsRecord = {};
          // 出库记录
          paramsRecord['stockOutSerialNo'] = newVal.stockOutSerialNo;
          paramsRecord['recordId'] = newVal.recordId;
          paramsRecord['vouchSerialNo'] = newVal.vouchSerialNo;
          console.log(`paramsRecord = `, paramsRecord);
          that.getAllInfoByParams(paramsRecord, () => {
            // 若此回调函数被执行，说明在数据库中查找到了对应记录，则需要重新刷新路由，以stockOutSerialNo为唯一参数
            const that = this;
            if (that.$route.query.isCreated !== false) {
              // 若需要修改isCreated的话
              let stockOutSerialNo = that.recordInfos.params.stockOutSerialNo;
              let path = that.$route.path;
              // 目前不会重新获取出库记录，但是会在回调函数执行完之后获取detail
              that.$router.push({
                path: path,
                query: {
                  stockOutSerialNo: stockOutSerialNo,
                  isCreated: false
                },
              });
              that.updateRelatedParamsToFather({
                stockOutSerialNo: stockOutSerialNo,
                isCreated: false,
              });
              // that.$emit('updaterelatedparams', {
              //   stockOutSerialNo: stockOutSerialNo,
              //   isCreated: false,
              // });
            }
          });
        }
      },
      deep: true,
    }
  }
}
</script>

<style lang="less" scoped>
.recordInfos {
  .inputBox {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .label {
      padding-left: 15px;
      font-size: 14px;
      min-width: 100px;
      white-space: nowrap;
    }
    .inputBar {
      width: 100%;
    }
  }
}
.recordFunctions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .functionButtons {
    margin-left: 10px;
    margin-bottom: 10px;
  }
}
.recordDetails {
  .recordDetailBarcode {
    display: flex;
    flex-direction: row;
    justify-content: left;
    .inputBox {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      .label {
        padding-left: 15px;
        font-size: 14px;
        min-width: 60px;
        white-space: nowrap;
      }
      .inputBar {
        width: 100%;
      }
    }
  }
  .recordDetailTotal {
    display: flex;
    flex-direction: row-reverse;
    justify-content: left;
    align-items: center;
  }
}
</style>


