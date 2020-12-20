import class from '@vue/cli-service';
<template>
	<div>
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
			:error.sync="error"
			error-text="请求失败，点击重新加载"
		>
			<van-cell
				v-for="(result, index) in list"
				:key="index"
				:title="result.title"
			/>
		</van-list>
	</div>
</template>
<script>
	import { getSearchResult } from '@/api/search'
	export default {
		name: 'search-result',
		data() {
			return {
				list: [],
				loading: false,
				finished: false,
				queryInfo: {
					page: 1,
					per_page: 15,
					q: this.searchText,
				},
				error: false,
			}
		},
		methods: {
			async onLoad() {
				try {
					const { data } = await getSearchResult(this.queryInfo)
					console.log(data)
					const { results } = data.data
					this.list.push(...results)
					this.loading = false
					if (results.length) {
						this.queryInfo.page++
					} else {
						this.finished = true
					}
				} catch (err) {
					console.log(err)
					this.loading = false
					this.error = true
				}
			},
			// async created() {
			// 	try {
			// 		const { data } = await getSearchResult(queryInfo)
			// 		console.log(data)
			// 	} catch (err) {
			// 		console.log(err)
			// 	}
			// },
		},
		props: {
			searchText: {
				type: String,
				required: true,
			},
		},
	}
</script>
<style lang="less" scoped></style>
