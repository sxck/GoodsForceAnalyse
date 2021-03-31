import styles from './index.less';
import Left from '@/pages/left/left';
import Right from '@/pages/right/right';
import { connect, Dispatch } from 'umi';
import { HomeModelStateType } from './model';
import React, { useState } from 'react';

function IndexPage({
  dispatch,
  industryList,
  stairTypeList,
  leafList,
  channelList,
  scentList,
  secondTagList,
  ppList,
  sourceList,
}: {
  dispatch: Dispatch;
  industryList: [];
  stairTypeList: [];
  leafList: [];
  channelList: [];
  scentList: [];
  secondTagList: [];
  ppList: [];
  sourceList: [];
}) {
  const [classify, setClassify] = useState({
    goodId: '',
    Industry: '请选择',
    stair: '请选择',
    leaf: '请选择',
    channel: '请选择',
  });

  return (
    <div style={{display:'flex',height:'100%'}}>
      <Left
        dispatch={dispatch}
        industryList={industryList}
        stairTypeList={stairTypeList}
        leafList={leafList}
        channelList={channelList}
        setClassify={setClassify}
      />
      <Right
        classify={classify}
        dispatch={dispatch}
        scentList={scentList}
        secondTagList={secondTagList}
        ppList={ppList}
        sourceList={sourceList}
      ></Right>
    </div>
  );
}

export default connect(({ home }: { home: HomeModelStateType }) => home)(
  IndexPage,
);
