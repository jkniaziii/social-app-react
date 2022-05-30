// import makeInspectable from 'mobx-devtools-mst';
import {applySnapshot, getSnapshot, types} from 'mobx-state-tree';
import {useMemo} from 'react';
import { Cart, initCart } from './cartStore';
import { Counter, initCounter } from './todoStore';


const RootStore = types.model({
    Counter: Counter,
    Cart: Cart,
}).actions(self => {
  let initialState = {};
  return {
    afterCreate: () => {
      initialState = getSnapshot(self);
    },
    reset: () => {
      applySnapshot(self, initialState);
    },
  };
});

export function initializeStore(snapshot = null) {
  const _store = RootStore.create({
      Counter: initCounter(),
      Cart: initCart()

    });
  if (snapshot) {
    applySnapshot(_store, snapshot);
  }
  if (typeof window === 'undefined') {
    return _store;
  }

  return _store;
}

export function useStore(initialState: any) {
  return useMemo(() => initializeStore(initialState), [initialState]);
}