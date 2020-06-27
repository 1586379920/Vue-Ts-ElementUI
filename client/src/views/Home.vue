<template>
  <div class="home-page">
    <el-container style="height: 100vh;">
      <el-header>
				<div class="fold-button" @click="foldBtn">
					<i :class="isfold? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
				</div>
				<div class="title">后台管理系统</div>
				<div class="tab-tools">
					
					<el-tooltip v-for="toolsTab in toolsTabs" class="item" effect="dark" :content="toolsTab.content" placement="bottom" :key="toolsTab.title">
					      <el-button style="color: #BFCBD9;" type="text" :icon="toolsTab.icon">{{toolsTab.title}}</el-button>
					</el-tooltip>
					<el-button type="danger">退出登录</el-button>
				</div>
			</el-header>
      <el-container>
        <el-aside :width="isfold? '64px' : '250px'">
					<el-menu :default-active="$route.path"
									 :width="isfold? '64px' : '250px'"
									 class="el-menu-vertical-demo"
									 :collapse="isfold"
									 mode="vertical"
									 router
									 collapse-transition
									 background-color="#324157"
									 text-color="#BFCBD9">
					  <el-menu-item index="/home/system-main">
							<i class="el-icon-s-home"></i>
							<span slot="title">系统首页</span>
					  </el-menu-item>
						<el-menu-item index="/home/table-data">
							<i class="el-icon-s-grid"></i>
							<span slot="title">表格数据</span>
						</el-menu-item>
					</el-menu>
				</el-aside>
        <el-main>
					<router-view></router-view>
				</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  private isfold: boolean = false;
  private toolsTabs: any[] = [
    { type: 'text', content: '点击了解更多信息', title: '关于我们', icon: 'el-icon-info' },
    { type: 'text', content: '点击查看消息通知', title: '消息通知', icon: 'el-icon-message-solid' },
    { type: 'text', content: '点击进入个人中心', title: '个人中心', icon: 'el-icon-user-solid' },
  ];
  private foldBtn() {
    this.isfold = !this.isfold;
  }
}
</script>

<style scoped="scoped" lang="scss">
	.home-page, .el-container {
		height: 100%;
	}
	.el-header {
		background-color: #242F42;
		color: #fff;
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.fold-button {
			font-size: 35px;
			width: 40px;
			height: inherit;
			padding: 0 7px;
			text-align: center;
			line-height: 60px;
			cursor: pointer;
			color: #fff !important;
		}
		.title {
			font-size: 24px;
			flex: 1;
		}
	}
	.fold-button:hover {
		background-color: #3C4A61;
	}
	
	.el-aside {
		background-color: #324157;
		color: #333;
		// text-align: center;
		line-height: 200px;
		transition: .3s;
	}
	.el-menu-vertical-demo {
		border: none;
		.el-menu-item {
			text-align: left;
		}
	}
	.item {
		margin: 4px;
	}
	
	.el-main {
		background-color: #E9EEF3;
		color: #333;
	}
	
</style>
