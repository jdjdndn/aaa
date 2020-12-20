import request from '@/utils/request'
/* 频道新闻推荐_V1.1 */

export const getArticles = params => {
	return request({
		method: 'GET',
		url: '/v1_1/articles',
		params,
	})
}
