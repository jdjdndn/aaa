<template>
	<div>
		<van-cell
			v-for="(text, index) in suggestion"
			:key="index"
			@click="sendResult(text)"
		>
			<div slot="title">
				<van-icon name="search" /><span v-html="heightStr(text)"></span>
			</div>
		</van-cell>
	</div>
</template>
<script>
	import { getUserSuggestion } from '@/api/search'
	import { debounce } from 'lodash'
	export default {
		name: 'search-history',
		data() {
			return {
				suggestion: [], //搜索建议组成的数组
			}
		},
		methods: {
			async getSearchSuggestion(q) {
				try {
					const { data } = await getUserSuggestion(q)
					this.suggestion = data.data.options
				} catch (err) {
					console.log(err)
				}
			},
			heightStr(text) {
				const reg = new RegExp(this.searchText, 'gi')
				return text.replace(
					reg,
					`<span style='color: red'>${this.searchText}</span>`
				)
			},
			sendResult(text) {
				this.$emit('search', text)
			},
		},
		created() {},
		props: {
			searchText: {
				type: String,
				requried: true,
			},
		},
		watch: {
			searchText: {
				handler: debounce(function(val) {
					this.getSearchSuggestion(val)
				}),
				immediate: true,
			},
		},
	}
</script>
<style lang="less" scoped></style>
