<template>
    <div>
        <h5 class="page-heading">Total Energy Inc.</h5>
        <div class="navigation-div">
            <router-link to="/engagementPage/engagementInfo">
                <div id="first-nav" class="hover-effect first" v-on:click="changeCSS('first-nav')">
                    <div class="steps-div">
                        <p class="step">Step</p>
                        <p id="first-step" class="step-no">1</p>
                    </div>
                    <div class="title">Engage Customer</div>
                </div>
            </router-link>
            
            <router-link to="/engagementPage/prepareData">
                <div id="second-nav" class="hover-effect second" v-on:click="changeCSS('second-nav')">
                    <div class="steps-div">
                        <p class="step">Step</p>
                        <p id="second-step" class="step-no">2</p>
                    </div>
                    <div class="title">Prepare Data</div>
                </div>
            </router-link>

            <router-link to="/engagementPage/recommendations">
                <div id="third-nav" class="hover-effect third" v-on:click="changeCSS('third-nav')">
                    <div class="steps-div">
                        <p class="step">Step</p>
                        <p id="third-step" class="step-no">3</p>
                    </div>
                    <div class="title">Recommendations</div>
                </div>
            </router-link>
        </div>

        <div class="router-div"><router-view></router-view></div>
    </div>
</template>

<script>
export default {
  name: 'engagement-page',
  methods: {
    changeCSS: function (id) {
      if (id === 'first-nav') {
        document.getElementById('first-step').style = 'color: #ed2b2a;'
        document.getElementById('second-step').style = 'color: rgb(182, 195, 204);'
        document.getElementById('third-step').style = 'color: rgb(182, 195, 204);'
        document.getElementById('second-nav').style = 'background-color: #1d303a;'
        document.getElementById('third-nav').style = 'background-color: #1d303a;'
      } else if (id === 'second-nav') {
        document.getElementById('second-step').style = 'color: #ed2b2a;'
        document.getElementById('first-step').style = 'color: rgb(182, 195, 204);'
        document.getElementById('third-step').style = 'color: rgb(182, 195, 204);'
        document.getElementById('first-nav').style = 'background-color: #1d303a;'
        document.getElementById('third-nav').style = 'background-color: #1d303a;'
      } else {
        document.getElementById('second-step').style = 'color: rgb(182, 195, 204);'
        document.getElementById('first-step').style = 'color: rgb(182, 195, 204);'
        document.getElementById('third-step').style = 'color: #ed2b2a;'
        document.getElementById('first-nav').style = 'background-color: #1d303a;'
        document.getElementById('second-nav').style = 'background-color: #1d303a;'
      }
      document.getElementById(id).style = 'background-color: #23343f;'
    }
  },
  mounted () {
    document.getElementById('first-step').style = 'color: #ed2b2a;'
    document.getElementById('second-step').style = 'color: rgb(182, 195, 204);'
    document.getElementById('third-step').style = 'color: rgb(182, 195, 204);'
    document.getElementById('second-nav').style = 'background-color: #1d303a;'
    document.getElementById('third-nav').style = 'background-color: #1d303a;'
    document.getElementById('first-nav').style = 'background-color: rgb(35, 52, 63);'
  }
}
</script>

<style>
.router-div{
    background-color: #121f26;
}
.title{
    color: rgb(197, 209, 216);
    margin-left: 15px;
    margin-top: 48px;
    margin-right: 10px;
}
.hover-effect:hover{
    cursor: pointer;
}

.first, .second, .third{
    display: inline-flex;
}
.steps-div{
    margin-left: 20px;
}
.page-heading {
    color: rgb(182, 195, 204);
    margin-left: 18px;
}
.navigation-div{
    background-color: #1D303A;
}
.step{
    color: rgb(182, 195, 204);
    padding-top: 10px;
    margin: 0px;
}
.step-no{
    color: rgb(182, 195, 204);
    font-size: 40px;
}
</style>
