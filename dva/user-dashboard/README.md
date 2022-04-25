

## Effects
### put
用于触发 action 。

```
yield put({ type: 'todos/add', payload: 'Learn Dva' });
```


###  call
用于调用异步逻辑，支持 promise 。

```
const result = yield call(fetch, '/todos');
```

### select
用于从 state 里获取数据。

```
const todos = yield select(state => state.todos);
```