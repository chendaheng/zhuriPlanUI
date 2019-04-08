<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <el-row :gutter="10">
        <!-- 分拣记录部分 -->
        <el-col :span="21" class="pickRecords">
          <!-- 第一行 -->
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">分拣作业单号：</div>
                <div class="inputBar">
                  <el-input v-model=pickRecords.params.pickSerialNo placeholder="请输入分拣作业单号"></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">分拣日期：</div>
                <div class="inputBar">
                  <el-input v-model=pickRecords.params.pickDate placeholder="请输入分拣日期"></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">分拣人：</div>
                <el-select class="inputBar" v-model="pickRecords.params.operUserId" filterable placeholder="请选择人员">
                  <el-option
                    v-for="item in pickRecords.options.operUserOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <!-- 第二行 -->
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">分拣仓库：</div>
                <el-select class="inputBar" v-model="pickRecords.params.warehouseId" filterable placeholder="请选择仓库">
                  <el-option
                    v-for="item in pickRecords.options.warehouseOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">出库单号</div>
                <div class="inputBar">
                  <el-input v-model=pickRecords.params.stockOutSerialNo placeholder="请输入出库单号"></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="2">
              <el-button type="text">查看关联单据</el-button>
            </el-col>
          </el-row>
          <!-- 第三行 -->
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">确认人：</div>
                <el-select class="inputBar" v-model="pickRecords.params.affirmUserId" filterable placeholder="请选择确认人">
                  <el-option
                    v-for="item in pickRecords.options.affirmUserOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <!-- 第四行 -->
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="24">
              <div class="inputBox" style="display: flex; align-items: flex-start">
                <div class="label">备注：</div>
                <div class="inputBar">
                  <el-input
                    v-model=pickRecords.params.note
                    placeholder="请输入备注"
                    type="textarea">
                  </el-input>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <!-- 功能按钮部分 -->
        <el-col :span="3" class="pickFunctions">
          <el-button type="primary" class="functionButtons" v-show="pickRecords.isCreated" @click="updatePickRecordByAdd">生成分拣单</el-button>
          <!-- <el-button type="success" class="functionButtons" v-show="!(pickRecords.isCreated)">智能分拣</el-button> -->
          <el-button type="warning" class="functionButtons" v-show="!(pickRecords.isCreated)">打印分拣单</el-button>
          <el-button type="primary" class="functionButtons" v-show="!(pickRecords.isCreated)" @click="confirmModify">确认修改</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-bottom: 20px">
      <!-- 分拣记录明细部分 -->
      <div class="pickDetails">
        <!-- 功能按钮以及显示信息部分 -->
        <el-row :gutter="10" style="display: flex; flex-direction: row; justify-content: center; margin-bottom: 20px">
          <el-col :span="10" class="pickDetailBarcode">
            <el-button type="primary" @click="addPickDetail">添加</el-button>
            <el-button type="primary" @click="deletePickDetail">删除</el-button>
            <div class="inputBox">
              <div class="label">条码：</div>
              <div class="inputBar">
                <el-input
                  v-model=pickDetails.showParams.barcode
                  placeholder="请输入条码">
                </el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="7" :offset="7" class="pickDetailTotal">
            <div>
              <span>分拣明细数量：</span>
              <span style="color: #00F">{{ pickDetails.showParams.pickNumber }}</span>
            </div>
          </el-col>
        </el-row>
        <!-- 分拣记录明细表格部分 -->
        <el-row>
          <el-table
            :data=pickDetails.pickDetails
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
              min-width="120px"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="pickDetails.pickDetails[scope.$index]['materialCode']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="materialName"
              label="物料名称"
              min-width="120px"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input :disabled="true" v-model="pickDetails.pickDetails[scope.$index]['materialName']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="format"
              label="物料规格"
              min-width="120px"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input :disabled="true" v-model="pickDetails.pickDetails[scope.$index]['format']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="unit"
              label="计量单位"
              min-width="120px"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input :disabled="true" v-model="pickDetails.pickDetails[scope.$index]['unit']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="storedQuatity"
              label="库存数量"
              min-width="120px"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input :disabled="true" v-model="pickDetails.pickDetails[scope.$index]['storedQuatity']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="batchCode"
              label="批号"
              min-width="120px"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="pickDetails.pickDetails[scope.$index]['batchCode']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="pickCount"
              label="分拣数量"
              min-width="120px"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="pickDetails.pickDetails[scope.$index]['pickCount']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="storageCode"
              label="库位号"
              min-width="120px"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="pickDetails.pickDetails[scope.$index]['storageCode']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="packSerialNo"
              label="装箱流水号"
              min-width="120px"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="pickDetails.pickDetails[scope.$index]['packSerialNo']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="packNo"
              label="装箱号"
              min-width="120px"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="pickDetails.pickDetails[scope.$index]['packNo']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注"
              min-width="120px"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="pickDetails.pickDetails[scope.$index]['note']"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false">
      <span>是否跳转到编辑页面？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "StockOutPickAndPackContent",
  data() {
    return {
      pickRecords: {
        params: {
          pickSerialNo: '',
          pickDate: '',
          operUserId: '',
          warehouseId: '',
          stockOutSerialNo: '',
          affirmUserId: '',
          note: '',
        },
        options: {
          operUserOptions: [
            {
              value: 1,
              label: "用户1"
            },
            {
              value: 2,
              label: "用户2"
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
          affirmUserOptions: [
            {
              value: 1,
              label: "用户1"
            },
            {
              value: 2,
              label: "用户2"
            }
          ],
        },
        emptyParams: {
          pickSerialNo: '',
          pickDate: '',
          operUserId: '',
          warehouseId: '',
          stockOutSerialNo: '',
          affirmUserId: '',
          note: '',
        },
        isCreated: true,
      },
      pickDetails: {
        showParams: {
          barcode: '',
          pickNumber: 0,
        },
        pickDetails: [
          {
            materialCode: '10001',
            materialName: '物料1',
            format: '规格1',
            unit: '单位1',
            storedQuatity: '10',
            batchCode: '001',
            pickCount: '5',
            storageCode: 'S1001',
            packSerialNo: 'P10001',
            packNo: '1',
            note: '备注1',
          },
          {
            materialCode: '20001',
            materialName: '物料2',
            format: '规格2',
            unit: '单位2',
            storedQuatity: '10',
            batchCode: '002',
            pickCount: '5',
            storageCode: 'S2001',
            packSerialNo: 'P20001',
            packNo: '2',
            note: '备注2',
          },
        ],
        emptyPickDetail: {
          materialCode: '',
          materialName: '',
          format: '',
          unit: '',
          storedQuatity: '',
          batchCode: '',
          pickCount: '',
          storageCode: '',
          packSerialNo: '',
          packNo: '',
          note: '',
        },
        selectedPickDetails: [],
        curLabel: 0,
      },
      dialogVisible: false,
    }
  },
  props: ['relatedParams'],
  methods: {
    // ------------------------------------ 工具函数 ------------------------------------
    initEmptyDatas() {
      const that = this;
      for (let key in that.pickRecords.emptyParams) {
        that.pickRecords.params[key] = that.pickRecords.emptyParams[key];
      }
      that.pickDetails.pickDetails = [];
    },
    getMemberOptions() {
      const that = this;
      // console.log(`获取客户信息中...`);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllMemberSelectOptionsInWarehouse`)
        .then(response => {
          // console.log(`获取客户信息完成，结果为：`, response);
          that.pickRecords.options.affirmUserOptions = response.data;
        })
        .catch(error => {
          console.log(`加载客户信息出错，错误为：`, error);
        });
    },
    getAffirmUserOptions() {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllMemberSelectOptionsInWarehouse`)
        .then(response => {
          that.pickRecords.options.operUserOptions = response.data;
        })
        .catch(error => {
          console.log(`加载确认用户信息出错，错误为：`, error);
        });
    },
    getWarehouseOptions() {
      const that = this;
      // console.log(`获取仓库信息中...`);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllWarehouseSelectOptionsInWarehouse`)
        .then(response => {
          // console.log(`获取仓库信息完成，结果为：`, response);
          that.pickRecords.options.warehouseOptions = response.data;
        })
        .catch(error => {
          console.log(`加载仓库信息出错，错误为：`, error);
        });
    },
    initDatas() {
      const that = this;
      that.initEmptyDatas();
      that.getMemberOptions();
      that.getWarehouseOptions();
      that.getAffirmUserOptions();
    },
    getWarehouseStockOutPickDetailByParams(params) {
      const that = this;
      console.log(`getWarehouseStockOutPickDetailByParams`, params);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getWarehouseStockOutPickDetailByParams`, params)
        .then(response => {
          console.log(`获取分拣记录明细信息结果为：`, response);
          let pickDetails = response.data.pickDetails;
          that.pickDetails.curLabel = 0;
          for (let element in pickDetails) {
            pickDetails[element]['label'] = that.pickDetails.curLabel;
            that.pickDetails.curLabel += 1;
          }
          that.pickDetails.pickDetails = pickDetails;
          that.completeMaterialCode(that.pickDetails.pickDetails);
          that.pickDetails.showParams.pickNumber = that.pickDetails.pickDetails.length;
        })
    },
    getWarehouseStockOutPickByParams(params) {
      const that = this;
      console.log(`getWarehouseStockOutPickByParams`, params);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getWarehouseStockOutPickByParams`, params)
        .then(response => {
          console.log(`获取分拣记录信息结果为：`, response);
          if (response.data.picks.length > 0) {
            for (let key in that.pickRecords.params) {
              that.pickRecords.params[key] = response.data.picks[0][key];
            }
            let pickParams = {
              pickSerialNo: that.pickRecords.params['pickSerialNo'],
            };
            that.pickRecords.isCreated = false;
            that.getWarehouseStockOutPickDetailByParams(pickParams);
          } else {
            that.initEmptyDatas();
            that.pickRecords.isCreated = true;
            that.pickRecords.params['stockOutSerialNo'] = params.stockOutSerialNo;
          }
        })
        .catch(error => {
          console.log(`获取分拣记录信息出错，错误为：`, error);
        });
    },
    updateWarehouseStockOutPickByParams(params) {
      const that = this;
      console.log(`updateWarehouseStockOutPickByParams`, params);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/updateWarehouseStockOutPickByParams`, params)
        .then(response => {
          console.log(`更新分拣记录信息回复为：`, response);
          if (params['editFlag'] === 0 && response.data === 0 && params['stockOutSerialNo'] !== '') {
            //! 如果是新建，则询问是否需要刷新页面，必须保证更新成功的情况下才能进行
            that.dialogVisible = true;
          }
        })
        .catch(error => {
          console.log(`更新分拣记录信息出错，错误为：`, error);
        });
    },
    updateWarehouseStockOutPickDetailByParams(params) {
      const that = this;
      console.log(`updateWarehouseStockOutPickDetailByParams`, params);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/updateWarehouseStockOutPickDetailByParams`, params)
        .then(response => {
          console.log(`更新分拣记录明细信息回复为：`, response);
        })
        .catch(error => {
          console.log(`更新分拣记录明细信息出错，错误为：`, error);
        });
    },
    collectPickParams() {
      const that = this;
      let tmp = {};
      for (let key in that.pickRecords.params) {
        tmp[key] = that.pickRecords.params[key];
      }
      if (that.pickRecords.isCreated === false) {
        tmp['editFlag'] = 1;
      } else {
        tmp['editFlag'] = 0;
      }
      return tmp;
    },
    collectPickDetails() {
      const that = this;
      let tmp = Object.assign([], that.pickDetails.pickDetails);
      let result = {
        dataArr: tmp,
        // stockOutSerialNo: that.pickRecords.params.stockOutSerialNo,
        pickSerialNo: that.pickRecords.params.pickSerialNo,
      };
      return result;
    },
    addPickDetail() {
      const that = this;
      let params = Object.assign({}, that.pickDetails.emptyPickDetail);
      params['label'] = that.pickDetails.curLabel;
      that.pickDetails.curLabel += 1;
      that.pickDetails.pickDetails.push(params);
      that.pickDetails.showParams.pickNumber = that.pickDetails.pickDetails.length;
    },
    deletePickDetail() {
      const that = this;
      let newPickDetails = [];
      let deleteDict = {};
      let oldSelectPickDetails = that.pickDetails.selectedPickDetails;
      for (let element in oldSelectPickDetails) {
        deleteDict[oldSelectPickDetails[element]['label']] = 1;
      }
      let oldPickDetails = that.pickDetails.pickDetails;
      for (let element in oldPickDetails) {
        if (deleteDict[oldPickDetails[element]['label']] !== 1) {
          newPickDetails.push(oldPickDetails[element]);
        }
      }
      that.pickDetails.pickDetails = Object.assign([], newPickDetails);
      that.pickDetails.showParams.pickNumber = that.pickDetails.pickDetails.length;
    },
    handleDetailSelect(selection, row) {
      const that = this;
      that.pickDetails.selectedPickDetails = selection;
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
    updatePickRecordByAdd() {
      //* 只更新分拣记录部分
      const that = this;
      let pickRecordParams = that.collectPickParams();
      that.updateWarehouseStockOutPickByParams(pickRecordParams);
    },
    confirmModify() {
      //* 既更新分拣记录部分，又更新分拣记录明细部分
      const that = this;
      let pickDetailsParams = that.collectPickDetails();
      let pickRecordParams = that.collectPickParams();
      that.updateWarehouseStockOutPickByParams(pickRecordParams);
      that.updateWarehouseStockOutPickDetailByParams(pickDetailsParams);
    },
    handleDialogConfirm() {
      const that = this;
      let path = '/stockout/stockoutpickandpack';
      that.dialogVisible = false;
      that.$router.push({
        path: path,
        query: {
          stockOutSerialNo: that.pickRecords.params.stockOutSerialNo,
        },
      });
      that.$router.go(0);
    },
  },
  watch: {
    relatedParams: {
      handler: function (newVal, oldVal) {
        const that = this;
        console.log(`relatedParams newVal`, newVal);
        let stockOutSerialNo = newVal.stockOutSerialNo;
        that.initEmptyDatas();
        if (stockOutSerialNo !== '' && stockOutSerialNo !== undefined) {
          that.pickRecords.params.stockOutSerialNo = stockOutSerialNo;
          let params = {};
          params['stockOutSerialNo'] = that.pickRecords.params.stockOutSerialNo;
          that.getWarehouseStockOutPickByParams(params);
        }
      },
      deep: true,
    },
  },
  mounted: function () {
    const that = this;
    that.initDatas();
  }
}
</script>

<style lang="less" scoped>
.pickRecords {
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
.pickFunctions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .functionButtons {
    margin-left: 10px;
    margin-bottom: 10px;
  }
}
.pickDetails {
  .pickDetailBarcode {
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
  .pickDetailTotal {
    display: flex;
    flex-direction: row-reverse;
    justify-content: left;
    align-items: center;
  }
}
</style>


