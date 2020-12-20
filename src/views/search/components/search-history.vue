<template>
	<div>
		<van-cell>
			<div slot="title">搜索历史</div>
			<div slot="default" class="search-history-span">
				<div v-if='isDelete'>
					<span @click='$emit("deleteHistoriesArr")'>全部删除</span> &nbsp;&nbsp;
					<span @click='isDelete=false'>完成</span>&nbsp;&nbsp;
				</div>
				<van-icon name="delete" v-else @click='isDelete=true' />
			</div>
		</van-cell>
		<!-- 搜索历史记录的每一项 -->
		<van-cell v-for='(item,index) in historiesArr' :key='index' @click='deleteItem(item, index)'>
			<div slot="title">{{item}}</div>
			<van-icon name="close" slot="default" v-if='isDelete' />
		</van-cell>
	</div>
</template>
<script>
  import { getUserHistories, deleteUserHistories } from '@/api/search'
	import { setItem, getItem } from '@/utils/storage'
  
	export default {
		name: 'search-history',
		data () {
			return {
				isDelete: false//默认不删除
			}
		},
		methods: {
			deleteItem (item, index) {
				if (this.isDelete) {
					this.historiesArr.splice(index, 1)//删除一项
					setItem('HISTORIES', this.historiesArr)
				} else {
					this.$emit('search', item)//触发搜索
				}
			}
		},
		async created () {
			console.log(this.historiesArr);
			try {
				const { data } = await getUserHistories()
				console.log(data);
				const { keywords } = data.data
			} catch (err) {
				console.log(err);
			}
		},
		props: {
			historiesArr: {
				type: Array,
				default () {
					return []
				}
			},
			searchText: {
				type: String,
				required: true
			}
		}
	}
</script>
<style lang="less" scoped>
	.search-history-span > span {
		margin-left: 15px;
	}
</style>
