import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/reg-hint',
    name: 'reg-hint',
    component: () => import('@/views/register/reg-hint'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    hidden: true, // 不在侧边栏线上
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Home', icon: 'dashboard' }
    }]
  },

  {
    path: '/account-confirm',
    name: 'account-confirm',
    component: () => import('@/views/account/account-confirm/index'),
    hidden: true
  },

  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/login/forgot-password'),
    hidden: true
  },

  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/login/reset-password'),
    hidden: true
  },


  // ACCOUNT功能
  {
    path: '/account',
    component: Layout,
    redirect: '/account/my-account',
    name: 'ACCOUNT',
    meta: { title: 'ACCOUNT', icon: 'account' },
    children: [
      {
        path: 'my-account',
        name: 'my-account',
        component: () => import('@/views/account/my-account/index'),
        meta: { title: 'My Account' }
      },
      {
        path: 'add-sub-account',
        name: 'add-sub-account',
        component: () => import('@/views/account/add-sub-account/index'),
        meta: { title: 'Add Sub Account' }
      },
      {
        path: 'change-password',
        name: 'change-password',
        component: () => import('@/views/account/change-password/index'),
        meta: { title: 'Change Password' }
      },
      {
        path: 'company-profile',
        name: 'company-profile',
        component: () => import('@/views/account/company-profile/index'),
        meta: { title: 'Company Profile' }
      }
      // {
      //   path: '/login',
      //   name: 'log-out',
      //   component: () => import('@/views/login/index'),
      //   meta: { title: 'Log Out' }
      // }
    ]
  },

  // PROJECTS
  {
    path: '/projects',
    component: Layout,
    redirect: '/projects/project',
    name: 'projects',
    alwaysShow: true,
    meta: { title: 'PROJECTS', icon: 'projects' },
    children: [
      {
        path: 'project',
        name: 'project',
        component: () => import('@/views/projects/projects/index'),
        meta: { title: 'Projects' }
      },
      {
        path: 'project-qualitative',
        name: 'project-qualitative',
        hidden:'true',
        component: () => import('@/views/projects/projects-qualitative/index'),
        meta: { title: 'Qualitative' }
      },
      {
        path: 'project-quantitative',
        name: 'project-quantitative',
        hidden:'true',
        component: () => import('@/views/projects/projects-quantitative/index'),
        meta: { title: 'Quantitative' }
      }

    ]
  },

  // QUICK QUOTE
  {
    path: '/quick-quote',
    component: Layout,
    name: 'quick-quote',
    // alwaysShow: true,
    redirect: '/quick-quote/new-enquiry',
    meta: { title: 'QUICK QUOTE', icon: 'quote' },
    children: [
      {
        path: 'new-enquiry',
        name: 'new-enquiry',
        component: () => import('@/views/quick-quote/new-enquiry/create-quote'),
        meta: { title: 'New Enquiry' }
      },
      {
        path: 'set-quote-background',
        name: 'set-quote-background',
        hidden:true,
        component: () => import('@/views/quick-quote/new-enquiry/set-quote-background'),
        meta: { title: 'Set Project Overview' }
      },
      {
        path: 'set-methodology',
        name: 'set-methodology',
        hidden:true,
        component: () => import('@/views/quick-quote/new-enquiry/set-methodology'),
        meta: { title: 'Set Methodology' }
      },
      {
        path: 'set-project-market',
        name: 'set-project-market',
        hidden:true,
        component: () => import('@/views/quick-quote/new-enquiry/set-project-market'),
        meta: { title: 'Set Project Market' }
      },
      {
        path: 'set-quantitative-fieldwork',
        name: 'set-quantitative-fieldwork',
        hidden:true,
        component: () => import('@/views/quick-quote/new-enquiry/set-quantitative-fieldwork'),
        meta: { title: 'Set Quantitative Fieldwork' }
      },
      {
        path: 'set-quantitative-additional',
        name: 'set-quantitative-additional',
        hidden:true,
        component: () => import('@/views/quick-quote/new-enquiry/set-quantitative-additional'),
        meta: { title: 'Set Quantitative Additional Services' }
      },
      {
        path: 'set-qualitative-additional',
        name: 'set-qualitative-additional',
        hidden:true,
        component: () => import('@/views/quick-quote/new-enquiry/set-qualitative-additional'),
        meta: { title: 'Set Qualitative Additional Services' }
      },
      {
        path: 'set-qualitative-fieldwork',
        name: 'set-qualitative-fieldwork',
        hidden:true,
        component: () => import('@/views/quick-quote/new-enquiry/set-qualitative-fieldwork'),
        meta: { title: 'Set Qualitative Fieldwork' }
      },
      {
        path: 'project-review',
        name: 'project-review',
        hidden:true,
        component: () => import('@/views/quick-quote/new-enquiry/review'),
        meta: { title: 'Review' }
      },
      {
        path: 'quota-preview',
        name: 'quota-preview',
        hidden:true,
        component: () => import('@/views/quick-quote/new-enquiry/quota-preview'),
        meta: { title: 'Quota Preview' }
      },
      {
        path: 'preliminary-quotation',
        name: 'preliminary-quotation',
        hidden:true,
        component: () => import('@/views/quick-quote/new-enquiry/preliminary-quotation'),
        meta: { title: 'Preliminary Quotation' }
      },
      {
        path: 'working-quotes',
        name: 'working-quotes',
        component: () => import('@/views/quick-quote/working-quotes/index'),
        meta: { title: 'Working Quotes' }
      },
      {
        path: 'previous-quotes',
        name: 'previous-quotes',
        component: () => import('@/views/quick-quote/previous-quotes/index'),
        meta: { title: 'Previous Quotes' }
      }
    ]
  },

  // SURVEY PLATFORM
  {
    path: '/survey-platform',
    component: Layout,
    name: 'survey-platform',
    // alwaysShow: true,
    meta: { title: 'SURVEY PLATFORM', icon: 'survey' },
    children: [
      {
        path: 'create-new-survey',
        name: 'create-new-survey',
        component: () => import('@/views/survey-platform/create-new-survey/index'),
        meta: { title: 'Create New Survey' }
      },
      {
        path: 'working-surveys',
        name: 'working-surveys',
        component: () => import('@/views/survey-platform/working-surveys/index'),
        meta: { title: 'Working Surveys' }
      },
      {
        path: 'completed-surveys',
        name: 'completed-surveys',
        component: () => import('@/views/survey-platform/completed-surveys/index'),
        meta: { title: 'Completed Surveys' }
      },
      {
        path: 'tech-support',
        name: 'tech-support',
        component: () => import('@/views/survey-platform/tech-support/index'),
        meta: { title: 'Tech Support' }
      },
      {
        path: 'customer-support',
        name: 'customer-support',
        component: () => import('@/views/survey-platform/customer-support/index'),
        meta: { title: 'Customer Support' }
      }
    ]
  },

  // BILLING
  {
    path: '/billing',
    component: Layout,
    name: 'billing',
    // alwaysShow: true,
    meta: { title: 'BILLING', icon: 'billing' },
    children: [
      {
        path: 'payment-information',
        name: 'payment-information',
        component: () => import('@/views/billing/payment-information/index'),
        meta: { title: 'Payment Information' }
      },
      {
        path: 'project-invoices',
        name: 'project-invoices',
        component: () => import('@/views/billing/project-invoices/index'),
        meta: { title: 'Project Invoices' }
      },
      {
        path: 'payment-status',
        name: 'payment-status',
        component: () => import('@/views/billing/payment-status/index'),
        meta: { title: 'Payment Status' }
      }
    ]
  },

  // DOWNLOAD
  {
    path: '/download',
    component: Layout,
    name: 'download',
    // alwaysShow: true,
    meta: { title: 'DOWNLOAD', icon: 'download' },
    children: [
      {
        path: 'recent-project-materials',
        name: 'recent-project-materials',
        component: () => import('@/views/download/recent-project-materials/index'),
        meta: { title: 'Recent Project Materials' }
      },
      {
        path: 'project-material-archive',
        name: 'project-material-archive',
        component: () => import('@/views/download/project-material-archive/index'),
        meta: { title: 'Project Material Archive' }
      },
      {
        path: 'research-reports',
        name: 'research-reports',
        component: () => import('@/views/download/research-reports/index'),
        meta: { title: 'Research Reports' }
      },
      {
        path: 'case-studies',
        name: 'case-studies',
        component: () => import('@/views/download/case-studies/index'),
        meta: { title: 'Case Studies' }
      },
      {
        path: 'newsletter-subscription',
        name: 'newsletter-subscription',
        component: () => import('@/views/download/newsletter-subscription/index'),
        meta: { title: 'Newsletter Subscription' }
      },
      {
        path: 'qa-protocols',
        name: 'qa-protocols',
        component: () => import('@/views/download/qa-protocols/index'),
        meta: { title: 'QA Protocols' }
      },
      {
        path: 'credentials',
        name: 'credentials',
        component: () => import('@/views/download/credentials/index'),
        meta: { title: 'Credentials' }
      },
      {
        path: 'agreements',
        name: 'agreements',
        component: () => import('@/views/download/agreements/index'),
        meta: { title: 'Agreements（NDA/MSA）' }
      }

    ]
  },

  // SUPPORT
  {
    path: '/support',
    component: Layout,
    name: 'support',
    // alwaysShow: true,
    meta: { title: 'SUPPORT', icon: 'support' },
    children: [
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/support/qa/index'),
        meta: { title: 'Q&A' }
      },
      {
        path: 'contact-person',
        name: 'contact-person',
        component: () => import('@/views/support/contact-person/index'),
        meta: { title: 'Contact Person' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    hidden: true, // 不在侧边栏线上
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    hidden: true, // 不在侧边栏线上
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    hidden: true, // 不在侧边栏线上
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    hidden: true, // 不在侧边栏线上
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
   //mode: 'history', // require service support
  // mode:'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
