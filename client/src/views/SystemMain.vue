<template>
	<div class="system-main-container">
		<Breadcrumb title="系统首页" icon="el-icon-s-home"></Breadcrumb>
    <div class="main-container">
      <div class="main-left">
        <el-card class="box-card-left-top" shadow="none">
          <span><i :class="getIcon" style="color: rgba(250, 212, 0, 1); font-size: 18px"></i> {{ local_time | dateformat('YYYY年MM月DD日 HH:mm:ss') }}，{{local_day}}， 很高兴再次见到你。</span>
        </el-card>
        <el-card class="box-card-left-bottom" shadow="none">
          <h2>你好呀！</h2>
        </el-card>
      </div>
      <div class="main-right">
        <el-card class="box-card-right" shadow="none">
          <h2>Hello</h2>
          <h2>Thank you</h2>
          <p>ahhhh</p>
        </el-card>
      </div>
    </div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Breadcrumb from '../components/Breadcrumb.vue';
import moment from 'moment';

@Component({
  components: {
    Breadcrumb,
  },
})

export default class SystemMain extends Vue {
  private local_time: any = new Date();
  private weekDays: string[] = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  private local_day: any = this.weekDays[new Date().getDay()];

  private get getIcon() {
    const hours = new Date().getHours();
    if (hours >= 7 && hours < 19) {
      return 'el-icon-sunny';
    } else {
      return 'el-icon-moon'
    }
  }
  private mounted() {
    let _this = this;
    this.timer = setInterval(() => {
      _this.local_time = new Date();
    }, 1000);
  }
  private beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
</script>

<style scoped lang="scss">
  .el-card {
    border-radius: 8px;
  }
  .main-container {
    display: flex;
    padding: 20px 0;
    .main-left {
      margin-right: 12px;
      .box-card-left-top {
        margin-bottom: 12px;
      }
    }
    .main-right {
      flex: 1;
    }
  }
</style>