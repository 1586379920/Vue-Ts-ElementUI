<template>
	<div class="system-main">
		<Breadcrumb title="系统首页" icon="el-icon-s-home"></Breadcrumb>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Breadcrumb from '../components/Breadcrumb.vue';
@Component({
  components: {
    Breadcrumb,
  },
})
export default class SystemMain extends Vue {

}
</script>

<style>
</style>
