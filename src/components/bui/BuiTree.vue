<template>
  <ul class="tree list-unstyled">
    <bui-tree-item
      :item="item"
      v-for="(item, index) in items"
      :key="index"
      v-on:leaf-clicked="handleLeafClicked"
      :multiActive="multiActive"
      :multiSelect="multiSelect"
      :disableBranchSelect="disableBranchSelect"
    ></bui-tree-item>
  </ul>
</template>

<style scoped lang="less">

</style>

<script>
  import BuiTreeItem from './BuiTreeItem.vue'

  export default {
    name: 'bui-tree',
    props: {
      multiActive: { // Multiple branches open
        type: Boolean,
        default: true
      },
      multiSelect: { // Multiple leafs selected
        type: Boolean,
        default: true
      },
      disableBranchSelect: { // Able to select branch if it has children
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        default: []
      }
    },
    methods: {

      handleLeafClicked (val) {
        this.$emit('leaf-clicked', val)
      }
    },
    components: {
      BuiTreeItem
    }
  }
</script>
