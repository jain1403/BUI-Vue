import Vue from 'vue'
import BuiPercentCircle from '@/components/bui/BuiPercentCircle'

describe('BuiPercentCircle.vue', () => {
  function getRenderedContent (Component, propsData) {
    const Constructor = Vue.extend(Component)
    const vm = new Constructor({ propsData: propsData }).$mount()
    return vm.$el
  }

  it('should render correct contents when value is between 0 and 100', () => {
    var percentText = getRenderedContent(BuiPercentCircle, {
      value: '50',
      thickness: '15'
    }).querySelector('.percent-text').textContent

    expect(percentText).to.equal('50')
  })

  it('should render correct contents when value is greater than 100', () => {
    var percentText = getRenderedContent(BuiPercentCircle, {
      value: '101',
      thickness: '15'
    }).querySelector('.percent-text').textContent

    expect(percentText).to.equal('100')
  })

  it('should render correct contents when value is less than 0', () => {
    var percentText = getRenderedContent(BuiPercentCircle, {
      value: '-1',
      thickness: '15'
    }).querySelector('.percent-text').textContent

    expect(percentText).to.equal('0')
  })

  it('should render red stroke when value is less than or equal to 33', (done) => {
    var el = getRenderedContent(BuiPercentCircle, {
      value: '32',
      thickness: '15'
    })

    Vue.nextTick(() => {
      expect(el.querySelector('.low-threshold')).to.exist
      expect(el.querySelector('.med-threshold')).to.not.exist
      expect(el.querySelector('.high-threshold')).to.not.exist
      done()
    })
  })

  it('should render orange stroke when value is in between 33 and 66', (done) => {
    var el = getRenderedContent(BuiPercentCircle, {
      value: '50',
      thickness: '15'
    })

    Vue.nextTick(() => {
      expect(el.querySelector('.low-threshold')).to.not.exist
      expect(el.querySelector('.med-threshold')).to.exist
      expect(el.querySelector('.high-threshold')).to.not.exist
      done()
    })
  })

  it('should render green stroke when value is greater than 66', (done) => {
    var el = getRenderedContent(BuiPercentCircle, {
      value: '67',
      thickness: '15'
    })

    Vue.nextTick(() => {
      expect(el.querySelector('.low-threshold')).to.not.exist
      expect(el.querySelector('.med-threshold')).to.not.exist
      expect(el.querySelector('.high-threshold')).to.exist
      done()
    })
  })
})
