<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="innerTree">
            <div class="additional">
              <el-button @click="handleClick3(null, true)" type="primary" size="small" style="margin-right:20px">添加</el-button>
              <el-button @click="deleteGroup" type="danger" size="small">删除选中</el-button>
            </div>
            <el-tree 
              :data="data"
              node-key="id"
              :props="defaultProps"
              @node-click="handleClick2"
              highlight-current
              default-expand-all
              check-on-click-node>
            </el-tree>
          </div>
        </el-col>
        <el-col :offset="3" :span="17">
          <div class="details">
            <el-table :data="tableData3" max-height="900" border style="width: 100%">
              <el-table-column prop="id" v-if="false"></el-table-column>
              <el-table-column prop="index" label="序号" width="50" align="center"></el-table-column>
              <el-table-column prop="group" label="库位分组" align="center"></el-table-column>
              <el-table-column prop="code" label="库位编码" align="center"></el-table-column>
              <el-table-column prop="name" label="库位名称" align="center"></el-table-column>
              <el-table-column prop="ware" label="所在仓库" align="center"></el-table-column>
              <el-table-column prop="note" label="备注" min-width="120" align="center"></el-table-column>
              <el-table-column label="操作" width="150" align="center">
                <div slot-scope="scope">
                  <el-button @click="handleClick3(scope.row, false)" type="text" size="small">查看</el-button>
                  <el-button @click="handleClick3(scope.row, true)" type="text" size="small">编辑</el-button>
                  <el-button @click="deleteLocation(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                </div>
              </el-table-column>
            </el-table>
          </div>
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
      data: [],
      defaultProps: {
        id: 'id',
        label: 'label',
        children: 'children',
      },
      currentNode: null,
      nodeData: null,
      treeComp: null,
      tableData3: [],
      wareName: '',
      groupName: '',
    }
  },
  created() {
    this.init();
    this.initTree();
  },
  methods: {
    init() {
      if(this.$route.params.id) {
        this.id = this.$route.params.id;
        localStorage.setItem("warehouseGroupId", this.id);
      } else if(localStorage.getItem("warehouseGroupId") !== undefined && localStorage.getItem("warehouseGroupId") !== "") {
        this.id = parseInt(localStorage.getItem("warehouseGroupId"));
      } else {

      }
    },
    initTree() {
      let sendData = {"id": this.id};
      this.$axios.post(`${window.$config.HOST}/warehouse/base/getWarehouseLocation`, sendData)
      .then(response => {
        this.data = [];
        this.data.push(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    },
    handleClick2(data, node, comp) {
      //console.log(node);
      this.nodeData = data;
      this.currentNode = node;
      this.treeComp = comp;
      if (data.children === null) {
        this.tableData3 = [];
        let location = data.child;
        if (location !== null) {
          for(let i=0; i<location.length; i++) {
            this.tableData3.push({
              id: location[i]['id'],
              index: i+1,
              group: data.label,
              code: location[i]['code'],
              name: location[i]['name'],
              ware: this.data[0].label,
              note: location[i]['note'],
            })
          }
        }
      }
    },
    handleClick3(row, editable) {
      if(row === null) {
        this.$router.push({
          name: 'StorageLocation',
          params: {
            edit: editable,
          }
        })
      } else {
        let route = [];
        let node = this.currentNode;
        while(node.level > 1) {
          route.unshift(node.data.id);
          node = node.parent;
        }
        route.unshift(this.id);
        this.$router.push({
          name: 'StorageLocation',
          params: {
            id: row.id,
            code: row.code,
            name: row.name,
            wareGroup: route,
            note: row.note,
            edit: editable,
          }
        })
      }
    },
    deleteGroup() {
      if (this.currentNode !== null && this.nodeData.id !== 0) {
        this.$confirm('这将删除该库位分组下所有记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let sendData = {"id": this.nodeData.id};
            this.$axios
              .post(`${window.$config.HOST}/warehouse/base/deleteLocationGroup`, sendData)
              .then(response => {
                if (response.data > 0) {
                  this.treeComp.tree.remove(this.currentNode, this.nodeData);
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                } else {
                  this.$message({
                    type: 'info',
                    message: '此库位分组记录存在问题，可能已被删除，请刷新页面'
                  });                    
                }
              })
              .catch(error => {
                console.log(error);
                this.$message({
                  type: 'info',
                  message: '此库位分组记录存在问题，建议检查数据库'
                });  
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });          
          });
      }
    },
    deleteLocation(index, row) {
      this.$confirm('这将删除此库位记录，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let sendData = {"id": row.id};
        this.$axios
          .post(`${window.$config.HOST}/warehouse/base/deleteStorageLocation`, sendData)
          .then(response => {
            if(response.data > 0) {
              this.tableData3.splice(index, 1);
              this.$message({
                type: 'success',
                message: '删除成功'
              });
            } else {
              this.$message({
                type: 'info',
                message: '此库位记录存在问题，可能已被删除，请刷新页面'
              });              
            }
          })
          .catch(error => {
            console.log(error);
            this.$message({
              type: 'info',
              message: '此库位记录存在问题，建议检查数据库'
            });         
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        });
      });
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 25px 20px;
  display: flex;
  flex-direction: row;
  .innerTree {
    padding-bottom: 80px;
    width: 200px;
    margin: 10px 30px 40px 0;
    border: 1px solid black;
    .additional {
      display: flex;
      flex-direction: row;
      margin: 15px 10px;
    }
    .el-tree {
      margin-top: 15px;
      margin-left: 30px;
    }
  }
  .details {
    flex: 1;
    display: flex;
    margin: 10px 0 40px 10px;
    width: 100%;
  }
}
</style>


