<template>
	<div>
		<router-view></router-view>
		<van-tabbar route>
			<van-tabbar-item to="/">
				<span>首页</span>
				<span slot="icon" class="iconfont iconfont-shouye"></span>
			</van-tabbar-item>
			<van-tabbar-item to="qa">
				<span>问答</span>
				<span slot="icon" class="iconfont iconfont-wenda"></span>
			</van-tabbar-item>
			<van-tabbar-item to="/videos">
				<span>视频</span>
				<span slot="icon" class="iconfont iconfont-shipin"></span>
			</van-tabbar-item>
			<van-tabbar-item to="/my">
				<span>{{ $store.state.user ? '我的' : '未登录' }}</span>
				<span slot="icon" class="iconfont iconfont-wode"></span>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>
<script>
	export default {
		name: 'layout',
		data() {
			return {}
		},
		methods: {},
		created() {},
	}
</script>
<style lang="less" scoped></style>
