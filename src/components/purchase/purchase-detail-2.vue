<template>
  <div class="q-pa-lg">
    <div class="row q-mb-xl">
      <div class="col col-md-6">
        <q-card bordered flat v-if="sale.type == 'data'">
          <q-list separator>
            <q-item>
              <q-item-section>
                Supplier
              </q-item-section>
              <q-item-section>
                <router-link to="/app">{{ purchase.item.targetUser.name }}</router-link>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Admin
              </q-item-section>
              <q-item-section>
                <router-link to="/app">{{ purchase.item.author.name }}</router-link>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Status Pembelian
              </q-item-section>
              <q-item-section>
                <div>
                  <order-status-chip :status="purchase.item.orderStatus" />
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Pajak
              </q-item-section>
              <q-item-section>
                {{ purchase.item.tax }} %
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Biaya Pengiriman
              </q-item-section>
              <q-item-section>
                Rp, {{ rupiah(purchase.item.shipping) }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Total
              </q-item-section>
              <q-item-section>
                Rp, {{ rupiah(purchase.item.total) }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Grand Total
              </q-item-section>
              <q-item-section>
                Rp, {{ rupiah(purchase.item.grandTotal) }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  unref,
  ref,
  Ref
} from 'vue'

export default defineComponent({
  props: {
    purchase: {
      type: Object as PropType<any>,
      required: true
    }
  },
  emits: ['update'],
  setup(props, { emit }) {
    return {  }
  }
})
</script>
