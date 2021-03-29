import request from '@/utils/request'

export const getIndustryList=()=>request({
    url:'industryList',
})

export const getstairList=({stairType}:{stairType:string})=>request({
    url:`industryList/${stairType}`
})