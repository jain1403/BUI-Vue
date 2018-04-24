import Vuex from 'vuex'
import { shallow, createLocalVue } from '@vue/test-utils'
import EvnContextBrowser from '@/components/evn/EvnContextBrowser'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EvnContextBrowser.vue', () => {
  let state
  let store
  let mutations

  const items = [
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
  ]

  beforeEach(() => {
    state = {
      appNavShowContent: false,
      catalog: {
        contextBrowserItems: items,
        contextBrowserShowContent: true
      }
    }
    mutations = {
      APP_NAV_TOGGLE_SHOW_CONTENT: (state) => {
        state.appNavShowContent = !state.appNavShowContent
      },
      CONTEXT_BROWSER_TOGGLE_SHOW_CONTENT: (state) => {
        state.catalog.contextBrowserShowContent = !state.catalog.contextBrowserShowContent
      }
    }
    store = new Vuex.Store({
      state,
      mutations
    })
  })

  // Context Browser Items should reflect items in the store
  it('should return correct items', () => {
    const wrapper = shallow(EvnContextBrowser, {
      store,
      localVue
    })
    expect(wrapper.vm.contextBrowserItems).to.have.lengthOf(3)
    expect(wrapper.vm.contextBrowserItems).to.equal(items)
  })

  // Visibility of main icon should reflect store
  it('should handle visibility of main icon', () => {
    const wrapper = shallow(EvnContextBrowser, {
      store,
      localVue
    })
    expect(wrapper.vm.isMainIconVisible).to.be.true
    store.commit('APP_NAV_TOGGLE_SHOW_CONTENT')
    expect(wrapper.vm.isMainIconVisible).to.be.false
  })

  // Visibility of context browser should reflect store
  it('should handle visibility of context browser items', () => {
    const wrapper = shallow(EvnContextBrowser, {
      store,
      localVue
    })
    expect(wrapper.vm.showContent).to.be.true
    store.commit('CONTEXT_BROWSER_TOGGLE_SHOW_CONTENT')
    expect(wrapper.vm.showContent).to.be.false
  })
})
