import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GeneralBaseData extends Vue {
  // common-datas----------------------------------------------------->
  // 对话框表单是否可见
  public dialogFormVisible: boolean = false;
  // 对话框表单的标题
  public dialogFormTitle: string = '';

  // TableDatas.vue----------------------------------------------->
  // 工具栏按钮
  public generalBaseDataToolsTabs: any[] = [
    { title: '添加数据', icon: 'el-icon-plus', content: '添加新的数据', events: 'addTableDatas', args: '添加数据' },
    { title: '数据统计', icon: 'el-icon-s-data', content: '对现有的数据进行统计', events: 'statisticsDatas', args: '' },
    { title: '生成图片', icon: 'el-icon-picture-outline', content: '将数据生成为一张图片', events: 'exportAsImage',  args: '' },
    { title: '保存数据', icon: 'el-icon-download', content: '将数据以Excel形式保存在本地', events: 'exportAsExcel',  args: '' },
  ];
  // 格式化日期为yy-mm-dd
  public formartDate(val: any) {
    this.newFormDatas.birthDate = val;
  }

  // SystemMain.vue--------------------------------------------------------->
  // 时间与日期
  public LOCAL_TIME: any = new Date();
  public weekDays: string[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  public LOCAL_DAY: any = this.weekDays[new Date().getDay()];
   // 格式化日期为yy-mm-dd
  public formartDate1(val: any) {
    this.newWeekPlans.start = val;
  }
  public formartDate2(val: any) {
    this.newWeekPlans.end = val;
  }
  // 根据时间切换icon
  public get getIcon() {
    const hours = new Date().getHours();
    if (hours >= 7 && hours < 19) {
      return 'el-icon-sunny';
    } else {
      return 'el-icon-moon';
    }
  }
  // echarts
  public echartsList: any[] = [
    { className: 'bar-dom-box', reference: 'barechart' },
    { className: 'pie-dom-box', reference: 'pieechart' },
    { className: 'line-dom-box', reference: 'lineechart' },
  ]

}
