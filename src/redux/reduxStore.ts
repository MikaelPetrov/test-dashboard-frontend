import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
  dashboardPage: dashboardReducer,
});

type TypeRootReducer = typeof rootReducer;
export type TypeAppState = ReturnType<TypeRootReducer>;
export type TypeInferActions<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
export type TypeBaseThunk<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  TypeAppState,
  unknown,
  A
>;

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunkMiddleware)),
);

//  @ts-ignore
export default store;
