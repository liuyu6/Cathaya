import request from '@/utils/request'

export function quotaList(user_id) {
  return request({
    url: '/NewEnquiry',
    method: 'get',
    params: { user_id }
  })
}

export function delEnquiry(id) {
  return request({
    url: '/DelEnquiry',
    method: 'get',
    params: { id }
  })
}

export function addEnquiry(user_id,type) {
  return request({
    url: '/AddEnquiry',
    method: 'get',
    params: { user_id,type }
  })
}

export function ration(number) {
  return request({
    url: '/Ration',
    method: 'get',
    params: { number }
  })
}

export function getMeth(number) {
  return request({
    url: '/Qualitative',
    method: 'get',
    params: { number }
  })
}

export function createEnquiry(number,content,project_name) {
  return request({
    url: '/CreateEnquiry',
    method: 'get',
    params: { number,content,project_name}
  })
}

export function addCountry(met_id,other_country,country) {
  return request({
    url: '/Addcountry',
    method: 'post',
    params: { met_id,other_country,country}
  })
}

export function createMethodology(number,methodology,met_id) {
  return request({
    url: '/CreateMethodology',
    method: 'get',
    params: { number,methodology,met_id}
  })
}

export function createFieldwork(met_id,country,fieldwork) {
  return request({
    url: '/CreateFieldwork',
    method: 'post',
    params: { met_id,country,fieldwork}
  })
}

export function quantitativeFieldwork(met_id,country,fieldwork) {
  return request({
    url: '/QuantitativeFieldwork',
    method: 'post',
    params: { met_id,country,fieldwork}
  })
}

export function createAdditional(met_id,country,fieldwork) {
  return request({
    url: '/CreateAdditional',
    method: 'post',
    params: { met_id,country,fieldwork}
  })
}

export function quantitativeAdditional(met_id,country,fieldwork) {
  return request({
    url: '/QuantitativeAdditional',
    method: 'post',
    params: { met_id,country,fieldwork}
  })
}


export function projectServices(met_id) {
  return request({
    url: '/ProjectServices',
    method: 'get',
    params: { met_id}
  })
}

// 项目信息
export function projectInformation(number) {
  return request({
    url: '/ProjectInformation',
    method: 'get',
    params: {number}
  })
}

// 删除memodology
export function deleteMethodology(met_id) {
  return request({
    url: '/DeleteMethodology',
    method: 'get',
    params: {met_id}
  })
}

// 查看报价单
export function quotation(number) {
  return request({
    url: '/Quotation',
    method: 'get',
    params: {number}
  })
}

// 提交报价单
export function addInquiry(number) {
  return request({
    url: '/AddInquiry',
    method: 'get',
    params: {number}
  })
}
// export function getInfo(id) {
//   return request({
//     url: '/Basic',
//     method: 'get',
//     params: { id }
//   })
// }









