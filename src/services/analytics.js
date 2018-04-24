import axios from 'axios'
import constants from './constants'
// import customerJson from '../assets/customer.json'

// const BASE_URL = 'https://evn-catalog-service-qa.run.aws-usw02-pr.ice.predix.io/api/v1'

export default {
  getAnalyticsList (selected) {
    return axios.get(constants.rest.ANALYTICS)
      .then(response => {
        var analytics = []
        if (selected.subSystemId) {
          response.data.body.forEach((analytic) => {
            if (selected.subSystemId === analytic.subsystem_id &&
              selected.systemId === analytic.system_id &&
              selected.assetId === analytic.assetid &&
              selected.fuelId === analytic.fuelid) {
              analytics.push(analytic)
            }
          })
        } else if (selected.systemId) {
          response.data.body.forEach((analytic) => {
            if (selected.systemId === analytic.system_id &&
              selected.assetId === analytic.assetid &&
              selected.fuelId === analytic.fuelid) {
              analytics.push(analytic)
            }
          })
        } else if (selected.assetId) {
          response.data.body.forEach((analytic) => {
            if (selected.assetId === analytic.assetid &&
              selected.fuelId === analytic.fuelid) {
              analytics.push(analytic)
            }
          })
        } else {
          response.data.body.forEach((analytic) => {
            if (selected.fuelId === analytic.fuelid) {
              analytics.push(analytic)
            }
          })
        }
        return analytics
      })
      .catch(e => {
        console.log(e)
      })
  },
  getAllFuelCoverage () {
    return axios.get(constants.rest.FUEL_TYPES)
      .then(response => {
        return response.data.fuelCoverage
      })
      .catch(e => {
        console.log(e)
      })
  },
  getFuelCoverageById (fuelId) {
    return axios.get(constants.rest.FUEL_TYPES + '/' + fuelId)
      .then(response => {
        return response.data.fuelCoverage[0]
      })
      .catch(e => {
        console.log(e)
      })
  },
  getAllAssetCoverage (fuelId) {
    return axios.get(constants.rest.ASSETS + '?fuelId=' + fuelId)
      .then(response => {
        return response.data.assetAnalyticCoverage
      })
      .catch(e => {
        console.log(e)
      })
  },
  getAssetCoverageById (fuelId, assetId) {
    return axios.get(constants.rest.ASSETS + '/' + fuelId + '/' + assetId)
      .then(response => {
        return response.data.coverageForAnAsset[0]
      })
      .catch(e => {
        console.log(e)
      })
  },
  getAllSystemCoverage (fuelId, assetId) {
    return axios.get(constants.rest.SYSTEMS + '?fuelId=' + fuelId + '&assetId=' + assetId)
      .then(response => {
        return response.data.systemAnalyticCoverage
      })
      .catch(e => {
        console.log(e)
      })
  },
  getSystemCoverageById (fuelId, assetId, systemId) {
    return axios.get(constants.rest.SYSTEMS + '/' + fuelId + '/' + systemId)
      .then(response => {
        return response.data.coverageForSystem[0]
      })
      .catch(e => {
        console.log(e)
      })
  },
  getAllSubsystemCoverage (fuelId, assetId, systemId) {
    return axios.get(constants.rest.SUBSYSTEMS + '?fuelId=' + fuelId + '&assetId=' +
      assetId + '&systemId=' + systemId)
      .then(response => {
        return response.data.subSystemAnalyticCoverage
      })
      .catch(e => {
        console.log(e)
      })
  },
  getSubsystemCoverageById (fuelId, assetId, systemId, subSystemId) {
    return axios.get(constants.rest.SUBSYSTEMS + '/' + fuelId + '/' + subSystemId)
      .then(response => {
        return response.data.coverageForSubsystem[0]
      })
      .catch(e => {
        console.log(e)
      })
  },
  getCustomerData () {
    // return customerJson
    return axios.get(constants.rest.LOCAL_CUST)
    .then(response => {
      return response.data
    })
    .catch(e => {
      console.log(e)
    })
  }
}
