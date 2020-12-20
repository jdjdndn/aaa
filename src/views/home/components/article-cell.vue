<template>
	<div>
		<van-cell>
			<!-- 左边标题 -->
			<div slot="title">{{ article.title }}</div>
			<!-- 右边内容 -->
			<div v-if="article.cover.images.length === 1" slot="default">
				<van-image :src="article.cover.images[0]" />
			</div>
			<!-- 底部内容 -->
			<div v-if="article.cover.images.length === 3" slot="label">
				<van-image
					v-for="(img, index) in article.cover.images"
					:key="index"
					:src="img"
				/>
				<div class="bottomtext">
					<span>{{ article.aut_name }}</span>
					<span>{{ article.collect_count }}</span>
					<span>{{ article.like_count }}</span>
				</div>
			</div>
		</van-cell>
	</div>
</template>
<script>
	export default {
		name: '',
		data() {
			return {}
		},
		methods: {},
		created() {
			// console.log(this.article)
		},
		props: {
			article: {
				type: Object,
				required: true,
			},
		},
	}
</script>
<style lang="less" scoped>
	.van-cell__value {
		.van-image {
			width: 100px;
			height: 100px;
		}
	}
	.van-cell__label {
		.van-image {
			width: 30%;
			height: 100px;
			margin-right: 10px;
		}
	}
	.bottomtext > span {
		margin-right: 15px;
	}
</style>
