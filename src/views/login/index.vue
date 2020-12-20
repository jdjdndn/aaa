<template>
	<div>
		<van-nav-bar title="标题">
			<van-icon slot="left" name="cross" @click="goBack" />
		</van-nav-bar>

		<van-form @submit="onSubmit" ref="loginForm">
			<van-field
				v-model="mobile"
				name="mobile"
				placeholder="请输入手机号"
				:rules="[{ required: true, message: '请填写用户名' }]"
			>
				<span slot="left-icon" class="iconfont iconfont-shouji"></span>
			</van-field>
			<van-field
				v-model="code"
				type="number"
				name="code"
				placeholder="请输入验证码"
				:rules="[{ required: true, message: '请填写密码' }]"
			>
				<span slot="left-icon" class="iconfont iconfont-yanzhengma"></span>
				<!-- <span slot="right-icon"> -->
				<template #button>
					<van-count-down
						@finish="isShowCountDown = false"
						v-if="isShowCountDown"
						:time="1000 * 3"
						format="ss s"
					/>
					<van-button
						v-else
						size="small"
						type="default"
						round
						native-type="button"
						@click="sendYanzhengma"
						>发送验证码</van-button
					>
				</template>
				<!-- </span> -->
			</van-field>
			<div style="margin: 16px;">
				<van-button block type="info" native-type="submit">
					登录
				</van-button>
			</div>
		</van-form>
	</div>
</template>
<script>
	import { login } from '@/api/user'
	export default {
		data() {
			return {
				mobile: '13911111113',
				code: '246810',
				isShowCountDown: false,
			}
		},
		methods: {
			async onSubmit(values) {
				this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
				})
				try {
					const { data } = await login({
						mobile: this.mobile,
						code: this.code,
					})
					this.$toast.success('登录成功')
					this.$store.commit('restoreToken', data.data)
					this.$router.push(this.$route.query.redirect || '/my')
					// console.log(data)
				} catch (err) {
					console.log(err)
					this.$toast.fail('登录失败,稍后重试')
				}
			},
			goBack() {
				this.$router.push(this.$route.query.redirect || '/')
			},
			async sendYanzhengma() {
				try {
					await this.$refs.loginForm.validate('mobile')
					this.isShowCountDown = true
				} catch (err) {
					this.$toast('请输入正确的手机号')
				}
			},
		},
		created() {},
	}
</script>
<style lang="less" scoped>
	.iconfont {
		font-size: 27px;
	}
</style>
