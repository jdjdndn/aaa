/* 
用户请求相关模块
*/
import request from '@/utils/request'

/* 
/v1_0/authorizations   用户认证（登录注册）
*/

export const login = data => {
	return request({
		method: 'POST',
		url: '/v1_0/authorizations',
		data,
	})
}

/* 获取用户个人资料 */
export const getUserInfo = () => {
	return request({
		method: 'get',
		url: '/v1_0/user/profile',
	})
}

/* 获取用户频道列表 */
export const getUserChannels = () => {
	return request({
		method: 'GET',
		url: '/v1_0/user/channels',
	})
}
