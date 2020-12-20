<template>
	<van-button class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" v-if='!isFollow' :loading='loading' @click='changeFollow'>关注</van-button>
	<van-button v-else class="follow-btn" round size="small" :loading='loading' @click='changeFollow'>已关注</van-button>
</template>
<script>
	import { deleteFollow, addFollow } from '@/api/comments'
	export default {
		name: '',
		data () {
			return {
				loading: false
			};
		},
		methods: {
			async changeFollow () {
				this.loading = true
				try {
					if (this.isFollow) {
						//已关注
						await deleteFollow(this.articleID)
					} else {
						//未关注
						await addFollow(this.articleID)
					}
					this.$emit('updata-follow', !this.isFollow)
					this.$toast.success(this.isFollow ? '关注成功' : '取消关注')
				} catch (err) {
					console.log(err);
					this.$toast.fail('操作失败')
				}
				this.loading = false
			}
		},
		created () { },
		props: {
			articleID: {
				type: [Number, String, Object],
				required: true
			},
			isFollow: {
				type: Boolean,
				required: true
			}
		}
	};
</script>
<style lang="less" scoped></style>
