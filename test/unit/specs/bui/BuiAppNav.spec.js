import Vue from 'vue'
import Router from 'vue-router'
import BuiAppNav from '@/components/bui/BuiAppNav'

Vue.use(Router)

describe('BuiAppNav.vue', () => {
  function getRenderedContent (Component, propsData, router) {
    const Constructor = Vue.extend(Component)
    const vm = new Constructor(
      {
        propsData: propsData,
        router: router
      }).$mount()
    return vm
  }

  const mainIcon = {
    show: 'px-nav:hamburger',
    hide: 'px-nav:close'
  }

  const navItems = [
    {
      label: 'Item 1',
      to: {
        path: '/1'
      }
    },
    {
      label: 'Item 2',
      icon: ' ',
      to: {
        path: '/2'
      }
    },
    {
      label: 'Item 3',
      icon: ' ',
      to: {
        path: '/3'
      }
    }
  ]

  const router = new Router({
    routes: [
      {path: '/1', name: 'Item 1'},
      {path: '/2', name: 'Item 2'},
      {path: '/3', name: 'Item 3'}
    ]
  })

  it('should render main icon content', (done) => {
    var appNav = getRenderedContent(BuiAppNav, {
      mainIcon: mainIcon,
      vertical: false,
      collapseAll: true,
      items: navItems
    }, router)
    appNav.collapsed = true
    router.push({name: 'Item 1'})
    Vue.nextTick(() => {
      expect(appNav.$el.querySelector('.main-icon')).to.exist
      expect(appNav.$el.querySelector('.main-icon').textContent).to.include('Item 1')
      done()
    })
  })

  it('should not render main icon content', (done) => {
    var appNav = getRenderedContent(BuiAppNav, {
      mainIcon: mainIcon,
      vertical: false,
      collapseAll: false,
      items: navItems
    }, router)
    router.push({name: 'Item 2'})
    Vue.nextTick(() => {
      expect(appNav.$el.querySelector('.main-icon')).to.not.exist
      expect(appNav.$el.querySelector('.router-link-active').textContent).to.include('Item 2')
      done()
    })
  })
})
