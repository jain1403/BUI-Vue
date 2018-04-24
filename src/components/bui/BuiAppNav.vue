<template>
  <nav class="app-nav" :class="{darkTheme: darkTheme, lightTheme: !darkTheme}">
    <!-- STATE: Horizontal, NOT COLLAPSED -->
    <section v-if="!collapsed && !this.vertical" class="horizontal-state">
      <ul>
        <li v-for="(item, index) in items">
          <!-- Doesn't have children -->
          <router-link
            v-if="!item.children"
            :to="item.to"
            :replace="item.replace"
            :append="item.append"
            :tag="item.tag || 'a'"
            :active-class="item.activeClass || 'router-link-active'"
            :exact="item.exact"
            :event="item.event || ['click']"
            :exact-active-class="item.exactActiveClass || 'router-link-exact-active'"
            v-on:click.native="manageDropdownState(true, false)"
          >
            <bui-icon v-if="item.icon" :icon="item.icon" class="icon"></bui-icon>
            {{item.label}}
          </router-link>

          <!-- Has children -->
          <a v-if="item.children" v-on:click.stop="toggleChild(index)" :class="{hasActiveChild: activeChild === 'DD-'+index}">
            <bui-icon v-if="item.icon" :icon="item.icon" class="icon"></bui-icon>
            {{item.label}}
            <bui-icon icon="px-utl:chevron" class="more-indicator"></bui-icon>
          </a>

          <!-- Child Links -->
          <ul v-if="item.children" :class="{hide: showDropdown !== index}" class="children" v-click-outside="horizontalCloseEvent">
            <li v-for="child in item.children">
              <router-link
                :to="child.to"
                :replace="child.replace"
                :append="child.append"
                :tag="child.tag || 'a'"
                :active-class="child.activeClass || 'router-link-active'"
                :exact="child.exact"
                :event="child.event || ['click']"
                :exact-active-class="child.exactActiveClass || 'router-link-exact-active'"
                v-on:click.native="manageDropdownState(true, false)"
              >
                {{child.label}}
              </router-link>
            </li>
          </ul>
        </li>
        <!-- OPTIONAL: Slot for actions  -->
        <li v-if="$slots.actions" class="actions">
          <slot name="actions"></slot>
        </li>
      </ul>
    </section>
    <!-- STATE: Horizontal, COLLAPSED -->
    <section v-if="collapsed && !this.vertical" class="collapsed-state">
      <ul class="flex">
        <!-- Selected Link -->
        <!-- REMOVED FOR EVN CATALOG -->
        <!-- <bui-icon v-if="selected.icon || items[0].icon" :icon="selected.icon || items[0].icon" class="icon"></bui-icon> -->
        <!-- OPTIONAL: Main Icon -->
        <li v-if="mainIcon">
          <!-- EVN CATALOG SPECIFIC: class set to invisible when the Main App Nav is active so that
            Context Nav Icon does not appear inside dropdown -->
          <a class="main-icon" @click.stop="toggleShowContent">
            <bui-icon v-if="showContent" :icon="mainIcon.hide" class="icon"></bui-icon>
            <bui-icon v-if="!showContent" :icon="mainIcon.show" class="icon"></bui-icon>
            <!-- EVN CATALOG SPECIFIC: If Nav item has children, then the text shown will be from
              route.meta.parentName defined in the vue-router -->
            <span v-if="showLabels">
              {{ $route.name || $route.meta.parentName }}
            </span>
          </a>
        </li>
        <li v-if="!mainIcon">
          <a @click.stop="showContent = !showContent">
            <bui-icon v-if="selected.icon || items[0].icon" :icon="selected.icon || items[0].icon" class="icon"></bui-icon>
            {{selected.label || items[0].label}}
            <bui-icon icon="px-utl:chevron" class="more-indicator"></bui-icon>
          </a>
        </li>
        <li v-show="showContent" v-click-outside="collapsedCloseEvent" style="position: absolute; z-index:1;">
          <!-- Parent Links -->
          <ul class="children">
            <li v-for="(item, index) in items">
              <!-- Parents with children -->
              <section v-if="item.children">
                <a v-on:click="toggleChild(index)" :class="{hasActiveChild: activeChild === 'DD-'+index}">
                  <bui-icon v-if="item.icon" :icon="item.icon" class="icon"></bui-icon>
                  {{item.label}}
                  <bui-icon icon="px-utl:chevron" class="more-indicator"></bui-icon>
                </a>
                  <!-- Child Links -->
                <ul :class="{hide: showDropdown !== index, hasActiveChild: activeChild === 'DD-'+index}" class="nestedChildren">
                  <li v-for="child in item.children">
                    <router-link
                      :to="child.to"
                      :replace="child.replace"
                      :append="child.append"
                      :tag="child.tag || 'a'"
                      :active-class="child.activeClass || 'router-link-active'"
                      :exact="child.exact"
                      :event="child.event || ['click']"
                      :exact-active-class="child.exactActiveClass || 'router-link-exact-active'"
                      v-on:click.native="manageDropdownState(false, true)"
                      >
                      {{child.label}}
                    </router-link>
                  </li>
                </ul>
              </section>
              <!-- Parents with out children -->
              <section v-if="!item.children">
                <router-link
                  :to="item.to"
                  :replace="item.replace"
                  :append="item.append"
                  :tag="item.tag || 'a'"
                  :active-class="item.activeClass || 'router-link-active'"
                  :exact="item.exact"
                  :event="item.event || ['click']"
                  :exact-active-class="item.exactActiveClass || 'router-link-exact-active'"
                  v-on:click.native="manageDropdownState(true, true)"
                  >
                  <bui-icon v-if="item.icon" :icon="item.icon" class="icon"></bui-icon>
                  {{item.label}}
                  <bui-icon v-if="item.children" icon="px-utl:chevron" class="more-indicator"></bui-icon>
                </router-link>
              </section>

            </li>
          </ul>
        </li>
        <!-- OPTIONAL: Slot for actions  -->
        <li v-if="$slots.actions" class="actions">
          <slot name="actions"></slot>
        </li>
      </ul>
    </section>
    <!-- STATE: Vertical Nav -->
    <section v-if="this.vertical" class="vertical-state">
      <ul @mouseover="openVNav = true" @mouseleave="openVNav = false">
        <li v-for="(item, index) in items">
          <!-- Parents with children -->
          <section v-if="item.children">
            <a v-on:click="toggleChild(index)" :class="{hasActiveChild: activeChild === 'DD-'+index}">
              <bui-icon v-if="item.icon" :icon="item.icon" class="icon"></bui-icon>
              <div v-if="openVNav" class="labelContainer">
              {{item.label}}
                <bui-icon icon="px-utl:chevron" class="more-indicator"></bui-icon>
              </div>
            </a>
              <!-- Child Links -->
            <ul v-if="openVNav" :class="{hide: showDropdown !== index, hasActiveChild: activeChild === 'DD-'+index}" class="nestedChildren">
              <li v-for="child in item.children">
                <router-link
                  :to="child.to"
                  :replace="child.replace"
                  :append="child.append"
                  :tag="child.tag || 'a'"
                  :active-class="child.activeClass || 'router-link-active'"
                  :exact="child.exact"
                  :event="child.event || ['click']"
                  :exact-active-class="child.exactActiveClass || 'router-link-exact-active'"
                  v-on:click.native="manageDropdownState(false, false)"
                  >
                  <div class="labelContainer">
                    {{child.label}}
                  </div>
                </router-link>
              </li>
            </ul>
          </section>
          <!-- Parents with out children -->
          <section v-if="!item.children">
            <router-link
              :to="item.to"
              :replace="item.replace"
              :append="item.append"
              :tag="item.tag || 'a'"
              :active-class="item.activeClass || 'router-link-active'"
              :exact="item.exact"
              :event="item.event || ['click']"
              :exact-active-class="item.exactActiveClass || 'router-link-exact-active'"
              v-on:click.native="manageDropdownState(true, false)"
              >
              <bui-icon v-if="item.icon" :icon="item.icon" class="icon"></bui-icon>
              <transition name="slide" mode="out-in">
                <div v-if="openVNav" class="labelContainer">
                  {{item.label}}
                </div>
              </transition>
              <bui-icon v-if="item.children" icon="px-utl:chevron" class="more-indicator"></bui-icon>
            </router-link>
          </section>
        </li>
      </ul>
    </section>
    <!-- Window width: {{ windowWidth }} px -->
  </nav>
