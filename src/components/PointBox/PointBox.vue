<template>
  <div class="info-container" ref="rfinfo" :style="'height:'+containerHeight+'px;width:'+containerWidth+'px;'">
    <p class="name-box" ref="rfname">{{ this.equName }}</p>
    <p class="time-box" ref="rftime">{{ this.equTime }}</p>
    <p class="rev-box" ref="rfrev">{{ this.equRev }}</p>
    <div class="info-boxs">
      <div class="point-box" 
        v-for="point in getList" 
        :key="point.xPos+'-'+point.yPos"
        :ref="point.xPos+'-'+point.yPos"
        :style="'height:'+point.height+'px;width:'+point.width+'px;'+
                'left:'+point.xPos+'px;top:'+point.yPos+'px;overflow:auto;'"
      >
        <li v-for="each in point.points" :key="each.pointId" style="list-style:none;"> 
          <span v-if="each.status==='0'" style="color: #fff; font-size:12px;margin-left: 1px;">{{ each.pointId }}</span>
          <span v-else-if="each.status==='1'" style="color: yellow; font-size:12px;margin-left: 1px;">{{ each.pointId }}</span>
          <span v-else-if="each.status==='2'" style="color: red; font-size:12px;margin-left: 1px;">{{ each.pointId }}</span>
          <span v-if="each.status==='0'" style="color: #fff; font-size:12px;margin-left: 12px;">{{ each.value }}</span>
          <span v-else-if="each.status==='1'" style="color: yellow; font-size:12px;margin-left: 12px;">{{ each.value }}</span>
          <span v-else-if="each.status==='2'" style="color: red; font-size:12px;margin-left: 12px;">{{ each.value }}</span>
        </li>
      </div>
    </div>

  </div>
</template>

<script>
  import request from '@/utils/request/request'
  export default {
    data() {
      return {
        BoxList: [],
        Name: {},
        Time: {},
        Rev: {},
        equName: '',
        equTime: '',
        equRev: '',
      }
    },
    computed: {
      getList() {
        return this.BoxList.filter(e => {
          if (e.points.length == 0) {
            return false
          }
          if (e.height === '0') {
            return false
          }
          return true
        })
      }
    },
    props: {
      uuid: {
        required: true,
        type: String,
        default: ''
      },
      containerHeight: {
      },
      containerWidth: {
      }
    },
    methods: {
      getPointBox(q_uuid) {
        request.get('/graph/'+q_uuid+'/data').then(e => {
          this.BoxList = e.data.data.listBoxes
          this.Name = e.data.data.equipmentName
          this.Time = e.data.data.time
          // console.log(e.data.data.revInfo)
          if (JSON.stringify(e.data.data.revInfo) === '{}') {
            this.Rev = {}
            this.equRev = ''
            // console.log("no rev information")
          } else {
            // console.log("rev information")
            this.Rev = e.data.data.revInfo.转速
          }
          // console.log(this.Name)
          // console.log(this.time)
          // console.log(this.pointBoxs)
          this.changeStyle(this.$refs.rfname, this.Name, true)
          this.equName = this.Name.equipmentName
          this.changeStyle(this.$refs.rftime, this.Time)
          this.equTime = this.Time.time
          if (JSON.stringify(e.data.data.revInfo) !== '{}') {
            // console.log("change style" + this.Rev)
            this.changeStyle(this.$refs.rfrev, this.Rev)
            this.equRev = this.Rev.revName + ' ' + this.Rev.revValue
          }
        }).catch(e => console.log(e.message))
      },
      changeStyle(ref, obj, isName) {
        ref.style.height = obj.height+'px'
        ref.style.width = obj.width+'px'
        // if (!isName) {
          ref.style.top = obj.yPos+'px'
          ref.style.left = obj.xPos +'px'
        // } else {
        //   ref.style.top = obj.height - obj.xPos+'px'
        //   ref.style.left = obj.width - obj.yPos +'px'
        // }
      }
    },
    watch: {
      uuid: {
        handler() {
          // console.log(this.uuid)
          this.getPointBox(this.uuid)
          // console.log(this.Name)
        },
        immediate: true
      }
    },
    mounted() {
      let pMountedTimer = window.setInterval(() => {
        if (window.parentMounted) {
          window.clearInterval(pMountedTimer)
          
        }
      }, 500)
    }
  }
</script>

<style lang="less">
.info-container {
  z-index: 1;
  // background-color: #fff;
  height: 100%;
  width: 100%;
  position: relative;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
}
.point-box {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  overflow: scroll;
  height: 0;
  width: 0;
  border: 1px #fff solid;
}
.name-box {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  color: #fff;
  font-size: 24px;
}
.time-box {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  color: #fff;
  font-size: 12px;
}
.rev-box {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  color: #fff;
  font-size: 12px;
}
</style>