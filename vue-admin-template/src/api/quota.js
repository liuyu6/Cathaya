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

export function addCountry(number,country) {
  return request({
    url: '/Addcountry',
    method: 'get',
    params: { number,country}
  })
}




// export function getInfo(id) {
//   return request({
//     url: '/Basic',
//     method: 'get',
//     params: { id }
//   })
// }









