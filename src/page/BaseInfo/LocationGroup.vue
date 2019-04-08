<template>
  <el-col :offset="1" :span="18">
    <el-card class="box-card">
      <div class="bar">
        <div class="title">所属仓库</div>
        <el-select v-model="ware" clearable @change="getGroup">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="bar">
        <div class="title">父分组</div>
        <el-select v-model="group" clearable>
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="bar">
        <div class="title">分组编码</div>
        <el-input v-model="code"></el-input>
      </div>
      <div class="bar">
        <div class="title">分组名</div>
        <el-input v-model="name"></el-input>
      </div>
      <div class="bar">
        <div class="title">备注</div>
        <el-input v-model="note" type="textarea" rows="4" style="width: 70%"></el-input>
      </div>
      <div class="button">
        <el-button type="primary" @click="onSubmit" style="margin-right: 30px">保存</el-button>
        <el-button @click="onCancel" style="margin-right: 30px">取消</el-button>
      </div>
    </el-card>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      ware: '',
      group: '',
      code: '',
      name: '',
      note: '',
      options1:[],
      options2:[],
    }
  },
  created() {
    this.init();
  },
  methods:  {
    init() {
      this.$axios.post(`${window.$config.HOST}/warehouse/base/getWarehouse`, {})
      .then(response => {
        response.data.forEach(element => {
          this.options1.push({
            value: element.id,
            label: element.name,
          })
        })
      })
      .catch(error => {
        console.log(error)
      });
    },
    getGroup() {
      this.options2 = [],
      this.$axios.post(`${window.$config.HOST}/warehouse/base/getLocationGroup`, {warehouseId: this.ware})
      .then(response => {
        response.data.forEach(element => {
          this.options2.push({
            value: element.id,
            label: element.name,
          })
        })
      })
      .catch(error => {
        console.log(error);
      })
    },
    onSubmit() {
      this.$confirm('是否确认提交？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let parent = (this.group === "" ? 0: this.group);
          let sendData = {
            warehouseId: this.ware,
            parentId: parent,
            code: this.code,
            name: this.name,
            note: this.note,
          };
          // console.log(sendData);
          this.$axios.post(`${window.$config.HOST}/warehouse/base/addLocationGroup`, sendData)
          .then(response => {
            if(response.data > 0) {
              this.$message({
                type: 'success',
                message: '提交成功'
              });
              this.$router.push({name:"WarehouseGroup"});
            } else {
              this.$message({
                type: 'info',
                message: '新增库位分组数据存在问题，请检查'
              });
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
            message: '已取消'
          });          
        });
    },
    onCancel() {
      this.$router.push({name:"WarehouseGroup"});
    }
  }
}
</script>


<style lang="less" scoped>
.box-card {
  margin: 60px 50px;
  padding: 0 20px;
  .bar {
    display: flex;
    flex-direction: row;
    margin: 30px 30px;
    width: 100%;
    white-space: nowrap;
    .title {
      padding-top: 6px;
      padding-right: 25px;
      text-align: center;
      min-width: 100px;
      font-size: 14px;
    }
    .el-cascader, .el-input, .el-select {
      width: 70%;
      // min-width: 300px;
    }
  }
  .button {
    text-align: center;
    margin: 50px 50px 20px;
  }
}
</style>