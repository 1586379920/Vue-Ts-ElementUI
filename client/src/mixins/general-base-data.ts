import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GeneralBaseData extends Vue {
  public generalBaseDataToolsTabs: any[] = [
    { title: '添加数据', icon: 'el-icon-plus', content: '添加新的数据', events: 'addTableDatas', args: '添加数据' },
    { title: '数据统计', icon: 'el-icon-s-data', content: '对现有的数据进行统计', events: 'statisticsDatas', args: '' },
    { title: '生成图片', icon: 'el-icon-picture-outline', content: '将数据生成为一张图片', events: 'exportAsImage',  args: '' },
    { title: '保存数据', icon: 'el-icon-download', content: '将数据以Excel形式保存在本地', events: 'exportAsExcel',  args: '' },
  ];
}
