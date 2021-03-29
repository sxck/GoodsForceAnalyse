import React,{useState} from 'react';
import styles from './index.less';
import {Dispatch} from 'umi'
import { Button, Form, Input, Select, Space } from 'antd';
import {HomeModelStateType} from '../home/model'
const { Option }:{Option:any} = Select;

const Left = ({dispatch,industryList,stairTypeList}:{dispatch:Dispatch,industryList:[],stairTypeList:[]}) => {

  const [stairData,setStairData] = useState('')
  const [stairType,setStairType] = useState({stairType:''})

  const stairTypeSelect=(value:string)=>{
    switch(value){
      case '电商':
        setStairType({stairType:'ec'});
        break;
      case 'IT':
        setStairType({stairType:'it'})
        break;
      default:
        break
    }
  }


  const getstairList = ()=>{
     dispatch({
        type:'home/getStairList',
        payload:stairType
      })
  }

  const getIndustryList = async()=>{
      dispatch({
        type:'home/getIndustryList'
      })
  }

  return (
    <div className={styles.left}>
      <Form>
        <Form.Item className={styles.item}>
          <div className={styles.colorWhite}>商品</div>
          <Input
            placeholder="请输入商品ID"
            className={styles.inp}
            bordered={false}
          />
        </Form.Item>
        <Form.Item className={styles.item}>
          <div style={{ color: 'white' }}>行业</div>
          <Select
            showArrow={false}
            className={styles.select}
            placeholder="请选择"
            onFocus={getIndustryList}
            onChange={(value:string)=>{
              setStairData(value)
              stairTypeSelect(value)
            }}
          >
            {industryList.map((item,index)=>{
              return <Option value={item} key={index}>{item} </Option>
            })}
          </Select>
          
        </Form.Item>
        <Form.Item className={styles.item}>
          <div className={styles.colorWhite}>一级类目</div>
          <Select
            showArrow={false}
            className={styles.select}
            placeholder="请选择"
            onFocus={getstairList}
            
          >
            {stairTypeList.map((item,index)=>{
              return <Option value={item} key={index}>{item} </Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item className={styles.item}>
          <div className={styles.colorWhite}>叶子类目</div>
          <Select
            showArrow={false}
            className={styles.select}
            placeholder="请选择"
          />
        </Form.Item>
        <Form.Item className={styles.item}>
          <div className={styles.colorWhite}>商品渠道</div>
          <Select
            showArrow={false}
            className={styles.select}
            placeholder="请选择"
          />
        </Form.Item>
      </Form>
      <p>*叶子类目名称和商品id二者至少填写一项;</p>
      <p>*填写具体商品id时,则以商品id为唯一查询条件;</p>
      <div className={styles.btn}>
        <Button type='primary' style={{background:'blue',border:'none'}}>搜索</Button>
        <Button>重置</Button>
      </div>
    </div>
  );
};

export default Left;
