<template>
  <q-page>
    <page-toolbar :title="`Detail Penjualan #${orderId}`">
      <btn-actions
        :open="open"
        @show-seal="showSealDialog = true"
        @show-update="showUpdateDialog = true"
      />
    </page-toolbar>
    <q-separator/>

    <div class="q-pa-md">
      <div 
        v-if="sale.type == 'result'"
        class="row q-mb-xl q-col-gutter-md" 
      >
        <div class="col-12 col-md-4">
          <q-card flat bordered>
            <q-toolbar class="bg-grey-2">
              <div class="text-subtitle1 text-weight-bold">Informasi Penjualan</div>
            </q-toolbar>
            <q-separator/>
            <sale-card-info 
              :sale="sale.data"
            />
          </q-card>
        </div>

        <div 
          class="col-12 col-md-4"
          v-if="sale.data.transaction"
        >
          <q-card flat bordered>
            <q-toolbar class="bg-grey-2">
              <div class="text-subtitle1 text-weight-bold">Informasi Transaksi</div>
            </q-toolbar>
            <q-separator/>
            <transaction-flash
              :transaction="sale.data.transaction"
            />
          </q-card>
        </div>

        <div 
          v-if="sale.data.delay"
          class="col-12 col-md-4" 
        >
          <q-card flat bordered>
            <q-toolbar class="bg-grey-2">
              <div class="text-subtitle1 text-weight-bold">Informasi Hutang</div>
            </q-toolbar>
            <q-separator/>
            <delay-flash
              :delay="sale.data.delay" 
            />
          </q-card>
        </div>

      </div>

      <div class="row q-mb-xl">
        <div class="col-12">
          <order-items 
            @item-added="getSale"
            @item-deleted="getSale"
            :order-id="orderId"
            :open="open"

          />
        </div>
      </div>
    </div>

    <q-dialog
      v-model="showUpdateDialog"
    >
      <sale-update
        :order-id="orderId"
        @order-sealed="getSale"
        style="width: 500px;"
      />
    </q-dialog>

    <q-dialog
      v-model="showSealDialog"
    >
      <order-seal
        :order="sale.data"
        style="width: 500px;"
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
import PageToolbar from 'components/page-toolbar.vue'
import SaleCardInfo from 'components/sale/card-info.vue'
import BtnActions from './btn-actions.vue'
import OrderItems from './order-items.page.vue'
import SaleUpdate from './sale-update.vue'
import OrderSeal from 'components/order/order-seal.vue'
import TransactionFlash from 'components/transaction/transaction-flash.vue'
import DelayFlash from 'components/delay/delay-flash.vue'
import { useRoute } from 'vue-router'
import { useSingleEntityV2 } from 'src/compose/entity'

export default defineComponent({
  components: {
    PageToolbar,
    BtnActions,
    SaleCardInfo,
    OrderItems,
    SaleUpdate,
    OrderSeal,
    TransactionFlash,
    DelayFlash,
  },
  props: {
    orderId: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const url = computed(() => `/v1/api/sales/${props.orderId}`)
    const entityName = 'Penjualan'

    const {
      result: $sale,
      getSingleEntity: getSale
    } = useSingleEntityV2<any>({
      url,
      entityName
    })
    onMounted(getSale)
    const open = computed(() => {
      const sale: any = unref($sale)
      if (sale.type != 'result') {
        return false
      }
      const result = sale.data.orderStatus == 'OPEN'
      console.log('result = ', result)
      return result
    })

    const route = useRoute()
    const updateURL = computed(() => route.fullPath + '/update')
    const sealURL = computed(() => route.fullPath + '/seal')
    const showUpdateDialog = ref(false)
    const showSealDialog = ref(false)

    return {
      route,
      updateURL,
      sealURL,
      sale: $sale,
      getSale,
      open,
      showUpdateDialog,
      showSealDialog,
    }
  }
})
</script>