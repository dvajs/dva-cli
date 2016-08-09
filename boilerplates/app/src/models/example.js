import { call, put } from 'dva/effects';

export default {

  namespace: 'example',

  state: {
  },

  subscriptions: [
    function({ dispatch }) {
    },
  ],

  effects: {
    *['example/query']({ payload }) {
    },
  },

  reducers: {
    ['example/save'](state, action) {
      return { ...state, ...action.payload };
    },
  },

}
