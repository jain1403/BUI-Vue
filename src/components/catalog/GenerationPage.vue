<template>
  <div class="generation-page">
    <accordion v-if="showCoverage" class="page-heading" :one-at-atime="true" type="default">
      <panel is-open>
        <div slot="header" @click="toggleIcon">
          <bui-icon :icon="icon"></bui-icon>
          <h4 style="display: inline-block;">{{ selected }}</h4>
        </div>
        <div class="coverage-data flex">
        	<div class="percent-circle">
        	<bui-percent-circle
      			size="180"
      			:value="coverage.highMedComponentPercent+''"
      			max="100"
     		    thickness="12">
    		</bui-percent-circle>
    		<div class="percent-label">Asset Coverage</div>
        </div>
        	<div class="flex">
        		<div class="count-data">
        			<div class="pd-bt">{{coverage.highMedComponentCount || '--'}}</div>
        			<div>Components</div>
        		</div>
        		<div class="count-data">
        			<div class="pd-bt">{{coverage.failureModeCount || '--'}}</div>
        			<div>Failure Mode</div>
        		</div>
        		<div class="count-data">
        			<div class="pd-bt">{{coverage.analyticCount || '--'}}</div>
        			<div>Analytics</div>
        		</div>
        	</div>
        </div>
      </panel>
    </accordion>
    <!-- Analytic List: Only render if there are analytics for selected item -->
    <div v-if="analyticList.length > 0" class="page-content">
      <div class="analytic-list" >
        <a href="#" @click="cardClicked(analytic)" v-for="analytic in analyticList">
          <div class="analytic-card">
      	   <bui-card :title="analytic.cataloganalyticname || analytic.analyticname"
        		 :description="analytic.analyticdescription">
    	     </bui-card>
         </div>
        </a>
      </div>
      <modal :value="showModal" effect="fade" large @closed="modalClosed"
        :title="modalContent.cataloganalyticname || modalContent.analyticname">
        <hr>
        <section class="analytic-details">
          <section class="confidence-level">
            <bui-percent-circle size="175" :value="analyticConfidenceLevel" thickness="15"></bui-percent-circle>
            <p>Confidence Level</p>
          </section>

          <section class="analytic-metadata">
            <p class="description"> {{ modalContent.analyticdescription }}</p>
            <div class="failure-mode">
              <p>Failure Mode Coverage</p>
              <table>
                <tr>
                  <td class="key">Failure</td>
                  <td class="value">{{ modalContent.component_name }}</td>
                </tr>
                <tr>
                  <td class="key">Failure ID</td>
                  <td class="value">{{ modalContent.failure_id }}</td>
                </tr>
                <tr>
                  <td class="key">NERC Code</td>
                  <td class="value">{{ modalContent.nerccausecode }}</td>
                </tr>
              </table>
            </div>
            <div class="documentation">
              <p>Documentation</p>
              <ul class="list-unstyled">
                <li><a :href="modalContent.analytic_Technical_document_link">Technical Documentation</a></li>
                <li><a :href="modalContent.analytic_marketing_document_link">Marketing Materials</a></li>
              </ul>
            </div>
          </section>
        </section>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-primary" disabled>Try It Out on the Testbench >></button>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import Accordion from '../../../node_modules/build-ui-x/src/Accordion'
import Panel from '../../../node_modules/build-ui-x/src/Panel'
import BuiIcon from '../../../node_modules/build-ui-x/src/BuiIcon'
import Modal from '../../../node_modules/build-ui-x/src/Modal'
import BuiPercentCircle from '../bui/BuiPercentCircle'
import BuiCard from '../bui/BuiCard.vue'

