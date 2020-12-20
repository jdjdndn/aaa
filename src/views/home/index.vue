<template>
	<div class="home-container">
		<van-nav-bar fixed>
			<van-button
				slot="title"
				type="info"
				round
				size="mini"
				icon="search"
				class="searchBtn"
				@click="$router.push({ name: 'search', query: { redirect: '/' } })"
				>搜索</van-button
			>
		</van-nav-bar>

		<van-tabs v-model="active" swipeable animated swipe-threshold="4">
			<van-tab
				:title="channel.name"
				v-for="(channel, index) in myChannles"
				:key="channel.id"
			>
				<!-- 子组件channel-list 是每个频道的文章列表 -->
				<channel-list :channel="channel"></channel-list>
				<!-- 根据每一个频道获取对应的数据,所以每个频道都要list,list是tab的子组件 -->
			</van-tab>
			<div slot="nav-right" class="placeholder"></div>
			<div slot="nav-right" class="hamburger-btn" @click="isPopupShow = true">
				<i class="iconfont iconfont-gengduo"></i>
			</div>
		</van-tabs>

		<!-- 弹出层 -->
		<van-popup
			v-model="isPopupShow"
			closeable
			close-icon-position="top-left"
			position="bottom"
			:style="{ height: '100%' }"
		>
			<!-- 选择频道组件 -->
			<choose-channel
				class="popup-box"
				:myChannles="myChannles"
				:active="active"
				@changeChannelLight="channelLightChange"
			></choose-channel>
		</van-popup>
	</div>
</template>
<script>
	import { getUserChannels } from '@/api/user'
	import ChannelList from './components/channle_list.vue'
	import ChooseChannel from './components/chooseChannels.vue'
	import { mapState } from 'vuex'
	import { getItem } from '@/utils/storage'
	export default {
		name: 'home',
		data() {
			return {
				active: 0,
				myChannles: [],
				isPopupShow: false, //控制弹出层显示变量
			}
		},
		methods: {
			channelLightChange(index, isPopupShow = true) {
				//关闭弹出层
				this.isPopupShow = isPopupShow
				//改变tabbar当前高亮
				this.active = index
			},
		},
		async created() {
			try {
				if (this.user) {
					//登录了直接发请求
					//获取用户频道数组
					const { data } = await getUserChannels()
					this.myChannles = data.data.channels
					// console.log(data)
					this.myChannles = data.data.channels
				} else {
					//未登录且本地有
					if (getItem('CHANNELS')) {
						this.myChannles = getItem('CHANNELS')
					} else {
						//未登录本地没有
						const { data } = await getUserChannels()
						this.myChannles = data.data.channels
					}
				}
			} catch (err) {
				console.log(err)
			}
		},
		components: {
			ChannelList,
			ChooseChannel,
		},
		computed: {
			...mapState(['user']),
		},
	}
</script>
<style lang="less" scoped>
	.home-container {
		/deep/.van-tab {
			flex-shrink: 0;
			width: 130px;
			height: 82px;
			font-size: 27px;
		}
		.hamburger-btn {
			position: fixed;
			right: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 66px;
			height: 82px;
			background-color: #fff;
			opacity: 0.902;
			i.iconfont {
				font-size: 33px;
			}
		}
		.placeholder {
			flex-shrink: 0;
			width: 66px;
			height: 82px;
		}

		.van-tabs {
			margin-top: 200px;

			/deep/ .van-tabs__wrap {
				position: fixed;
				z-index: 2;
				top: 92px;
			}
			/deep/.van-tabs__content {
				margin-top: 200px;
			}
		}
		.popup-box {
			padding: 100px 50px 0;
		}
		/deep/.van-nav-bar__title {
			max-width: 100%;
			.searchBtn {
				width: 555px;
				.van-icon {
					color: #fff;
				}
			}
		}
	}
</style>
