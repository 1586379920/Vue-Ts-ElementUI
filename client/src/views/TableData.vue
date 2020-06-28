<template>
	<div class="table-data">
		<Breadcrumb title="表格数据" icon="el-icon-s-grid"></Breadcrumb>
		<div class="card-box">
			<el-card shadow="never" style="border-radius: 10px;">
				
				<div class="tools-container">
					<div class="tools-left">
						<el-button type="danger" size="small" icon="el-icon-delete" @click="deleteSelections(multipleSelections)">批量删除</el-button>
						<el-input prefix-icon="el-icon-search" size="small" placeholder="请输入关键字检索..."></el-input>
					</div>
					<div class="tools-right">
            <el-tooltip v-for="toolsTab in generalBaseDataToolsTabs" class="item" effect="dark" :content="toolsTab.content" placement="bottom" :key="toolsTab.title">
              <el-button type="text" :icon="toolsTab.icon" @click="loopEvents(toolsTab.events, toolsTab.args)">{{toolsTab.title}}</el-button>
            </el-tooltip>
					</div>
				</div>
				<!-- table 存放数据的表格 -->
				<div class="table-container" ref="tableDatas">
					<el-table :data="tableDatasInAPI.slice((paginationObj.currentPage - 1)*paginationObj.pageSize,paginationObj.currentPage*paginationObj.pageSize)" @selection-change="handleSelectionChange" show-header>
						<el-table-column type="selection" width="50"></el-table-column>
						<el-table-column prop="_id" label="ID" width="250"></el-table-column>
						<el-table-column prop="name" label="Name" width="140"></el-table-column>
						<el-table-column prop="birthDate" label="BirthDate" width="140"></el-table-column>
						<el-table-column prop="sex" label="Sex" width="100"></el-table-column>
						<el-table-column prop="country" label="Country" width="110"></el-table-column>
						<el-table-column prop="IDnumber" label="IDnumber" width="210"></el-table-column>
						<el-table-column prop="prefession" label="Prefession" width="130"></el-table-column>
						<el-table-column prop="words" label="Words" width="310"></el-table-column>
						<el-table-column label="操作" fixed="right">
							<template slot-scope="scope">
								<el-button type="primary" size="small" @click="idetTableDatas('编辑数据', scope.row._id)">编辑</el-button>
								<el-button type="danger" size="small" @click="deleteTableDatas(scope.row._id)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<!-- pagination 分页特效 -->
				<div class="pagination" style="padding-top: 20px;">
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="paginationObj.currentPage"
						:page-sizes="paginationObj.pageSizes"
						:page-size="paginationObj.pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="tableDatasInAPI.length">
					</el-pagination>
				</div>
			</el-card>
		</div>
		<!-- dialog 对话框：用于添加数据和编辑数据 -->
		<el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" width="800px">
		  <el-form :model="newFormDatas" style="display: flex; flex-wrap: wrap;">
		  	<el-form-item label="Name" label-width="120px">
		  	  <el-input v-model="newFormDatas.name" placeholder="Input name..." style="width: 220px;"></el-input>
		  	</el-form-item>
		  	<el-form-item label="BirthDate" label-width="120px">
		  	  <el-date-picker type="date" placeholder="Choose birthday..." @change="formartDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="newFormDatas.birthDate"></el-date-picker>
		  	</el-form-item>
		    <el-form-item label="Sex" label-width="120px">
		      <el-select v-model="newFormDatas.sex" placeholder="Choose sex..." style="width: 220px;">
		        <el-option label="Male" value="Male"></el-option>
		        <el-option label="Female" value="Female"></el-option>
		      </el-select>
		    </el-form-item>
		  	<el-form-item label="Country" label-width="120px">
		  	  <el-input v-model="newFormDatas.country" autocomplete="off" placeholder="Input country..." style="width: 220px;"></el-input>
		  	</el-form-item>
		  	<el-form-item label="IDnumber" label-width="120px">
		  	  <el-input v-model="newFormDatas.IDnumber" autocomplete="off" placeholder="Input IDnumber..." style="width: 220px;"></el-input>
		  	</el-form-item>
		  	<el-form-item label="Prefession" label-width="120px">
		  	  <el-input v-model="newFormDatas.prefession" autocomplete="off" placeholder="Input prefession..." style="width: 220px;"></el-input>
		  	</el-form-item>
		  	<el-form-item label="Words" label-width="120px">
		  	  <el-input v-model="newFormDatas.words" autocomplete="off" placeholder="Input words..." style="width: 220px;"></el-input>
		  	</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">Cancel</el-button>
		    <el-button type="primary" @click="submitTableDatas(dialogFormTitle, newFormDatas._id)">Confirm</el-button>
		  </div>
		</el-dialog>
		<!-- dialog 对话框：用于预览图片和保存图片 -->
		<el-dialog title="图片预览" :visible.sync="dialogImageVisible" width="60%">
			<el-image :src="imageURL" :preview-src-list="[imageURL]" title="点击预览图片"></el-image>
			<div class="download-btn" style="padding: 10px 14px 0 0; display: flex; justify-content: flex-end;">
				<el-button type="text" icon="el-icon-download" @click="saveInLocal">保存到本地</el-button>
			</div>
		</el-dialog>
		
	</div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import Breadcrumb from '../components/Breadcrumb.vue';
