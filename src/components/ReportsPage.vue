<template>
  <div class="reports-page">
    <h4 class="page-heading">Reports/Lists</h4>
    <p class="page-content">Placeholder for the Reports/Lists page</p>
    <bui-table
    	:data="gridData"
        :columns="gridColumns"
        :filter-key="searchQuery">
     </bui-table>
  </div>
</template>

<script>
import BuiTable from './bui/BuiDataTable.vue'
export default {
  name: 'reports-page',
  data () {
    return {
      searchQuery: '',
      gridColumns: ['Gross Power', 'Net Power', 'Fuel Flow', 'Gross Heat Rate', 'Net Heat Rate'],
      gridData: [
        {'Gross Power': '3453.2', 'Net Power': '1102.2', 'Fuel Flow': '119,263.95', 'Gross Heat Rate': '6113.69', 'Net Heat Rate': '2213.12'},
        {'Gross Power': '3438.2', 'Net Power': '1342.2', 'Fuel Flow': '119,743.11', 'Gross Heat Rate': '6113.45', 'Net Heat Rate': '2343.12'},
        {'Gross Power': '6756.2', 'Net Power': '1122.2', 'Fuel Flow': '119,125.83', 'Gross Heat Rate': '6133.69', 'Net Heat Rate': '5667.12'},
        {'Gross Power': '8543.2', 'Net Power': '1932.2', 'Fuel Flow': '983.89', 'Gross Heat Rate': '113.23', 'Net Heat Rate': '7522.12'},
        {'Gross Power': '8233.2', 'Net Power': '1382.2', 'Fuel Flow': '983.89', 'Gross Heat Rate': '113.23', 'Net Heat Rate': '2345.12'}
      ]
    }
  },
  components: {
    BuiTable
  }
}

</script>

<style scoped>
  .catalog-page {
    padding: 20px;
  }

  .page-heading {
    color: white;
  }

  .page-content {
    color: white;
  }
</style>