</template>

<script>
  import BuiIcon from 'build-ui-x/src/BuiIcon.vue'
  import ClickOutside from 'build-ui-x/src/directives/ClickOutside.js'
  import BuiTree from './BuiTree.vue'
  export default {
    name: 'bui-app-nav',
    props: {
      mainIcon: {
        type: Object,
        required: false
      },
      items: {
        type: Array, // Array of vue-router Route Objects: https://router.vuejs.org/en/api/route-object.html
        required: true
      },
      collapseAt: {
        type: String,
        default: '0'
      },
      collapseAll: {
        type: Boolean,
        default: false
      },
      vertical: {
        type: Boolean,
        default: false
      },
      darkTheme: {
        type: Boolean,
        default: false
      },
      showLabels: {
        type: Boolean,
        default: true
      },
      showContentHandler: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        windowWidth: 0,
        collapsed: false,
        showDropdown: '',
        openVNav: false
      }
    },
    computed: {
      showContent: function () {
        return this.showContentHandler
      },
      activeChild: function () {
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].children) {
            for (var j = 0; j < this.items[i].children.length; j++) {
              if (this.items[i].children[j].to.path === this.$route.path) {
                return 'DD-' + i
              }
            }
          }
        }
        return ''
      },
      selected: function () {
        if (this.collapsed) {
          for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].to.path === this.$route.path) {
              return this.items[i]
            } else if (this.items[i].children) {
              for (var j = 0; j < this.items[i].children.length; j++) {
                if (this.items[i].children[j].to.path === this.$route.path) {
                  return this.items[i]
                }
              }
            }
          }
        } else {
          return {}
        }
      }
    },
    mounted () {
      this.$nextTick(function () {
        /** Creates an event listener of window width to track window size **/
        window.addEventListener('resize', this._handleResize)
        // Init
        this._handleResize()
      })
    },
    watch: {
      /** When collapseAt or collapseAll value changes _handleResize is
       ** triggered to see if app needs to collapse
       **/
      collapseAt: function () {
        this._handleResize()
      },
      collapseAll: function () {
        this._handleResize()
      }
    },
    methods: {
      /** EVN CATALOG SPECIFIC, Horizontal State Method:
       ** Toggles the state of showContent
       ** -Emits event to parent component that will handle toggling the
       **  the value of showContentHandler
       ** -Sets the value of showContent to showContentHandler
       **/
      toggleShowContent () {
        this.$emit('clicked-toggle-show-content')
      },
      /** Horizontal State Method:
       ** Manages nav bar state when user selects a link.
       ** -Sets showDropdown to an empty string that will close any open dropdowns
       ** -Sets activeChild to DD-{dropdown index}.  If link selected by user is a
       ** sublink, the parent will be highlighted
       **/
      manageDropdownState (closeChildLinks, closeCollapsedLinks) {
        if (closeChildLinks) {
          this.showDropdown = ''
        }
        if (closeCollapsedLinks) {
          this.$emit('clicked-set-show-content', false)
          this.$emit
        }
      },
      /** UPDATED FOR EVN CATALOG
       ** -Emits event to parent component to set showContent to false
       ** Method is called when the click-outside custom directive
       ** detects the user has clicked away from the collapsed nav dropdown
       **/
      collapsedCloseEvent (event) {
        this.$emit('clicked-set-show-content', false)
        this.$emit
      },
      /** Method is called when the click-outside custom directive
       ** detects the user has clicked away from the horizontal nav dropdown
       **/
      horizontalCloseEvent (event) {
        this.showDropdown = ''
      },
      /**
     * Called when the event listener notifies that the element that its
     * parent container size may have changed.
     *
     * Size changed events will be collapsed to only trigger a new measurement
     * every 100ms. If the menu is currently collapsed, measure events
     * will not be triggered.
     */
      _handleResize (event) {
        if (this.vertical) return
        this.windowWidth = document.getElementsByClassName('app-nav')[0].clientWidth
        if (this.collapseAll) {
          this.collapsed = true
        } else if (this.windowWidth <= this.collapseAt) {
          this.collapsed = true
        } else {
          this.collapsed = false
        }
      },
      /**
       ** When user clicks nav item that has children it will toggle open children.
       ** If user clicks nav item thats children are already being shown it will toggle closed.
       ** If user clicks nav item that has children and a different parent nav is open, it will close
       ** open nav and open targets children.
       **/
      toggleChild (index) {
        if (this.showDropdown === index) {
          this.showDropdown = ''
        } else {
          this.showDropdown = index
        }
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
  }
  .icon {
    stroke: @gray2;
  }
  a {
    color: @gray2;
    &:hover {
      background-color: @gray12;
    }
  }
  .horizontal-state {
    .children {
      a {
        &.router-link-exact-active {
          color: #fff;
          background-color: #09819c;
          border-top: none;
        }
      }
    }
    a{
      &.router-link-exact-active {
        background-color: @gray9;
        border-top: 2px solid #09819C;
      }
    }
    .hasActiveChild{
      background-color: @gray9;
      border-top: 2px solid #09819C;
    }
  }
  .vertical-state {
    a {
      &.router-link-exact-active {
        background-color: @gray9;
        border-left: 2px solid #09819C;
      }
    }
    .nestedChildren {
      a {
        &.router-link-exact-active {
          color: #fff;
          background-color: #09819c;
          border-top: none;
        }
      }
    }
    .hasActiveChild{
      background-color: @gray9;
      border-left: 2px solid #09819C;
    }
  }
  .collapsed-state {
    .nestedChildren {
      a {
        &.router-link-exact-active {
          color: #fff;
          background-color: #09819c;
          border-top: none;
        }
      }
    }
    a {
      &.router-link-exact-active {
        background-color: @gray9;
        border-left: 2px solid #09819C;
      }
    }
    .hasActiveChild{
      background-color: @gray9;;
      border-left: 2px solid #09819C;
    }
  }
}
.lightTheme {
  ul {
    background-color: #E2E8ED;
  }
  a {
    color: #2c404c;
    &:hover {
      background-color: #C5D1D8;
    }
  }
  .horizontal-state {
    .children {
      background-color: #fff;
      a {
        &.router-link-exact-active {
          color: #fff;
          background-color: #09819c;
          border-top: none;
        }
      }
    }
    a{
      &.router-link-exact-active {
        background-color: #fff;
        border-top: 2px solid #09819C;
      }
    }
    .hasActiveChild{
      background-color: #fff;
      border-top: 2px solid #09819C;
    }
  }
  .vertical-state {
    a {
      &.router-link-exact-active {
        background-color: #fff;
        border-left: 2px solid #09819C;
      }
    }
    .nestedChildren {
      a {
        &.router-link-exact-active {
          color: #fff;
          background-color: #09819c;
          border-top: none;
        }
      }
    }
    .hasActiveChild{
      background-color: #fff;
      border-left: 2px solid #09819C;
    }
  }
  .collapsed-state {
    .nestedChildren {
      a {
        &.router-link-exact-active {
          color: #fff;
          background-color: #09819c;
          border-top: none;
        }
      }
    }
    a {
      &.router-link-exact-active {
        background-color: #fff;
        border-left: 2px solid #09819C;
      }
    }
    .hasActiveChild{
      background-color: #fff;
      border-left: 2px solid #09819C;
    }
  }
}
  .app-nav {
    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
    li {
      &.actions {
        text-align: right;
        flex: 1 0 auto;
      }
    }
    a {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      line-height: 2em;
      font-size: 15px;
      //color: #2c404c;
      cursor: pointer;
      padding: 13px 15px;
      border-top: 2px solid transparent;
      transition: background-color .5s, border-color .5s;
    }
    .icon {
      width: 30px;
      height: 30px;
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
        min-width: 320px;
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
      .nestedChildren {
        display: block;
        a {
          height: 30px;
          padding-left: 3.66667rem;
          padding-top: 0px;
          padding-bottom: 0px;
        }
      }
    }
    // *** STATE: Horizontal *** //
    .horizontal-state {
      box-shadow: 0 2px 4px rgba(0,0,0,.2);
      ul {
        width: 100%;
        display: flex;
        box-shadow: 0 3px 4px rgba(0,0,0,.2);
      }
      .children {
        position: absolute;
        flex-direction: column;
        a {
          border-top: 0;
          padding-top: 0px;
          padding-bottom: 0px;
        }
      }
      > ul > li {
        height: 59px;
      }
      ul.children {
        position: relative;
      }
    }
    // *** STATE: Vertical *** //
    .vertical-state {
      box-shadow: 0 2px 4px rgba(0,0,0,.2);
      width: fit-content;
      .labelContainer {
        padding: 0 5px;
        min-width: 258px;
      }
      ul {
        width: fit-content;
      }
      .nestedChildren {
        width: inherit;
        display: block;
        a {
          height: 30px;
          padding-left: 3.66667rem;
          padding-top: 0px;
          padding-bottom: 0px;
        }
      }
      a {
        display: flex;
      }
      .slide-enter-active, .slide-leave-active {
        transition: opacity .3s ease;
      }
      .slide-enter, .slide-leave-to {
        opacity: 0;
      }
    }
  }
</style>
