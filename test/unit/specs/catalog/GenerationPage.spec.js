import Vuex from 'vuex'
import { shallow, createLocalVue } from '@vue/test-utils'
import GenerationPage from '@/components/catalog/GenerationPage'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('GenerationPage.vue', () => {
  let state
  let store

  const analyticList = [
    {
      analyticId: 1,
      analyticName: 'Analytic 1'
    },
    {
      analyticId: 2,
      analyticName: 'Analytic 2'
    },
    {
      analyticId: 3,
      analyticName: 'Analytic 3'
    }
  ]

  const analyticData = {
    assetId: '1',
    assetName: 'Gas Turbine'
  }

  const selected = [
    {
      label: 'Gas Turbine',
      value: 'gas_turbine'
    }
  ]

  beforeEach(() => {
    state = {
      catalog: {
        generationSelectedAnalyticsList: analyticList,
        generationAnalyticData: analyticData,
        contextBrowserSelected: selected
      }
    }
    store = new Vuex.Store({
      state
    })
  })

  it('should have correct header value', () => {
    const wrapper = shallow(GenerationPage, {
      store,
      localVue
    })
    expect(wrapper.vm.selected).to.equal('Gas Turbine')
  })

  it('should display correct analytic data', () => {
    const wrapper = shallow(GenerationPage, {
      store,
      localVue
    })
    expect(wrapper.vm.analyticData).to.deep.equal(analyticData)
    expect(wrapper.find('.analytic-coverage').text()).contain('Gas Turbine')
  })

  it('should display correct analytic list', () => {
    const wrapper = shallow(GenerationPage, {
      store,
      localVue
    })
    expect(wrapper.vm.analyticList).to.deep.equal(analyticList)
    expect(wrapper.find('.analytic-list').text()).to.contain('Analytic 1')
    expect(wrapper.find('.analytic-list').text()).to.contain('Analytic 2')
    expect(wrapper.find('.analytic-list').text()).to.contain('Analytic 3')
  })

  it('should display modal when card is clicked', () => {
    const wrapper = shallow(GenerationPage, {
      store,
      localVue
    })
    const card = wrapper.find('.analytic-list').find('a')
    expect(wrapper.vm.showModal).to.be.false
    card.trigger('click')
    expect(wrapper.vm.showModal).to.be.true
  })
})
