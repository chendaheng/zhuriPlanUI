<template>
  <div class="body">
    <el-card class="box-card">
      <el-row>
        <el-table
          ref="multiTable"
          :data="shelfRecordDetail"
          max-height="400"
          border
          @selection-change="selectionChange"
          :stripe="true"
          :highlight-current-row="true"
          style="width: 100%; margin-top: 20px">
          <el-table-column width="50" type="selection" :selectable="disableCheckbox" align="center"></el-table-column>
          <el-table-column width="150" prop="shelfSerialNo" label="上架单号" align="center"></el-table-column>
          <el-table-column width="150" prop="materialCode" label="物料编码" align="center"></el-table-column>
          <el-table-column width="150" prop="batchCode" label="批号" align="center"></el-table-column>
          <el-table-column width="100" prop="unitId" label="计量单位" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.unitId">
                <el-option label="计量单位1" :value=1></el-option>
                <el-option label="计量单位2" :value=2></el-option>
                <el-option label="计量单位3" :value=3></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column width="300" prop="location" label="库位" align="center">
            <template slot-scope="scope">
              <el-cascader
                :options="groupOptions"
                change-on-select
                v-model="scope.row.location"
                :props="groupProps"
                clearable>
              </el-cascader>
            </template>
          </el-table-column>
          <el-table-column width="120" prop="restQuantity" label="剩余数量" align="center"></el-table-column>
          <el-table-column width="120" prop="shelfQuantity" label="上架数量" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.shelfQuantity" placeholder="请输入数字"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="note" label="备注" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.note"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column width="80" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text">上架</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </el-row>
      <el-row style="margin: 50px 0 10px 0">
        <el-col :span="2" :offset="10">
          <el-button type="primary" @click="shelf">上架</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="info" @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
      entrySerialNo: '',
      warehouseId: null,
      // 这个是上架单号
      shelfCounter: 0,
      shelfRecordDetail: [],
      groupOptions: [],
      groupProps: {
        value: "id",
        label: "label",
        children: "children",
      },
      checked: true,
      selectedData: [],
    }
  },
  created() {
    const that = this;
    let result = that.$route.query;
    that.entrySerialNo = result.entrySerialNo;
    that.warehouseId = result.warehouseId;
    that.getLastShelfRecordId();

    // that.entrySerialNo = '110001';
    // that.warehouseId = 1;
    that.$axios.post(`${window.$config.HOST}/warehouse/stockIn/getWarehouseStockInRecordDetailByEntrySerialNo`,{'entrySerialNo': that.entrySerialNo})
    .then(response => {
      let data = response.data;
      console.log(`data` , data);
      data.forEach(element => {
        that.shelfRecordDetail.push({
          shelfSerialNo: `shelf` + (that.shelfCounter).toString(),
          materialCode: element.materialCode,
          batchCode: element.batchCode,
          unitId: element.unitId,
          location: [],
          restQuantity: element.entryQuantity,
          shelfQuantity: element.entryQuantity,
          note: '',
        })
      })
    })
    .catch(error => {console.log(error)});
    // 这里添加上架记录，你自己设置下字段

    that.getGroupOptions();
  },
  methods: {
    //获取最后一条上架记录的id
    getLastShelfRecordId(){
      const that = this;
      that.$axios
        .post(`${window.$config.HOST}/warehouse/stockIn/getLastShelfRecordId`,{})
        .then(response => {
          that.shelfCounter = parseInt(response.data) + 1;
          console.log("shelfCounter:" + that.shelfCounter);
          console.log(`获取最后一条上架记录的id成功`);
        })
    },
    getGroupOptions() {
      const that = this;
      console.log( that.warehouseId);
      that.$axios.post(`${window.$config.HOST}/warehouse/base/getWarehouseLocation`,{'id': that.warehouseId})
      .then(response => {
        console.log("warehouseTree:",response.data);
        let data = response.data;
        that.preOrder(data);
        that.groupOptions = data.children;
      })
      .catch(error => {console.log(error)});
    },
    preOrder(T) {
      if (T.children !== null) {
        T.children.forEach(element => {
          this.preOrder(element);
        })
      } else {
        // console.log("查看树位置:",T);
        if(T.child !== null) {
          T.children = [];
          T.child.forEach(element => {
            T.children.push({
              id: element.id,
              label: element.name,
              children: null,
            })
          })
        }
      }
    },
    selectionChange(val) {
      console.log(val);
      const that = this;
      that.selectedData = val;
    },
    disableCheckbox(row, index) {
      if(row.restQuantity === 0) {
        return false;
      }
      return true;
    },
    shelf() {
      const that = this;
      that.$axios.post(`${window.$config.HOST}/warehouse/stockIn/addShelfRecord`, {
        "shelfSerialNo" : `shelf` + (that.shelfCounter).toString(),
        "entrySerialNo" : that.entrySerialNo,
        "operUserId" : 1,
        "shelfDate" : that.getNowFormatDate(),
        "result" : 1,
        "note" : '',
      })
      .then(response => {
        if(response.data === 1){
          console.log("添加入库记录",response.data);
        }
      })
      .catch(error => {console.log(`出错` ,error)})
      let sendData = that.selectedData;
      for(let i=0; i<sendData.length; i++) {
        if(sendData[i].restQuantity < parseInt(sendData[i].shelfQuantity)) {
          alert("输入数据有误，请检查！");
          break;
        }
        let len = sendData[i].location.length;
        sendData[i].locationId = sendData[i].location[len-1];
        console.log("发送数据前：",i,sendData[i]);
        that.$axios.post(`${window.$config.HOST}/warehouse/stockIn/addShelfRecordDetail`, sendData[i])
        .then(response => {
          if(response.data === 1){
            console.log("添加入库记录明细",response.data);
            // console.log("当前data:",that);
            sendData[i].restQuantity -= parseInt(sendData[i].shelfQuantity);
            sendData[i].shelfQuantity = sendData[i].restQuantity;
            console.log("发送数据后：",i,sendData[i]);
            this.$message({
              message: '本次上架成功',
              type: 'success'
            });
          }
        })
        .catch(error => {console.log(error)});
      }
      console.log("修改");
      this.selectedData = sendData;
      this.$refs.multiTable.clearSelection();
    },
    cancel() {
      console.log('selectData',this.selectedData);
      // this.$router.push({name : "StockInTestList"})

      let data = this.selectedData;
      console.log('data',data);

    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  }
}
</script>

<style lang="less" scoped>
.body {
  margin: 20px 30px;
  height: 100%;

}
</style>
