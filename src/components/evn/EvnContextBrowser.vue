<template>
  <div id="evn-context-browser">

    <bui-context-browser
      @clicked-set-show-content="setShowContent"
      @clicked-toggle-show-content="toggleShowContent"
      @leaf-clicked="leafClicked"
      :mainIcon="mainIcon"
      :items="contextBrowserItems"
      :darkTheme="darkTheme"
      :showContentHandler="showContent"
      :mainIconVisible="isMainIconVisible"
      :multiSelect="multiSelect">
    </bui-context-browser>

  </div>
</template>

<style lang="less">

</style>

<script>
import BuiContextBrowser from '../bui/BuiContextBrowser.vue'
import BuiIconSet from '../../../node_modules/build-ui-x/src/BuiIconSet.vue'

export default {
  name: 'evn-context-browser',
  data () {
    return {
      mainIcon: {
        show: 'px-nav:hierarchy',
        hide: 'px-nav:close'
      },
      multiSelect: false,
      darkTheme: true
    }
  },
  methods: {
    /**  Method is called when user clicks the nav icon
     ** -Makes a call to the store to toggle the state of showContent
     ** -If showContent is true after toggle, sets the showContent status of
     **  EvnAppNav to false
     **/
    toggleShowContent () {
      this.$store.dispatch('CONTEXT_BROWSER_TOGGLE_SHOW_CONTENT')
    },
    /** ** TURNED OFF FOR EVN CATALOG
     ** Method is called when:
     **     1. The user clicks outside of the nav area
     **     2. The user selects an item in the nav dropdown
     **  -Makes a call to the store to set the state of showContent to
     **   the value provided
     **/
    setShowContent (value) {
      this.$store.commit('CONTEXT_BROWSER_SET_SHOW_CONTENT', value)
    },
    /** Handles Leaf Clicked
     ** -Updates the selected leaf in the store
     ** -Navigates to the root page of the selected leaf
     **/
    leafClicked (item) {
      var payload = {
        multiSelect: this.multiSelect,
        leaf: item
      }
      this.$store.commit('CONTEXT_BROWSER_UPDATE_SELECTED', payload)

      var root = this.findRoot(this.contextBrowserItems, item)
      if (item.value === 'my_dashboard') {
        this.$router.push('/catalog')
      } else {
        this.$router.push('/catalog/' + root.value)

        if (root.value === 'generation') {
          // Get list of analytics and coverage
          this.$store.dispatch('GENERATION_GET_ANALYTICS_LIST_FOR_SELECTED')
          this.$store.dispatch('GENERATION_GET_COVERAGE_FOR_SELECTED')
        }
      }
    },
    /** Finds Root Leaf of selected leaf
     ** -Recursively finds the tree root of the leaf that is passed
     ** -Called when a new leaf is clicked to to get the root
     **/
    findRoot (items, leaf) {
      for (var index in items) {
        if (items[index].value === leaf.value || this.findRoot(items[index].children, leaf)) {
          return items[index]
        }
      }
    }
  },
  computed: {
    showContent () {
      return this.$store.state.catalog.contextBrowserShowContent
    },
    isMainIconVisible () {
      return !this.$store.state.appNavShowContent
    },
    contextBrowserItems () {
      return this.$store.state.catalog.contextBrowserItems
    }
  },
  components: {
    BuiContextBrowser,
    BuiIconSet
  }
}
</script>
