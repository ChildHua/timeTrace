import Vue from 'vue'
import TimeIndex from '@/components/TimeIndex'

describe('TimeIndex.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(TimeIndex)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
