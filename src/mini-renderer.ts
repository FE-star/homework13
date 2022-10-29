import {
  createRenderer,
  RendererOptions,
  ConcreteComponent,
  createVNode,
  AppContext,
} from '@vue/runtime-core';


const render = createRenderer({
  forcePatchProp(el, key): boolean {
    return false
  },
  patchProp(
    el,
    key,
    prevValue,
    nextValue,
    isSVG = false,
    prevChildren,
    parentComponent,
    parentSuspense,
    unmountChildren
  ) {
    if (key.startsWith('on')) {
      el.addEventListener(key.substring(2).toLowerCase(), nextValue)
    } else {
      el.setAttribute(key, nextValue)
    }
  },
  insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null)
  },
  remove(child) {
    const parent = child.parentNode
    if (parent) {
      parent.removeNode(child)
    }
  },
  createElement(type, isSvg, isCustomizedBuiltIn) {
    return document.createElement(type)
  },
  createText(text) {
    return document.createTextNode(text)
  },
  createComment(text) {
    return document.createComment(text)
  },
  setText(node, text) {
    node.nodeValue = text
  },
  setElementText(el, text) {
    el.textContent = text
  },
  parentNode(node) {
    return node.parentNode
  },
  nextSibling(node) {
    return node.nextSibling
  },
  querySelector(selector) {
    return document.querySelector(selector)
  },
  setScopeId(el, id) {
    el.setAttribute(id, '')
  },
  cloneNode(el) {
    return el.cloneNode(true)
  },
  insertStaticContent(): any {
    return []
  }
} as RendererOptions & { forcePatchProp?: (el: any, key: string) => boolean })

function createAppContext(): AppContext {
  return {
    app: null as any,
    config: {
      isNativeTag: () => false,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: undefined,
      warnHandler: undefined,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
  }
}

const createApp = (rootComponent, rootProps = null) => {
  //TODO
  let isMounted = false;
  const context = createAppContext();
  if (typeof rootComponent !== 'function') {
    rootComponent = { ...rootComponent };
  }
  const app = {
    _component: rootComponent as ConcreteComponent,
    _container: null,
    mount: (rootContainer: Element) => {
      if (!isMounted) {
        const vnode = createVNode(rootComponent, rootProps);
        render.render(vnode, rootContainer, false);
        isMounted = true;
        app._container = rootContainer as any;
        (rootContainer as any).__vue_app__ = app;
        return vnode.component!.proxy;
      } else {
        console.warn('App has already been mounted');
      }
    }
  };
  return app;
}

export {
  createApp
}
