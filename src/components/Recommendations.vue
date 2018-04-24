<template>
    <div>
        <p class="header-text">Tabular View</p><hr>
        <div style="display:inline-flex;">
            <div>
                <bui-percent-circle
                    size="140"
                    :value="70"
                    max="100"
                    thickness="10">
                </bui-percent-circle>
                <div class="percent-label">Overall Improvement</div>
            </div>
            <div class="flex">
                <div class="million-div">$4.3 Million Net Increased Value Over 1 Year</div>
                <div class="sub-headers">
                    <div class="count-data">
                        <div>Reliability</div>
                        <div class="blue-style">{{'$'}}</div>
                        <div class="status">Saved</div>
                    </div>
                    <div class="count-data">
                        <div>Availability</div>
                        <div class="green-style">{{'$'}}</div>
                        <div class="status">Saved</div>
                    </div>
                    <div class="count-data">
                        <div>Efficiency</div>
                        <div class="green-style">{{'%'}}</div>
                        <div class="status">Increased(?)</div>
                    </div>
                    <div class="count-data">
                        <div>Capacity</div>
                        <div class="green-style">{{'$'}}</div>
                        <div class="status">Increased<br>Revenue</div>
                    </div>
                    <div class="count-data">
                        <div>Flexibility</div>
                        <div class="blue-style">{{'$'}}</div>
                        <div class="status">Increased<br>Revenue</div>
                    </div>
                </div>
        	</div>
        </div>

        <div class="table-div">
            <bui-table
                :data="jsonData"
                :columns="jsonHeader"
                :filter-key="searchQuery"
                :rows-per-page="5"
                :start-row="0">
            </bui-table>
        </div>
    </div>
</template>

<script>
import BuiPercentCircle from './bui/BuiPercentCircle'
import BuiTable from './bui/BuiDataTable'
import DataJson from '../assets/newdata.json'
export default {
  name: 'recommendations',
  data () {
    return {
      searchQuery: '',
      jsonData: DataJson,
      jsonHeader: [],
      tempFilter: {
        'columnName': String,
        'isFilterable': Boolean,
        'width': String
      },
      tempFilterableArray: [],
      isLoading: false
    }
  },
  methods: {
    getTableData: function () {
      this.jsonHeader = Object.keys(this.jsonData[0])
    },
    getFilterableTableData: function () {
      for (let index = 0; index < this.jsonHeader.length; index++) {
        this.tempFilter.columnName = this.jsonData[index]
        this.tempFilter.isFilterable = true
        this.tempFilter.width = '200px'
        this.tempFilterableArray.push(JSON.parse(JSON.stringify(this.tempFilter)))
      }
    }
  },
  components: {
    BuiPercentCircle,
    BuiTable
  },
  beforeMount: function () {
    this.getTableData()
    this.getFilterableTableData()
  }
}
</script>

<style>
.status{
    font-size: 15px;
}
.status:hover{
    color: rgb(0, 115, 165)
}
.sub-headers{
    display: inline-flex;
    margin-top: 6%;
    margin-left: -42%;
    font-size: 24px;
}
.green-style{
    text-align: center;
    color: #7bbc00;
}
.blue-style{
    text-align: center;
    color: #3b7ea4;
}
.table-div{
    overflow: auto;
}
.mg-lt{
    margin-left: -260px;
}
.million-div{
    height: 28px;
    margin-top: 17px;
    margin-left: 60px;
}
hr{
    border-top: 1px solid #BECAD2;
    margin-top: 0px;
    margin-bottom: -5px;
}
.flex{
  	display:flex;
  	font-size: 27px;
  	width:100%;
    color: #748B99;
  }
  .count-data{
	text-align:center;
    padding-right: 4%;
  }
  .pd-bt{
  	padding-bottom:8px;
    font-size: 35px;
    margin-top: -20px;
  }
  .percent-label{
    color: #748B99;
    margin-top: -20px;
    padding-bottom: 10px;
    text-align: center;
    margin-left: 0px;
    font-size: 20px;
  }
  .header-text{
    color: white;
    padding: 14px;
    margin-left: 10px;
    font-size: 17px;
  }
</style>
