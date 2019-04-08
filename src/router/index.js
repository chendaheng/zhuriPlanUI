import Config from '../config/index';

// -------------------------------------------- 为模版原版代码 --------------------------------------------
const Login = r => require.ensure([], () => r(require('../page/user/login')), 'login');
const Layout = r => require.ensure([], () => r(require('../page/layout')), 'layout');

// 快速入门
const Quick = r => require.ensure([], () => r(require('../page/quick/quick')), 'quick');
// 基础服务 -- 三级菜单 -- 文章管理
const Article = r => require.ensure([], () => r(require('../page/base/thrmenu/article')), 'article');
// 基础服务 -- 三级菜单 -- 评论管理
const Comment = r => require.ensure([], () => r(require('../page/base/thrmenu/comment')), 'comment');
// 基础服务 -- 三级菜单 -- 用户留存
const Left = r => require.ensure([], () => r(require('../page/base/thrmenu/left')), 'left');
// 基础服务 -- 三级菜单 -- 流失用户
const Lost = r => require.ensure([], () => r(require('../page/base/thrmenu/lost')), 'lost');

// 用户中心 -- 用户管理
// const User = r => require.ensure([], () => r(require('../page/user/user')), 'user');

// 基础服务 -- 三级菜单
const thrmenuNavbar = [{
  title: '文章管理',
  index: '/thrmenu/article'
}, {
  title: '评论管理',
  index: '/thrmenu/comment'
}, {
  title: '用户留存',
  index: '/thrmenu/left'
}, {
  title: '流失用户',
  index: '/thrmenu/lost'
}];

// -------------------------------------------- 为用户新增代码 --------------------------------------------
// ----------------------------------------------基本信息部分----------------------------------------------
// 基本信息 -- 仓库列表
const WarehouseList = r => require.ensure([], () => r(require('../page/BaseInfo/WarehouseList')), 'WarehouseList');
// 基本信息 -- 仓库信息
const WarehouseInfo = r => require.ensure([], () => r(require('../page/BaseInfo/WarehouseInfo')), 'WarehouseInfo');
// 基本信息 -- 仓库库位
const WarehouseGroup = r => require.ensure([], () => r(require('../page/BaseInfo/WarehouseGroup')), 'WarehouseGroup');
// 基本信息 -- 库位分组
const LocationGroup = r => require.ensure([], () => r(require('../page/BaseInfo/LocationGroup')), 'LocationGroup');
// 基本信息 -- 库位信息
const StorageLocation = r => require.ensure([], () => r(require('../page/BaseInfo/StorageLocation')), 'StorageLocation');
// -------------------------------------------- 入库计划部分 --------------------------------------------
// 入库计划 -- 入库计划画面
const StockInPlan = r => require.ensure([], () => r(require('../page/StockIn/StockInPlan')), 'StockInPlan');
// 入库模块 -- 收货画面
const StockInReceive = r => require.ensure([], () => r(require('../page/StockIn/StockInReceive')), 'StockInReceive');
// 入库模块 -- 收货检验任务列表
const StockInTestList = r => require.ensure([], () => r(require('../page/StockIn/StockInTestList')), 'StockInTestList');
// 入库模块 -- 收货检验画面
const StockInTest = r => require.ensure([], () => r(require('../page/StockIn/StockInTest')), 'StockInTest');
// 入库模块 -- 采购订单入库
const StockInPurchase = r => require.ensure([], () => r(require('../page/StockIn/StockInPurchase')), 'StockInPurchase');
// 入库模块 -- 其他入库
const StockInOther = r => require.ensure([], () => r(require('../page/StockIn/StockInOther')), 'StockInOther');
// 入库模块 -- 入库列表
const StockInList = r => require.ensure([], () => r(require('../page/StockIn/StockInList')), 'StockInList');
// 入库模块 -- 非计划收货
const StockInOutPlan = r => require.ensure([], () => r(require('../page/StockIn/StockInOutPlan')), 'StockInOutPlan');
// 入库模块 -- 入库上架
const StockInShelf = r => require.ensure([], () => r(require('../page/StockIn/StockInShelf')), 'StockInShelf');
// -------------------------------------------- 出库计划部分 --------------------------------------------
// 出库计划 -- 出库计划画面
const StockOutPlan = r => require.ensure([], () => r(require('../page/StockOut/StockOutPlan')), 'StockOutPlan');
// 出库计划 -- 出库列表画面
const StockOutList = r => require.ensure([], () => r(require('../page/StockOut/StockOutList')), 'StockOutList');
// 出库计划 -- 其他出库画面
const StockOutGeneral = r => require.ensure([], () => r(require('../page/StockOut/StockOutGeneral')), 'StockOutGeneral');
// 出库计划 -- 销售出库画面
const StockOutSales = r => require.ensure([], () => r(require('../page/StockOut/StockOutSales')), 'StockOutSales');
// 出库计划 -- 生产出库画面
const StockOutProduction = r => require.ensure([], () => r(require('../page/StockOut/StockOutProduction')), 'StockOutProduction');
// 出库计划 -- 调拨出库画面
const StockOutTransfer = r => require.ensure([], () => r(require('../page/StockOut/StockOutTransfer')), 'StockOutTransfer');
// 出库计划 -- 分拣备货画面
const StockOutPickAndPack = r => require.ensure([], () => r(require('../page/StockOut/StockOutPickAndPack')), 'StockOutPickAndPack');
// 出库计划 -- 提货画面
const StockOutDeliver = r => require.ensure([], () => r(require('../page/StockOut/StockOutDeliver')), 'StockOutDeliver');
// // -------------------------------------------- 库内操作部分 --------------------------------------------
// // 库内操作 -- 仓库在库查询
// const StockOperationWarehouse = r => require.ensure([], () => r(require('../page/StockOperation/StockOperationWarehouse')), 'StockOperationWarehouse');
// 库内操作 -- 仓库使用情况查询
const StockOperationUsage = r => require.ensure([], () => r(require('../page/StockOperation/StockOperationUsage')), 'StockOperationUsage');
// 库内操作 -- 库位调整
const StockOperationAdjust = r => require.ensure([], () => r(require('../page/StockOperation/StockOperationAdjust')), 'StockOperationAdjust');
// 库内操作 -- 商品组装
const StockOperationAssembly = r => require.ensure([], () => r(require('../page/StockOperation/StockOperationAssembly')), 'StockOperationAssembly');
// 库内操作 -- 商品拆分
const StockOperationSplit = r => require.ensure([], () => r(require('../page/StockOperation/StockOperationSplit')), 'StockOperationSplit');

