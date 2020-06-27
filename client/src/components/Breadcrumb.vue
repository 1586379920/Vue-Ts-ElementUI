<template>
	<div class="bread-crumb">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item><i :class="icon"></i>{{title}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Breadcrumb extends Vue {
  @Prop() private title!: string;
  @Prop() private icon!: string;
}
</script>

<style>
</style>
