<template>
	<!-- <van-icon color="#777" name="star-o" @click='clickHandler' /> -->
	<van-button :icon="isCollected? 'star' : 'star-o'" class="{red: isCollected}"></van-button>
</template>
<script>
	import { deleteCollect, addCollect } from '@/api/comments'
	export default {
		name: 'collect',
		data () {
			return {

			};
		},
		methods: {
			async clickHandler () {
				this.loading = true
				try {
					if (this.isCollected) {
						await deleteCollect(this.articleID)
					} else {
						await addCollect(this.articleID)
					}
					this.$emit('updata-collected', !this.isCollected)
				} catch (err) {
					console.log(err);
				}
				this.loading = false
			}
		},
		created () {
		},
		model: {
			prop: 'isCollected',
			event: 'updata-collected'
		},
		props: {
			articleID: {
				type: [Number, String, Object],
				required: true
			},
			isCollected: {
				type: Boolean,
				required: true
			}
		}
	};
</script>
<style lang="less" scoped>
	.red {
		color: red;
	}
</style>