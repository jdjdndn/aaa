/* 获取新闻文章详情 */
import request from '@/utils/request'
export const getArticleInfo = articleID => {
	return request({
		method: 'GET',
		url: '/app/v1_0/articles/' + articleID,
	})
}
/* 获取评论或评论回复 */

export const getComments = params => {
	return request({
		method: 'GET',
		url: '/app/v1_0/comments',
		params,
	})
}
/* 取消关注用户 */
export const deleteFollow = target => {
	return request({
		method: 'DELETE',
		url: '/app/v1_0/user/followings/' + target,
	})
}
/* 关注用户 */
export const addFollow = target => {
	return request({
		method: 'POST',
		url: '/app/v1_0/user/followings',
		data: { target },
	})
}
/* 取消收藏文章 */
export const deleteCollect = target => {
	return request({
		method: 'DELETE',
		url: '/app/v1_0/article/collections/' + target,
	})
}
/* 收藏文章 */
export const addCollect = target => {
	return request({
		method: 'POST',
		url: '/app/v1_0/article/collections',
		data: { target },
	})
}
/* 取消对评论或评论回复点赞 */
export const deletecommentLiked = articleId => {
	return request({
		method: 'DELETE',
		url: '/app/v1_0/article/likings/' + articleId,
	})
}
/*对文章点赞 */
export const addarticleLiked = articleId => {
	return request({
		method: 'POST',
		url: '/app/v1_0/article/likings',
		data: { articleId },
	})
}

/* 取消对评论或评论回复点赞 */
export const deletearticleLiked = commentId => {
	return request({
		method: 'DELETE',
		url: '/app/v1_0/comment/likings/' + commentId,
	})
}
/*对评论或评论回复点赞 */
export const addcommentLiked = commentId => {
	return request({
		method: 'POST',
		url: '/app/v1_0/comment/likings',
		data: { commentId },
	})
}

/* 添加评论或评论回复 */
export const addComments = params => {
	return request({
		method: 'POST',
		url: '/app/v1_0/comments',
		data: { params },
	})
}
