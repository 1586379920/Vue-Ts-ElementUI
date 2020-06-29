<template>
	<div class="system-main-container">
		<Breadcrumb title="系统首页" icon="el-icon-s-home"></Breadcrumb>
    <div class="main-container">
      <div class="main-left">
        <el-card class="box-card-left-top" shadow="none">
          <span><i :class="getIcon" style="color: rgba(250, 212, 0, 1); font-size: 18px"></i> {{ LOCAL_TIME | dateformat('YYYY年MM月DD日 HH:mm:ss') }}，{{LOCAL_DAY}}， 很高兴再次见到你。</span>
        </el-card>
        <el-card class="box-card-left-center" shadow="none">
          <el-carousel trigger="click" height="200px">
            <el-carousel-item v-for="(item, index) in 4" :key="index">
              <img src="../assets/images/carousel_img1.jpg" />
            </el-carousel-item>
          </el-carousel>
        </el-card>
        <el-card class="box-card-left-bottom" shadow="none">
          <div class="box-tools">
            <el-tooltip class="item" effect="dark" content="Left Top 提示文字" placement="bottom-center">
              <el-button type="primary" icon="el-icon-thumb">123185</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Left Top 提示文字" placement="bottom-center">
              <el-button type="warning" icon="el-icon-star-off">142385</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Left Top 提示文字" placement="bottom-center">
              <el-button type="success" icon="el-icon-share">125655</el-button>
            </el-tooltip>
          </div>
        </el-card>
      </div>
      <div class="main-right">
        <el-card class="box-card-right" shadow="none">
          <div slot="header" class="clearfix">
            <span>每周规划</span>
            <el-button style="float: right; padding: 3px 0" 
                       icon="el-icon-plus" 
                       type="text" 
                       @click="addWeekPlans('添加事项')">添加事项</el-button>
          </div>
          <el-table :data="weekPlanList.slice((currentPage - 1) * pageSize, currentPage * pageSize)" width="100%" size="small" :default-sort = "{prop: 'finish', order: 'ascending'}">
            <el-table-column sortable label="开始日期" prop="start" width="130"></el-table-column>
            <el-table-column sortable label="截止日期" prop="end" width="130"></el-table-column>
            <el-table-column sortable label="重要程度" prop="importance" width="150">
              <template slot-scope="scope">
                <el-rate v-model="scope.row.importance" disabled :colors="['#99A9BF', '#F7BA2A', '#C71010']"></el-rate>
              </template>
            </el-table-column>
            <el-table-column label="安排事项" prop="plan" width="320"></el-table-column>
            <el-table-column sortable label="进度" prop="finish" width="150">
              <template  slot-scope="scope">
                <el-tag v-if="scope.row.finish" type="success" size="mini">已完成</el-tag>
                <el-tag v-else type="danger" size="mini">未完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button :disabled="scope.row.finish" type="success" size="mini" @click="finishPlans(scope.row._id, scope.row.finish)">打卡</el-button>
                <el-button type="primary" size="mini" @click="idetWeekPlans('编辑事项', scope.row._id)">编辑</el-button>
                <el-button type="danger" size="mini" @click="deleteWeekPlans(scope.row._id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination style="margin-top: 12px"
            :total="weekPlanList.length"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next">
          </el-pagination>
        </el-card>
      </div>
    </div>

    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" width="800px">
		  <el-form :model="newWeekPlans" style="display: flex; flex-wrap: wrap;">
		  	<el-form-item label="开始日期" label-width="120px">
		  	  <el-date-picker type="date" placeholder="选择事项开始的日期" @change="formartDate1" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="newWeekPlans.start"></el-date-picker>
		  	</el-form-item>
		  	<el-form-item label="截止日期" label-width="120px">
		  	  <el-date-picker type="date" placeholder="选择事项截止的日期" @change="formartDate2" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="newWeekPlans.end"></el-date-picker>
		  	</el-form-item>
		    <el-form-item label="重要程度" label-width="120px">
		      <el-select v-model="newWeekPlans.importance" placeholder="1~5表示事项的重要程度" style="width: 220px;">
		        <el-option label="1" value="1"></el-option>
		        <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
		        <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
		      </el-select>
		    </el-form-item>
		  	<el-form-item label="进度" label-width="120px">
		      <el-select v-model="newWeekPlans.finish" placeholder="事项的进度" style="width: 220px;">
		        <el-option label="未完成" :value="Boolean(false)"></el-option>
		        <el-option label="已完成" :value="Boolean(true)"></el-option>
		      </el-select>
		    </el-form-item>
		  	<el-form-item label="计划事项" label-width="120px">
		  	  <el-input v-model="newWeekPlans.plan" placeholder="请输入相关事项" style="width: 220px;"></el-input>
		  	</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">Cancel</el-button>
		    <el-button type="primary" @click="submitWeekPlans(newWeekPlans._id)">Confirm</el-button>
		  </div>
		</el-dialog>

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
  private LOCAL_TIME: any = new Date();
  private weekDays: string[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  private LOCAL_DAY: any = this.weekDays[new Date().getDay()];
  private weekPlanList: any[] = [];
  private newWeekPlans: any = {};
  private dialogFormVisible: boolean = false;
  private dialogFormTitle: string = '';
  private currentPage: any = 1;
  private pageSize: any = 5;

  private get getIcon() {
    const hours = new Date().getHours();
    if (hours >= 7 && hours < 19) {
      return 'el-icon-sunny';
    } else {
      return 'el-icon-moon';
    }
  }
  private mounted() {
    const that = this;
    this.timer = setInterval(() => {
      that.LOCAL_TIME = new Date();
    }, 1000);
  }
  private beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  private async fetchWeekPlanList() {
    const res = await this.$axios.get('week-plans');
    this.weekPlanList = res.data;
  }
  private async submitWeekPlans(id?: string) {
    // console.log(id)
    if (this.dialogFormTitle === '添加事项') {
      await this.$axios.post('week-plans', this.newWeekPlans);
    } else {
      await this.$axios.put(`week-plans/${id}`, this.newWeekPlans);
    }
    this.dialogFormVisible = false;
    this.fetchWeekPlanList();
  }
  private async deleteWeekPlans(id: string) {
    await this.$axios.delete(`week-plans/${id}`);
    this.fetchWeekPlanList();
  }

  private async finishPlans(id: string, isFinished: boolean) {
    const obj = { finish: !isFinished };
    const form = Object.assign(this.newWeekPlans, obj);
    await this.$axios.put(`week-plans/${id}`, form);
    this.fetchWeekPlanList();
  }


   // 格式化日期为yy-mm-dd
  private formartDate1(val: any) {
    this.newWeekPlans.start = val;
  }
  private formartDate2(val: any) {
    this.newWeekPlans.end = val;
  }
  private handleCurrentChange(val: any) {
    this.currentPage = val;
  }

  private addWeekPlans(title: string) {
    this.dialogFormVisible = true;
    this.dialogFormTitle = title;
  }
  private async idetWeekPlans(title: string, id: string) {
    this.dialogFormVisible = true;
    this.dialogFormTitle = title;
    const { data: res } = await this.$axios.get(`week-plans/${id}`);
    this.newWeekPlans = res;
  }

  private created() {
    this.fetchWeekPlanList();
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
    justify-content: space-between;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    .main-left {
      margin-right: 11px;
      .box-card-left-top {
        width: 480px;
        flex-wrap: nowrap;
        margin-bottom: 12px;
      }
      .box-card-left-center {
        margin-bottom: 11px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .box-card-left-bottom {
        .box-tools {
          display: flex;
          justify-content: space-between;
          height: 50px;
        }
      }
    }
    .main-right {
      flex: 1;
      width: 1136px;
      .box-card-right {
        border: none;
        height: 100%;
      }
    }
  }
</style>