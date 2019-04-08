<template>
  <div style="padding: 0px 20px">
    <el-card style="margin-bottom: 20px">
      <div class="searchOptions">
        <el-row :gutter="10">
          <el-col :span="21">
            <el-row :gutter="10">
              <el-col :span="5">
                <div class="inputBox">
                  <div class="label">仓库名</div>
                  <el-select v-model="warehouse" clearable placeholder="请选择">
                    <el-option
                      v-for="item in warehouses"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="inputBox">
                  <div class="label">库区</div>
                  <el-select v-model="locationGroup" clearable placeholder="请选择">
                    <el-option
                      v-for="item in locationGroups"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="inputBox">
                  <div class="label">物料编码</div>
                  <el-input v-model="materialCode" clearable placeholder="请输入"></el-input>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="inputBox">
                  <div class="label">物料名称</div>
                  <el-input v-model="materialName" clearable placeholder="请输入"></el-input>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="search">搜索</el-button>
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
              type="index"
              label="序号"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column
              align="center"
              v-for="(p, index) in tableKeys"
              :key="index"
              :prop="p"
              min-width="100"
              :label="labels[index]">
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <!-- <div>{{this.pageNumberString}}</div> -->
          <el-pagination
            layout="prev, pager, next"
            :total="100">
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "StockOperationUsage",
  components: {
  },
  mounted() {
    this.getWareHouse();
    this.search();
  },
  data() {
    return {
      warehouse: '',
      locationGroup: '',
      materialCode: '',
      materialName: '',
      labels: ["仓库名", "库区", "货架", "库位", "物料编码", "物料名称", "规格", "批号", "在库数量", "已预约数量", "单价", "总金额", "备注"],
      tableKeys: ["warehouseName", "groupName", "shelfName", "locationName", "materialCode", "materialName", "specification", "batchCode", "quantity", "blockedQuantity", "price", "amount", "note"],
      tableData: [],
      warehouses: [],
      locationGroups: [],
    };
  },
  watch: {
    warehouse:{
      handler: function (newVal, oldVal) {
        this.$axios.post(`${window.$config.HOST}/warehouse/base/getLocationGroup`,{warehouseId: newVal, parentId: -1})
          .then(response => {
            this.locationGroups = [];
            response.data.forEach(element => {
              this.locationGroups.push({id: element.id, name: element.name});
            })
          })
          .catch(error => {console.log(error)})
      },
      deep: true,
    }
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
    search() {
      const params = {}
      if (this.warehouse !== "") {
        params["warehouseId"] = this.warehouse;
      }
      if (this.locationGroup !== "") {
        params["groupId"] = this.locationGroup;
      }
      if (this.materialCode !== "") {
        params["materialCode"] = this.materialCode;
      }
      if (this.materialName !== "") {
        params["materialName"] = this.materialName;
      }
      console.log("params:",params);
      this.$axios.post(`${window.$config.HOST}/warehouse/stockOperation/getWarehouseUseStateInfo`, params)
        .then(response => {
          this.tableData = [],
          response.data.forEach(element => {
            this.tableData.push({
              warehouseName : element.warehouseName,
              groupName : element.groupName,
              shelfName : element.shelfName,
              locationName : element.locationName,
              materialCode : element.materialCode,
              materialName : element.materialName,
              specification : element.specification,
              batchCode : element.batchCode,
              quantity : element.quantity,
              blockedQuantity : element.blockedQuantity,
              price : element.price,
              amount : element.quantity * element.price,
              note : element.note,
            })
          })
        })
        .catch(error => {
          console.log(error);
        });
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


