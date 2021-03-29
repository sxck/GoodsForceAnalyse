import styles from './index.less';
import Left from '@/pages/left/left'
import { connect,Dispatch } from 'umi';
import {HomeModelStateType} from './model'

 function IndexPage({dispatch,industryList,stairTypeList}:{dispatch:Dispatch,industryList:[],stairTypeList:[]}) {

  
  return (
    <div style={{height:'100%'}}>
      <Left dispatch={dispatch} industryList={industryList} stairTypeList={stairTypeList}/>
      </div>
  );
}

export default connect(({home}:{home:HomeModelStateType})=>home)(IndexPage) 
