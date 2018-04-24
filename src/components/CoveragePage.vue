<template>
  <div class="coverage-page">
    <div class="searchDiv">
      <router-link to="/engagementPage/engagementInfo/"><button class="new-engagement">New Advisor Engagement</button></router-link>
      <label class="or-text"> or </label>
      <input class="searchInput" v-model="query" type="text" placeholder="Enter a Customer Name, Customer Id or Engagement Id"/>
      <router-link to="/engagementPage/engagementInfo/"><div @click="setCustomerData()"><bui-icon icon="px-nav:search" class="search-indicator"></bui-icon></div></router-link>
      <hr>
    </div>
    <div class="filterableDiv">
      <ul v-if="query.length > 0 ">
        <li class="parent-listing" v-for="sData in searchData">
          <label  v-if="!checkEmptyObject(sData.data)">{{ sData.searchType }} ({{ sData.data.__ob__.value["[object Object]"].length }})</label>
          <ul>
            <li class="child-listing" v-for="sdata of sData.data"> 
              <ul>
                <li v-if="sData.searchType == 'Engagement Id'" class="child hover-effect" @click="setInputModal(childData.engagementId, childData.customerName, childData)" v-for="childData of sdata"> 
                <span class="bold-effect">{{childData.engagementId}}</span> ({{childData.customerName}})
                </li>
                <li v-if="sData.searchType == 'Engagement Name'" class="child hover-effect" @click="setInputModal(childData.engagementName, childData.engagementId, childData)" v-for="childData of sdata"> 
                <span class="bold-effect">{{childData.engagementName}}</span> ({{childData.customerName}})
                </li> 
                <li v-if="sData.searchType == 'Customer Name'" class="child hover-effect" @click="setInputModal(childData.customerName, childData.engagementId, childData)" v-for="childData of sdata"> 
                <span class="bold-effect">{{childData.customerName}}</span> ({{childData.engagementId}})
                </li> 
              </ul> 
            </li>
          </ul>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import BuiIcon from 'build-ui-x/src/BuiIcon.vue'
  import DataJson from '../assets/search.json'
  export default {
    name: 'coverage-page',
    components: {
      BuiIcon
    },
    data () {
      return {
        query: '',
        json: [],
        searchArray: [{
          'searchType': String,
          'data': Array
        }],
        customerSelected: {}
      }
    },
    methods: {
      checkEmptyObject (obj) {
        return _.isEmpty(obj)
      },
      setInputModal (x, y, childData) {
        this.query = x + ' (' + y + ')'
        this.customerSelected = childData
      },
      setCustomerData () {
        this.$store.dispatch('GET_CUSTOMER_DATA')
        .then(response => {
          console.log('customers Data', response)
        })
        .catch(e => {
          console.log(e)
        })
      }
    },
    computed: {
      searchData () {
        this.searchArray = []
        if (!this.checkEmptyObject(this.engagementIdData) || !this.checkEmptyObject(this.engagementNameData) || !this.checkEmptyObject(this.customerNameData)) {
          this.searchArray.push({'searchType': 'Engagement Id', 'data': this.engagementIdData})
          this.searchArray.push({'searchType': 'Engagement Name', 'data': this.engagementNameData})
          this.searchArray.push({'searchType': 'Customer Name', 'data': this.customerNameData})
        }
        return this.searchArray
      },
      engagementIdData () {
        const filtered = this.json.filter(data => {
          return data.engagementId.toLowerCase().includes(this.query.toLowerCase())
        })
        return _.groupBy(filtered)
      },
      engagementNameData () {
        const filtered = this.json.filter(data => {
          return data.engagementName.toLowerCase().includes(this.query.toLowerCase())
        })
        return _.groupBy(filtered)
      },
      customerNameData () {
        const filtered = this.json.filter(data => {
          return data.customerName.toLowerCase().includes(this.query.toLowerCase())
        })
        return _.groupBy(filtered)
      }
    },
    mounted () {
      this.$store.state.catalog.selectedCustomerData
      this.json = DataJson
      this.setCustomerData()
    }
  }

</script>

<style scoped>
.child{
  list-style: none;
  margin-left: -15%;
}
.bold-effect{
  font-weight:500;
  color: white;
}
.or-text{
  color: #bfbcb7;
    position: absolute;
    top: 18px;
    left: 17%;
}
.child-listing{
  list-style: none;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: rgba(224, 232, 234, 0.8);
  text-align: left;
  margin-left: -40px;
}
li{
  padding-bottom: 1px;
  padding-top: 1px;
}
.hover-effect:hover{
  background-color: #1d303a;
  color: white;
}
.parent-listing{
  list-style: none;
  padding-top: 2%;
  margin-left: -5%;
  font-weight: bold;
  font-style: normal;
  font-size: 12px;
  color: rgba(116, 139, 153, 0.8);
}
.filterableDiv{
  background-color: #0c151b;
  margin-left: 20%;
  width: 340px;
  box-shadow: rgba(0, 0, 0, 0.498) 2px 2px 5px;
}
.coverage-page{
  position: relative;
}
.searchDiv{
  background-color: #1D303A;
  height: 62px;
}
hr{
    position: absolute;
    margin-top: -10px;
    width: 340px;
    margin-left: 20%;
    border: 0;
    border-top: 1px solid #BECAD2;
}
.new-engagement{
    background: #334d5a;
    margin: 14px;
    border: none;
    border-radius: 2px;
    color: #bfbcb7;
    padding: 4px;
    width: 14%;
}
.search-indicator{
    margin-top: 22px;
    color: rgb(89, 113, 127);
    margin-left: 30.5%;
    stroke-width: 1.75px;
    cursor: pointer;
    position: absolute;
    top: 2px;
    left: 15.5%;
}
.searchInput{
  top: 15px;
  position: absolute;
  color: white;
  width: 360px;
  left: 20%;
  height: 24px;
  background-color: transparent;
  font-family: 'GEInspiraSans-Regular', 'GE Inspira Sans';
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
  text-decoration: none;
  text-align: left;
  border-color: transparent;
  outline-style: none;
}
  .catalog-page {
    padding: 20px;
  }
  .page-heading {
    color: white;
  }
  .page-content {
    color: white;
  }
  .suggestionResult{
    color: white;
  }
</style>
