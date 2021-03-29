import { Subscription, Effect,ImmerReducer } from 'umi';
import {getIndustryList,getstairList} from '@/services'

export interface HomeModelStateType {
  industryList: [];
  stairTypeList:[]
}

interface HomeModelType {
  namespace: string;
  state: HomeModelStateType;
  effects: {
    getIndustryList:Effect,
    getStairList:Effect
  };
  reducers: {
    GETINDUSTRYLIST:ImmerReducer;
    GETSTAIRLIST:ImmerReducer
  };
  Subscription: {
    super: Subscription;
  };
}

const HomeModel: HomeModelType = {
  namespace: 'home',
  state: {
    industryList: [],
    stairTypeList:[]
  },
  effects: {
    *getIndustryList({payload},{call,put}){
      const r = yield call(getIndustryList)
      yield put({
        type:'GETINDUSTRYLIST',
        payload:r
      })
    },
    *getStairList({payload},{call,put}){
      const r = yield call(getstairList,payload)
      yield put({
        type:'GETSTAIRLIST',
        payload:r
      })
    }
  },
  reducers: {
    GETINDUSTRYLIST(state,action){
      state.industryList = action.payload
    },
    GETSTAIRLIST(state,{payload}){
      state.stairTypeList = payload
    }
  },
  Subscription: {
    super() {},
  },
};

export default HomeModel;