// // -------------------------------------------- 逐日计划管理 --------------------------------------------
const RangeManagement = r => require.ensure([], () => r(require('../page/PlanService/RangeManagement')), 'RangeManagement');
const RangeAdd = r => require.ensure([], () => r(require('../page/PlanService/RangeAdd')), 'RangeAdd');
const RangeImport = r => require.ensure([], () => r(require('../page/PlanService/RangeImport')), 'RangeImport');
const StyleGroupManagement = r => require.ensure([], () => r(require('../page/PlanService/StyleGroupManagement')), 'StyleGroupManagement');
const StyleGroupAdd = r => require.ensure([], () => r(require('../page/PlanService/StyleGroupAdd')), 'StyleGroupAdd');
const StyleManagement = r => require.ensure([], () => r(require('../page/PlanService/StyleManagement')), 'StyleManagement');
const StyleAdd = r => require.ensure([], () => r(require('../page/PlanService/StyleAdd')), 'StyleAdd');
const StyleImport = r => require.ensure([], () => r(require('../page/PlanService/StyleImport')), 'StyleImport');
const StyleBindStyleGroup = r => require.ensure([], () => r(require('../page/PlanService/StyleBindStyleGroup')), 'StyleBindStyleGroup');
// -------------------------------------------- 路由配置部分 --------------------------------------------
export default [{
    path: Config.route.login,
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      { // 快速入门
        path: '/quick',
        name: 'Quick',
        component: Quick,
        meta: {
          bcrumd: ['快速入门']
        }
      },
      /* { // 基础服务 -- 三级菜单 -- 文章管理
        path: '/thrmenu/article',
        name: 'Article',
        component: Article,
        meta: {
          activePath: '/thrmenu/article',
          bcrumd: ['基础服务', '三级菜单', '文章管理'],
          navbar: thrmenuNavbar
        }
      },
      { // 基础服务 -- 三级菜单 -- 评论管理
        path: '/thrmenu/comment',
        name: 'Comment',
        component: Comment,
        meta: {
          activePath: '/thrmenu/article',
          bcrumd: ['基础服务', '三级菜单', '评论管理'],
          navbar: thrmenuNavbar
        }
      },
      { // 基础服务 -- 三级菜单 -- 用户留存
        path: '/thrmenu/left',
        name: 'Left',
        component: Left,
        meta: {
          activePath: '/thrmenu/article',
          bcrumd: ['基础服务', '三级菜单', '用户留存'],
          navbar: thrmenuNavbar
        }
      },
      { // 基础服务 -- 三级菜单 -- 流失用户
        path: '/thrmenu/lost',
        name: 'Lost',
        component: Lost,
        meta: {
          activePath: '/thrmenu/article',
          bcrumd: ['基础服务', '三级菜单', '流失用户'],
          navbar: thrmenuNavbar
        }
      },
      { // 用户中心 -- 用户管理
        path: '/user',
        name: 'User',
        component: User,
        meta: {
          bcrumd: ['用户中心', '用户管理']
        }
      }, */
      { // 仓库列表画面
        path: '/baseinfo/warehouselist',
        name: 'WarehouseList',
        component: WarehouseList,
        meta: {
          bcrumd: ['基本信息', '仓库列表']
        }
      },
      { // 仓库信息画面
        path: '/baseinfo/warehouseinfo',
        name: 'WarehouseInfo',
        component: WarehouseInfo,
        meta: {
          bcrumd: ['基本信息', '仓库信息']
        }
      },
      { // 仓库库位画面
        path: '/baseinfo/warehousegroup',
        name: 'WarehouseGroup',
        component: WarehouseGroup,
        meta: {
          bcrumd: ['基本信息', '仓库库位'],
        }
      },
      { // 库位分组画面
        path: '/baseinfo/locationgroup',
        name: 'LocationGroup',
        component: LocationGroup,
        meta: {
          bcrumd: ['基本信息', '库位分组'],
        }
      },
      { // 库位信息画面
        path: '/baseinfo/storagelocation',
        name: 'StorageLocation',
        component: StorageLocation,
        meta: {
          bcrumd: ['基本信息', '库位信息'],
        }
      },
      { // 入库计划画面
        path: '/stockin/stockinplan',
        name: 'StockInPlan',
        component: StockInPlan,
        meta: {
          bcrumd: ['入库', '入库计划画面']
        }
      },
      { // 收货画面
        path: '/stockin/stockinreceive',
        name: 'StockInReceive',
        component: StockInReceive,
        meta: {
          bcrumd: ['入库', '收货画面'],
        }
      },
      { // 收货检验任务列表
        path: '/stockin/stockintestlist',
        name: 'StockInTestList',
        component: StockInTestList,
        meta: {
          bcrumd: ['入库', '收货检验任务列表'],
        }
      },
      { // 收货检验画面
        path: '/stockin/stockintest',
        name: 'StockInTest',
        component: StockInTest,
        meta: {
          bcrumd: ['入库', '收货检验画面'],
        }
      },
      { // 采购订单入库
        path: '/stockin/stockinpurchase',
        name: 'StockInPurchase',
        component: StockInPurchase,
        meta: {
          bcrumd: ['入库', '采购订单入库'],
        }
      },
      { // 其他入库
        path: '/stockin/stockinother',
        name: 'StockInOther',
        component: StockInOther,
        meta: {
          bcrumd: ['入库', '其他入库'],
        }
      },
      { // 非计划收货
        path: '/stockin/stockinoutplan',
        name: 'StockInOutPlan',
        component: StockInOutPlan,
        meta: {
          bcrumd: ['入库', '非计划收货'],
        }
      },
      { // 上架
        path: '/stockin/stockinshelf',
        name: 'StockInShelf',
        component: StockInShelf,
        meta: {
          bcrumd: ['入库', '入库上架'],
        }
      },
      { // 入库列表
        path: '/stockin/stockinlist',
        name: 'StockInList',
        component: StockInList,
        meta: {
          bcrumd: ['入库', '入库列表'],
        }
      },
      { // 出库计划画面
        path: '/stockout/stockoutplan',
        name: 'StockOutPlan',
        component: StockOutPlan,
        meta: {
          bcrumd: ['出库', '出库计划画面']
        }
      },
      { // 出库列表画面
        path: '/stockout/stockoutlist',
        name: 'StockOutList',
        component: StockOutList,
        meta: {
          bcrumd: ['出库', '出库列表画面']
        }
      },
      { // 其他出库画面
        path: '/stockout/stockoutgeneral',
        name: 'StockOutGeneral',
        component: StockOutGeneral,
        meta: {
          bcrumd: ['出库', '其他出库画面']
        }
      },
      { // 销售出库画面
        path: '/stockout/stockoutsales',
        name: 'StockOutSales',
        component: StockOutSales,
        meta: {
          bcrumd: ['出库', '销售出库画面']
        }
      },
      { // 生产出库画面
        path: '/stockout/stockoutproduction',
        name: 'StockOutProduction',
        component: StockOutProduction,
        meta: {
          bcrumd: ['出库', '生产出库画面']
        }
      },
      { // 调拨出库画面
        path: '/stockout/stockouttransfer',
        name: 'StockOutTransfer',
        component: StockOutTransfer,
        meta: {
          bcrumd: ['出库', '调拨出库画面']
        }
      },
      { // 分拣备货画面
        path: '/stockout/stockoutpickandpack',
        name: 'StockOutPickAndPack',
        component: StockOutPickAndPack,
        meta: {
          bcrumd: ['出库', '分拣备货画面']
        }
      },
      { // 发货画面
        path: '/stockout/stockoutdeliver',
        name: 'StockOutDeliver',
        component: StockOutDeliver,
        meta: {
          bcrumd: ['出库', '发货画面']
        }
      },
      // { // 仓库在库查询
      //   path: '/stockoperation/warehouse',
      //   name: 'StockOperationWarehouse',
      //   component: StockOperationWarehouse,
      //   meta: {
      //     bcrumd: ['库内操作', '仓库在库查询']
      //   }
      // }, 
      { // 仓库使用情况查询
        path: '/stockoperation/usage',
        name: 'StockOperationUsage',
        component: StockOperationUsage,
        meta: {
          bcrumd: ['库内操作', '仓库使用情况查询']
        }
      },
      { // 库位调整
        path: '/stockoperation/adjust',
        name: 'StockOperationAdjust',
        component: StockOperationAdjust,
        meta: {
          bcrumd: ['库内操作', '库位调整']
        }
      },
      { // 商品组装
        path: '/stockoperation/assembly',
        name: 'StockOperationAssembly',
        component: StockOperationAssembly,
        meta: {
          bcrumd: ['库内操作', '商品组装']
        }
      },
      { // 商品拆分
        path: '/stockoperation/split',
        name: 'StockOperationSplit',
        component: StockOperationSplit,
        meta: {
          bcrumd: ['库内操作', '商品拆分']
        }
      },
      { // 系列管理
        path: '/planservice/rangemanagement',
        name: 'RangeManagement',
        component: RangeManagement,
        meta: {
          bcrumd: ['计划服务', '系列管理']
        }
      },
      { // 添加系列
        path: '/planservice/rangeadd',
        name: 'RangeAdd',
        component: RangeAdd,
        meta: {
          bcrumd: ['计划服务', '添加系列']
        }
      },
      { // 导入系列
        path: '/planservice/rangeimport',
        name: 'RangeImport',
        component: RangeImport,
        meta: {
          bcrumd: ['计划服务', '导入系列']
        }
      },
      { // 款式组管理
        path: '/planservice/stylegroupmanagement',
        name: 'StyleGroupManagement',
        component: StyleGroupManagement,
        meta: {
          bcrumd: ['计划服务', '款式组管理']
        }
      },
      { // 添加款式组
        path: '/planservice/stylegroupadd',
        name: 'StyleGroupAdd',
        component: StyleGroupAdd,
        meta: {
          bcrumd: ['计划服务', '添加款式组']
        }
      },
      { // 款式管理
        path: '/planservice/stylemanagement',
        name: 'StyleManagement',
        component: StyleManagement,
        meta: {
          bcrumd: ['计划服务', '款式管理']
        }
      },
      { // 添加款式
        path: '/planservice/styleadd',
        name: 'StyleAdd',
        component: StyleAdd,
        meta: {
          bcrumd: ['计划服务', '添加款式']
        }
      },
      { // 导入款式
        path: '/planservice/styleimport',
        name: 'StyleImport',
        component: StyleImport,
        meta: {
          bcrumd: ['计划服务', '导入款式']
        }
      },
      { // 绑定款式组
        path: '/planservice/stylebindstylegroup',
        name: 'StyleBindStyleGroup',
        component: StyleBindStyleGroup,
        meta: {
          bcrumd: ['计划服务', '绑定款式组']
        }
      },
      { // 默认路由
        path: '*',
        redirect: '/quick',
        name: 'Quick',
        component: Quick,
        meta: {
          bcrumd: ['快速入门']
        }
      }
    ]
  },
  {
    path: '*',
    redirect: Config.route.login,
    name: 'Login',
    component: Login
  }
]
