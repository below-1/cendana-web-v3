<template>
  <q-list separator>
    <q-item>
      <q-item-section>
        Supplier
      </q-item-section>
      <q-item-section>
        {{ purchase.targetUser.name }}
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        Admin
      </q-item-section>
      <q-item-section>
        {{ purchase.author.name }}
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        Waktu
      </q-item-section>
      <q-item-section>
        {{ displayDateTime(purchase.createdAt) }}
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        Status Pembelian
      </q-item-section>
      <q-item-section>
        <div>
          <order-status-chip :status="purchase.orderStatus" />
        </div>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        Pajak
      </q-item-section>
      <q-item-section>
        {{ purchase.tax }} %
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        Biaya Pengiriman
      </q-item-section>
      <q-item-section>
        Rp, {{ rupiah(purchase.shipping) }}
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        Total
      </q-item-section>
      <q-item-section>
        Rp, {{ rupiah(purchase.total) }}
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        Grand Total
      </q-item-section>
      <q-item-section>
        Rp, {{ rupiah(purchase.grandTotal) }}
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
import { displayDateTime } from 'src/serv/datetime'
import OrderStatusChip from 'components/order/order-status-chip.vue'

export default defineComponent({
  props: {
    purchase: {
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
      rupiah,
      displayDateTime
    }
  }
})
</script>
