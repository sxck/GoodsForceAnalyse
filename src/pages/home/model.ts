import { Subscription, Effect, ImmerReducer } from 'umi';
import { getIndustryList, getstairList, getleafList,getchannelList } from '@/services';

export interface HomeModelStateType {
  industryList: [];
  stairTypeList: [];
  leafList: [];
  channelList:[]
}

interface HomeModelType {
  namespace: string;
  state: HomeModelStateType;
  effects: {
    getIndustryList: Effect;
    getStairList: Effect;
    getLeafList: Effect;
    getchannel:Effect
  };
  reducers: {
    GETINDUSTRYLIST: ImmerReducer;
    GETSTAIRLIST: ImmerReducer;
    GETLEAFLIST:ImmerReducer
    GETCHANNEL:ImmerReducer
  };
  Subscription: {
    super: Subscription;
  };
}

const HomeModel: HomeModelType = {
  namespace: 'home',
  state: {
    industryList: [],
    stairTypeList: [],
    leafList: [],
    channelList:[]
  },
  effects: {
    *getIndustryList({ payload }, { call, put }) {
      const r = yield call(getIndustryList);
      yield put({
        type: 'GETINDUSTRYLIST',
        payload: r,
      });
    },
    *getStairList({ payload }, { call, put }) {
      const r = yield call(getstairList, payload);
      yield put({
        type: 'GETSTAIRLIST',
        payload: r,
      });
    },
    *getLeafList({ payload }, { call, put }) {
      const r = yield call(getleafList,payload)
      yield put({
        type:'GETLEAFLIST',
        payload:r
      })
    },
    *getchannel({payload},{call,put}){
      const r = yield call(getchannelList)
      
      yield put({
        type:'GETCHANNEL',
        payload:r
      })
    }
  },
  reducers: {
    GETINDUSTRYLIST(state, action) {
      state.industryList = action.payload;
    },
    GETSTAIRLIST(state, { payload }) {
      state.stairTypeList = payload;
    },
    GETLEAFLIST(state,{payload}){
      state.leafList = payload
    },
    GETCHANNEL(state,{payload}){
      state.channelList = payload
    }
  },
  Subscription: {
    super() {},
  },
};

export default HomeModel;
