<template>
	<div class="article-comments">
		<!-- 评论列表 -->
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
			<van-cell v-for="(item,index) in list" :key="index" :title="item.title">
				<van-image slot="icon" round width="30" height="30" style="margin-right: 10px;" :src="item.aut_photo" />
				<span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
				<div slot="label">
					<p style="color: #363636;">{{item.content}}</p>
					<p>
						<span style="margin-right: 10px;">{{item.pubdate | relativeTime}}</span>
						<van-button size="mini" type="default">回复{{item.reply_count}}</van-button>
					</p>
				</div>

				<van-icon slot="right-icon" :name="item.like_count? 'like' : 'like-o'" @click='handleCommentLiked'>{{ item.like_count ||'赞'}}</van-icon>
			</van-cell>
		</van-list>
		<!-- 评论列表 -->

		<!-- 发布评论 -->
		<van-cell-group class="publish-wrap">
			<van-field clearable placeholder="请输入评论内容">
				<van-button slot="button" size="mini" type="info">发布</van-button>
			</van-field>
		</van-cell-group>
		<!-- /发布评论 -->
	</div>
</template>

<script>
	import { getComments, deletecommentLiked, addcommentLiked, deletearticleLiked, addarticleLiked } from '@/api/comments'
	export default {
		name: "ArticleComment",
		props: {
			articleID: {
				type: [Number, String, Object],
				required: true
			}
		},
		data () {
			return {
				list: [], // 评论列表
				loading: false, // 上拉加载更多的 loading
				finished: false, // 是否加载结束
				offset: null,//偏移量
				error: false
			};
		},
		created () {
			this.onLoad()
		},
		methods: {
			async onLoad () {
				try {
					const { data } = await getComments({
						type: 'a',
						source: this.articleID,
						offset: this.offset,
						limit: 10
					})
					console.log(data);
					const { results } = data.data
					this.list.push(...results)
					this.$emit('badge-success', data.data)
					this.loading = false
					if (results.length) {
						this.offset = data.data.last_id
					} else {
						this.finished = true
					}
				} catch (err) {
					console.log(err, 'comments');
					this.loading = false
					this.error = true
				}
			},
			handleCommentLiked () {
				console.log(111);
			}
		}
	};
</script>

<style scoped lang="less">
	.publish-wrap {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}

	.van-list {
		margin-bottom: 45px;
	}
</style>