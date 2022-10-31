import { createRenderer, createVNode } from '@vue/runtime-core';

const render = createRenderer({
  forcePatchProp(el, key) {
    return false;
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
      el.addEventListener(key.substr(2).toLowerCase(), nextValue);
    } else {
      el.setAttribute(key, nextValue);
    }
  },
  insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null);
  },
  remove(child) {
    const parent = child.parentNode;
    if (parent) {
      parent.removeNode(child);
    }
  },
  createElement(type, isSvg, isCustomizedBuiltIn) {
    return document.createElement(type);
  },
  createText(text) {
    return document.createTextNode(text);
  },
  createComment(text) {
    return document.createComment(text);
  },
  setText(node, text) {
    node.nodeValue = text;
  },
  setElementText(el, text) {
    el.textContent = text;
  },
  parentNode(node) {
    return node.parentNode;
  },
  nextSibling(node) {
    return node.nextSibling;
  },
  querySelector(selector) {
    return document.querySelector(selector);
  },
  setScopeId(el, id) {
    el.setAttribute(id, '');
  },
  cloneNode(el) {
    return el.cloneNode(true);
  },
  insertStaticContent() {
    return [];
  },
});

const createApp = (...args) => {
  //TODO
  const app = {
    _component: { ...args[0] },
    mount: (elOrSelector) => {
      const container =
        typeof elOrSelector === 'string'
          ? document.querySelector(elOrSelector)
          : elOrSelector;

      if (container instanceof HTMLDivElement) {
        const vnode = createVNode(...args);

        render.render(vnode, container);
      } else console.error('Container is a HTMLDivElement');
    },
  };

  return app;
};

export { createApp };