export default {
  name: 'generation-page',
  data () {
    return {
      icon: 'px-utl:chevron',
      showModal: false,
      modalContent: '',
      analyticConfidenceLevel: ''
    }
  },
  methods: {
    toggleIcon () {
      if (this.icon === 'px-utl:chevron') {
        this.icon = 'px-utl:chevron-up'
      } else {
        this.icon = 'px-utl:chevron'
      }
    },
    cardClicked (analytic) {
      this.modalContent = analytic
      this.showModal = true
    },
    modalClosed () {
      this.showModal = false
    }
  },
  computed: {
    analyticData () {
      return this.$store.state.catalog.generationAnalyticData
    },
    analyticList () {
      return this.$store.state.catalog.generationSelectedAnalyticsList
    },
    coverage () {
      return this.$store.state.catalog.generationSelectedCoverage
    },
    selected () {
      /** If-statement handles when contextBrowserSelected is null due to time it takes
       ** to fetch items from API.
       **/
      if (this.$store.state.catalog.contextBrowserSelected.length >= 1) {
        return this.$store.state.catalog.contextBrowserSelected[0].label
      } else {
        return ''
      }
    },
    count () {
      /** If User clicks on the context bowser it fetches the count if the asset is clicked
       **/
      if (this.$store.state.catalog.contextBrowserSelected.length >= 1) {
        return this.$store.state.catalog.generationSelectedScoreCard
      } else {
        return ''
      }
    },
    showCoverage () {
      if (this.$store.state.catalog.contextBrowserSelected[0].value === 'generation') {
        return false
      } else {
        return true
      }
    }
  },
  components: {
    Accordion,
    Panel,
    BuiIcon,
    Modal,
    BuiPercentCircle,
    BuiCard
  }
}

</script>

<style lang="less">
@import '~build-ui/src/styles/px-colors.less';

.catalog-page {

  .panel {
    border-color: @gray18;
    border-bottom: none;
  }

  .panel-heading {
    background-color: @gray17;
    color: @gray4;
    h4 {
      color: @gray4;
    }
  }

  .panel-collapse {
    background-color: @gray14;
    color: @gray4;
  }

  .panel-heading+.panel-collapse>.panel-body {
    border-top-color: #BECAD2;
    border-style: none;
  }

  .modal-header {

  }

  .modal-body {
    padding: 0 20px 15px 20px;
    color: @gray18;
  }
  .flex{
  	display:flex;
  	font-size: 25px;
  	width:100%;
  }
  .count-data{
	text-align:center;
    padding: 70px 0px 0px 35px;
  }
  .percent-label{
  	padding-left: 30px;
  }
  .percent-circle{
  	padding-bottom:0px;
  }
  .pd-bt{
  	padding-bottom:8px;
  }


}
</style>

<style scoped lang="less">
@import '~build-ui/src/styles/px-colors.less';

.analytic-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(241px, 1fr));
  width: 100%;
  display: grid;
  grid-gap: 5px;
  padding: 50px 30px 60px 0;
}

.analytic-card {
  padding: 15px;
}

  .generation-page {
    background : white;
  }

  hr {
    margin: 0;
  }

  .page-heading {
    color: white;
    padding: 0;
    margin-top: 0;
  }

  .page-content {
    color: black;
    padding-left: 2%;
  }

  .panel-group {
    margin-top: -20px;
    margin-left: -20px;
    color: black;
    padding-left: 20px;
  }

  .analytic-details {
    padding: 10px;
  }
  .analytic-metadata {
    padding: 20px 30px 20px 40px;
    position: absolute;
    float: left;
    display: inline-block;
  }

  .confidence-level {
    display: inline-block;
    .percent-circle {
      padding-bottom: 0;
    }
    p {
      text-align: center;
      font-size: 18px;
    }
  }

  .description {
    color: @gray11;
  }

  .failure-mode {
    float: left;
    padding: 5px;
    width: 60%;
    table {
      margin-left: 10px;
    }
    td.key {
      width: 120px;
    }
    td.value {
      width: 200px;
      color: @gray11;
    }
    p {
      font-size: 18px;
    }
  }
  .documentation {
    display: inline-block;
    padding: 5px;
    ul {
      margin-left: 10px;
    }
    p {
      font-size: 18px;
    }
  }

</style>
