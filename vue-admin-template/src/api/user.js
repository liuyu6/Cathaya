import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/Register',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: '/Basic',
    method: 'get',
    params: { id }
  })
}

export function addCompany(data) {
  return request({
    url: '/AddCompany',
    method: 'post',
    data
  })
}

export function saveAccount(data) {
  return request({
    url: '/SaveAccount',
    method: 'post',
    data
  })
}

export function forgetPassword(username) {
  return request({
    url: '/ForgetPassword',
    method: 'post',
    params: { username }
  })
}

export function updatePasswd(data) {
  return request({
    url: '/UpdatePasswd',
    method: 'post',
    data
  })
}

export function updatePawssword(id,passwd) {
  return request({
    url: '/UpdatePawssword',
    method: 'post',
    params: { id,passwd }
  })
}

export function seeCompany(id) {
  return request({
    url: '/SeeCompany',
    method: 'get',
    params: { id }
  })
}
export function viewSubAccounts(id) {
  return request({
    url: '/ViewSubAccounts',
    method: 'get',
    params: { id }
  })
}

export function addSubAccount(data) {
  return request({
    url: '/AddSubAccount',
    method: 'post',
    data
  })
}

export function deleteSubAccounts(id) {
  return request({
    url: '/DeleteSubAccounts',
    method: 'get',
    params: { id }
  })
}



export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
