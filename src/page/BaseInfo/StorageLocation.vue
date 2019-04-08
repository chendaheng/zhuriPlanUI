<template>
  <div class="body">
    <el-col :offset="1" :span="18">
      <el-card class="box-card">
        <div class="bar">
          <div class="title">仓库/分组</div>
          <el-cascader
            :options="options"
            change-on-select
            v-model="wareGroup"
            :props="props"
            clearable
          ></el-cascader>
          <el-button type="text" style="margin-left: 20px" v-if="editable" @click="goGroup">添加分组</el-button>
        </div>
        <div class="bar">
          <div class="title">库位编码</div>
          <el-input v-model="code" placeholder="请输入"></el-input>
        </div>
        <div class="bar">
          <div class="title">库位名称</div>
          <el-input v-model="name" placeholder="请输入"></el-input>
        </div>
        <div class="bar">
          <div class="title">备注</div>
          <el-input v-model="note" type="textarea" rows="4" style="width: 70%"></el-input>
        </div>
        <div class="button" v-if="editable">
          <el-button type="primary" @click="onSubmit" style="margin-right: 30px">保存</el-button>
          <el-button @click="onCancel" style="margin-left: 30px">取消</el-button>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      wareGroup: [],
      code: '',
      name: '',
      note: '',
      options: [],
      props: {
        value: "id",
        label: "label",
        children: "children",
      },
      editable: false,
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.editable = this.$route.params.edit;
      this.$axios.post(`${window.$config.HOST}/warehouse/base/getWarehouse`, {})
      .then(response => {
        response.data.forEach(element => {
          this.options.push({
            id: element.id,
            label: element.name,
            children: [],
          })
        })
        this.options.forEach(item => {
          this.$axios.post(`${window.$config.HOST}/warehouse/base/getWarehouseLocation`, {id: item.id})
          .then(response => {
            item.children = response.data.children;
          })
          .catch(error => {console.log(error)});
        })
      })
      if (this.id) {
        this.wareGroup = this.$route.params.wareGroup;
        this.code = this.$route.params.code;
        this.name = this.$route.params.name;
        this.note = this.$route.params.note;
      }        
    },
    goGroup() {
      this.$router.push({name: "LocationGroup"});
    },
    onSubmit() {
      this.$confirm('请确保除备注外全部字段已填写，是否确认提交？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          let sendData = {
            id: this.id,
            warehouseId: this.wareGroup[0],
            groupId: this.wareGroup[this.wareGroup.length - 1],
            code: this.code,
            name: this.name,
            note: this.note,
          };
          // console.log(sendData);
          if(this.id) {
            this.$axios.post(`${window.$config.HOST}/warehouse/base/updateStorageLocation`,sendData)
            .then(response => {
              if(response.data > 0) {
                this.$message({
                  type: 'success',
                  message: '提交成功'
                });
                this.$router.push({name: "WarehouseGroup"});
              } else {
                this.$message({
                  type: 'info',
                  message: '更新字段存在问题，请检查'
                });
              }
            })
            .catch(error => {
              console.log(error);
              this.$message({
                type: 'info',
                message: '非法输入！'
              });      
            })
          } else {
            this.$axios.post(`${window.$config.HOST}/warehouse/base/addStorageLocation`, sendData)
            .then(response => {
              if(response.data > 0) {
                this.$message({
                  type: 'success',
                  message: '提交成功'
                });
                this.$router.push({name: "WarehouseGroup"});
              } else {
                this.$message({
                  type: 'info',
                  message: '新增库位数据存在问题，请检查'
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
          }
        }).catch(() => {
          console.log(this.wareGroup);
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    onCancel() {
      this.$router.push({name: "WarehouseGroup"});
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
    .el-cascader, .el-input {
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