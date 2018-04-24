import Vue from 'vue'
import Router from 'vue-router'
import CatalogPage from '@/components/catalog/CatalogPage'
import MyDashboardPage from '@/components/catalog/MyDashboardPage'
import TDPage from '@/components/catalog/TDPage'
import GenerationPage from '@/components/catalog/GenerationPage'
import ConsumptionPage from '@/components/catalog/ConsumptionPage'
import PipelinePage from '@/components/PipelinePage'
import ReportsPage from '@/components/ReportsPage'
import AnalyticPage from '@/components/AnalyticPage'
import TestBenchPage from '@/components/TestBenchPage'
import CoveragePage from '@/components/CoveragePage'
import DocumentsPage from '@/components/DocumentsPage'
import SettingsPage from '@/components/SettingsPage'
import EngagementPage from '@/components/EngagementPage'
import EngagementInfo from '@/components/EngagementInfo'
import PrepareData from '@/components/PrepareData'
import Recommendations from '@/components/Recommendations'
// import MainCoveragePage from '@/components/MainCoveragePage'

Vue.use(Router)

export default new Router({
  hashbang: false,
  mode: 'history', // HTML5 Mode
  redirect: '/catalog',
  routes: [
    {
      path: '/',
      redirect: '/catalog'
    },
    {
      path: '/callback',
      redirect: '/catalog'
    },
    {
      path: '/catalog',
      name: 'Analytics Catalog',
      component: CatalogPage,
      children: [
        {
          path: '',
          meta: {
            parentName: 'Analytics Catalog',
            displayName: 'My Dashboard'
          },
          component: MyDashboardPage
        },
        {
          path: 'generation',
          meta: {
            parentName: 'Analytics Catalog',
            displayName: 'Generation'
          },
          component: GenerationPage
        },
        {
          path: 'td',
          meta: {
            parentName: 'Analytics Catalog',
            displayName: 'T & D'
          },
          component: TDPage
        },
        {
          path: 'consumption',
          meta: {
            parentName: 'Analytics Catalog',
            displayName: 'Consumption'
          },
          component: ConsumptionPage
        }
      ]
    },
    {
      path: '/pipeline',
      name: 'Analytics Pipeline',
      component: PipelinePage
    },
    {
      path: '/catalog',
      name: 'Catalog',
      component: CatalogPage
    },
    {
      path: '/reports',
      name: 'Reports/Lists',
      component: ReportsPage
    },
    {
      path: '/analytic',
      name: 'Create/Add Analytics',
      component: AnalyticPage
    },
    {
      path: '/testbench',
      name: 'Test Bench',
      component: TestBenchPage
    },
    {
      path: '/coverage',
      name: 'Analytics Coverage Advisor (MVP)',
      component: CoveragePage
    },
    {
      path: '/engagementPage',
      name: 'Analytics Coverage Advisor (MVP)',
      component: EngagementPage,
      children: [
        {
          path: 'engagementInfo',
          meta: {
            parentName: 'Analytics Coverage Advisor (MVP)',
            displayName: 'Engagement Info'
          },
          component: EngagementInfo
        },
        {
          path: 'prepareData',
          meta: {
            parentName: 'Analytics Coverage Advisor (MVP)',
            displayName: 'Prepare Data'
          },
          component: PrepareData
        },
        {
          path: 'recommendations',
          meta: {
            parentName: 'Analytics Coverage Advisor (MVP)',
            displayName: 'Recommendations'
          },
          component: Recommendations
        }
      ]
    },
    {
      path: '/documents',
      name: 'Reference Documents',
      component: DocumentsPage
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsPage
    }
  ]
})
