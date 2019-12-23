// 获取菜单配置
export const getMenus = () => {
  return Promise.resolve([{
    icon: 'mail',
    name: '商家',
    url: '/home'
  }, {
    icon: 'pie-chart',
    name: '广告',
    children: [{
      name: '广告A',
      url: '/exception/404'
    }, {
      icon: 'mail',
      name: '广告B',
      children: [{
        icon: 'mail',
        name: '广告AA',
        url: '/exception/403'
      }, {
        name: '广告BB',
        url: '/test'
      }]
    }]
  }])
}
