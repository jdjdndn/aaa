<template>
	<div class="article-container">
		<!-- 导航栏 -->
		<van-nav-bar class="page-nav-bar" title="黑马头条">
			<van-icon name="arrow-left" slot='left' @click='$router.push("/")' />
		</van-nav-bar>
		<!-- /导航栏 -->

		<div class="main-wrap">
			<!-- 加载中 -->
			<div class="loading-wrap" v-if='isloading'>
				<van-loading color="#3296fa" vertical>加载中</van-loading>
			</div>
			<!-- /加载中 -->

			<!-- 加载完成-文章详情 -->
			<div class="article-detail markdown-body" v-else-if='article.title'>
				<!-- 文章标题 -->
				<h1 class="article-title">{{article.title}}</h1>
				<!-- /文章标题 -->

				<!-- 用户信息 -->
				<van-cell class="user-info" center :border="false">
					<van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
					<div slot="title" class="user-name">{{article.aut_name}}</div>
					<div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
					<!-- 关注 -->
					<follow :articleID='article.art_id' :isFollow='article.is_followed' @updata-follow='article.is_followed=$event'></follow>
				</van-cell>
				<!-- /用户信息 -->

				<!-- 文章内容 -->
				<div class="article-content" v-html='article.content'></div>
				<van-divider>正文结束</van-divider>

				<!-- 文章评论 -->
				<comments :articleID='articleID' :isFollow='article.is_follow' @badge-success='commentLength=$event.total_count'></comments>

				<!-- 底部区域 -->
				<div class="article-bottom">
					<van-button class="comment-btn" type="default" round size="small" @click='isPopShow=true'>写评论</van-button>
					<!-- 评论数 -->
					<van-icon name="comment-o" :badge="commentLength" color="#777" />
					<!-- 收藏 -->
					<collected :articleID='articleID' v-model='article.is_collected'></collected>
					<!-- 点赞 -->
					<liked :articleID='articleID' v-model='article.attitude'></liked>

					<!-- 分享 -->
					<van-icon name="share" color="#777777"></van-icon>
				</div>
				<!-- /底部区域 -->
			</div>
			<!-- /加载完成-文章详情 -->

			<!-- 加载失败：404 -->
			<div class="error-wrap" v-else-if='errState== 404'>
				<van-icon name="failure" />
				<p class="text">该资源不存在或已删除！</p>
			</div>
			<!-- /加载失败：404 -->

			<!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
			<div class="error-wrap" v-else>
				<van-icon name="failure" />
				<p class="text">内容加载失败！</p>
				<van-button class="retry-btn">点击重试</van-button>
			</div>
			<!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
		</div>
		<!-- 弹出层 -->
		<van-popup v-model="isPopShow" position="bottom">
			<!-- 添加评论 -->
			<add-Comments :articleID='articleID'></add-Comments>
		</van-popup>

	</div>
</template>

<script>
	import { getArticleInfo } from '@/api/comments'
	import Comments from './components/comments'
	import Follow from '@/components/follow'
	import Collected from '@/components/collected'
	import Liked from '@/components/liked'
	import AddComments from './components/addComment'
	export default {
		name: 'ArticleIndex',
		components: { Comments, Follow, Collected, Liked, AddComments },
		props: {
			articleID: {
				type: [Number, String, Object],
				required: true
			}
		},
		data () {
			return {
				isloading: true,
				article: {},
				errState: 0,
				commentLength: 0,
				isPopShow: false
			}
		},
		computed: {},
		watch: {},
		async created () {
			try {
				const { data } = await getArticleInfo(this.articleID)
				console.log(data);
				this.article = data.data
				this.isloading = false
			} catch (err) {
				console.log(err);
				this.isloading = false
				if (err.response.status == 404) {
					this.errState = 404
				} else {
					this.errState = 400
				}
			}
		},
		mounted () { },
		methods: {}
	}
</script>

<style scoped lang="less">
	@import "./github-markdown.css";
	.markdown-body h1,
	.markdown-body h2 {
		border: 0;
	}
	.article-container {
		.main-wrap {
			position: fixed;
			left: 0;
			right: 0;
			top: 92px;
			bottom: 88px;
			overflow-y: scroll;
			background-color: #fff;
		}
		.article-detail {
			.article-title {
				font-size: 40px;
				padding: 50px 32px;
				margin: 0;
				color: #3a3a3a;
			}

			.user-info {
				padding: 0 32px;
				.avatar {
					width: 70px;
					height: 70px;
					margin-right: 17px;
				}
				.van-cell__label {
					margin-top: 0;
				}
				.user-name {
					font-size: 24px;
					color: #3a3a3a;
				}
				.publish-date {
					font-size: 23px;
					color: #b7b7b7;
				}
				.follow-btn {
					width: 170px;
					height: 58px;
				}
			}

			.article-content {
				padding: 55px 32px;
				/deep/ p {
					text-align: justify;
				}
			}
		}

		.loading-wrap {
			padding: 200px 32px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #fff;
		}

		.error-wrap {
			padding: 200px 32px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: #fff;
			.van-icon {
				font-size: 122px;
				color: #b4b4b4;
			}
			.text {
				font-size: 30px;
				color: #666666;
				margin: 33px 0 46px;
			}
			.retry-btn {
				width: 280px;
				height: 70px;
				line-height: 70px;
				border: 1px solid #c3c3c3;
				font-size: 30px;
				color: #666666;
			}
		}

		.article-bottom {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-sizing: border-box;
			height: 88px;
			border-top: 1px solid #d8d8d8;
			background-color: #fff;
			.comment-btn {
				width: 282px;
				height: 46px;
				border: 2px solid #eeeeee;
				font-size: 30px;
				line-height: 46px;
				color: #a7a7a7;
			}
			.van-icon {
				font-size: 40px;
				.van-info {
					font-size: 16px;
					background-color: #e22829;
				}
			}
		}
	}
</style>
