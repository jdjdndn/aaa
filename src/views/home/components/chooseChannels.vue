<template>
	<div class="channelpage">
		<!-- 我的频道 -->
		<van-cell :border="false">
			<div class="channel-cell">
				<span>我的频道</span>
				<van-button
					plain
					round
					size="mini"
					type="danger"
					@click="isShowEditIcon = !isShowEditIcon"
					>{{ isShowEditIcon ? '完成' : '编辑' }}</van-button
				>
			</div>
			<!-- <div slot="title">
				我的频道
			</div> -->
			<!-- <div slot="default">
				<van-button round size="mini">完成</van-button>
			</div> -->
		</van-cell>
		<van-grid :column-num="4" :gutter="20">
			<van-grid-item
				v-for="(channel, index) in myChannles"
				:key="channel.id"
				:class="{ red: index === active }"
				@click="changHighlight(channel, index)"
				>{{ channel.name
				}}<van-icon
					name="close"
					v-if="isShowEditIcon && !fixedChannels.includes(channel.id)"
			/></van-grid-item>
		</van-grid>

		<!-- 推荐频道 -->
		<van-cell title="推荐频道" :border="false" />
		<van-grid :column-num="4" :gutter="20">
			<van-grid-item
				v-for="(channel, index) in getResidueChannels"
				:key="channel.id"
				@click="addMychannels(channel, index)"
				>{{ channel.name }}</van-grid-item
			>
		</van-grid>
	</div>
</template>
<script>
	import { getAllChannels } from '@/api/channels'
	import { setItem } from '@/utils/storage'
	export default {
		name: 'chooseChannels',
		data() {
			return {
				fixedChannels: [0], //固定不想被操作的数组
				isShowEditIcon: false,
				allChannels: [], //所有频道数组
			}
		},
		methods: {
			changHighlight(channel, index) {
				if (this.isShowEditIcon) {
					//执行删除操作
					if (this.fixedChannels.includes(channel.id)) return
					if (index <= this.active) {
						this.$emit('changeChannelLight', this.active - 1)
					}
					this.myChannles.splice(index, 1)
					setItem('CHANNELS', this.myChannles)
				} else {
					//执行跳转操作
					this.$emit('changeChannelLight', index, false)
				}
			},
			addMychannels(channel, index) {
				//点击推荐频道按钮,往myChannels内添加channel
				this.myChannles.push(channel)
				setItem('CHANNELS', this.myChannles)
			},
		},
		async created() {
			//获取所有频道列表
			try {
				const { data } = await getAllChannels()
				this.allChannels = data.data.channels
			} catch (err) {
				console.log(err)
			}
		},
		props: {
			myChannles: {
				type: Array,
				required: true,
			},
			active: {
				type: Number,
				required: true,
			},
		},
		computed: {
			//获取所有剩余频道数组
			getResidueChannels() {
				return this.allChannels.filter(channel => {
					return !this.myChannles.find(item => item.id === channel.id)
				})
			},
		},
	}
</script>
<style lang="less" scoped>
	/deep/.channel-cell {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.channelpage {
		/deep/.van-grid-item__content {
			font-size: 27px;
		}
		.van-icon {
			position: absolute;
			top: -10px;
			right: -10px;
		}
	}
	.red {
		color: red;
	}
</style>
