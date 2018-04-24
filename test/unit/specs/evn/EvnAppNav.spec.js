import Vuex from 'vuex'
import { shallow, createLocalVue } from '@vue/test-utils'
import EvnAppNav from '@/components/evn/EvnAppNav'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EvnAppNav.vue', () => {
  let state
  let store
  let mutations

  const items = [
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

  beforeEach(() => {
    state = {
      appNavShowContent: true
    }
    mutations = {
      APP_NAV_TOGGLE_SHOW_CONTENT: (state) => {
        state.appNavShowContent = !state.appNavShowContent
      }
    }
    store = new Vuex.Store({
      state,
      mutations
    })
  })

  // Visibility of Context Browser Items should reflect store
  it('should handle visibility of nav items', () => {
    const wrapper = shallow(EvnAppNav, {
      setProps: {
        items: items
      },
      store,
      localVue
    })
    expect(wrapper.vm.showContent).to.be.true
    store.commit('APP_NAV_TOGGLE_SHOW_CONTENT')
    expect(wrapper.vm.showContent).to.be.false
  })
})
