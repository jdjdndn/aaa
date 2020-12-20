<template>
	<!-- <van-icon color="#777" name="good-job-o" /> -->
	<van-button icon='liked==1 ? "good-job" : "good-job-o"' :class="{yellow: liked==1}" @click='likedClick'></van-button>
</template>
<script>
	import { addarticleLiked, deletearticleLiked } from '@/api/comments'
	export default {
		name: '',
		data () {
			return {
				loading: true
			};
		},
		methods: {
			async likedClick () {
				this.loading = true
				let like = -1
				try {
					if (this.liked) {
						await addarticleLiked(this.articleID)
					} else {
						await deletearticleLiked(this.articleID)
						like = 1
					}
					this.$emit('updata-liked', like)
				} catch (err) {
					console.log(err);
				}
				this.loading = false
			}
		},
		created () { },
		model: {
			prop: 'liked',
			event: 'updata-liked'
		},
		props: {
			articleID: {
				type: [Number, String, Object],
				required: true
			},
			liked: {
				required: true
			}
		}
	};
</script>
<style lang="less" scoped>
	.yellow {
		color: yellow;
	}
</style>