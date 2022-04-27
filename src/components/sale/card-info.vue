<template>
  <q-list separator>
    <q-item>
      <q-item-section>
        Pelanggan
      </q-item-section>
      <q-item-section>
        {{ sale.targetUser.name }}
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        Admin
      </q-item-section>
      <q-item-section>
        {{ sale.author.name }}
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        Status Pembelian
      </q-item-section>
      <q-item-section>
        <div>
          <order-status-chip :status="sale.orderStatus" />
        </div>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        Pajak
      </q-item-section>
      <q-item-section>
        {{ sale.tax }} %
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        Diskon
      </q-item-section>
      <q-item-section>
        {{ sale.discount }} %
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        Biaya Pengiriman
      </q-item-section>
      <q-item-section>
        Rp, {{ rupiah(sale.shipping) }}
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        Total
      </q-item-section>
      <q-item-section>
        Rp, {{ rupiah(sale.total) }}
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        Grand Total
      </q-item-section>
      <q-item-section>
        Rp, {{ rupiah(sale.grandTotal) }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  unref,
  ref,
  Ref
} from 'vue'
import { rupiah } from 'src/serv/currency'
import OrderStatusChip from 'components/order/order-status-chip.vue'

export default defineComponent({
  props: {
    sale: {
      type: Object as PropType<any>,
      required: true
    }
  },
  components: {
    OrderStatusChip,
  },
  emits: ['update'],
  setup(props, { emit }) {
    return {
      rupiah
    }
  }
})
</script>
