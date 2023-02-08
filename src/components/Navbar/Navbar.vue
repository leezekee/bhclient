<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu"
    mode="horizontal"
    background-color="#2c3242"
    text-color="#fff"
    active-text-color="#359186">
    <el-submenu index="1" :disabled="menu.m1">
      <template slot="title">应急柴油振动检测系统</template>
      <el-menu-item index="1-1">机组概貌图</el-menu-item>
      <!-- <el-menu-item index="1-1">选项1</el-menu-item> -->
    </el-submenu>
    <el-submenu index="2" :disabled="menu.m2">
      <template slot="title">往复机械专用图谱</template>
      <el-menu-item index="2-1">机组概貌图</el-menu-item>
<!-- <el-menu-item index="1-1">选项1</el-menu-item> -->
    </el-submenu>
    <el-submenu index="3" :disabled="menu.m3">
      <template slot="title">旋转机械专用图谱</template>
      <el-menu-item  v-for="item in index3" :key="item.id" :index="'3-'+ item.id">
        <img 
        :src="item.src" 
        style="height: 15px; width: 20px; background: white;">
        {{ item.title }}
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4" :disabled="menu.m4">
      <template slot="title">机泵专用图谱</template>
      <el-menu-item index="4-1">机组概貌图</el-menu-item>
      <!-- <el-menu-item index="1-1">选项1</el-menu-item> -->
    </el-submenu>
    <el-submenu index="5" :disabled="menu.m5">
      <template slot="title">无线机泵专用图谱</template>
      <el-menu-item index="5-1">机组概貌图</el-menu-item>
      <!-- <el-menu-item index="1-1">选项1</el-menu-item> -->
    </el-submenu>
    <el-submenu index="6" :disabled="menu.m6">
      <template slot="title">扶梯专用图谱</template>
      <el-menu-item index="6-1">机组概貌图</el-menu-item>
      <!-- <el-menu-item index="1-1">选项1</el-menu-item> -->
    </el-submenu>
    <el-submenu index="7" :disabled="menu.m7">
      <template slot="title">加热炉专用图谱</template>
      <el-menu-item index="7-1">机组概貌图</el-menu-item>
      <!-- <el-menu-item index="1-1">选项1</el-menu-item> -->
    </el-submenu>
    <el-submenu index="8" :disabled="menu.m8">
      <template slot="title">燃气轮机专用图谱</template>
      <el-menu-item index="8-1">机组概貌图</el-menu-item>
      <!-- <el-menu-item index="1-1">选项1</el-menu-item> -->
    </el-submenu>
    <el-submenu index="9" :disabled="menu.m9">
      <template slot="title">离线常规分析</template>
      <el-menu-item index="9-1">机组概貌图</el-menu-item>
      <el-menu-item index="9-2">振动趋势</el-menu-item>
      <el-menu-item index="9-3">包络分析</el-menu-item>
      <el-menu-item index="9-4">缓变量趋势</el-menu-item>
    </el-submenu>
    <el-menu-item index="10" :disabled="menu.m10">报警统计</el-menu-item>
  </el-menu>
</template>

<script>
  import {menus} from '@/utils/Menu/Menu'

  export default {
    data() {
      return {
        activeIndex: '3-1',
        index3: menus.index3,
        eTypeFunc: {
          0: this.showType0,
          6: this.showType6,
          7: this.showType7,
          10: this.showType10
        },
        menu: {
          m1: true,
          m2: true,
          m3: true,
          m4: true,
          m5: true,
          m6: true,
          m7: true,
          m8: true,
          m9: true,
          m10: true,
        }
      }
    },
    props: {
      equipmentType: {
        default: 0,
        required: true,
        type: Number
      }
    },
    methods: {
      showType0() {
        // this.$refs.m1.disbled = true;
        this.initMenu()
        this.menu.m3 = false
        this.menu.m9 = false
        this.menu.m10 = false
        this.activeIndex = '3-1'
      },
      showType7() {
        this.initMenu()
        this.menu.m4 = false
        this.menu.m5 = false
        this.menu.m6 = false
        this.menu.m9 = false
        this.menu.m10 = false
        this.activeIndex = '4-1'
      },
      showType6() {
        this.initMenu()
        this.menu.m1 = false
        this.menu.m2 = false
        this.menu.m9 = false
        this.menu.m10 = false
        this.activeIndex = '1-1'
      },
      showType10() {
        this.initMenu()
        this.menu.m1 = false
        this.menu.m9 = false
        this.menu.m10 = false
        this.activeIndex = '1-1'
      },
      initMenu() {
        for (let key in this.menu) {
          this.menu[key] = true
        }
      }
    },
    watch: {
      equipmentType: {
        handler() {
          // console.log(this.equipmentType)
          this.eTypeFunc[this.equipmentType]()
        },
        immediate: true
      }
    }
  }
</script>

<style lang="less">
.el-menu {
  font-weight: 800;
  border-bottom: none !important;
  padding-left: 20px !important;
}
</style>