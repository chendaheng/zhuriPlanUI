<template>
<div style="padding: 0px 20px">
  <el-card style="margin-bottom: 20px">
    <div class="searchOptions">
      <el-row :gutter="10">
        <el-col :span="21">
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">调整单号: </div>
                <div class="inputBar">
                  <el-input v-model="adjustInfo.id"></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">调整日期: </div>
                <div class="inputBar">
                  <el-input v-model="adjustInfo.date" disabled></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">申请人: </div>
                <div class="inputBar">
                  <el-input v-model="adjustInfo.applicant" disabled></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">操作仓库: </div>
                <el-select class="inputBar" v-model="adjustInfo.warehouse" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in warehouses"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">操作员: </div>
                <div class="inputBar">
                  <el-input v-model="adjustInfo.operator" disabled></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="inputBox">
                <div class="label">原因: </div>
                <div class="inputBar">
                  <el-input v-model="adjustInfo.reason" placeholder="请写明原因"></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="padding-bottom: 10px">
            <el-col :span="24">
              <div class="inputBox" style="display: flex; align-items: flex-start">
                <div class="label">备注：</div>
                <div class="inputBar">
                  <el-input v-model="adjustInfo.note" placeholder="请输入备注" type="textarea"></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3" class="buttons">
          <!-- <el-button type="primary" @click="edit">调整库位</el-button> -->
          <el-button type="primary" @click="addData">新增</el-button>
        </el-col>
      </el-row>
    </div>
  </el-card>
  <el-card style="margin-bottom: 20px">
    <div class="table">
      <div class="datatable" style="padding-bottom: 10px">
        <el-table
          :data="tableData"
          border
          highlight-current-row
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column width="210" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click.native.prevent="getInventoryDetail(scope.row)"
                type="text" size="mini" :disabled="scope.row.editable">
                物料获取
              </el-button> 
              <el-button @click.native.prevent="changeLocation(scope.row)"
                type="text" size="mini" :disabled="scope.row.editable">
                调整库位
              </el-button>
              <el-button @click.native.prevent="delRow(scope.$index)"
                type="text" class="del-btn" size="mini">
                删除
              </el-button>   
            </template>
          </el-table-column>
          <el-table-column prop="oldStorageLocation" label="原库位" align="center" width="160">
            <template slot-scope="scope">
              <el-cascader 
                :options="warehouseLocationTree" 
                v-model="scope.row.oldStorageLocation" 
                :props="warehouseLocation" clearable 
                :show-all-levels="false" 
                :disabled="scope.row.editable">
              </el-cascader>
            </template>
          </el-table-column>
          <el-table-column prop="newStorageLocation" label="新库位" align="center" width="160">
            <template slot-scope="scope">
              <el-cascader 
                :options="warehouseLocationTree" 
                v-model="scope.row.newStorageLocation" 
                :props="warehouseLocation" clearable 
                :show-all-levels="false"
                :disabled="scope.row.editable">
              </el-cascader>
            </template>
          </el-table-column>
          <el-table-column prop="skuCodde" v-if="false"></el-table-column>
          <el-table-column prop="materialCode" label="物料编码" align="center" min-width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.materialCode" placeholder="请输入" :disabled="scope.row.editable"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(p,index) in tableKeys"
            :key="index"
            :prop="p"
            :label="labels[index]"
            width="150"
            align="center">
          </el-table-column>
          <el-table-column prop="changeQuantity" label="移动数量" align="center" min-width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.changeQuantity" placeholder="请输入" :disabled="scope.row.editable"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <!-- <div>{{this.pageNumberString}}</div> -->
        <el-pagination
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </div>
    </div>
  </el-card>
</div>
</template>

