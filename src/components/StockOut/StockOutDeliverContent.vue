<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <el-row :gutter="10">
        <!-- 发货记录部分 -->
        <el-col :span="21" class="deliverRecords">
          <!-- 第一行 -->
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">出库单号：</div>
                <div class="inputBar">
                  <el-input v-model=deliverRecords.params.stockOutSerialNo placeholder="请输入出库单号"></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">发货日期：</div>
                <div class="inputBar">
                  <el-input v-model=deliverRecords.params.deliverDate placeholder="请输入发货日期"></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">发货人：</div>
                <el-select class="inputBar" v-model="deliverRecords.params.deliverUserId" filterable placeholder="请选择人员">
                  <el-option
                    v-for="item in deliverRecords.options.deliverUserOptions"
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
                <div class="label">发货仓库：</div>
                <el-select class="inputBar" v-model="deliverRecords.params.warehouseId" filterable disabled placeholder="请选择仓库">
                  <el-option
                    v-for="item in deliverRecords.options.warehouseOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">发货方式：</div>
                <el-select class="inputBar" v-model="deliverRecords.params.deliverWay" filterable placeholder="请选择发货方式">
                  <el-option
                    v-for="item in deliverRecords.options.deliverWayOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <!-- 第三行 -->
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">第三方物流：</div>
                <el-select class="inputBar" v-model="deliverRecords.params.deliverCompanyId" filterable placeholder="请选择第三方物流">
                  <el-option
                    v-for="item in deliverRecords.options.deliverCompanyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">物流单号：</div>
                <div class="inputBar">
                  <el-input v-model=deliverRecords.params.deliverVouchNo placeholder="请输入物流单号"></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 第四行 -->
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">收货人：</div>
                <el-select class="inputBar" v-model="deliverRecords.params.pickUpUserId" filterable placeholder="请选择收货人">
                  <el-option
                    v-for="item in deliverRecords.options.pickUpUserOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="inputBox">
                <div class="label">收货地址：</div>
                <el-select class="inputBar" v-model="deliverRecords.params.receiverAddrId" filterable placeholder="请选择收货地址">
                  <el-option
                    v-for="item in deliverRecords.options.receiverAddrOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <!-- 第五行 -->
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="24">
              <div class="inputBox" style="display: flex; align-items: flex-start">
                <div class="label">备注：</div>
                <div class="inputBar">
                  <el-input
                    v-model=deliverRecords.params.note
                    placeholder="请输入备注"
                    type="textarea">
                  </el-input>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <!-- 功能按钮部分 -->
        <el-col :span="3" class="deliverFunctions">
          <el-button type="primary" class="functionButtons" v-show="deliverRecords.isCreated" @click="updateDeliverRecordByAdd">生成发货单</el-button>
          <el-button type="success" class="functionButtons" v-show="!(deliverRecords.isCreated)" @click="modifyDeliverStatus">完成发货</el-button>
          <el-button type="warning" class="functionButtons" v-show="!(deliverRecords.isCreated)" @click="confirmModify">保存发货状态</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-bottom: 20px">
      <!-- 发货记录明细部分 -->
      <div class="deliverDetails">
        <!-- 功能按钮以及显示信息部分 -->
        <el-row :gutter="10" style="display: flex; flex-direction: row; justify-content: center; margin-bottom: 20px">
          <el-col :span="10" class="deliverDetailBarcode">
            <el-button type="primary" @click="addDeliverDetail">添加</el-button>
            <el-button type="primary" @click="deleteDeliverDetail">删除</el-button>
            <div class="inputBox">
              <div class="label">条码：</div>
              <div class="inputBar">
                <el-input
                  v-model=deliverDetails.showParams.barcode
                  placeholder="请输入条码">
                </el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="7" :offset="7" class="deliverDetailTotal">
            <div>
              <span>包装数量：</span>
              <span style="color: #00F">{{ deliverDetails.showParams.packNumber }}</span>
            </div>
          </el-col>
        </el-row>
        <!-- 发货记录明细表格部分 -->
        <el-row>
          <el-table
            :data=deliverDetails.deliverDetails
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
              prop="packNo"
              label="装箱号"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="deliverDetails.deliverDetails[scope.$index]['packNo']"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="deliverDetails.deliverDetails[scope.$index]['note']"></el-input>
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
  name: 'StockOutDeliverContent',
  data() {
    return {
      dialogVisible: false,
      deliverRecords: {
        params: {
          stockOutSerialNo: '',
          deliverDate: '',
          deliverUserId: '',
          warehouseId: '',
          deliverWay: '',
          pickUpUserId: '',
          deliverCompanyId: '',
          deliverVouchNo: '',
          receiverAddrId: '',
          note: '',
        },
        options: {
          deliverUserOptions: [
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
          deliverWayOptions: [
            {
              value: '0',
              label: '自提',
            },
            {
              value: '1',
              label: '自有物流',
            },
            {
              value: '2',
              label: '第三方物流',
            },
          ],
          pickUpUserOptions: [
            {
              value: 1,
              label: "用户1"
            },
            {
              value: 2,
              label: "用户2"
            }
          ],
          deliverCompanyOptions: [
            {
              value: 1,
              label: "公司1"
            },
            {
              value: 2,
              label: "公司2"
            }
          ],
          receiverAddrOptions: [
            {
              value: 1,
              label: "地址1"
            },
            {
              value: 2,
              label: "地址2"
            }
          ],
        },
        emptyParams: {
          stockOutSerialNo: '',
          deliverDate: '',
          deliverUserId: '',
          warehouseId: '',
          deliverWay: '',
          pickUpUserId: '',
          deliverCompanyId: '',
          deliverVouchNo: '',
          receiverAddrId: '',
          note: '',
        },
        isCreated: true,
      },
      deliverDetails: {
        showParams: {
          barcode: '',
          packNumber: 0,
        },
        deliverDetails: [
          {
            packNo: '1',
            note: '备注1',
          },
          {
            packNo: '2',
            note: '备注2',
          },
          {
            packNo: '3',
            note: '备注3',
          },
        ],
        emptyDeliverDetail: {
          packNo: '',
          note: '',
        },
        selectedDeliverDetails: [],
        curLabel: 0,
      }
    }
  },
  props: ['relatedParams'],
  methods: {
    // ------------------------------------ 工具函数 ------------------------------------
    initEmptyData() {
      const that = this;
      for (let key in that.deliverRecords.emptyParams) {
        that.deliverRecords.params[key] = that.deliverRecords.emptyParams[key];
      }
      that.deliverDetails.deliverDetails = [];
      that.deliverDetails.showParams = {
        barcode: '',
        packNumber: 0,
      };
    },
    getDeliverUserOptions() {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllMemberSelectOptionsInWarehouse`)
        .then(response => {
          that.deliverRecords.options.deliverUserOptions = response.data;
        })
        .catch(error => {
          console.log(`加载发货人信息出错，错误为：`, error);
        });
    },
    getWarehouseSelectOptions() {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllWarehouseSelectOptionsInWarehouse`)
        .then(response => {
          that.deliverRecords.options.warehouseOptions = response.data;
        })
        .catch(error => {
          console.log(`加载仓库信息出错，错误为：`, error);
        });
    },
    getDeliverCompanySelectOptions() {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllDeliverCompanySelectOptionsInWarehouse`)
        .then(response => {
          that.deliverRecords.options.deliverCompanyOptions = response.data;
        })
        .catch(error => {
          console.log(`加载第三方物流公司信息出错，错误为：`, error);
        });
    },
    getReceiverAddrOptions() {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllAddressSelectOptionsInWarehouse`)
        .then(response => {
          that.deliverRecords.options.receiverAddrOptions = response.data;
        })
        .catch(error => {
          console.log(`加载收货地址信息出错，错误为：`, error);
        });
    },
    getPickUpUserOptions() {
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getAllMemberSelectOptionsInWarehouse`)
        .then(response => {
          that.deliverRecords.options.pickUpUserOptions = response.data;
        })
        .catch(error => {
          console.log(`加载收货人信息出错，错误为：`, error);
        });
    },
    getAllOptions() {
      const that = this;
      that.getDeliverUserOptions();
      that.getWarehouseSelectOptions();
      that.getDeliverCompanySelectOptions();
      that.getReceiverAddrOptions();
      that.getPickUpUserOptions();
    },
    getWarehouseStockOutDeliverRecordByParams(params) {
      const that = this;
      console.log(`getWarehouseStockOutDeliverRecordByParams`, params);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getWarehouseStockOutDeliverRecordByParams`, params)
        .then(response => {
          console.log(`获取出库记录信息结果为：`, response);
          if (response.data.deliverRecords.length > 0) {
            //* 出库记录信息存在
            that.deliverRecords.isCreated = false;
            for (let key in that.deliverRecords.params) {
              that.deliverRecords.params[key] = response.data.deliverRecords[0][key];
            }
            let deliverParams = {
              stockOutSerialNo: that.deliverRecords.params['stockOutSerialNo'],
            };
            that.getWarehouseStockOutDeliverDetailByParams(deliverParams);
          } else {
            that.deliverRecords.isCreated = true;
          }
        })
        .catch(error => {
          console.log(`获取出库记录信息出错，错误为：`, error);
        });
    },
    getWarehouseStockOutDeliverDetailByParams(params) {
      const that = this;
      console.log(`getWarehouseStockOutDeliverDetailByParams`, params);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/getWarehouseStockOutDeliverDetailByParams`, params)
        .then(response => {
          console.log(`获取出库记录明细信息结果为：`, response);
          let deliverDetails = response.data.deliverDetails;
          that.deliverDetails.curLabel = 0;
          for (let element in deliverDetails) {
            deliverDetails[element]['label'] = that.deliverDetails.curLabel;
            that.deliverDetails.curLabel += 1;
          }
          that.deliverDetails.deliverDetails = deliverDetails;
          that.deliverDetails.showParams.packNumber = that.deliverDetails.deliverDetails.length;
        })
    },
    updateWarehouseStockOutDeliverRecordByParams(params) {
      const that = this;
      console.log(`updateWarehouseStockOutDeliverRecordByParams`, params);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/updateWarehouseStockOutDeliverRecordByParams`, params)
        .then(response => {
          console.log(`更新出库记录信息回复为：`, response);
          if (params['editFlag'] === 0 && response.data === 0 && params['stockOutSerialNo'] !== '') {
            //! 如果是新建，则询问是否需要刷新页面，必须保证更新成功的情况下才能进行
            that.dialogVisible = true;
          }
        })
        .catch(error => {
          console.log(`更新出库记录信息出错，错误为：`, error);
        });
    },
    updateWarehouseStockOutDeliverDetailByParams(params) {
      const that = this;
      console.log(`updateWarehouseStockOutDeliverDetailByParams`, params);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/updateWarehouseStockOutDeliverDetailByParams`, params)
        .then(response => {
          console.log(`更新出库记录明细信息回复为：`, response);
        })
        .catch(error => {
          console.log(`更新出库记录明细信息出错，错误为：`, error);
        });
    },
    updateWarehouseStockOutDeliverRecordStatusByParams(params) {
      const that = this;
      console.log(`updateWarehouseStockOutDeliverRecordStatusByParams`, params);
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockOut/updateWarehouseStockOutDeliverRecordStatusByParams`, params)
        .then(response => {
          console.log(`更新出库记录状态回复为：`, response);
          if (response.data === 0) {
            that.$message.success(`出库成功！`);
          } else {
            that.$message.error('出库失败，错误码为：' + response.data + "。");
          }
        })
        .catch(error => {
          console.log(`更新出库记录状态出错，错误为：`, error);
        })
    },
    addDeliverDetail() {
      const that = this;
      let params = Object.assign({}, that.deliverDetails.emptyDeliverDetail);
      params['label'] = that.deliverDetails.curLabel;
      that.deliverDetails.curLabel += 1;
      that.deliverDetails.deliverDetails.push(params);
      that.deliverDetails.showParams.packNumber = that.deliverDetails.deliverDetails.length;
    },
    deleteDeliverDetail() {
      const that = this;
      let newDeliverDetails = [];
      let deleteDict = {};
      let oldSelectDeliverDetails = that.deliverDetails.selectedDeliverDetails;
      for (let element in oldSelectDeliverDetails) {
        deleteDict[oldSelectDeliverDetails[element]['label']] = 1;
      }
      let oldDeliverDetails = that.deliverDetails.deliverDetails;
      for (let element in oldDeliverDetails) {
        if (deleteDict[oldDeliverDetails[element]['label']] !== 1) {
          newDeliverDetails.push(oldDeliverDetails[element]);
        }
      }
      that.deliverDetails.deliverDetails = Object.assign([], newDeliverDetails);
      that.deliverDetails.showParams.packNumber = that.deliverDetails.deliverDetails.length;
    },
    handleDetailSelect(selection, row) {
      const that = this;
      that.deliverDetails.selectedDeliverDetails = selection;
    },
    collectDeliverParams() {
      const that = this;
      let tmp = {};
      for (let key in that.deliverRecords.params) {
        tmp[key] = that.deliverRecords.params[key];
      }
      if (that.deliverRecords.isCreated === false) {
        tmp['editFlag'] = 1;
      } else {
        tmp['editFlag'] = 0;
      }
      return tmp;
    },
    collectDeliverDetails() {
      const that = this;
      let tmp = Object.assign([], that.deliverDetails.deliverDetails);
      let result = {
        dataArr: tmp,
        stockOutSerialNo: that.deliverRecords.params.stockOutSerialNo,
      };
      return result;
    },
    // ------------------------------------ 业务函数 ------------------------------------
    updateDeliverRecordByAdd() {
      //* 只更新出库记录部分
      const that = this;
      let deliverRecordParams = that.collectDeliverParams();
      that.updateWarehouseStockOutDeliverRecordByParams(deliverRecordParams);
    },
    confirmModify() {
      //* 既更新出库记录部分，又更新明细部分
      const that = this;
      let deliverRecordParams = that.collectDeliverParams();
      let deliverRecordDetails = that.collectDeliverDetails();
      that.updateWarehouseStockOutDeliverRecordByParams(deliverRecordParams);
      that.updateWarehouseStockOutDeliverDetailByParams(deliverRecordDetails);
    },
    handleDialogConfirm() {
      const that = this;
      let path = '/stockout/stockoutdeliver';
      that.dialogVisible = false;
      that.$router.push({
        path: path,
        query: {
          stockOutSerialNo: that.deliverRecords.params.stockOutSerialNo,
        },
      });
      that.$router.go(0);
    },
    modifyDeliverStatus() {
      const that = this;
      let params = {
        stockOutSerialNo: that.deliverRecords.params.stockOutSerialNo,
        status: 1,
      };
      that.updateWarehouseStockOutDeliverRecordStatusByParams(params);
    },
  },
  watch: {
    relatedParams: {
      handler: function (newVal, oldVal) {
        const that = this;
        console.log(`relatedParams`, newVal);
        let stockOutSerialNo = newVal.stockOutSerialNo;
        if (stockOutSerialNo !== undefined) {
          let params = {
            stockOutSerialNo: stockOutSerialNo,
          };
          that.getWarehouseStockOutDeliverRecordByParams(params);
        }
      },
      deep: true,
    },
  },
  mounted: function () {
    const that = this;
    that.initEmptyData();
    that.getAllOptions();
  }
}
</script>

<style lang="less" scoped>
.deliverRecords {
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
.deliverFunctions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .functionButtons {
    margin-left: 10px;
    margin-bottom: 10px;
  }
}
.deliverDetails {
  .deliverDetailBarcode {
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
  .deliverDetailTotal {
    display: flex;
    flex-direction: row-reverse;
    justify-content: left;
    align-items: center;
  }
}
</style>


