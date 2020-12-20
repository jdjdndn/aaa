<template>
	<div>
		<!-- 已登录 -->
		<div class="login-Or-outlogin">
			<div class="inlogin" v-if="user">
				<!-- 头像编辑按钮区域 -->
				<div class="avatar">
					<van-image round src="https://img.yzcdn.cn/vant/cat.jpeg" />
					<van-button type="info">编辑资料</van-button>
				</div>
				<van-grid :column-num="4" :border="false">
					<van-grid-item>
						<span>文章</span>
						<span>10</span>
					</van-grid-item>
					<van-grid-item>
						<span>关注</span>
						<span>10</span>
					</van-grid-item>
					<van-grid-item>
						<span>粉丝</span>
						<span>10</span>
					</van-grid-item>
					<van-grid-item>
						<span>点赞</span>
						<span>10</span>
					</van-grid-item>
				</van-grid>
			</div>
			<!-- 未登录 -->
			<div class="outlogin" v-else>
				<van-image
					round
					src="https://img.yzcdn.cn/vant/cat.jpeg"
					@click="$router.push({ name: 'login', query: { redirect: '/my' } })"
				/>
				<van-button type="info">登录/注册</van-button>
			</div>
		</div>
		<van-grid :column-num="2" :border="false">
			<van-grid-item>
				<span class="iconfont iconfont-shoucang"></span>
				<span>历史</span>
			</van-grid-item>
			<van-grid-item>
				<span class="iconfont iconfont-lishi"></span>
				<span>收藏</span>
			</van-grid-item>
		</van-grid>

		<van-cell title="斩妖除魔" />
		<van-cell title="小爱机器人" />
		<van-cell>
			<div slot="title" @click="logout" v-if="user">退出登录</div>
		</van-cell>
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {}
		},
		methods: {
			logout() {
				this.$dialog
					.confirm({
						message: '是否退出登录',
					})
					.then(() => {
						// on confirm
						this.$router.push({
							name: 'login',
							query: { redirect: '/my' },
						})
						this.$store.commit('restoreToken', null)
					})
					.catch(() => {
						// on cancel
						this.$toast('取消退出登录操作')
					})
			},
		},
		created() {},
		computed: {
			...mapState(['user']),
		},
	}
</script>
<style lang="less" scoped>
	.inlogin {
		height: 361px;
		padding: 0 30px;
		.avatar {
			height: 230px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.van-image {
				width: 100px;
				height: 100px;
			}
		}
		.van-grid {
			font-size: 27px;
		}
	}
	.outlogin {
		height: 361px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.van-grid {
		font-size: 27px;
	}
	.van-image {
		width: 100px;
		height: 100px;
	}
</style>
