<template>
  <div>
    <!-- <el-container> -->
    <Navbar :equipmentType="eType"></Navbar>

    <!-- <div>
      <router-view></router-view>
    </div> -->
    <el-container style="justify-content: space-between">
      <el-aside width="300px" class="aside">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>

        <el-tree
          class="filter-tree el-scrollbar"
          :data="data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          highlight-current
          :render-content="treeRender"
          @node-click="clickHandler"
          ref="tree"
        >
        </el-tree>
      </el-aside>
      <!-- <keep-alive exclude="ReciprocatMachineryOverView"> -->
        <router-view class="rv"></router-view>
      <!-- </keep-alive> -->
      
    </el-container>
    <!-- </el-container> -->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import Operate from "@/components/Operate/Operate.vue";
import { equipmentsInfo } from "@/api/equipments";
import {judge} from '@/utils/Aside/judge'
import {insert} from '@/utils/Aside/insert'
export default {
  data() {
    return {
      input: "",
      filterText: "",
      data: [],
      checked: false,
      defaultProps: {
        children: "children",
        label: "label",
      },
      eType: 0,
      routeMap: {
        0: this.RotatingMachinery,
        6: this.ReciprocatMachinery,
        7: this.Unit,
        10: this.DieselMonitorSystem
      }
    };
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    treeRender(h, { node, data, store }) {
      if (data.alarmLevel === 5) {
        return (
          <span>
              <i class="iconfont icon-dian1 hh-level"></i>
              <span style="margin-left: 5px; font-size: 13px; color: white;">
                {data.label}
              </span>
          </span>
        );
      } else {
        return (
          <span>
            <i class="iconfont icon-dian1 off-line"></i>
            <span style="margin-left: 5px; font-size: 13px; color: white;">
              {data.label}
            </span>
          </span>
        );
      }
    },
    clickHandler(data) {
      // console.log(data)
      if (data.isEquipment) {
        // console.log('/equipment?uuid=' + data.uuid)
        // this.$router.replace({
        //   path: '/equipment?uuid=' + data.uuid,
        //   // query: newQuery,
        // }).catch(e => {})
        this.routeMap[data.equipmentType](data.uuid)
        this.eType = data.equipmentType
      }
    },
    RotatingMachinery (uuid) {
      let query = JSON.parse(JSON.stringify(this.$route.query))
      query.uuid = uuid
      this.$router.push({
        path: '/RotatingMachinery/Overview',
        query
      }).catch(e => {})
    },
    ReciprocatMachinery (uuid) {
      let query = JSON.parse(JSON.stringify(this.$route.query))
      query.uuid = uuid
      this.$router.push({
        path: '/ReciprocatMachinery/Overview',
        query
      }).catch(e => {})
    },
    Unit (uuid) {
      let query = JSON.parse(JSON.stringify(this.$route.query))
      query.uuid = uuid
      this.$router.push({
        path: '/Unit/OverView',
        query
      }).catch(e => {})
    },
    DieselMonitorSystem (uuid) {
      let query = JSON.parse(JSON.stringify(this.$route.query))
      query.uuid = uuid
      this.$router.push({
        path: '/DieselMonitorSystem/OverView',
        query
      }).catch(e => {})
    }
  },
  components: {
    Navbar,
    Operate,
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    equipmentsInfo.then(e => {
      // this.data = this.treeDataHandler(e.data.data)
      // console.log(e.data.data);
      let equipments = []
      let id = 1
      e.data.data.forEach(item => {
        // console.log(item)
        if (judge.hasGroup(equipments, item)) {
          // console.log("has group", item.groupName)
          if (judge.hasCompany(equipments, item)) {
            // console.log("has company", item.companyName)
            if (judge.hasFactory(equipments, item)) {
              // console.log("has factory", item.factoryName)
              if (judge.hasUnit(equipments, item)) {
                // console.log("has unit", item.UnitName)
                if (!judge.hasEquipment(equipments, item)) {
                  insert.insertEquipment(equipments, item, id)
                }
              } else {
                insert.insertUnit(equipments, item, id)
              }
            } else {
              insert.insertFactory(equipments, item, id)
            }
          } else {
            insert.insertCompany(equipments, item, id)
          }
        } else {
          insert.insertGroup(equipments, item, id)
        }
      })
      this.data = equipments
    });
    this.RotatingMachinery('1d3c2bc4d7e2b67bffb8c5b2162dcbb1')
  },
};
</script>

<style lang="less">


.filter-tree {
  background-color: #2c3242 !important;
  color: #fff !important;
  display: inline-block;
}
.el-scrollbar {
  min-width: 100% !important;
}
.el-input__inner {
  background-color: #2c3242 !important;
}
.el-tree-node:focus > .el-tree-node__content {
  background-color: #359186 !important;
}
.el-tree-node__content:hover {
  background-color: #359186 !important;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #359186 !important;
}
.off-line {
  color: #948b54;
}
.hh-level {
  color: #e50a0a;
}
.rv {
  max-height: 100%;
  overflow: auto;
}
// .rv::-webkit-scrollbar {
//   height: 0;
//   width: 0;
// }
.aside {
  background-color: #2c3242;
  height: 90vh;
  margin: 12px 10px 0 10px;
  overflow: scroll;
}
</style>