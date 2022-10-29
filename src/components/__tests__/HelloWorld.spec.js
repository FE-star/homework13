import { describe, it, expect } from 'vitest'
import { createApp } from '../../mini-renderer.js'
import App from '../../App.vue'

describe('createApp for dom', () => {
  it('should render component', () => {
    const app = createApp(App)
    app.mount(document.createElement('div'))
    expect(app._component).not.toBe(App);
  })

  it('should not mutate original root component options object', () => {
    const originalObj = {
      data() {
        return {
          counter: 0
        }
      }
    }
    const Root = { ...originalObj }
    const app = createApp(Root)
    app.mount(document.createElement('div'))
    expect(app._component).not.toBe(Root)
    expect(originalObj).toMatchObject(Root)
  })
})







