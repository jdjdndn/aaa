/* 用户搜索相关 */
import request from '@/utils/request'
/* 
获取联想建议（自动补全）
*/
export const getUserSuggestion = q => {
	return request({
		method: 'GET',
		url: '/app/v1_0/suggestion',
		params: { q },
	})
}

/* 获取搜索结果 */

export const getSearchResult = params => {
	return request({
		method: 'GET',
		url: '/app/v1_0/search',
		params,
	})
}

/* 
获取用户搜索历史
*/
export const getUserHistories = () => {
	return request({
		method: 'GET',
		url: '/app/v1_0/search/histories',
	})
}
/* 删除用户搜索历史 */

export const deleteUserHistories = () => {
	return request({
		method: 'DELETE',
		url: '/app/v1_0/search/histories',
	})
}
