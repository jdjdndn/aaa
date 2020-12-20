<template>
	<div class="comment-post">
		<van-field class="post-field" v-model="message" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
		<van-button class="post-btn" @click='publishMessage'>发布</van-button>
	</div>
</template>

<script>
	import { addComments } from '@/api/comments'
	export default {
		name: 'CommentPost',
		components: {},
		props: {
			articleID: {
				type: [Number, String, Object],
				required: true
			}
		},
		data () {
			return {
				message: ''
			}
		},
		computed: {},
		watch: {},
		created () { },
		mounted () { },
		methods: {
			async publishMessage () {
				try {
					const { data } = await addComments({
						target: this.articleID,
						content: this.message,
						art_id: null,
          })
          
				} catch (err) {
					console.log(err);
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.comment-post {
		display: flex;
		align-items: center;
		padding: 32px 0 32px 32px;
		.post-field {
			background-color: #f5f7f9;
		}
		.post-btn {
			width: 150px;
			border: none;
			padding: 0;
			color: #6ba3d8;
			&::before {
				display: none;
			}
		}
	}
</style>
