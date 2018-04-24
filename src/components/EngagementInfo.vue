<template>
    <div>
        <div>
            <p class="header-text">Engagement Info</p>
            <table>
                <tr>
                    <td>EVN Engagement ID: </td>
                </tr>
                <tr>
                    <td>Name: </td>
                    <td><input class="text common-input-styles" type="text" placeholder="Enter a name for this engagement"/><hr class="name-hr"></td>
                </tr>
                <tr>
                    <td>Description: </td>
                    <td><textarea class="text textarea common-input-styles" placeholder="Enter a description for this engagement"/><hr class="description-hr"></td>
                </tr>
            </table>
        </div>
        <div>
            <p class="second-header-text">Customer Info</p>
            <table>
                <tr>
                    <td class="td-style">Type: &nbsp;<input class="common-input-styles second-table-input" v-model="customerData.customerType" placeholder="Customer Info" type="text"/><hr class="customer-hr"></td>
                    <td class="td-style">
                        <select class="dropdown-list">
                            <option disabled="true" selected>Customer Data Templete</option>
                            <option>Download...</option>
                            <option>Email to Customer...</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><input class="common-input-styles second-table-input" v-model="customerData.customer" placeholder="Customer" type="text"/><hr class="customer-hr"></td>
                    <td><input class="common-input-styles second-table-input" v-model="customerData.customerName" placeholder="Name" type="text"/><hr class="customer-hr"></td>
                </tr>
                <tr>
                    <td><input class="common-input-styles second-table-input" v-model="customerData.customerAddress1" placeholder="Address 1" type="text"/><hr class="customer-hr"></td>
                    <td><input class="common-input-styles second-table-input" v-model="customerData.customerNum" placeholder="Number" type="text"/><hr class="customer-hr"></td>
                </tr>
                <tr>
                    <td><input class="common-input-styles second-table-input" v-model="customerData.customerAddress2" placeholder="Address 2" type="text"/><hr class="customer-hr"></td>
                    <td><input class="common-input-styles second-table-input" v-model="customerData.customerEmail" placeholder="Email" type="text"/><hr class="customer-hr"></td>
                </tr>
                <tr>
                    <td><input class="common-input-styles second-table-input" v-model="customerData.customerTown" placeholder="Town" type="text"/><hr class="customer-hr"></td>
                    <td><input class="common-input-styles second-table-input" placeholder="Etc.." type="text"/><hr class="customer-hr"></td>
                </tr>
                <tr>
                    <td><input class="common-input-styles second-table-input" v-model="customerData.customerCity" placeholder="City" type="text"/><hr class="customer-hr"></td>
                </tr>
                <tr>
                    <td><input class="common-input-styles second-table-input" v-model="customerData.customerCountry" placeholder="Country" type="text"/><hr class="customer-hr"></td>
                </tr>
                <tr>
                    <td><input class="common-input-styles second-table-input" v-model="customerData.customerPinCode" placeholder="Pin Code" type="text"/><hr class="customer-hr"></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'engagement-info',
  data () {
    return {
    }
  },
  computed: {
    customerData () {
      return this.$store.state.catalog.selectedCustomerData
    }
  }
}
</script>

<style>
table{
    background-color: transparent;
    margin-left: 23px;
    color: rgb(182, 195, 204);
}
.td-style{
    width: 430px;
}
hr{
    border-top: 1px solid #BECAD2;
    margin-top: 1px;
    margin-bottom: -5px;
}
.customer-hr{
    width: 350px;
    margin-left: 2px;
}
.second-table-input{
    width: 350px;
}
.dropdown-list{
    background-color: #364c59;
    border: none;
    height: 30px;
}
.name-hr{
    width: 240px;
    margin-left: 1px;
}
td{
    padding-bottom: 20px;
}
.text{
    width: 240px;
}
.textarea{
    width: 450px;
    height: 60px;
}
.second-header-text{
    color: white;
    margin-left: 22px;
    margin-top: 14px;
    font-size: 22px;
}
.header-text{
    color: white;
    padding: 14px;
    margin-left: 10px;
    font-size: 17px;
}
.common-input-styles{
    background-color: transparent;
    font-family: 'GEInspiraSans-Regular', 'GE Inspira Sans';
    font-style: normal;
    font-size: 15px;
    text-decoration: none;
    text-align: left;
    border-color: transparent;
    outline-style: none;
}
</style>
