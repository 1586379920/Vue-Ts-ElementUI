### ### 利用html2canvas生成图片

- 1.安装html2canvas插件并引入

  ```javascript
  npm install html2canvas --save
  import html2canvas from 'html2canvas'
  ```

- 2.获取dom元素，生成图片的url

  ```typescript
  // 注意一定要获取原生DOM作为要生成的容器，而且在ts中通过$refs获取DOM后要在后面添加 as HTMLElement，否则会编译报错
  html2canvas(this.$refs.tableDatas as HTMLElement).then((canvas: any) => {
  	this.imageURL = canvas.toDataURL('image/png');
  });
  ```

- 3.将生成的url动态绑定的图片上

  ```html
  <!-- 这里使用的是Element-UI里的图片组件，跟原生img一样。preview-src-list属性实现预览功能，数组里是图片的url -->
  <el-image :src="imageURL" :preview-src-list="[imageURL]" title="点击预览图片"></el-image>
  ```

- 4.可以右键保存图片，也可以自己添加下载按钮，下载图片

  ```javascript
  const alink = document.createElement('a');
  alink.href = this.imageURL;
  alink.download = 'TableDatats'; // 图片名
  alink.click();
  ```

### ### v-for循环绑定事件

- 首先对DOM元素进行一个循环,然后利用一个方法接收每一个对象的方法作为参数，还可以减对象方法的参数一起传过来。

  ```javascript
  <el-button type="text" v-for="item in list" @click="loopMethods(item.method, item.args)">{{item.title}}</el-button>
  
  <script>
  	data() {
      	list: [
              { title: 't1', method: 'm1', arg: 'a1'},
              { title: 't2', method: 'm2', arg: 'a2'},
              { title: 't3', method: 'm3', arg: 'a3'}
          ],
          loopMethods(method, arg) {
              this[method](arg);
          }，
          m1(arg) {
              console.(arg);
          }
  	}    
  </script>
  ```

### ### 动态显示日期

- 1.安装moment日期格式化工具，并全局配置

  ```javascript
  npm install moment --save
  import moment from 'moment';
  // 中文简体
  moment.locale('zh-cn');
  Vue.filter('dateformat', (dataStr: string, pattern = 'YYYY-MM-DD HH:mm:ss') =>{
      return moment(dataStr).format(pattern)
  });
  ```

- 2.在组件内设置每秒自动刷新

  ```typescript
  private local_time: any = new Date();		// 首先获取日期
  
  private mounted() {
      let _this = this;
      this.timer = setInterval(() => {
          _this.local_time = new Date();		// 当组件挂载完毕后，设置时间每秒自动刷新
      }, 1000);
  }
  
  private beforeDestroy() {
      if(this.timer) {
          clearInterval(this.timer);			// 在组件销毁之前，清空定时器
      }
  }
  ```

- 3.将时间使用在template中

  ```html
  <!-- 使用全局配置的过滤器，格式化日期，例如2020-06-28 17:40:30对应如下格式 -->
  <div>{{ local_time | dateformat('YYYY-MM-DD HH:mm:ss') }}</div>
  ```

### ### moment 时间格式工具

- 在node.js中

  ```javascript
  npm install moment			// 安装
  var moment = require('moment');			// 引入
  ```

- 在TypeScript中

  ```javascript
  // Typescript
  npm install moment			// 通过NPM安装
  import * as moment from 'moment';		// 在ts文件中引入	
  
  // 导入语言环境
  import * as moment from 'moment';
  import 'moment/locale/pt-br';
  
  console.log(moment.locale()); // en
  moment.locale('fr');
  console.log(moment.locale()); // en
  moment.locale('pt-BR');
  console.log(moment.locale()); // pt-BR
  ```

  

### ### 在表格中绑定后台获取的值

- 通过自定义表格的scope对象获取，scope.row获取到表格的每一行数据的对象，通过scope.row[propertyName]获取到具体属性。

  ```html
  <el-table :data="weekPlanList width="100%" size="small">
  	<el-table-column sortable label="重要程度" prop="importance" width="150">
      	<template slot-scope="scope">
          	<el-rate v-model="scope.row.importance" disabled></el-rate>
          </template>
      </el-table-column>
  </el-table>
  ```

### ### Element-UI分页组件

- 分页组件提供了一些属性，用于设置分页

  ```javascript
  <el-pagination
      @size-change="handleSizeChange"			// pageSize改变时触发
      @current-change="handleCurrentChange"	// 当前页改变时触发
      :current-page="currentPage"			// 当前页，一般设置为第一页
      :page-sizes="pageSizes"				// 定义显示指定条数的列表，是一个数组
      :page-size="pageSize"				// 定义每页显示的条数，从pageSizes数组中选择
      layout="total, sizes, prev, pager, next, jumper"// 布局样式，总数、每页显示数量、上一页、页码、下一页、跳转
      :total="400"		// 总共有多少条数据
  ></el-pagination>
  ```

  

