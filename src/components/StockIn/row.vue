<template>
  <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="title">{{titles[1]}}</div>
          <el-input v-show="aaa" v-model="values[1]" clearable placeholder="请输入"></el-input>
          <el-select v-show="bbb" v-model="values[1]" clearable placeholder="请选择"></el-select>
          <el-date-picker
            v-show="ccc"
            v-model="values[1]"
            type="data"
            placeholder="选择日期"
            clearable>
          </el-date-picker>
        </el-col>
        <el-col :span="8">
          <div class="title">{{titles[2]}}</div>
          <el-input v-show="aaa" v-model="values[2]" clearable placeholder="请输入"></el-input>
          <el-select v-show="bbb" v-model="values[2]" clearable placeholder="请选择"></el-select>
          <el-date-picker
            v-show="ccc"
            v-model="values[2]"
            type="data"
            placeholder="选择日期"
            clearable>
          </el-date-picker>
        </el-col>
        <el-col :span="8">
          <div class="title">{{titles[3]}}</div>
          <el-input v-show="aaa" v-model="values[2]" clearable placeholder="请输入"></el-input>
          <el-select v-show="bbb" v-model="values[2]" clearable placeholder="请选择"></el-select>
          <el-date-picker
            v-show="ccc"
            v-model="values[2]"
            type="data"
            placeholder="选择日期"
            clearable>
          </el-date-picker>
        </el-col>                
      </el-row>
    </el-card>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
}
</style>


