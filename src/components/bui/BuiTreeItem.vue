<template>
  <div is="li">
    <a href="#" @click.prevent="leafClickHandler" :class="classNames">

      {{item.label}}
      <span style="float:right;">
        <bui-icon :icon="toggleIcon" v-if="item.children"></bui-icon>
      </span>
    </a>
    <ul v-if="item.children && isExpanded" class="list-unstyled">
      <bui-tree-item :item="child" v-for="(child, index) in item.children" :key="index" v-on:leaf-clicked="childClickHandler"></bui-tree-item>
    </ul>
  </div>
</template>

<style scoped lang="less">
@import '~build-ui/src/styles/px-colors.less';

  .darkTheme {
    a {
      &:hover {
        background-color: @gray18;
      }
    }
  }

  .lightTheme {
    a {
      &:hover {
        background-color: @gray4;
      }
    }
  }

  a {
    padding: 5px 10px;
    display: block;
    color: inherit;
    font-size: 17px;
    font-family: "GE Inspira", ge-inspira, ge-sans;
    font-weight: bold;

    &.no-icon {
      padding-left: 10px;
    }

    &.selected {
      background-color: @select-blue-default;
    }

  }
  ul {
    margin-left: 18px;
  }
</style>

<script>
  import BuiIcon from 'build-ui-x/src/BuiIcon.vue'

  export default {
    name: 'bui-tree-item',
    props: {
      item: {
        type: Object,
        required: true
      },
      multiSelect: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        isExpanded: false
      }
    },
    computed: {
      toggleIcon () {
        return this.isExpanded ? 'px-utl:chevron' : 'px-utl:chevron-right'
      },
      classNames () {
        let classStr = ''

        classStr += this.item.children ? '' : ' no-icon'
        classStr += this.isSelected ? ' selected' : ''

        return classStr
      },
      /** UPDATED TO HANDLE MULTISELECT
       ** Reads from contextBrowserSelected in store to determine if
       ** leaf should be in selected state
       ** -If leaf value and item object match context browser, then set
       ** isSelected to true
       **/
      isSelected () {
        for (var index in this.$store.state.catalog.contextBrowserSelected) {
          if (this.$store.state.catalog.contextBrowserSelected[index].value === this.item.value &&
            this.item.item === this.$store.state.catalog.contextBrowserSelected[index].item) {
            return true
          }
        }
        return false
      }
    },
    methods: {
      toggleChildren () {
        this.isExpanded = !this.isExpanded
      },
      toggleSelected () {
        this.isSelected = !this.isSelected
      },
      leafClickHandler () {
        this.toggleChildren()

        this.$emit('leaf-clicked', {
          label: this.item.label,
          value: this.item.value,
          item: this.item.item
        })
      },
      childClickHandler (val) {
        this.bubbleLeafClicked(val)
      },
      bubbleLeafClicked (val) {
        this.$emit('leaf-clicked', val)
      }
    },
    components: {
      BuiIcon
    }
  }
</script>
