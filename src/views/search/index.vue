<template>
	<div class="search-container">
		<form action="/" class="search-form">
			<van-search
				v-model="searchText"
				show-action
				placeholder="请输入搜索关键词"
				@search="onSearch"
				@cancel="$router.push($route.query.redirect || '/')"
				background="#369fff"
				@focus="isResultShow = false"
			/>
		</form>
		<!-- 聚焦隐藏搜索结果 -->
		<!-- 搜索结果 -->
		<search-result v-if="isResultShow" :searchText="searchText"></search-result>
		<!-- 搜索建议 -->
		<search-suggestion
			v-else-if="searchText"
			:searchText="searchText"
			@search="onSearch"
		></search-suggestion>
		<!-- 搜索历史 -->
		<search-history v-else></search-history>
	</div>
</template>
<script>
	import SearchHistory from './components/search-history'
	import SearchSuggestion from './components/search-suggsetion'
	import SearchResult from './components/search-result'
	export default {
		name: 'search',
		data() {
			return {
				searchText: '',
				isResultShow: false,
			}
		},
		methods: {
			onSearch(text) {
				//把搜索到的结果给父组件,再传递到搜索结果组件
				this.searchText = text
				//显示搜索结果
				this.isResultShow = true
			},
			onCancel() {
				this.$toast('取消')
			},
			// showResult(text) {
			// 	//把搜索到的结果给父组件,再传递到搜索结果组件
			// 	this.searchText = text
			// 	this.isResultShow = true
			// },
		},
		created() {},
		components: {
			SearchHistory,
			SearchSuggestion,
			SearchResult,
		},
	}
</script>
<style lang="less" scoped>
	.search-container {
		padding-top: 100px;
		.search-form {
			position: fixed;
			z-index: 2;
			left: 0;
			right: 0;
			top: 0;
			overflow: hidden;
		}
	}
</style>
