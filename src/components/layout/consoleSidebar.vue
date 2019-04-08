<style lang="less">
.console-sidebar {
  .el-submenu__title {
    font-size: 12px;
    height: 46px;
    line-height: 46px;
  }
  .el-submenu {
    background: #37424f;
    border-bottom: 1px solid #414d5c;
  }
  .el-submenu__icon-arrow {
    right: 40px;
    margin-top: -4px;
  }
  .el-icon-message {
    font-size: 12px;
  }
  .el-menu-item {
    font-size: 12px;
    height: 42px;
    line-height: 42px;
    &.is-active {
      border-right: none;
      color: #fff;
      background: #0099cc !important;
      &:hover {
        background: #0099cc !important;
      }
    }
  }
}
</style>
<style scoped lang="less">
.console-sidebar {
  position: fixed;
  top: 50px;
  bottom: 0px;
  background-color: #293038;
  z-index: 102;
  overflow-x: hidden;
  overflow-y: auto;
  height: auto;
  width: 180px;
  .sidebar-content {
    width: 200px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: #293038;
    .sidebar-fold {
      height: 30px;
      width: 140px;
      background: #394555;
      color: #aeb9c2;
      text-align: left;
      padding: 0 20px;
      line-height: 30px !important;
      user-select: none;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
    }
  }
}
</style>
<template>
  <div class="console-sidebar">
    <el-menu
      :unique-opened='true'
      :router='true'
      :default-active="defaultActive"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="sidebar-content">
      <div class="sidebar-fold">版本1.0.0</div>
      <el-menu-item index="/quick">
        <i class="el-icon-message"></i>
        快速入门
      </el-menu-item>
      <!-- <el-submenu index="base">
        <template slot="title">
          <i class="el-icon-message"></i>
          基础服务
        </template>
        <el-menu-item index="/thrmenu/article"><i class="el-icon-document"></i>三级菜单</el-menu-item>
      </el-submenu> -->
      <!-- <el-submenu index="user">
        <template slot="title">
          <i class="el-icon-message"></i>
          用户中心
        </template>
        <el-menu-item index="/user"><i class="el-icon-document"></i>用户管理</el-menu-item>
      </el-submenu> -->
      <el-submenu index="baseinfo">
        <template slot="title">
          <i class="el-icon-message"></i>
          基本信息
        </template>
        <el-menu-item index="/baseinfo/warehouselist"><i class="el-icon-document"></i>仓库列表</el-menu-item>
        <!-- <el-menu-item index="/baseinfo/warehouseinfo" disabled><i class="el-icon-document"></i>仓库信息</el-menu-item>
        <el-menu-item index="/baseinfo/warehousegroup" disabled><i class="el-icon-document"></i>仓库库位</el-menu-item> -->
        <el-menu-item index="/baseinfo/locationgroup"><i class="el-icon-document"></i>库位分组</el-menu-item>
        <el-menu-item index="/baseinfo/storagelocation"><i class="el-icon-document"></i>库位信息</el-menu-item>
      </el-submenu>
      <el-submenu index="stockin">
        <template slot="title">
          <i class="el-icon-message"></i>
          入库模块
        </template>
        <el-menu-item index="/stockin/stockinplan"><i class="el-icon-document"></i>入库计划画面</el-menu-item>
        <el-menu-item index="/stockin/stockinreceive"><i class="el-icon-document"></i>收货画面</el-menu-item>
        <el-menu-item index="/stockin/stockintestlist"><i class="el-icon-document"></i>收货检验任务列表</el-menu-item>
        <el-menu-item index="/stockin/stockintest"><i class="el-icon-document"></i>收货检验画面</el-menu-item>
        <el-menu-item index="/stockin/stockinpurchase"><i class="el-icon-document"></i>采购订单入库</el-menu-item>
        <el-menu-item index="/stockin/stockinother"><i class="el-icon-document"></i>其他入库画面</el-menu-item>
        <el-menu-item index="/stockin/stockinoutplan"><i class="el-icon-document"></i>非计划收货画面</el-menu-item>
        <el-menu-item index="/stockin/stockinlist"><i class="el-icon-document"></i>入库列表画面</el-menu-item>
        <el-menu-item index="/stockin/stockinshelf"><i class="el-icon-document"></i>入库上架画面</el-menu-item>
      </el-submenu>
      <el-submenu index="stockout">
        <template slot="title">
          <i class="el-icon-message"></i>
          出库模块
        </template>
        <el-menu-item index="/stockout/stockoutplan"><i class="el-icon-document"></i>出库计划画面</el-menu-item>
        <el-menu-item index="/stockout/stockoutlist"><i class="el-icon-document"></i>出库列表画面</el-menu-item>
        <el-submenu index="stockoutgeneral">
          <template slot="title">
            <i class="el-icon-menu"></i>出库操作画面
          </template>
          <el-menu-item index="/stockout/stockoutsales"><i class="el-icon-document"></i>销售出库画面</el-menu-item>
          <el-menu-item index="/stockout/stockoutproduction"><i class="el-icon-document"></i>生产出库画面</el-menu-item>
          <el-menu-item index="/stockout/stockouttransfer"><i class="el-icon-document"></i>调拨出库画面</el-menu-item>
          <el-menu-item index="/stockout/stockoutgeneral"><i class="el-icon-document"></i>其他出库画面</el-menu-item>
        </el-submenu>
        <el-menu-item index="/stockout/stockoutpickandpack"><i class="el-icon-document"></i>分拣备货画面</el-menu-item>
        <el-menu-item index="/stockout/stockoutdeliver"><i class="el-icon-document"></i>发货画面</el-menu-item>
      </el-submenu>
      <el-submenu index="stockoperation">
        <template slot="title">
          <i class="el-icon-message"></i>
          库内操作
        </template>
        <!-- <el-menu-item index="/stockoperation/warehouse"><i class="el-icon-document"></i>仓库在库查询</el-menu-item> -->
        <el-menu-item index="/stockoperation/usage"><i class="el-icon-document"></i>仓库使用状况</el-menu-item>
        <el-menu-item index="/stockoperation/adjust"><i class="el-icon-document"></i>库位调整</el-menu-item>
        <el-menu-item index="/stockoperation/assembly"><i class="el-icon-document"></i>商品组装</el-menu-item>
        <el-menu-item index="/stockoperation/split"><i class="el-icon-document"></i>商品拆分</el-menu-item>
      </el-submenu>
      <el-submenu index="planService">
        <template slot="title">
          <i class="el-icon-message"></i>
          计划服务
        </template>
        <el-menu-item index="/planservice/rangemanagement"><i class="el-icon-document"></i>系列管理</el-menu-item>
        <el-menu-item index="/planservice/rangeadd"><i class="el-icon-document"></i>添加系列</el-menu-item>
        <el-menu-item index="/planservice/rangeimport"><i class="el-icon-document"></i>导入系列</el-menu-item>
        <el-menu-item index="/planservice/stylegroupmanagement"><i class="el-icon-document"></i>款式组管理</el-menu-item>
        <el-menu-item index="/planservice/stylegroupadd"><i class="el-icon-document"></i>添加款式组</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  // import { Menu, Submenu, MenuItem, MenuItemGroup, Icon } from "element-ui";
  export default {
    components: {
    },
    computed: {
      defaultActive: function() {
        const that = this;
        // console.log("that.$route", that.$route);
        // console.log("that.$route.meta", that.$route.meta);
        // console.log(
        //   `defaultActive`,
        //   (that.$route.meta && that.$route.meta.activePath) || this.$route.path
        // );
        return (
          (that.$route.meta && that.$route.meta.activePath) || this.$route.path
        );
      }
    }
  };
</script>
