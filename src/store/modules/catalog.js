import AnalyticsService from '../../services/analytics'

const state = {
  catalogActive: true,
  contextBrowserShowContent: false,
  contextBrowserSelected: [],
  contextBrowserItems: [],
  generationAnalyticData: [],
  generationAllAnalyticsList: [],
  generationSelectedAnalyticsList: [],
  generationSelectedScoreCard: {},
  generationSelectedCoverage: {},
  selectedCustomerData: {}
}

const getters = {
  /** Gets the index of the root name passed in the context browser **/
  CONTEXT_BROWSER_GET_INDEX_OF_ROOT_NAME: (state) => (value) => {
    for (var index in state.contextBrowserItems) {
      if (state.contextBrowserItems[index].value === value) {
        return index
      }
    }
  }
}

const mutations = {
  CONTEXT_BROWSER_SET_SHOW_CONTENT: (state, value) => {
    state.contextBrowserShowContent = value
  },
  CONTEXT_BROWSER_TOGGLE_SHOW_CONTENT: (state) => {
    state.contextBrowserShowContent = !state.contextBrowserShowContent
  },
  /** PAYLOAD FORMAT: { multiSelect, leaf} **/
   /** MULTISELECT ENABLED
    ** -If contextBrowserSelected does not contain the value already,
    ** add it (toggle on)
    ** -Else contextBrowserSelected already contains the value, so
    ** remove it (toggle off)
    ** MULTISELECT DISABLED
    ** -Only one value can be selected.  Set the value
    ** of contextBrowserSelected to new leaf selected
    **/
  CONTEXT_BROWSER_UPDATE_SELECTED: (state, payload) => {
    var selectedIndex = ''
    // Multiselect enabled
    if (payload.multiSelect) {
      for (var index in state.contextBrowserSelected) {
        if (state.contextBrowserSelected[index] === payload.leaf) {
          selectedIndex = index
          break
        }
      }
      if (selectedIndex < 0) {
        state.contextBrowserSelected.push(payload.leaf)
      } else {
        state.contextBrowserSelected.splice(selectedIndex, 1)
      }
    // Multiselect disabled
    } else {
      state.contextBrowserSelected = []
      state.contextBrowserSelected.push(payload.leaf)
    }
  },
  /** Sets the values for the roots (top level items) of
   ** the context browser
   **/
  CONTEXT_BROWSER_SET_ROOT_ITEMS: (state, items) => {
    state.contextBrowserItems = items
  },
  /** Adds a single fuel type to the context browser as a child of
   ** the Generation item
   **/
  CONTEXT_BROWSER_GENERATION_ADD_FUEL_TYPE: (state, payload) => {
    var children = state.contextBrowserItems[payload.index].children
    if (children) {
      children.push(payload.child)
    } else {
      children = []
      children.push(payload.child)
      state.contextBrowserItems[payload.index].children = children
    }
  },
  /** Adds a single asset to the context browser as a child of
   ** its corresponding fuel type
   **/
  CONTEXT_BROWSER_GENERATION_ADD_ASSET: (state, payload) => {
    var rootItem = state.contextBrowserItems[payload.rootIndex]
    var fuelItem = rootItem.children[payload.fuelIndex]
    if (fuelItem.children) {
      fuelItem.children.push(payload.child)
    } else {
      fuelItem.children = []
      fuelItem.children.push(payload.child)
    }
  },
  /** Adds a single system to the context browser as a child
   ** of its corresponding asset
   **/
  CONTEXT_BROWSER_GENERATION_ADD_SYSTEM: (state, payload) => {
    var rootItem = state.contextBrowserItems[payload.rootIndex]
    var fuelItem = rootItem.children[payload.fuelIndex]
    var assetItem = fuelItem.children[payload.assetIndex]
    if (assetItem.children) {
      assetItem.children.push(payload.child)
    } else {
      assetItem.children = []
      assetItem.children.push(payload.child)
    }
  },
  /** Adds a single subsytem to the context browser as a child
   ** of its corresponding subsystem
   **/
  CONTEXT_BROWSER_GENERATION_ADD_SUBSYSTEM: (state, payload) => {
    var rootItem = state.contextBrowserItems[payload.rootIndex]
    var fuelItem = rootItem.children[payload.fuelIndex]
    var assetItem = fuelItem.children[payload.assetIndex]
    var systemItem = assetItem.children[payload.systemIndex]
    if (systemItem.children) {
      systemItem.children.push(payload.child)
    } else {
      systemItem.children = []
      systemItem.children.push(payload.child)
    }
  },
  /** Stores the list of all analytics in the catalog
   ** -Method gets called after analytic list is retreived
   **  by REST api
   **/
  GENERATION_SET_ALL_ANALYTIC_LIST: (state, analytics) => {
    state.generationAllAnalyticsList = analytics
  },
  /** Stores the list of analytics for the unit selected in the
   ** context browser
   **/
  GENERATION_SET_SELECTED_ANALYTIC_LIST: (state, analytics) => {
    state.generationSelectedAnalyticsList = analytics
  },
  /** Stores the Asset Coverage for the selected fuel_Id
   **/
  GENERATION_SET_SELECTED_COVERAGE: (state, coverage) => {
    state.generationSelectedCoverage = coverage
  },
  /** Stores the Customer Details for the selected customer
   **/
  SET_SELECTED_CUSTOMER_DETAILS: (state, data) => {
    state.selectedCustomerData = data
  }
}

