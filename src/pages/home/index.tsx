import styles from './index.less';
import Left from '@/pages/left/left'
import { connect,Dispatch } from 'umi';
import {HomeModelStateType} from './model'

 function IndexPage({dispatch,industryList,stairTypeList,leafList,channelList}:{dispatch:Dispatch,industryList:[],stairTypeList:[],leafList:[],channelList:[]}) {

  
  return (
    <div style={{height:'100%'}}>
      <Left dispatch={dispatch} industryList={industryList} stairTypeList={stairTypeList} leafList={leafList} channelList={channelList}/>
      </div>
  );
}

export default connect(({home}:{home:HomeModelStateType})=>home)(IndexPage) 
