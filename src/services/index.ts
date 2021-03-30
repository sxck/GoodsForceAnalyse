import request from '@/utils/request';

export const getIndustryList = () =>
  request({
    url: 'industryList',
  });

export const getstairList = (stairType: string) =>
  request({
    url: `industryList/${stairType}`,
  });

export const getleafList = ({
  stairType,
  LeafList,
}: {
  stairType: string;
  LeafList: string;
}) =>
  request({
    url: `industryList/${stairType}/${LeafList}`,
  });

export const getchannelList = () =>
  request({
    url: 'industryList/getchannel',
  });
