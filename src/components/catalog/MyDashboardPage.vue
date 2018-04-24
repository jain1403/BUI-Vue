<template>
  <div class="my-dashboard">
    <p>{{msg}}</p>
  </div>
</template>

<script>
import BuiPercentCircle from '../bui/BuiPercentCircle.vue'
export default {
  name: 'my-dashboard',
  data () {
    return {
      msg: 'Welcome to the EVN Catalog!'
    }
  },
  computed: {
    count () {
      return this.$store.state.example.count
    }
  },
  mounted () {
    this.$store.commit('INCREMENT')
  },
  components: {
    BuiPercentCircle
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

 p {
   color: white;
 }

</style>