<script>
import { throws } from 'assert';
export default {
  name: "StockOperationAdjust",
  components: {
  },
  data() {
    return {
      adjustInfo:{
        id: '',
        data: '',
        applicant: '',
        warehouse: '',
        operator: '',
        reason: '',
        note: ''
      },
      warehouses: [],
      tableData: [],
      labels: ["物料名称", "规格", "批号", "计量单位","在库数量"],
      tableKeys: ["materialName", "specification", "batchCode", "unit", "quantity"],
      warehouseLocationTree: [],
      warehouseLocation: {
        value: "id",
        label: "label",
        children: "children"
      }
    };
  },
  mounted() {
    this.getBasicInfo();
    this.getWareHouse();
  },
  methods: {
    getWareHouse() {
      this.$axios.post(`${window.$config.HOST}/warehouse/base/getWarehouse`, {})
        .then(response => {
          this.warehouses = [];
          response.data.forEach(element => {
            this.warehouses.push({id: element.id, name: element.name});
          });
        })
        .catch(error => {
          console.log("error:", error);
        });
    },
    getBasicInfo(){
      this.adjustInfo.date = this.getCurrentDate();
      //applicant与operator两个数据应由登陆角色直接获取
      this.adjustInfo.applicant = "admin";
      this.adjustInfo.operator = "admin";
    },
    getCurrentDate() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month >= 1 && month <=9) {
        month = "0" + month;
      }
      if (day >= 1 && day <=9) {
        day = "0" + day;
      }
      return year + "-" + month + "-" + day;
    },
    addData() {
      if (this.adjustInfo.warehouse === '') {
        this.$message({
          message: '请选择要调整的仓库',
          type: 'error'
        })
      } else {
        let params = {"id": this.adjustInfo.warehouse};
        this.$axios.post(`${window.$config.HOST}/warehouse/base/getWarehouseLocation`, params)
          .then(response => {
            let warehouseTree = response.data;
            this.preOrder(warehouseTree);
            this.warehouseLocationTree = warehouseTree.children;
          })
          .catch(error => {console.log(error)});
        this.tableData.push({
          editable : false,
          skuCode : "",
          materialName : "",
          specification : "",
          batchCode : "",
          unit : "",
          quantity : "",
          changeQuantity : ""
        });
      }
    },
    preOrder(Tree) {
      if (Tree.children !== null) {
        Tree.children.forEach(element => {
          this.preOrder(element);
        })
      } else {
        if(Tree.child !== null) {
          Tree.children = [];
          Tree.child.forEach(element => {
            Tree.children.push({
              id: element.id,
              label: element.name,
              children: null,
            })
          })
        } else {
          Tree.disabled = true;
        }
      }
    },
    getInventoryDetail(row) {
      if (row.oldStorageLocation !== undefined && row.materialCode !== undefined) {
        let locationId = row.oldStorageLocation[row.oldStorageLocation.length - 1];
        let params = {"locationId": locationId, "materialCode": row.materialCode};
        console.log('params', params);
        this.$axios.post(`${window.$config.HOST}/warehouse/stockOperation/getInventoryDetailByLocationIdAndMaterialCode`, params)
          .then(response => {
            console.log(response);
            if (response.data !== "") {
              let data = response.data;
              row.skuCode = data.skuCode;
              row.materialName = data.materialName;
              row.specification = data.specification;
              row.batchCode = data.batchCode;
              switch (data.unitId) {
                case 1:
                  row.unit = "米";
                  break;
                case 2: 
                  row.unit = "分米";
                  break;
                case 3:
                  row.unit = "厘米";
                  break;
                case 4:
                  row.unit = "毫米";
                  break;
                default:
                  row.unit = "";
                  break;
              }
              row.quantity = data.quantity;
            } else {
              this.$message({
                message: "未在数据库找到相应记录(目前测试数据库中仅有编码为11101的物料)",
                type: "error"
              })
            }
          })
          .catch(error => { console.log(error) })
      } else {
        this.$message({
          message: "请选择原库位并输入物料编码(目前测试数据库中仅有编码为11101的物料)",
          type: "error"
        })
      }
    },
    changeLocation(row) {
      if (row.oldStorageLocation !== undefined && row.newStorageLocation !== undefined && this.checkNumber(row.quantity) && 
          this.checkNumber(row.changeQuantity) && row.quantity > row.changeQuantity) {
        let oldLocationId = row.oldStorageLocation[row.oldStorageLocation.length - 1];
        let newLocationId = row.newStorageLocation[row.newStorageLocation.length - 1];
        let unitId = "";
        switch (row.unit) {
          case "米":
            unitId = 1;
            break;
          case "分米":
            unitId = 2;
            break;
          case "厘米":
            unitId = 3;
            break;
          case "毫米":
            unitId = 4;
            break;
          default:
            unitId = 0;
            break;
        }
        let params = {
          "oldLocationId" : oldLocationId,
          "newLocationId" : newLocationId,
          "skuCode" : row.skuCode,
          "materialCode" : row.materialCode,
          "batchCode" : row.batchCode,
          "unitId" : unitId,
          "changeQuantity" : row.changeQuantity,
        };
        console.log("params:",params);
        this.$axios.post(`${window.$config.HOST}/warehouse/stockOperation/adjustInventoryDetail`, params)
          .then(response => {
            if (response.data) {
              row.quantity = row.quantity - row.changeQuantity;
              row.changeQuantity = 0;
              row.editable = true;
              this.$message({
                message: "调整成功",
                type: "success"
              })
            } else {
              this.$message({
                message: "无法完成操作，请检查库位及物料编码，若仍出差请联系系统管理员",
                type: "error"
              })
            }
          })
          .catch(error => {console.log(error)})
      } else {
        this.$message({
          message: "请先获取物料信息并确保此次操作移动的物料数量低于可移动数量",
          type: "error"
        })
      }
    },
    delRow(index){
      this.tableData.splice(index, 1);
    },
    checkNumber(value) {
      let re = /^[0-9]+.?[0-9]*$/;
      if (re.test(value)) {
        return true;
      } else {
        return false;
      }
    },
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
.del-btn{
  color: #f56c6c;
}
.buttons{
    button{
      margin-bottom: 10px;
    }
}
.table {
  .datatable {
    max-height: 550px;
  }
  .pagination {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>


