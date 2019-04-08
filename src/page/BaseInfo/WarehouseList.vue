<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px; ">
        <el-col :span="8">
          <div class="bar">
            <div class="title">仓库类型</div>
            <el-select v-model="select1" clearable @change="c1">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">编码</div>
            <el-input v-model="input1" clearable placeholder="请输入" @change="c2"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">名称</div>
            <el-input v-model="input2" clearable placeholder="请输入" @change="c3"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="8">
          <div class="bar">
            <div class="title">区域</div>
            <el-input v-model="input3" clearable placeholder="请输入" @change="c4"></el-input>
          </div>
        </el-col>
        <el-col :offset="1" :span="4">
          <div class="bar">
            <el-button type="primary" plain style="margin-right: 20px" @click="getWareList">搜索</el-button>
            <el-button type="primary" @click="handleClick(null, true)">新建仓库</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" max-height="550" border style="width : 100%">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column v-if="false" prop="id" align="center"></el-table-column>
        <el-table-column prop="code" label="仓库编码" align="center"></el-table-column>
        <el-table-column prop="name" label="仓库名称" align="center"></el-table-column>
        <el-table-column prop="type" label="仓库类型" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column prop="area" label="所属区域" align="center"></el-table-column>
        <el-table-column prop="section" label="所属部门" align="center"></el-table-column>
        <el-table-column prop="admin" label="管理员" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="note" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" width="300" min-width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row, false)" type="text" size="small">查看</el-button>
            <el-button @click="goWarehouseGroup(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="handleClick(scope.row, true)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div class="block">
        <span class="demonstration">共搜索出{{pages}}条结果</span>
        <el-pagination layout="prev, pager, next" :total="pages"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "warehouseList",
  mounted() {
    if (localStorage.wareListSelect1 !== undefined && localStorage.getItem("wareListSelect1") !== "") {
      this.select1 = parseInt(localStorage.getItem("wareListSelect1"));
    }
    if (localStorage.wareListInput1 !== undefined) {
      this.input1 = localStorage.getItem("wareListInput1");
    }
    if (localStorage.wareListInput2 !== undefined) {
      this.input2 = localStorage.getItem("wareListInput2");
    }
    if (localStorage.wareListInput3 !== undefined) {
      this.input3 = localStorage.getItem("wareListInput3");
    }
    this.getWareList();
  },
  data() {
    return {
      select1: '',
      input1:'',
      input2:'',
      input3:'',
      options: [{
        value: 1,
        label: "A类仓库"
      },{
        value: 2,
        label: "B类仓库"
      },{
        value: 3,
        label: "C类仓库"
      },{
        value: 4,
        label: "D类仓库"
      },{
        value: 5,
        label: "E类仓库"
      }],
      tableData: [],
      // checked: true,
      pages: 0,
    }
  },
  methods: {
    getWareList() {
      let sendData = {};
      if (this.select1 !== '') {
        sendData["warehouseType"] = this.select1;
      }
      if (this.input1 != '') {
        sendData["code"] = this.input1;
      }
      if (this.input2 != '') {
        sendData["name"] = this.input2;
      }
      if (this.input3 != '') {
        sendData["area"] = this.input3;
      }
      this.$axios
        .post(`${window.$config.HOST}/warehouse/base/getWarehouse`, sendData)
        .then(response => {
          let list = response.data;
          this.tableData = [];
          for (let i=0; i<list.length; i++) {
            let tmpvalue = {};
            tmpvalue["id"] = list[i]["id"];
            tmpvalue["code"] = list[i]["code"];
            tmpvalue["name"] = list[i]["name"];
            let warehouseType = list[i]["warehouseType"];
            this.options.forEach(option => {
              if (option.value === warehouseType) {
                tmpvalue["type"] = option.label;
              }
            })
            tmpvalue["address"] = list[i]["addressId"];
            tmpvalue["area"] = list[i]["area"];
            tmpvalue["section"] = list[i]["deptId"];
            tmpvalue["admin"] = list[i]["ownerId"];
            tmpvalue["phone"] = list[i]["phoneNo"];
            tmpvalue["note"] = list[i]["note"];
            this.tableData.push(tmpvalue);
            this.pages = list.length;
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    c1() {
      localStorage.setItem("wareListSelect1", this.select1);
    },
    c2() {
      localStorage.setItem("wareListInput1", this.input1);
    },
    c3() {
      localStorage.setItem("wareListInput2", this.input2);
    },
    c4() {
      localStorage.setItem("wareListInput3", this.input3);
    },
    handleClick(row, editable) {
      if (row === null) {
        this.$router.push({name:"WarehouseInfo", params: {edit: editable}})
      } else {
        let wareType = -1;
        this.options.forEach(element => {
          if(element.label === row.type) {
            wareType = element.value;
          }
        })
        this.$router.push(
          {
            name: 'WarehouseInfo', 
            params:
            {
              id: row.id, 
              code: row.code,
              name: row.name,
              type: wareType,
              address: row.address,
              area: row.area,
              section: row.section,
              admin: row.admin,
              phone: row.phone,
              note: row.note,
              edit: editable
            }
          });
      }
    },
    goWarehouseGroup(row) {
      this.$router.push({name:"WarehouseGroup", params: {id : row.id}});
    },
    handleDelete(index, row) {
      this.$confirm('这将删除该仓库下所有记录信息，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let sendData = {"id": row.id};
        this.$axios
          .post(`${window.$config.HOST}/warehouse/base/deleteWarehouse`, sendData)
          .then(response => {
            if (response.data > 0) {
              this.$message({
              type: 'success',
              message: '删除成功'
              });
              this.tableData.splice(index, 1);
            } else {
              this.$message({
                type: 'info',
                message: '未在数据库中查到此记录对应信息！'
              })
            }
          })
          .catch(error => {
            console.log(error);
            this.$message({
              type: 'info',
              message: '非法操作！'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        });
      });
    },
  },
  
}
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    .title {
      font-size: 14px;
      min-width: 75px;
      text-align: center;
    }
    .el-input {
      width: 300px;
      min-width: 75px;
      // margin: 5px 10px;
    }
    .el-select {
      width: 300px;
      min-width: 75px;
      // margin: 5px 10px;
    }
  }
  .block {
    padding: 30px 0;
    text-align: center;
    //border-right: solid 1px #EFF2F6;
    //display: inline-block;
    //box-sizing: border-box;
  }
}
</style>


