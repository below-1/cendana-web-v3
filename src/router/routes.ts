import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/landing.layout.vue'),
    children: [
      { path: 'login', component: () => import('pages/auth/login.page.vue') },
      { path: 'register', component: () => import('pages/auth/register.page.vue') }
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/auth.layout.vue'),
    children: [
      { path: 'login', component: () => import('pages/auth/login.page.vue') },
      { path: 'register', component: () => import('pages/auth/register.page.vue') }
    ],
  },
  {
    path: '/app',
    component: () => import('layouts/loader.layout.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/dashboard.page.vue') },
      { path: 'change-password', component: () => import('pages/auth/change-password.page.vue') },
      { path: 'pcat', component: () => import('pages/pcat/pcat-list.page.vue') },
      { path: 'pcat/create', component: () => import('pages/pcat/pcat-create.page.vue') },
      { path: 'pcat/:id/update', component: () => import('pages/pcat/pcat-update.page.vue'), props: true },
      { path: 'ocat', component: () => import('pages/ocat/ocat-list.page.vue') },
      { path: 'ocat/create', component: () => import('pages/ocat/ocat-create.page.vue') },
      { path: 'ocat/:id/update', component: () => import('pages/ocat/ocat-update.page.vue'), props: true },
      { path: 'tcat', component: () => import('pages/tcat/tcat-list.page.vue') },
      { path: 'tcat/create', component: () => import('pages/tcat/tcat-create.page.vue') },
      { path: 'tcat/:id/update', component: () => import('pages/tcat/tcat-update.page.vue'), props: true },

      { path: 'opex', component: () => import('pages/opex/opex-list.page.vue') },
      { path: 'opex/create', component: () => import('pages/opex/opex-create.page.vue') },
      { path: 'opex/:id/update', component: () => import('pages/opex/opex-update.page.vue'), props: true },

      { path: 'delay-receivable', component: () => import('pages/delay-rec/delay-rec-list.page.vue') },
      { 
        path: 'delay-receivable/:id/detail', 
        component: () => import('pages/delay-rec/delay-detail.page.vue'),
        props: true
      },

      { path: 'delay-payable', component: () => import('pages/delay-pay/delay-pay-list.page.vue') },
      { 
        path: 'delay-payable/:id/detail', 
        component: () => import('pages/delay-pay/delay-detail.page.vue'),
        props: true
      },

      { path: 'invcat', component: () => import('pages/inv-cat/invcat-list.page.vue') },
      { path: 'invcat/create', component: () => import('pages/inv-cat/invcat-create.page.vue') },
      { path: 'invcat/:id/update', component: () => import('pages/inv-cat/invcat-update.page.vue'), props: true },
      
      { path: 'investment', component: () => import('pages/investment/investment-list.page.vue') },
      { path: 'investment/create', component: () => import('pages/investment/investment-create.page.vue') },
      { path: 'investment/:id/update', component: () => import('pages/investment/investment-update.page.vue'), props: true },

      { path: 'equity', component: () => import('pages/equity/equity-list.page.vue') },
      { path: 'equity/create', component: () => import('pages/equity/equity-create.page.vue') },
      { path: 'equity/:id/update', component: () => import('pages/equity/equity-update.page.vue'), props: true },

      { path: 'tool', component: () => import('pages/tool/tool-list.page.vue') },
      { path: 'tool/create', component: () => import('pages/tool/tool-create.page.vue') },
      { path: 'tool/:id/update', component: () => import('pages/tool/tool-update.page.vue'), props: true },

      { path: 'staf', component: () => import('pages/staf/staf-list.page.vue') },
      { path: 'staf/create', component: () => import('pages/staf/staf-create.page.vue') },
      { path: 'staf/:id/update', component: () => import('pages/staf/staf-update.page.vue'), props: true },

      { path: 'admin', component: () => import('pages/admin/admin-list.page.vue') },
      { path: 'admin/create', component: () => import('pages/admin/admin-create.page.vue') },
      // { path: 'staf/:id/update', component: () => import('pages/staf/staf-update.page.vue'), props: true },

      { path: 'account', component: () => import('pages/account/account-list.page.vue') },
      // { path: 'customer/:id/update', component: () => import('pages/customer/customer-update.page.vue'), props: true },
      // { path: 'customer/create', component: () => import('pages/customer/customer-create.page.vue') },

      { path: 'customer', component: () => import('pages/customer/customer-list.page.vue') },
      { path: 'customer/:id/update', component: () => import('pages/customer/customer-update.page.vue'), props: true },
      { path: 'customer/create', component: () => import('pages/customer/customer-create.page.vue') },
      { path: 'supplier', component: () => import('pages/supplier/supplier-list.page.vue') },
      { path: 'supplier/create', component: () => import('pages/supplier/supplier-create.page.vue') },
      { path: 'supplier/:id/update', component: () => import('pages/supplier/supplier-update.page.vue'), props: true },

      { path: 'product', component: () => import('pages/product/product-list.page.vue') },
      { path: 'product/create', component: () => import('pages/product/product-create.page.vue') },
      { 
        path: 'product/:id/update', 
        component: () => import('pages/product/product-update.page.vue'), 
        props: true 
      },
      { 
        path: 'product/:id/purchases', 
        component: () => import('pages/product/product-purchases.page.vue'), 
        props: true 
      },
      { 
        path: 'product/:id/sales', 
        component: () => import('pages/product/product-sales.page.vue'), 
        props: true 
      },

      { path: 'purchase', component: () => import('pages/purchase/purchase-list.page.vue') },
      { path: 'purchase/create', component: () => import('pages/purchase/purchase-create.page.vue') },
      { 
        path: 'purchase/:orderId/detail', 
        component: () => import('pages/purchase/detail/purchase-detail.page.vue'), 
        props: true
      },
      { path: 'sale', component: () => import('pages/sale/sale-list.page.vue') },
      { path: 'sale/create', component: () => import('pages/sale/sale-create.page.vue') },
      { 
        path: 'sale/:orderId/detail', 
        component: () => import('pages/sale/detail/sale-detail.page.vue'), 
        props: true,
        children: [
          { path: 'items/:saleItemId', component: () => import('components/sale/update-sale-item.vue'), props: true },
          { path: 'update', component: () => import('pages/sale/sale-update.page.vue'), props: true },
          { path: 'seal', component: () => import('pages/sale/sale-seal.page.vue'), props: true },
        ]
      },
      { 
        path: 'stock-items/order/:order',
        component: () => import('pages/sitem/sitem-order.page.vue'),
        props: true
      },
      { 
        path: 'stock-items/order/:order/add',
        component: () => import('pages/sitem/sitem-add.page.vue'),
        props: true
      },
      {
        path: 'finance',
        component: () => import('pages/finance/finance-container.page.vue'),
        children: [
          { 
            path: '', 
            component: () => import('pages/finance/menu.page.vue') },
          { 
            path: 'neraca', 
            component: () => import('pages/finance/neraca.page.vue') },
          { 
            path: 'laba_rugi', 
            component: () => import('pages/finance/laba-rugi.page.vue') },
          { 
            path: 'arus_kas', 
            component: () => import('pages/finance/arus-kas.page.vue') },
          { 
            path: 'perubahan_modal', 
            component: () => import('pages/finance/perubahan-modal.page.vue') }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
