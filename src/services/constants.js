
const BASE_URL = 'https://evn-catalog-service.run.aws-usw02-pr.ice.predix.io'
const CATALOG = '/v1/evn/catalog'
const LOCAL = 'http://3.209.34.55:8017'

export default {
  rest: {
    FUEL_TYPES: BASE_URL + CATALOG + '/coverages',
    ASSETS: BASE_URL + CATALOG + '/coverages/assets',
    SYSTEMS: BASE_URL + CATALOG + '/coverages/systems',
    SUBSYSTEMS: BASE_URL + CATALOG + '/coverages/subsystems',
    ANALYTICS: BASE_URL + CATALOG + '/taxonomy/getAnalyticsList',
    // CUSTOMERS: BASE_URL + '/coverageadvisor/customerEngagements',
    LOCAL_CUST: LOCAL + '/coverageadvisor/customerEngagements'
  }
}
