<template>
<div style="padding: 0px 20px">
  <el-card style="margin-bottom: 20px">
    <div class="searchOptions">
      <el-row :gutter="10">
        <el-col :span="21">
          <Form class="search" :formData="formData"></Form>
        </el-col>
        <el-col :span="3" class="functionButtonGroup">
          <el-button class="functionButtons" type="primary" @click="addData">新增</el-button>
          <el-button class="functionButtons">修改</el-button>
          <el-button class="functionButtons" type="danger">删除</el-button>
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
          <el-table-column type="selection" width="55" fixed>
          </el-table-column>
          <el-table-column
            v-for="(p,index) in Object.keys(tableData[0])"
            :key="index"
            min-width="160"
            :label="labels[index]">
            <template slot-scope="scope">
              <div v-if="[0, 1, 2, 3, 9, 10, 11].includes(index)">{{tableData[scope.$index][p]}}</div>
              <el-select 
                v-else-if="[].includes(index)" 
                v-model="tableData[scope.$index][p]">
                <el-option
                  v-for="item in units"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <el-input v-else v-model="tableData[scope.$index][p]"></el-input>           
            </template>
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
import Form from "@/components/StockOperation/Form";

export default {
  name: "StockOperationSplit",
  components: {
    Form,
  },
  created() {
  },
  data() {
    return {
      formData: [
        [ //row1
          {type: 'input', title: '拆分单号', value: '', },
          {type: 'date', title: '拆分日期', value: '', },
          {type: 'select', title: '操作人', value: '', options: ['A', 'B', 'C']},
        ],
        [ //row2
          {type: 'select', title: '待拆分品', value: '', options: ['A', 'B', 'C']}, 
          {type: 'input', title: '商品名称', value: ''},
          {type: 'input', title: '拆分数量', value: ''},
        ],
        [
          {type: 'select', title: '拆分仓库', value: '', options: ['a','b','c']},
          {type: 'input', title: '批号', value: ''},
        ],
        [
          {type: 'textarea', title: '备注', value: ''},
        ]

      ],
      treeData: [],
      defaultTreeData: {
        children: 'children',
        label: 'label'
      },
      nodeData: {},
      id: 1000,
      tabIndex: '0',
      labels: ["拆分后的商品编号", "商品名称", "商品类别", "规格", "计量单位", "批号", "拆分单数", "拆分总数", "单价", "金额", "备注说明", "当前库存"],
      names: [],
      tableData: [
        {a: '11', b: '22', c: '33', d: '44', e: '55', f: '66', g: '77', h: '88', i: '99', j: '10', q: '11', p: '12'},
        
      ],
      units: ['米', '千克'],
    };
  },
  methods: {
    search() {
      
    },
    addData() {

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
.functionButtonGroup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .functionButtons {
    margin-left: 10px;
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


