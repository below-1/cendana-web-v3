<template>
  <q-page>
    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Detail Penjualan #{{ id }}
      </q-toolbar-title>

      <template v-if="!sealed">
        <q-btn
          :to="updateSaleURL"
          flat
          color="primary"
          label="Edit Data Penjualan"
          icon="edit" />
        <q-btn
          :to="sealSaleURL"
          flat 
          color="primary" 
          label="kunci penjualan" 
          icon="add" 
        />
      </template>
    </q-toolbar>
    <q-separator/>

    <div class="q-pa-lg">
      <div class="row q-mb-xl">
        <div class="col col-md-6">
          <q-card bordered flat v-if="sale.type == 'data'">
            <q-list separator>
              <q-item>
                <q-item-section>
                  Pelanggan
                </q-item-section>
                <q-item-section>
                  <router-link to="/app">{{ sale.item.targetUser.name }}</router-link>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  Admin
                </q-item-section>
                <q-item-section>
                  <router-link to="/app">{{ sale.item.author.name }}</router-link>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  Status Pembelian
                </q-item-section>
                <q-item-section>
                  <div>
                    <order-status-chip :status="sale.item.orderStatus" />
                  </div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  Pajak
                </q-item-section>
                <q-item-section>
                  {{ sale.item.tax }} %
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  Biaya Pengiriman
                </q-item-section>
                <q-item-section>
                  Rp, {{ rupiah(sale.item.shipping) }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  Total
                </q-item-section>
                <q-item-section>
                  Rp, {{ rupiah(sale.item.total) }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  Grand Total
                </q-item-section>
                <q-item-section>
                  Rp, {{ rupiah(sale.item.grandTotal) }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
          <loading-pane v-else />
        </div>
      </div>
    </div>

    <div class="q-pa-lg">
      <div class="row q-mb-xl">
        <div class="col-12">
          <sale-items 
            :sale-id="id"
            @add-item="showAddSaleItem = true"
            @update-item="onUpdateItem"
            @remove-item="onRemoveItem"
          />
        </div>
      </div>
    </div>

    <add-sale-item :sale-id="id" v-model:show="showAddSaleItem" />

    <router-view/>
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
import { useRoute, useRouter } from 'vue-router'
import { rupiah } from 'src/serv/currency'
import { useDetailSale } from 'src/compose/sale'
import { useRemoveEntity } from 'src/compose/entity'
import LoadingPane from 'components/loading-pane.vue'
import OrderStatusChip from 'components/order/order-status-chip.vue'
import SaleItems from 'components/sale/sale-items.vue'
import AddSaleItem from 'components/sale/add-sale-item.vue'
import UpdateSaleItem from 'components/sale/update-sale-item.vue'

export default defineComponent({
  components: {
    LoadingPane,
    OrderStatusChip,
    SaleItems,
    AddSaleItem,
    UpdateSaleItem
  },
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const { sale, getSale } = useDetailSale(toRef(props, 'id'))

    const sealed = computed(() => {
      const saleValue = unref(sale)
      if (saleValue.type != 'data') return true;
      return saleValue.item.orderStatus == 'SEALED'
    })

    const listingItems = computed(() => {
      const saleValue = unref(sale)
      if (saleValue.type != 'data') {
        return []
      }
      const { item } = saleValue
      const items = [
        { label: 'Supplier', value: item.targetUser.name },
        { label: 'Admin Yang Membuka Orderan', value: item.author.name },
        { label: 'Status Pembelian', value: item.orderStatus },
        { label: 'Pajak', value: item.tax },
        { label: 'Biaya Pengiriman', value: rupiah(item.shipping) },
        { label: 'Total', value: rupiah(item.total) },
        { label: 'Grand Total', value: rupiah(item.grandTotal) }
      ]
      return items
    })

    onMounted(getSale)

    const route = useRoute()
    const router = useRouter()
    function onUpdateItem(itemId: number | string) {
      const targetPath = route.fullPath + '/items/' + itemId
      router.push(targetPath)
    }
    const updateSaleURL = computed(() => route.fullPath + '/update')
    const sealSaleURL = computed(() => route.fullPath + '/seal')

    const showAddSaleItem = ref(false)
    const showRemoveSaleItem = ref(false)

    const {
      result: removeResult,
      promptRemove
    } = useRemoveEntity('Item Penjualan')
    const onRemoveItem = (item: any) => {
      console.log(item)
      promptRemove(`/v1/api/order-items/${item.id}`, item.product.name)
        .then(() => {
          console.log('about to reload')
          getSale()
        })
    }

    provide('sale', sale)
    provide('sealed', sealed)

    return {
      sale,
      listingItems,
      getSale,
      rupiah,
      showAddSaleItem,
      showRemoveSaleItem,
      onUpdateItem,
      onRemoveItem,
      updateSaleURL,
      sealSaleURL,
      sealed
    }
  }
})
</script>
