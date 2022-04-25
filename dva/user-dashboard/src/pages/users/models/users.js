import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page:null
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    * fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });

      console.log(data)
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
  },
  subscriptions: {
    setupa({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          console.log(query)
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },

    setupb({ dispatch, history }) {  // 这里的方法名可以随便命名，当监听有变化的时候就会依次执行这的变化,这里的dispatch和history和之前说的是一样的
      window.onresize = () => {   //这里表示的当浏览器的页面的大小变化时就会触发里面的dispatch方法，这里的save就是reducers中的方法名
        dispatch ({type:"fetch",payload: {info:"onresize"} })  
      }
    },
 
    onClick ({dispatch}) {
      document.addEventListener('click',() => {   //这里表示当鼠标点击时就会触发里面的dispatch命令，这里的save就是reducers中的方法名
        dispatch ({type:"fetch",payload: {info:" click"} })
      })
    }
 
  },
};