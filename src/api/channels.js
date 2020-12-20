/* 频道列表相关请求 */
import request from '@/utils/request'

/* 全部频道列表 */
export const getAllChannels = () => {
	return request({
		method: 'GET',
		url: '/v1_0/channels',
	})
}
