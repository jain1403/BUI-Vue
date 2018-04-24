<template>
  <section class="card">
    <header>
      <div class="header-text">
        <slot name="header">{{ title }} </slot>
      </div>
    </header>

      <div class="content-text">
          <slot name="content"> {{ description }} </slot>
      </div>

      <div v-if="showData" class="chartsCSS">
          <div class="dataCSS"> {{ chartData }} </div>
          <div class="confidential">Confidential Level</div>

      </div>
  </section>
</template>
<script>
export default {
  name: 'BuiCard',
  props: {
    title: String,
    chartData: String,
    description: String
  },
  data () {
    return {
      showData: false
    }
  }
}
</script>

<style scoped lang="less">
    .card{
        background-color: #ffffff;
        width: 235px;
        height: 300px;
        border: 1px solid gray;
        text-decoration: none;
        margin-left: 5%;
        margin: 1%;
    }

    .card:hover{
      border: 2px solid black;
    }
    .header-text{
        font-size: 15px;
        color: #59717f;
        padding: 10px;
        margin: 0;
        text-align: center;
        font-family: "GE Inspira Sans",sans-serif;
    }

    .content-text{
        font-size: 12px;
        color: #889aa5;
        padding: 10px;
        margin: 0px;
        font-family: "GE Inspira Sans",sans-serif;
        height: 40%;
    }

    .chartsCSS{
        font-family: "GE Inspira Sans",sans-serif;
        font-size: 15px;
    }

    .confidential{
        font-size: 12px;
        font-weight: bold;
        color: #59717f;
        margin-top: 10%;
    }

    .dataCSS{
        margin-top: 10%;
    }
</style>
