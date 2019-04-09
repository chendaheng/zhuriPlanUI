<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="searchOptions.searchParams.customerName" >
              <el-option
                v-for="item in searchOptions.options.customerNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="searchOptions.searchParams.brandName" >
              <el-option
                v-for="item in searchOptions.options.brandNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">服装类型</div>
            <el-select v-model="searchOptions.searchParams.clothingType" >
              <el-option
                v-for="item in searchOptions.options.clothingTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
              <el-select v-model="searchOptions.searchParams.rangeName" >
              <el-option
                v-for="item in searchOptions.options.rangeNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">订单款号</div>
              <el-input v-model=searchOptions.searchParams.styleNumber placeholder="请输入订单款号"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              class="inputBar"
              v-model='searchOptions.searchParams.dateRange'
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div class="table">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-button type="primary">添加款号</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">批量导入</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">删除款号</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">绑定款式组</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="data.tableData"
          max-height="400"
          border
          :stripe="true"
          :highlight-current-row="true"
          style="width: 100%; margin-top: 20px">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column prop="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="styleGroupNumber" width="150" label="款式组编号" align="center"></el-table-column>
          <el-table-column prop="styleGroupName" width="130" label="款式组名称" align="center"></el-table-column>
          <el-table-column prop="styleNumber" width="150" label="订单款号" align="center"></el-table-column>
          <el-table-column prop="rangeNumber" width="130" label="系列编号" align="center"></el-table-column>
          <el-table-column prop="customerName" width="120" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothingType" label="服装类型" align="center"></el-table-column>
          <el-table-column prop="rangeName" width="150" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="addUser" label="添加人" align="center"></el-table-column>
          <el-table-column prop="dept" label="部门" align="center"></el-table-column>
          <el-table-column prop="addTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="addMethod" label="添加方式" align="center"></el-table-column>
          <el-table-column prop="styleStatus" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" width="150" min-width="100" align="center">
            <template slot-scope="scope">
              <el-button @click="getRangeData(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="changeRangeData(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="deleteRangeData(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pagination.currentPage"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        currentPage: 1,
        pageSizes: [5, 10, 20, 30, 50],
        pageSize: 5,
        total: 400,
      },
      searchOptions:{
        searchParams :{
          customerName: "",
          brandName: "",
          clothingType: "",
          rangeName: "",
          styleNumber: "",
          dateRange: "", 
        },
        options: {
          customerNameOptions: [
            {
              value: 1,
              label: "A客户"
            },
            {
              value: 2,
              label: "B客户"
            },
          ],
          brandNameOptions: [
            {
              value: 1,
              label: "X品牌"
            },
            {
              value: 2,
              label: "Y品牌"
            },
          ],
          clothingTypeOptions: [
            {
              value: 1,
              label: "时装"
            },
            {
              value: 2,
              label: "精品"
            },
            {
              value: 3,
              label: "品牌"
            },
          ],
          rangeNameOptions: [
            {
              value: 1,
              label: "Fall-2019(07/08/09)"
            },
            {
              value: 2,
              label: "Spring-2019(01/02/03)"
            },
            {
              value: 3,
              label: "Winter-2019(10/11/12)"
            },
          ],
        }
      },
      data:{
        tableData:[
          {
            index: 1,
            styleGroupNumber: "KSZ20190101001",
            styleGroupName: "款式1组",
            styleNumber: "10190114(CX1901)",
            rangeNumber: "XL20190101001",
            customerName: "Qi-Collection",
            brandName: "Selkie",
            clothingType: "时装",
            rangeName: "Fall-2019(07/08/09)",
            addUser: "刘德华",
            dept: "业务1组",
            addTime: "2019-01-01 10:15:01",
            addMethod: "导入",
            styleStatus: "已绑定",
          }
        ]
      }
    };
  },
  created: function () {
    const that = this;
    console.log('进入款式管理页面');
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 搜索按钮点击
    handleSearch(){
      const that = this;
      console.log('搜索按钮点击');
    }
  }
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
    }
    .el-select {
      width: 300px;
      min-width: 75px;
    }
  }
  .block {
    padding: 30px 0;
    text-align: center;
  }
}
</style>