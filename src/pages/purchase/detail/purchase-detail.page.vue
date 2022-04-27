<template>
  <q-page>
    <page-toolbar :title="`Detail Pembelian #${orderId}`">
      <btn-actions
        :open="open"
        @show-seal="showSealDialog = true"
        @show-update="showUpdateDialog = true"
      />
    </page-toolbar>

    <div class="q-pa-md">
      <div 
        v-if="purchase.type == 'data'"
        class="row q-mb-xl q-col-gutter-md" 
      >
        <div class="col-12 col-md-4">
          <q-card flat bordered>
            <q-toolbar class="bg-grey-2">
              <div class="text-subtitle1 text-weight-bold">Informasi Pembelian</div>
            </q-toolbar>
            <q-separator/>
            <purchase-card-info 
              :purchase="purchase.item"
            />
          </q-card>
        </div>
        <div 
          class="col-12 col-md-4"
          v-if="purchase.item.transaction"
        >
          <q-card flat bordered>
            <q-toolbar class="bg-grey-2">
              <div class="text-subtitle1 text-weight-bold">Informasi Transaksi</div>
            </q-toolbar>
            <q-separator/>
            <transaction-flash
              :transaction="purchase.item.transaction"
            />
          </q-card>
        </div>
        <div 
          v-if="purchase.item.delay"
          class="col-12 col-md-4" 
        >
          <q-card flat bordered>
            <q-toolbar class="bg-grey-2">
              <div class="text-subtitle1 text-weight-bold">Informasi Hutang</div>
            </q-toolbar>
            <q-separator/>
            <delay-flash
              :delay="purchase.item.delay" 
            />
          </q-card>
        </div>
      </div>
      <div class="row q-mb-xl">
        <div class="col-12">
          <stock-items 
            @item-added="getPurchase"
            @item-deleted="getPurchase"
            :order-id="orderId"
            :open="open"
          />
        </div>
      </div>
    </div>

    <q-dialog v-model="showSealDialog">
      <purchase-seal 
        @purchase-sealed="getPurchase"
      />
    </q-dialog>

    <q-dialog v-model="showUpdateDialog">
      <purchase-update 
        :order-id="orderId" 
        @purchase-updated="getPurchase"
      />
    </q-dialog>

  </q-page>
</template>

<script lang="ts">
import { 
  defineComponent, 
  onMounted, 
  PropType, 
  computed, 
  toRef, 
  ref, 
  unref,
  provide
} from 'vue'

import BtnActions from './btn-actions.vue'
import PageToolbar from 'components/page-toolbar.vue'
import PurchaseCardInfo from 'components/purchase/card-info.vue'
import PurchaseUpdate from './purchase-update.vue'
import PurchaseSeal from './purchase-seal.vue'
import StockItems from './stock-items.page.vue'
import DelayFlash from 'components/delay/delay-flash.vue'
import TransactionFlash from 'components/transaction/transaction-flash.vue'

import { useRoute } from 'vue-router'
import { useDetailPurchase } from 'src/compose/purchase'

export default defineComponent({
  components: {
    BtnActions,
    PageToolbar,
    PurchaseCardInfo,
    PurchaseUpdate,
    StockItems,
    PurchaseSeal,
    DelayFlash,
    TransactionFlash,
  },
  props: {
    orderId: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props, { emit }) {
    const id = toRef(props, 'orderId');
    const {
      purchase,
      getPurchase
    } = useDetailPurchase(id)

    provide('purchase', purchase)

    const open = computed(() => {
      const purchaseVal = unref(purchase)
      if (purchaseVal.type != 'data') {
        return false
      }
      const result = purchaseVal.item.orderStatus == 'OPEN'
      return result
    })

    const route = useRoute()
    const updateURL = computed(() => route.fullPath + '/update')
    const sealURL = computed(() => route.fullPath + '/seal')
    const showSealDialog = ref(false)
    const showUpdateDialog = ref(false)

    onMounted(getPurchase)

    return {
      purchase,
      open,
      sealURL,
      updateURL,
      getPurchase,
      showSealDialog,
      showUpdateDialog,
    }
  }
})
</script>
