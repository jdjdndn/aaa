<template>
	<div>
		<van-cell>
			<div slot="title">搜索历史</div>
			<div slot="default" class="search-history-span">
				<span>全部删除</span>
				<span>忘了,再补</span>
				<van-icon name="delete" />
			</div>
		</van-cell>
		<!-- 搜索历史记录的每一项 -->
		<van-cell>
			<div slot="title">郭小公</div>
			<van-icon name="close" slot="default" />
		</van-cell>
	</div>
</template>
<script>
	export default {
		name: 'search-history',
		data() {
			return {}
		},
		methods: {},
		created() {},
	}
</script>
<style lang="less" scoped>
	.search-history-span > span {
		margin-left: 15px;
	}
</style>
