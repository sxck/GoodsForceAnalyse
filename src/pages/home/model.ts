import { Subscription, Effect, ImmerReducer, IManifest } from 'umi';
import { getIndustryList, getstairList, getleafList,getchannelList,getScentList,getSecondTagList, getPP,getSource } from '@/services';

export interface HomeModelStateType {
  industryList: [];
  stairTypeList: [];
  leafList: [];
  channelList:[]
  scentList:[]
  secondTagList:[]
  ppList:[]
  sourceList:[]
}

interface HomeModelType {
  namespace: string;
  state: HomeModelStateType;
  effects: {
    getIndustryList: Effect;
    getStairList: Effect;
    getLeafList: Effect;
    getchannel:Effect
    getScentList:Effect
    getsecondTagList:Effect
    getpp:Effect
    getSourceRQ:Effect
  };
  reducers: {
    GETINDUSTRYLIST: ImmerReducer;
    GETSTAIRLIST: ImmerReducer;
    GETLEAFLIST:ImmerReducer
    GETCHANNEL:ImmerReducer
    GETSCENTLIST:ImmerReducer
    GETSECONDTAGLIST:ImmerReducer
    GETPP:ImmerReducer
    GETSOURCE:ImmerReducer
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
    channelList:[],
    scentList:[],
    secondTagList:[],
    ppList:[],
    sourceList:[]
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
    },
    *getScentList({},{call,put}){
      const r = yield call(getScentList)
     yield put({
       type:'GETSCENTLIST',
       payload:r
     })
    },
    *getsecondTagList({},{call,put}){
      const r = yield call(getSecondTagList)
      yield put({
        type:'GETSECONDTAGLIST',
        payload:r
      })
    },
    *getpp({},{call,put}){
      const r = yield call(getPP)
      yield put({
        type:'GETPP',
        payload:r
      })
    },
    *getSourceRQ({},{call,put}){
      console.log(1)
      const r = yield call(getSource)
      console.log(r)
      yield put({
        type:'GETSOURCE',
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
    },
    GETSCENTLIST(state,{payload}){
      state.scentList = payload
    },
    GETSECONDTAGLIST(state,{payload}){
      state.secondTagList = payload
    },
    GETPP(state,{payload}){
      state.ppList = payload
    },
    GETSOURCE(state,{payload}){
        state.sourceList = payload
    }
  },
  Subscription: {
    super() {},
  },
};

export default HomeModel;
