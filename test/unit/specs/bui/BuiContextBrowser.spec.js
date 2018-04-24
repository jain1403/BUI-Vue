import Vuex from 'vuex'
import { shallow, createLocalVue } from '@vue/test-utils'
import BuiContextBrowser from '@/components/bui/BuiContextBrowser'
import BuiTree from '@/components/bui/BuiTree'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BuiContextBrowser.vue', () => {
  let state
  let store

  // Mock store before each test
  beforeEach(() => {
    state = {
      catalog: {
        contextBrowserSelected: []
      }
    }
    store = new Vuex.Store({
      state
    })
  })

  it('should emit event when main icon is clicked', () => {
    // Create component wrapper
    const wrapper = shallow(BuiContextBrowser, {
      propsData: {
        mainIcon: {
          show: 'px-nav:hierarchy',
          hide: 'px-nav:close'
        },
        items: []
      },
      localVue
    })
    const mainIcon = wrapper.find('.main-icon')
    mainIcon.trigger('click')
    expect(wrapper.emitted('clicked-toggle-show-content')).to.have.lengthOf(1)
  })

  it('should emit event when leaf is clicked', () => {
    // Create component wrapper
    const wrapper = shallow(BuiContextBrowser, {
      propsData: {
        mainIcon: {
          show: 'px-nav:hierarchy',
          hide: 'px-nav:close'
        },
        items: [
          {
            label: 'Generation',
            value: 'generation'
          },
          {
            label: 'T&D',
            value: 'td'
          },
          {
            label: 'Consumption',
            value: 'Consumption'
          }
        ],
        showContentHandler: true
      },
      // Stub bui-tree component so that '.children' class is rendered
      stubs: {
        'bui-tree': BuiTree
      },
      store,
      localVue
    })
    const item = wrapper.find('.children').find('a')
    item.trigger('click')
    expect(wrapper.emitted('leaf-clicked')).to.have.lengthOf(1)
  })
})
