<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="bar">
            <div class="title">仓库编码</div>
            <el-input v-model="input1" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="bar">
            <div class="title">仓库名称</div>
            <el-input v-model="input2" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="bar">
            <div class="title">仓库类型</div>
            <el-select v-model="select1" clearable>
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="bar">
            <div class="title">所属部门</div>
            <el-select v-model="select2" clearable>
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="bar">
            <div class="title">负责人</div>
            <el-select v-model="select3" clearable>
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="bar">
            <div class="title">联系电话</div>
            <el-input v-model="input3" placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="bar">
            <div class="title">所属区域</div>
            <el-input v-model="input4" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="bar">
            <div class="title">地址</div>
            <el-select v-model="select4" placeholder="请选择" clearable
            style="width:85%;">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="21">
          <div class="bar">
            <div class="title">备注</div>
            <el-input type="textarea" v-model="input5" rows="4"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 50px;" v-if="editable">
        <el-col :offset="10" :span="2">
          <el-button type="primary" style="margin: 20px 30px" @click="submit">提交</el-button>
        </el-col>
        <el-col :span="2"> 
          <el-button style="margin: 20px 30px" @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      select1: '',
      select2: '',
      select3: '',
      select4: '',
      options1: [{
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
      options2: [{
        value: 1,
        label: '1',
      },{
        value: 2,
        label: '2',
      },{
        value: 3,
        label: '3',
      },{
        value: 4,
        label: '4',
      },{
        value: 5,
        label: '5'
      }],
      options3: [{
        value: 1,
        label: '1',
      },{
        value: 2,
        label: '2',
      },{
        value: 3,
        label: '3',
      },{
        value: 4,
        label: '4',
      },{
        value: 5,
        label: '5'
      }],
      options4: [{
        value: 1,
        label: '1',
      },{
        value: 2,
        label: '2',
      },{
        value: 3,
        label: '3',
      },{
        value: 4,
        label: '4',
      },{
        value: 5,
        label: '5'
      }],
      editable: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.id = this.$route.params.id;
      this.editable = this.$route.params.edit;
      if (this.id !== undefined) {
        let allParam = this.$route.params;
        this.input1 = allParam.code;
        this.input2 = allParam.name;
        this.input3 = allParam.phone;
        this.input4 = allParam.area;
        this.input5 = allParam.note;
        this.select1 = allParam.type;
        this.select2 = allParam.section;
        this.select3 = allParam.admin;
        this.select4 = allParam.address;
      };
    },
    submit() {
      this.$confirm("请确保除备注外全部字段已填写，是否确认提交？","提示",{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type: 'warning',
      }).then(() => {
        var phone = /^[1][3,4,5,7,8][0-9]{9}$/;
        var tellPhone = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
        if(!phone.test(this.input3) && !tellPhone.test(this.input3)) {
          this.$message({
            type: 'info',
            message: '不正确的电话号码！'
          })
        } else {
          let sendData = {
            "id": this.id,
            "code": this.input1,
            "name": this.input2,
            "warehouseType": this.select1,
            "deptId": this.select2,
            "ownerId": this.select3,
            "phoneNo": this.input3,
            "area": this.input4,
            "addressId": this.select4,
            "note": this.input5
          }
          if (this.id) {
            // console.log(sendData);
            this.$axios
              .post(`${window.$config.HOST}/warehouse/base/updateWarehouse`, sendData)
              .then(response => {
                if (response.data > 0) {
                  this.$message({
                    type:'success',
                    message: '提交成功',
                  });
                  this.$router.push({name: "WarehouseList"});
                } else {
                  this.$message({
                    type: 'info',
                    message: '更新字段存在问题，请检查'
                  })
                }
              })
              .catch(error => {
                console.log(error);
                this.$message({
                  type: 'info',
                  message: '非法操作!'
                })
              })
          } else {
            this.$axios
              .post(`${window.$config.HOST}/warehouse/base/addWarehouse`, sendData)
              .then(response => {
                if (response.data > 0) {
                  this.$message({
                    type:'success',
                    message: '提交成功',
                  })
                  this.$router.push({name: "WarehouseList"});
                } else {
                  this.$message({
                    type: 'info',
                    message: '添加数据存在问题，请检查'
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
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    cancel() {
      this.$router.push({name: "WarehouseList"});
    }
  },
}
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .el-row {
    margin-bottom: 30px;
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      //min-width: 270px;
      margin: auto 25px auto auto;
      width: 100%;
      .title {
        font-size: 14px;
        min-width: 90px;
      }
      .el-input {
        min-width: 75px;
        width: 300px;
      }
      .el-select {
        min-width: 100px;
        width: 300px;
      }
    }
  }
}
</style>
