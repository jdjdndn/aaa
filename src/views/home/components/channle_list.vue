<template>
	<div>
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="successText">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
				<!-- <van-cell
				v-for="article in list"
				:key="article.ch_id"
				:title="article.title"
			/> -->
				<!-- article.ch_id -->
				<article-cell slot="default" v-for="(article, index) in list" :key="index" :title="article.title" :article="article"></article-cell>
			</van-list>
		</van-pull-refresh>
	</div>
</template>
<script>
	import { getArticles } from '@/api/article'
	import ArticleCell from './article-cell.vue'
	export default {
		name: 'channel-list',
		data () {
			return {
				list: [],
				loading: false,
				finished: false,
				timestamp: null,
				error: false,
				isLoading: false,
				successText: '刷新成功',
			}
		},
		methods: {
			async onLoad () {
				try {
					const { data } = await getArticles({
						channel_id: this.channel.id,
						timestamp: Date.now(),
						with_top: 1,
					})

					// console.log(data.data.pre_timestamp)
					const { results } = data.data
					this.list.push(...results)
					this.loading = false
					if (results.length) {
						this.timestamp = data.data.pre_timestamp
					} else {
						this.finished = true
					}
				} catch (err) {
					console.log(err)
					this.error = false
					this.loading = false
				}
			},
			async onRefresh () {
				try {
					const { data } = await getArticles({
						channel_id: this.channel.id,
						timestamp: Date.now(),
						with_top: 1,
					})
					// console.log(data)
					this.list.unshift(...data.data.results)
					this.isLoading = false
					this.successText = `刷新成功,更新${data.data.results.length}条数据`
				} catch (err) {
					console.log(err)
					this.isLoading = false
					this.successText = '刷新失败,点击重试'
				}
			},
		},
		async created () {
			try {
				const { data } = await getArticles({
					channel_id: this.channel.id,
					timestamp: Date.now(),
					with_top: 1,
				})
				// console.log(data)
				this.list = data.data.results
			} catch (err) {
				console.log(err)
			}
		},
		props: {
			channel: {
				type: Object,
				required: true,
			},
		},
		components: {
			'article-cell': ArticleCell,
		},
	}
</script>
<style lang="less" scoped></style>
