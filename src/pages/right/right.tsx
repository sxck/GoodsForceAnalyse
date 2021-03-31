import {
  Tabs,
  Form,
  Select,
  Input,
  DatePicker,
  Button,
  Space,
  Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import { Dispatch } from 'umi';
import * as echarts from 'echarts';

const { TabPane } = Tabs;
const { Option }: { Option: any } = Select;
const { RangePicker } = DatePicker;

const Right = ({
  classify,
  dispatch,
  scentList,
  secondTagList,
  ppList,
  sourceList,
}: {
  classify: any;
  dispatch: Dispatch;
  scentList: [];
  secondTagList: [];
  ppList: [];
  sourceList: [];
}) => {
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    let option = {
      title: {
        text: '原声概况',
      },
      tooltip: {},
      legend: {
        data: ['好评', '差评'],
      },
      xAxis: {
        data: ['品质'],
      },
      yAxis: {},
      series: [
        {
          name: '好评',
          type: 'bar',
          data: [5],
          barWidth: 100,
        },
        {
          name: '差评',
          type: 'bar',
          data: [5],
          barWidth: 100,
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }, []);

  const [filterData, setFilterData] = useState({
    scene: '请选择', // 一级场景
    secondTag: '请选择', // 二级标签
    brand: '', // 品牌标签
    merchantId: '', //卖家ID
    purchasingPower: '请选择', // 用户购买力
    source: '请选择', // 原声来源
  });

  const disabledDate = (current: any) => {
    return (
      current <= moment().subtract(90, 'days') ||
      current > moment().endOf('day')
    );
  };

  // 获取原声来源
  const getSource = () => {
    dispatch({
      type: 'home/getSourceRQ',
    });
  };

  // 获取购买力
  const getPP = () => {
    dispatch({
      type: 'home/getpp',
    });
  };

  // 获取二级标签
  const getScent = () => {
    dispatch({
      type: 'home/getScentList',
    });
  };

  // 获取一级场景
  const secondTag = () => {
    dispatch({
      type: 'home/getsecondTagList',
    });
  };

  const columns = [
    {
      title: '一级场景',
      dataIndex: 'econdtag',
      align: 'center'
    },
    {
      title: '二级标签',
      dataIndex: 'scent',
       align: 'center'
    },
    {
      title: '三级标签',
      dataIndex: 'three',
       align: 'center'
    },
    {
        title: '声量',
        dataIndex: 'volume',
        align: 'center'
      },
      {
        title: '反馈用户数',
        dataIndex: 'users',
        align: 'center'
      },
      {
        title: '覆盖商品数',
        dataIndex: 'goods',
        align: 'center'
      },
      {
        title: '覆盖叶子类目数',
        dataIndex: 'leafs',
         align: 'center'
      },
      {
        title: '原声',
        render(){
            return(
                <a>原声详情</a>
            )
        }
        
      },
  ];
  const data = [
    {
      key: '1',
      econdtag: '商品',
      scent: '品质',
      three: '质量满意/好',
      volume:'3',
      users:'3',
      goods:'3',
      leafs:'1',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  return (
    <div className={styles.all}>
      <Tabs defaultActiveKey="1" style={{ background: 'white' }}>
        <TabPane tab="营销分析" key="1" style={{ height: '100%' }}>
          <Form className={styles.formTop}>
            <Form.Item label="行业" colon className={styles.formTopItem}>
              {classify.Industry === '请选择' ? ' -' : classify.Industry}
            </Form.Item>
            <Form.Item label="一级类目" colon className={styles.formTopItem}>
              {classify.stair === '请选择' ? ' -' : classify.stair}
            </Form.Item>
            <Form.Item label="叶子类目" colon className={styles.formTopItem}>
              {classify.leaf === '请选择' ? ' -' : classify.leaf}
            </Form.Item>
            <Form.Item label="商家数" colon className={styles.formTopItem}>
              8
            </Form.Item>
            <Form.Item label="品牌数" colon className={styles.formTopItem}>
              2
            </Form.Item>
            <Form.Item label="商品数" colon className={styles.formTopItem}>
              8
            </Form.Item>
          </Form>
          <Form className={styles.formCenter}>
            <Form.Item
              label="一级场景"
              colon
              style={{ width: '15%', margin: '0 15px' }}
            >
              <Select
                onFocus={getScent}
                value={filterData.scene}
                onChange={(value: any) => {
                  setFilterData({
                    scene: value,
                    secondTag: filterData.secondTag,
                    brand: filterData.brand,
                    merchantId: filterData.merchantId,
                    purchasingPower: filterData.purchasingPower,
                    source: filterData.source,
                  });
                }}
              >
                {scentList.map((item, index) => {
                  return (
                    <Option value={item} key={index}>
                      {item}{' '}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="二级标签"
              colon
              style={{ width: '15%', margin: '0 15px' }}
            >
              <Select
                onFocus={secondTag}
                value={filterData.secondTag}
                onChange={(value: any) => {
                  setFilterData({
                    scene: filterData.scene,
                    secondTag: value,
                    brand: filterData.brand,
                    merchantId: filterData.merchantId,
                    purchasingPower: filterData.purchasingPower,
                    source: filterData.source,
                  });
                }}
              >
                {secondTagList.map((item, index) => {
                  return (
                    <Option value={item} key={index}>
                      {item}{' '}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="品牌标签"
              colon
              style={{ width: '20%', margin: '0 15px' }}
            >
              <Input
                value={filterData.brand}
                placeholder="请输入品牌名称"
                onChange={(e) => {
                  setFilterData({
                    scene: filterData.scene,
                    secondTag: filterData.secondTag,
                    brand: e.target.value,
                    merchantId: filterData.merchantId,
                    purchasingPower: filterData.purchasingPower,
                    source: filterData.source,
                  });
                }}
              ></Input>
            </Form.Item>
            <Form.Item
              label="卖家ID"
              colon
              style={{ width: '20%', margin: '0 15px' }}
            >
              <Input
                value={filterData.merchantId}
                placeholder="请输入卖家ID"
                onChange={(e) => {
                  setFilterData({
                    scene: filterData.scene,
                    secondTag: filterData.secondTag,
                    brand: filterData.brand,
                    merchantId: e.target.value,
                    purchasingPower: filterData.purchasingPower,
                    source: filterData.source,
                  });
                }}
              ></Input>
            </Form.Item>
            <Form.Item
              label="用户购买力"
              colon
              style={{ width: '16%', margin: '0 15px' }}
            >
              <Select
                onFocus={getPP}
                value={filterData.purchasingPower}
                onChange={(value: any) => {
                  setFilterData({
                    scene: filterData.scene,
                    secondTag: filterData.secondTag,
                    brand: filterData.brand,
                    merchantId: filterData.merchantId,
                    purchasingPower: value,
                    source: filterData.source,
                  });
                }}
              >
                {ppList.map((item, index) => {
                  return (
                    <Option value={item} key={index}>
                      {item}{' '}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="原声来源"
              colon
              style={{ width: '15%', margin: '0 15px' }}
            >
              <Select
                onFocus={getSource}
                value={filterData.source}
                onChange={(value: any) => {
                  setFilterData({
                    scene: filterData.scene,
                    secondTag: filterData.secondTag,
                    brand: filterData.brand,
                    merchantId: filterData.merchantId,
                    purchasingPower: filterData.purchasingPower,
                    source: value,
                  });
                }}
              >
                {sourceList.map((item, index) => {
                  return (
                    <Option value={item} key={index}>
                      {item}{' '}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
          <Form className={styles.formdate}>
            <Form.Item label="原声触发时间" colon>
              <RangePicker
                locale={locale}
                defaultValue={[moment().subtract(90, 'days'), moment()]}
                disabledDate={disabledDate}
              />
              <Space style={{ marginLeft: '100px' }}>
                <Button type="primary">搜索</Button>
                <Button
                  style={{ marginLeft: '30px' }}
                  onClick={() => {
                    setFilterData({
                      scene: '请选择', // 一级场景
                      secondTag: '请选择', // 二级标签
                      brand: '', // 品牌标签
                      merchantId: '', //卖家ID
                      purchasingPower: '请选择', // 用户购买力
                      source: '请选择', // 原声来源
                    });
                  }}
                >
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
          <div className={styles.view}>
            <div id="main" style={{ width: '80%', height: '400px' }}></div>
            <div style={{ width: '20%' }}>
              <div className={styles.box1}>品质的三级标签:</div>
              <div className={styles.box1}>
                <span className={styles.span1}>0</span>{' '}
                <span className={styles.span2}>质量满意/好</span>
                {3}
              </div>
              <div className={styles.box1}>
                <span className={styles.span1}>1</span>
                <span className={styles.span2}>保暖好</span>
                {1}
              </div>
              <div className={styles.box1}>
                <span className={styles.span1}>2</span>
                <span className={styles.span2}>强亲肤</span>
                {1}
              </div>
            </div>
          </div>
          <div>
            <h3
              style={{
                margin: '0 25px',
                padding: '0 35px',
                background: 'white',
                fontWeight: '999',
              }}
            >
              原声详情
            </h3>
            <div style={{margin:'0 25px', background:'white'}}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                className={styles.table}
              />
            </div>
          </div>
        </TabPane>
        <TabPane tab="属性判断" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Right;
