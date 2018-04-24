<template>
  <!-- STATE: Horizontal, COLLAPSED -->
  <div class="context-browser" :class="{darkTheme: darkTheme, lightTheme: !darkTheme}">
  <section class="collapsed-state">
    <ul class="flex">

      <!-- Selected Link -->
      <!-- OPTIONAL: Main Icon -->
      <li v-if="mainIcon">
        <!-- EVN CATALOG SPECIFIC: class set to invisible when the Main App Nav is active so that
          Context Nav Icon does not appear inside dropdown -->
        <a class="main-icon" @click.stop="toggleShowContent" :class="{invisible : !mainIconVisible, active : showContent}">
          <bui-icon v-if="showContent" :icon="mainIcon.hide" class="icon"></bui-icon>
          <bui-icon v-if="!showContent" :icon="mainIcon.show" class="icon"></bui-icon>
        </a>
      </li>

      <li v-if="mainIcon == null">
        <a @click.stop="toggleShowContent">
          <bui-icon icon="px-utl:chevron" class="more-indicator"></bui-icon>
        </a>
      </li>
      <li v-show="showContent" style="position: absolute;">
        <!-- Context Tree -->
        <bui-tree class="children"
          @leaf-clicked="leafClicked"
          :items="items"
          :multiSelect="multiSelect">
        </bui-tree>
      </li>
    </ul>
  </section>
  </div>
</template>

<script>
  import BuiIcon from 'build-ui-x/src/BuiIcon.vue'
  import ClickOutside from 'build-ui-x/src/directives/ClickOutside.js'
  import BuiTree from './BuiTree.vue'
  export default {
    name: 'bui-context-browser',
    props: {
      mainIcon: {
        type: Object,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      darkTheme: {
        type: Boolean,
        default: false
      },
      showContentHandler: {
        type: Boolean,
        default: false
      },
      mainIconVisible: {
        type: Boolean,
        default: true
      },
      multiSelect: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        windowWidth: 0,
        collapsed: false,
        openVNav: false
      }
    },
    computed: {
      showContent: function () {
        return this.showContentHandler
      }
    },
    methods: {
      leafClicked (val) {
        this.$emit('leaf-clicked', val)
      },
      /** EVN CATALOG SPECIFIC, Horizontal State Method:
       ** Toggles the state of showContent
       ** -Emits event to parent component that will handle toggling the
       **  the value of showContentHandler
       ** -Sets the value of showContent to showContentHandler
       **/
      toggleShowContent () {
        this.$emit('clicked-toggle-show-content')
      },
      /** REMOVED/UPDATED FOR EVN CATALOG
       ** -Emits event to parent component to set showContent to false
       ** Method is called when the click-outside custom directive
       ** detects the user has clicked away from the collapsed nav dropdown
       **/
      collapsedCloseEvent (event) {
        this.$emit('clicked-set-show-content', false)
        this.$emit
      }
    },
    beforeDestroy () {
      // Clean up on destroy
      window.removeEventListener('resize', this.getWindowWidth)
      window.removeEventListener('resize', this.getWindowHeight)
    },
    components: {
      BuiIcon,
      BuiTree
    },
    directives: {
      'click-outside': ClickOutside
    }
  }
</script>

<style scoped lang="less">
@import '~build-ui/src/styles/px-colors.less';

.darkTheme {

  ul {
    background-color: @gray17;
    color: @gray2;
  }
  .icon {
    stroke: @gray2;
  }
  a {
    color: @gray2;
    &:hover {
      background-color: @gray18;
    }
  }
  .main-icon {
    stroke: @gray7;
  }
  .active {
    background-color: @gray19;
  }

  .children {
    color: @gray5;
    background-color: @gray19;
    font-size: 17px;
  }
}

.lightTheme {
  ul {
    background-color: #E2E8ED;
  }
  a {
    color: #2c404c;
    &:hover {
      background-color: @gray4;
    }
  }
  .main-icon {
    stroke: @gray10;
  }
  .active {
    background-color: @gray5;
  }
  .children {
    font-size: 17px;
  }
}
  .context-browser {
    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    a {
      font-size: 25px;
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      line-height: 2em;
      cursor: pointer;
      padding: 13px 15px;
      border-top: 2px solid transparent;
      transition: background-color .5s, border-color .5s;
    }
    .icon {
      width: 30px;
      height: 30px;
    }

    .main-icon {
      font-size: 20px;
      padding: 6px 5px 11px 0;
      > .icon {
        margin: 0 20px;
      }
    }

    .more-indicator {
      margin-top: 6px;
      margin-left: 3px;
      float: right;
      width: 20px;
      height: 20px;
    }
    .hide {
      display: none;
    }
    // *** STATE: Collapsed *** //
    .collapsed-state {
      box-shadow: 0 2px 4px rgba(0,0,0,.2);
      ul {
        min-width: 420px;
      }
      .flex {
        display: flex;
        li:first-child {
          z-index: 5;
        }
      }

      ul.children {
        position: relative;
        top: 59px;
        display: block;
      }
    }
  }
</style>
