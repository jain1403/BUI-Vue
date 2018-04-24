<template>
  <div class="catalog-page" :class="{ contextShow: contextBrowserActive == true, contextHide: contextBrowserActive == false}">
    <router-view></router-view>
  </div>
</template>

<script>
import EvnContextBrowser from '../evn/EvnContextBrowser'

export default {
  name: 'catalog-page',
  computed: {
    contextBrowserActive () {
      return this.$store.state.catalog.contextBrowserShowContent
    }
  },
  components: {
    EvnContextBrowser
  }
}

</script>

<style scoped>

  .contextHide {
    padding: 20px 0 0 0;
  }

  .contextShow {
    padding: 20px 0px 20px 420px;
  }
  .page-heading {
    color: white;
  }
  .page-content {
    float: left;
    color: white;
  }
</style>
