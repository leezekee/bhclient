<template>
  <div class="container" 
    >
    
    <div class="left" >
      <div class="div-img" :style="{background: graphImageBackground}">
        <img 
          class="img"
          :src="graphImageBase64Code" 
          alt=""
          :style="'height:'+graphImageHeight +'px; width:'+graphImageWidth+'px;'"
        >
        <PointBox 
          :uuid="props_uuid"
          :containerHeight="graphImageHeight"
          :containerWidth="graphImageWidth"
        ></PointBox>
      </div>
    </div>
    <div class="right">
      <el-aside width="300px" class="aside">
        <div class="top">
          <h1>操作页</h1>
          <el-checkbox v-model="checked">显示图谱</el-checkbox>
        </div>
        <Operate v-if="checked === true"></Operate>
      </el-aside>
    </div>
    <!-- {{ this.$route.query.uuid }} -->
    
  </div>
</template>

<script>
  import request from '@/utils/request/request'
  import PointBox from '@/components/PointBox/PointBox.vue'
  import Operate from "@/components/Operate/Operate.vue";
  export default {
    data() {
      return {
        graphImageBackground: '',
        graphImageBase64Code: '',
        graphImageHeight: '',
        graphImageWidth: '',
        checked: false,
        props_uuid: '',
      }
    },
    methods: {
      getBg(q_uuid=undefined) {
        // console.log(this.systemParam)
        const uuid = q_uuid == undefined ? this.$route.query.uuid : q_uuid
        request.get('/graph/'+uuid+'/info').then(e => {
          if (e) {
            // console.log(e.data.data)
            this.graphImageBackground = e.data.data.graphImageBackground
            this.graphImageBase64Code = 'data:image/png;base64,' +  e.data.data.graphImageBase64Code
            this.graphImageHeight = e.data.data.graphImageHeight
            this.graphImageWidth = e.data.data.graphImageWidth
          }
        }).catch(e => console.log(e.message))
        
        // console.log(this.img.graphImageBase64Code);
        // this.$refs.rfimg.style.height = this.img.graphImageHeight
        // this.$refs.rfimg.style.width = this.img.graphImageWidth
      },
      
    },
    created() {
      this.getBg()
      this.props_uuid = this.$route.query.uuid
    },
    beforeRouteUpdate(to, from, next) {
      // console.log("beforeRouteUpdate")
      this.getBg(to.query.uuid)
      this.props_uuid = to.query.uuid
      next()
    },
    components: {
      PointBox,
      Operate
    }
  }
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 10px;
}
.div-info {
  position: relative;
  width: 100%;
  height: 100%;
}
.point-box {
  position: absolute;
  top: 0;
  left: 0;
  overflow: scroll;
  height: 0;
  width: 0;
  border: 1px #fff solid;
}
.div-img {
  position: relative;
  // float: left;
  // position: absolute;
  // z-index: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.top {
  margin: 5px 0 0 15px;
  // float: right;
  h1 {
    color: #359186;
    font-size: 24px;
    margin: 15px 0 0 15px;
  }
  .el-checkbox {
    color: #fff !important;
    margin: 20px 0 0 15px;
  }
}
.left {
  // float: left;
  flex: 4;
}
.right {
  // float: right;
  flex: 1;
  margin-top: 0;
}
.aside {
  background-color: #2c3242;
  height: 90vh;
  margin: 0px 10px 0 10px;
  overflow: auto;
}
</style>