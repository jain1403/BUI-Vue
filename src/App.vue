<template>
  <div id="app">
    <header>
      <bui-branding-bar>
        <template slot="app-title">Digital Twin Electricity Value Network Analytics</template>
      </bui-branding-bar>

      <evn-app-nav> </evn-app-nav>
      <evn-context-browser v-if="catalogActive"></evn-context-browser>

    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer class="text-right" role="contentinfo">
      <nav role="navigation">
        <ul class="list-inline">
          <li>
            <a href="http://www.ge.com/privacy" target="_blank">Privacy</a>
          </li>
          <li>
            <a href="http://www.ge.com/terms" target="_blank">Terms</a>
          </li>
          <li>
            <small>©2017 General Electric</small>
          </li>
        </ul>
      </nav>
    </footer>

    <bui-icon-set></bui-icon-set>
  </div>
</template>

<script>
import BuiBrandingBar from 'build-ui-x/src/BuiBrandingBar.vue'
import BuiIconSet from 'build-ui-x/src/BuiIconSet.vue'
import EvnAppNav from './components/evn/EvnAppNav.vue'
import EvnContextBrowser from './components/evn/EvnContextBrowser.vue'

export default {
  name: 'app',
  data () {
    return {
      mainIcon: {
        show: 'px-nav:hamburger',
        hide: 'px-nav:close'
      }
    }
  },
  computed: {
    catalogActive () {
      return (this.$route.matched[0].path === '/catalog')
    }
  },
  beforeCreate () {
    /** Handles creation of Context Browser
     ** -Gets analytic taxonomy from database using REST api
     ** -Creates the tree of items for the Context Browser
    **/
    var items = [
      { label: 'My Dashboard', value: 'my_dashboard' },
      { label: 'Generation', value: 'generation' },
      { label: 'T & D', value: 'td' },
      { label: 'Consumption', value: 'consumption' }
    ]
    this.$store.dispatch('CONTEXT_BROWSER_CREATE_TREE', items)
  },
  components: {
    BuiBrandingBar,
    BuiIconSet,
    EvnAppNav,
    EvnContextBrowser
  }
}
</script>

<style lang="less" scoped>
  @import "../node_modules/build-ui/src/styles/px-colors.less";

  #app {
    // Styling goes here
  }

  main {
    min-height: 500px;
  }

  footer {
    padding: 10px;

    ul {
      margin-bottom: 0;
    }
  }
</style>
