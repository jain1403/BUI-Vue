<template>
  <div class="engines-page">
    <h4 class="page-heading">Engines</h4>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th><abbr title="Engine Serial Number">ESN</abbr></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="engine in tableData">
          <td><a :href="'/engines/' + engine.esn">{{engine.name}}</a></td>
          <td>{{engine.status}}</td>
          <td>{{engine.esn}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'engines-page',
  data () {
    return {
      tableData: [
        { name: 'GE-AA', status: 'Good', esn: '12345' },
        { name: 'GE-BB', status: 'Repairing', esn: '23445' },
        { name: 'LEAP-CC', status: 'The BEST!', esn: '93499' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