const actions = {
  CONTEXT_BROWSER_TOGGLE_SHOW_CONTENT: (context) => {
    context.commit('CONTEXT_BROWSER_TOGGLE_SHOW_CONTENT')
    if (context.state.contextBrowserShowContent) {
      context.commit('APP_NAV_SET_SHOW_CONTENT', false)
    }
  },
  /** Gets the Customer data from database using REST api
   ** -Stores the data in the state
   **/
  GET_CUSTOMER_DATA: (context) => {
    return context.commit('SET_SELECTED_CUSTOMER_DETAILS', AnalyticsService.getCustomerData())
  },
  /** Handles creation of Context Browser tree
   ** -Sets the root (top level) items
   ** -Sets the fuel types, assets, systems, and subsystems for Generation
   ** -If system has sub-system with same name as system, don't add it
   **/
  CONTEXT_BROWSER_CREATE_TREE: (context, items) => {
    return new Promise((resolve, reject) => {
      AnalyticsService.getAllFuelCoverage()
        .then(response => {
          context.commit('CONTEXT_BROWSER_SET_ROOT_ITEMS', items)
          var genIndex = context.getters.CONTEXT_BROWSER_GET_INDEX_OF_ROOT_NAME('generation')
          response.forEach((fuelType, index) => {
            context.commit('CONTEXT_BROWSER_GENERATION_ADD_FUEL_TYPE', {
              'child': {
                'label': fuelType.fuelName,
                'value': 'fuel_id_' + fuelType.fuelId,
                'item': fuelType
              },
              'index': genIndex
            })
            var fuelIndex = index
            AnalyticsService.getAllAssetCoverage(fuelType.fuelId)
              .then(response => {
                response.forEach((asset, index) => {
                  context.commit('CONTEXT_BROWSER_GENERATION_ADD_ASSET', {
                    child: {
                      'label': asset.assetName,
                      'value': 'asset_id_' + asset.assetId,
                      'item': asset
                    },
                    'rootIndex': genIndex,
                    'fuelIndex': fuelIndex
                  })
                  var assetIndex = index
                  AnalyticsService.getAllSystemCoverage(fuelType.fuelId, asset.assetId)
                    .then(response => {
                      response.forEach((system, index) => {
                        context.commit('CONTEXT_BROWSER_GENERATION_ADD_SYSTEM', {
                          child: {
                            'label': system.systemName,
                            'value': 'system_id_' + system.systemId,
                            'item': system
                          },
                          'rootIndex': genIndex,
                          'fuelIndex': fuelIndex,
                          'assetIndex': assetIndex
                        })
                        var systemIndex = index
                        AnalyticsService.getAllSubsystemCoverage(fuelType.fuelId, asset.assetId, system.systemId)
                          .then(response => {
                            response.forEach((subSystem, index) => {
                              if (subSystem.subSystemName !== system.systemName) {
                                context.commit('CONTEXT_BROWSER_GENERATION_ADD_SUBSYSTEM', {
                                  child: {
                                    'label': subSystem.subSystemName,
                                    'value': 'subsystem_id_' + subSystem.subSystemId,
                                    'item': subSystem
                                  },
                                  'rootIndex': genIndex,
                                  'fuelIndex': fuelIndex,
                                  'assetIndex': assetIndex,
                                  'systemIndex': systemIndex
                                })
                              }
                            })
                          })
                      })
                    })
                })
              })
          })
          resolve(response)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  /** Gets the list of analytics for the selected value in the
   ** context browser
   ** -If selected value is an asset, get analytics for the asset
   ** -If selected value is a fuel type, get analytics for
   ** the fuel type
   ** -If selected value is a subsystem, get analtyics for
   ** the subSystem
   ** -If selected value is a system, get analytics for the
   ** system
   **/
  GENERATION_GET_ANALYTICS_LIST_FOR_SELECTED: (context) => {
    if (context.state.contextBrowserSelected[0].item) {
      var selected = {}
      if (context.state.contextBrowserSelected[0].item.subSystemId) {
        selected.subSystemId = context.state.contextBrowserSelected[0].item.subSystemId + ''
      }
      if (context.state.contextBrowserSelected[0].item.systemId) {
        selected.systemId = context.state.contextBrowserSelected[0].item.systemId + ''
      }
      if (context.state.contextBrowserSelected[0].item.assetId) {
        selected.assetId = context.state.contextBrowserSelected[0].item.assetId + ''
      }
      if (context.state.contextBrowserSelected[0].item.fuelId) {
        selected.fuelId = context.state.contextBrowserSelected[0].item.fuelId + ''
      }
      AnalyticsService.getAnalyticsList(selected)
        .then(response => {
          context.commit('GENERATION_SET_SELECTED_ANALYTIC_LIST', response)
        })
    } else {
      context.commit('GENERATION_SET_SELECTED_ANALYTIC_LIST', [])
    }
  },
  /** Gets the Coverage for the selected value in the
   ** context browser
   ** -If selected value is an fuel, get coverage for the fuel
   ** -If selected value is an asset, get coverage for the asset
   ** -If selected value is a system, get coverage for the system
   ** -If selected value is a subsystem, get coverage for the subsystem
   **/
  GENERATION_GET_COVERAGE_FOR_SELECTED: (context) => {
    var id = ''
    var selected = context.state.contextBrowserSelected[0]
    if (selected.value.includes('fuel_id_')) {
      id = selected.value.split('fuel_id_')[1]
      context.dispatch('GENERATION_GET_FUEL_COVERAGE', id)
    } else if (selected.value.includes('asset_id_')) {
      id = selected.value.split('asset_id_')[1]
      context.dispatch('GENERATION_GET_ASSET_COVERAGE', {
        fuelId: selected.item.fuelId,
        assetId: id
      })
    } else if (selected.value.includes('subsystem_id_')) {
      id = selected.value.split('subsystem_id_')[1]
      context.dispatch('GENERATION_GET_SUBSYSTEM_COVERAGE', {
        fuelId: selected.item.fuelId,
        assetId: selected.item.assetId,
        systemId: selected.item.systemId,
        subsystemId: id
      })
    } else if (selected.value.includes('system_id_')) {
      id = selected.value.split('system_id_')[1]
      context.dispatch('GENERATION_GET_SYSTEM_COVERAGE', {
        fuelId: selected.item.fuelId,
        assetId: selected.item.assetId,
        systemId: id
      })
    } else {
      context.commit('GENERATION_SET_SELECTED_COVERAGE', '')
    }
  },
  /** Get list of analytics for the asset id passed **/
  GENERATION_GET_ASSET_ANALYTIC_LIST: (context, payload) => {
    var assetAnalytics = []
    var allAnalytics = context.state.generationAllAnalyticsList
    for (var index in allAnalytics) {
      if (allAnalytics[index].assetid === payload.assetId &&
        allAnalytics[index].fuelid === payload.fuelId) {
        assetAnalytics.push(allAnalytics[index])
      }
    }
    context.commit('GENERATION_SET_SELECTED_ANALYTIC_LIST', assetAnalytics)
  },
  /** Get list of analytics for the system id passed **/
  GENERATION_GET_SYSTEM_ANALYTIC_LIST: (context, payload) => {
    var systemAnalytics = []
    var allAnalytics = context.state.generationAllAnalyticsList
    for (var index in allAnalytics) {
      if (allAnalytics[index].system_id === parseInt(payload.systemId) &&
        allAnalytics[index].fuelid === parseInt(payload.fuelId)) {
        systemAnalytics.push(allAnalytics[index])
      }
    }
    context.commit('GENERATION_SET_SELECTED_ANALYTIC_LIST', systemAnalytics)
  },
  /** Get list of analytics for the sub-system id passed **/
  GENERATION_GET_SUBSYSTEM_ANALYTIC_LIST: (context, payload) => {
    var subSystemAnalytics = []
    var allAnalytics = context.state.generationAllAnalyticsList
    for (var index in allAnalytics) {
      if (allAnalytics[index].subsystem_id === parseInt(payload.subSystemId) &&
        allAnalytics[index].fuelid === parseInt(payload.fuelId)) {
        subSystemAnalytics.push(allAnalytics[index])
      }
    }
    context.commit('GENERATION_SET_SELECTED_ANALYTIC_LIST', subSystemAnalytics)
  },
  /** Gets the Asset Coverage Data by the fuel_id passed **/
  GENERATION_GET_FUEL_COVERAGE: (context, fuelId) => {
    AnalyticsService.getFuelCoverageById(fuelId)
      .then(response => {
        context.commit('GENERATION_SET_SELECTED_COVERAGE', response)
      })
  },
  GENERATION_GET_ASSET_COVERAGE: (context, payload) => {
    AnalyticsService.getAssetCoverageById(payload.fuelId, payload.assetId)
      .then(response => {
        context.commit('GENERATION_SET_SELECTED_COVERAGE', response)
      })
  },
  GENERATION_GET_SYSTEM_COVERAGE: (context, payload) => {
    AnalyticsService.getSystemCoverageById(payload.fuelId, payload.assetId, payload.systemId)
      .then(response => {
        context.commit('GENERATION_SET_SELECTED_COVERAGE', response)
      })
  },
  GENERATION_GET_SUBSYSTEM_COVERAGE: (context, payload) => {
    AnalyticsService.getSubsystemCoverageById(payload.fuelId, payload.assetId,
      payload.systemId, payload.subsystemId)
      .then(response => {
        context.commit('GENERATION_SET_SELECTED_COVERAGE', response)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
