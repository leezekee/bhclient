<template>
  <div class="container">

  </div>
</template>

<script>
  export default {
    data() {
      return{
        bg: ''
      }
    },
    methods: {
      async getBg() {
        // /graph/1d3c2bc4d7e2b67bffb8c5b2162dcbb1/info
        // const {data:res} = await request.get('/equipment/getAll')
        // .catch(e => {
        //   console.log(e.message)
        // })
        // console.log(res);
        console.log(res.data);
      },
    },
    created() {
      console.log('created');
      this.getBg()
      // this.cotest()
      // console.log('after');
    }
  }
</script>

<style lang="less" scoped>
.container {
  height: 90vh;
  margin-top: 12px;
  width: 100%;
  background-color: #2c3242;
}
</style>