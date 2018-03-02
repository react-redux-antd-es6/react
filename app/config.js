export default (() => {
  window.gconfig = {};
  +(function (global) {
    // 本地开发打开的路径以及端口
    global.linkUrl = 'http://localhost:3001';
    if (process.env.NODE_ENV === 'production') { // 生产环境用不同的接口地址
      global.linkUrl = 'http://localhost:3000';
    }
    // 系统一二级菜单
    global.nav = [
      {
        id: 600110230,
        name: '功能列表',
        icon: 'book',
        url: '',
        children: [
          {
            id: 600110232, name: '表格', url: 'table', icon: 'user',
          },
          {
            id: 600110233, name: '图表', url: 'echarts', icon: 'area-chart',
          },
          {
            id: 600110234, name: '编辑器', url: 'editor', icon: 'area-chart',
          },
        ],
      },
      {
        id: 600110430,
        name: '其他',
        icon: 'calculator',
        url: '',
        children: [
          {
            id: 600110431, name: '聊天室', url: 'chat', icon: 'book',
          },
        ],
      },
    ];
  }(window.gconfig));
})()

export const prefix = global.gconfig.linkUrl
export const suffix = '.json'
