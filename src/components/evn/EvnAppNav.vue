<template>
  <div id="evn-app-nav">

    <bui-app-nav
      @clicked-set-show-content="setShowContent"
      @clicked-toggle-show-content="toggleShowContent"
      :mainIcon="mainIcon"
      :vertical="false"
      :collapseAll="true"
      :items="navItems"
      :darkTheme="true"
      :showContentHandler="showContent">
    </bui-app-nav>

  </div>
</template>

<script>
import BuiAppNav from '../bui/BuiAppNav.vue'
import BuiIconSet from '../../../node_modules/build-ui-x/src/BuiIconSet.vue'

export default {
  name: 'evn-app-nav',
  data () {
    return {
      mainIcon: {
        show: 'px-nav:hamburger',
        hide: 'px-nav:close'
      },
      navItems: [
        {
          label: 'Catalog',
          icon: ' ',
          to: {
            path: '/catalog'
          }
        },
        {
          label: 'Pipeline',
          icon: ' ',
          to: {
            path: '/pipeline'
          }
        },
        {
          label: 'Reports/Lists',
          icon: ' ',
          to: {
            path: '/reports'
          }
        },
        {
          label: 'Create/Add Analytics',
          icon: ' ',
          to: {
            path: '/analytic'
          }
        },
        {
          label: 'Test Bench',
          icon: ' ',
          to: {
            path: '/testbench'
          }
        },
        {
          label: 'Analyze Coverage',
          icon: ' ',
          to: {
            path: '/coverage'
          }
        },
        {
          label: 'Reference Documents',
          icon: ' ',
          to: {
            path: '/documents'
          }
        },
        {
          label: 'Settings',
          icon: ' ',
          to: {
            path: '/settings'
          }
        }
      ]
    }
  },
  methods: {
    /**  Method is called when user clicks the nav icon
     ** -Makes a call to the store to toggle the state of showContent
     ** -If showContent is true after toggle, sets the showContent status of
     **  EvnContextNav to false
     **/
    toggleShowContent () {
      this.$store.dispatch('APP_NAV_TOGGLE_SHOW_CONTENT')
    },
    /**  Method is called when:
     **     1. The user clicks outside of the nav area
     **     2. The user selects an item in the nav dropdown
     **  -Makes a call to the store to set the state of showContent to
     **   the value provided
     **/
    setShowContent (value) {
      this.$store.commit('APP_NAV_SET_SHOW_CONTENT', value)
    }
  },
  computed: {
    showContent () {
      return this.$store.state.appNavShowContent
    }
  },
  components: {
    BuiAppNav,
    BuiIconSet
  }
}
</script>

<style lang="less">
  @import "../../../node_modules/build-ui/dist/styles/build-ui.min.css";
  @import '~build-ui/src/styles/px-colors.less';



  #evn-app-nav {
    .app-nav {

      ul {
       padding: 3px 0 0 0;
       background-color: @gray19;

       li {
         font-family: "GE Inspira", ge-inspira, ge-sans;
         font-weight: bold;

         a {
           color: @gray7;
           font-size: 17px;
           &:hover {
             background-color: @gray12;
           }
           &.router-link-exact-active {
             background-color: @gray16;
           }
         }
         a.main-icon {
           font-size: 25px;
           padding: 5px 20px 5px 0;
           > .icon {
             margin: 0 20px;
             stroke: @gray7;
           }
         }
       }
     }
   }
 }
</style>