import html2canvas from 'html2canvas';
import TableDatasMixins from '../mixins/general-base-data';

@Component({
  components: {
    Breadcrumb,
  },
})
export default class TableData extends Mixins(TableDatasMixins) {
  // 用于接收后台API接口中的数据
  private tableDatasInAPI: any[] = [];
  // 对话框表单是否可见
  private dialogFormVisible: boolean = false;
  // 对话框图片表单是否可见
  private dialogImageVisible: boolean = false;
  // 对话框表单的标题
  private dialogFormTitle: string = '';
  // 表单对象，用于绑定数据
  private newFormDatas: any  = {};
  // 分页数据对象
  private paginationObj: any = {
    pageSize: 5,
    pageSizes: [2, 5, 10, 20],
    currentPage: 1,
  };
  private imageURL: string = '';
  // 批量选中数据
  private multipleSelections: any[] = [];
  // private isChecked: boolean = false;
  // 获取数据
  private async fetchTableDatasInAPI() {
    const res = await this.$axios.get('table-datas');
    this.tableDatasInAPI = res.data;
  }
  // 点击编辑按钮获取当前数据
  private async idetTableDatas(title: string, id: any) {
    this.dialogFormVisible = true;
    this.dialogFormTitle = title;
    const { data: res } = await this.$axios.get(`table-datas/${id}`);
    this.newFormDatas = res;
    // console.log(res);
  }
  // 循环绑定事件
  private loopEvents(event: any, args?: any) {
    this[event](args || '');
  }
  // 点击添加数据打开对话框
  private addTableDatas(title: string) {
    this.newFormDatas = {},
    this.dialogFormVisible = true;
    this.dialogFormTitle = title;
  }
  // 提交数据
  private async submitTableDatas(title: string, id: any) {
    // console.log(id)
    if (title === '添加数据') {
      await this.$axios.post('table-datas', this.newFormDatas);
    } else {
      await this.$axios.put(`table-datas/${id}`, this.newFormDatas);
    }
    this.dialogFormVisible = false;
    this.fetchTableDatasInAPI();
  }
  // 将表格数据预览为图片
  private exportAsImage() {
    this.dialogImageVisible = true;
    html2canvas(this.$refs.tableDatas as HTMLElement).then((canvas: any) => {
      this.imageURL  = canvas.toDataURL('image/png');
      // console.log(this.imgUrl)
    });
  }
  // 保存图片到本地
  private saveInLocal() {
    const alink = document.createElement('a');
    alink.href = this.imageURL;
    alink.download = 'TableDatats'; // 图片名
    alink.click();
  }
  // // 将数据导出为Excel
  // private exportAsExcel() {
  //   console.log('exportAsExcel');
  // }
  // // 统计表格中的数据
  // private statisticsDatas() {
  //   console.log('statisticsDatas');
  // }

  // 删除数据
  private async deleteTableDatas(id: any) {
    await this.$axios.delete(`table-datas/${id}`);
    this.fetchTableDatasInAPI();
  }
   // 格式化日期为yy-mm-dd
  private formartDate(val: any) {
    this.newFormDatas.birthDate = val;
  }
  private handleSizeChange(val: any) {
    this.paginationObj.pageSize = val;
  }
  private handleCurrentChange(val: any) {
    this.paginationObj.currentPage = val;
  }
  // 批量选中
  private handleSelectionChange(val: any) {
    this.multipleSelections = val;
  }
  // 批量删除
  private deleteSelections(rows: any[]) {
    rows.forEach(async (row) => {
      await this.$axios.delete(`table-datas/${row._id}`);
      this.fetchTableDatasInAPI();
    });
  }

  // 组件创建后自动获取后台数据
  private created() {
    this.fetchTableDatasInAPI();
  }
}
</script>

<style scoped="scoped" lang="scss">
	.card-box {
		padding: 20px 0;
	}
	.form-layout {
		display: flex;
		// justify-content: start;
	}
	.item {
		margin: 0 4px 10px;
	}
	.tools-container {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15px;
		.tools-left {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
	}
</style>
