import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Dispatch } from 'umi';
import { Button, Form, Input, Select, Space, message } from 'antd';

const { Option }: { Option: any } = Select;

const Left = ({
  dispatch,
  industryList,
  stairTypeList,
  leafList,
  channelList,
}: {
  dispatch: Dispatch;
  industryList: [];
  stairTypeList: [];
  leafList: [];
  channelList: [];
}) => {
  const [form] = Form.useForm();
  const [stairType, setStairType] = useState('');
  const [LeafList, setLeafList] = useState('');
  const [classify, setClassify] = useState({
    goodId: '',
    Industry: '请选择',
    stair: '请选择',
    leaf: '请选择',
    channel: '请选择',
  });
  console.log(classify)

  // 搜索
  const onFinish = (value: any) => {
    console.log(classify);
  };

  // 重置
  const reset =()=>{
    setClassify({
    goodId: '',
    Industry: '请选择',
    stair: '请选择',
    leaf: '请选择',
    channel: '请选择',
    })
  }

  // 渠道逻辑
  const getchannel = () => {
    dispatch({
      type: 'home/getchannel',
    });
  };

  // 获取叶子类目逻辑
  const leafListSelect = (value: any) => {
    switch (value) {
      case '淘宝':
        setLeafList('tb');
        break;
      case '京东':
        setLeafList('jd');
        break;
      case '阿里巴巴':
        setLeafList('ali');
        break;
      case '腾讯':
        setLeafList('tc');
        break;
      default:
        break;
    }
  };

  const getLeafList = () => {
    if (!LeafList) {
      message.error('一级类目不能为空');
      return;
    }
    dispatch({
      type: 'home/getLeafList',
      payload: { LeafList, stairType },
    });
  };

  // 获取一级类目逻辑
  const stairTypeSelect = (value: string) => {
    switch (value) {
      case '电商':
        setStairType('ec');
        break;
      case 'IT':
        setStairType('it');
        break;
      default:
        break;
    }
  };
  const getstairList = () => {
    if (!stairType) {
      message.error('行业不能为空');
      return;
    }
    dispatch({
      type: 'home/getStairList',
      payload: stairType,
    });
  };

  // 获取行业
  const getIndustryList = async () => {
    dispatch({
      type: 'home/getIndustryList',
    });
  };
  return (
    <div className={styles.left}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item className={styles.item}>
          <div className={styles.colorWhite}>商品</div>
          <Input
            value={classify.goodId}
            className={styles.inp}
            placeholder='请输入商品ID'
            bordered={false}
            onChange={(e)=>{
              setClassify({
                goodId:e.target.value,
                Industry:classify.Industry,
                stair: classify.stair,
                leaf: classify.leaf,
                channel: classify.channel,
              });
            }}
          />
        </Form.Item>
        <Form.Item className={styles.item}>
          <div style={{ color: 'white' }}>行业</div>
          <Select
            value={classify.Industry}
            showArrow={false}
            className={styles.select}
            onFocus={getIndustryList}
            onChange={(value: string) => {
              stairTypeSelect(value);
              setClassify({
                goodId:classify.goodId ,
                Industry: value,
                stair: classify.stair,
                leaf: classify.leaf,
                channel: classify.channel,
              });
            }}
          >
            {industryList.map((item, index) => {
              return (
                <Option value={item} key={index}>
                  {item}{' '}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item className={styles.item}>
          <div className={styles.colorWhite}>一级类目</div>
          <Select
            value={classify.stair}
            showArrow={false}
            className={styles.select}
            onFocus={getstairList}
            onChange={(value: string) => {
              leafListSelect(value);
              setClassify({
                goodId:classify.goodId ,
                Industry: classify.Industry,
                stair: value,
                leaf: classify.leaf,
                channel: classify.channel,
              });
            }}
          >
            {stairTypeList.map((item, index) => {
              return (
                <Option value={item} key={index}>
                  {item}{' '}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item className={styles.item}>
          <div className={styles.colorWhite}>叶子类目</div>
          <Select
            value={classify.leaf}
            showArrow={false}
            className={styles.select}
            onFocus={getLeafList}
            onChange={(value:string)=>{
              setClassify({
                goodId:classify.goodId ,
                Industry: classify.Industry,
                stair:  classify.stair,
                leaf: value,
                channel: classify.channel,
              });
              }
            }
          >
            {leafList.map((item, index) => {
              return (
                <Option value={item} key={index}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item className={styles.item}>
          <div className={styles.colorWhite}>商品渠道</div>
          <Select
            value={classify.channel}
            showArrow={false}
            className={styles.select}
            onFocus={getchannel}
            onChange={(value:string)=>{
              setClassify({
                goodId:classify.goodId ,
                Industry: classify.Industry,
                stair:  classify.stair,
                leaf: classify.leaf,
                channel: value,
              });
              }
            }
          >
            {channelList.map((item, index) => {
              return (
                <Option value={item} key={index}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <p>*叶子类目名称和商品id二者至少填写一项;</p>
        <p>*填写具体商品id时,则以商品id为唯一查询条件;</p>
        <div className={styles.btn}>
          <Button
            type="primary"
            style={{ background: 'blue', border: 'none' }}
            htmlType="submit"
          >
            搜索
          </Button>
          <Button onClick={reset}>重置</Button>
        </div>
      </Form>
    </div>
  );
};

export default Left;
