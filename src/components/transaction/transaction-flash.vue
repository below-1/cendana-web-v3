<template>
  <q-list separator>
    <q-item>
      <q-item-section>
        <q-item-label>Tipe Transaksi</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-capitalize">{{ formattedTransaction.type }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>Metode Pembayaran</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-capitalize">{{ formattedTransaction.paymentMethod }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>Status Transaksi</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-capitalize">{{ formattedTransaction.status }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>Nominal</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label>IDR {{ formattedTransaction.nominal }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
} from 'vue'
import { formatTransaction } from 'src/serv/transaction'

export default defineComponent({
  props: {
    transaction: {
      type: Object as PropType<any>,
      required: true
    }
  },
  setup(props) {
    const formattedTransaction = computed(() => formatTransaction(props.transaction))
    return {
      formattedTransaction
    }
  }
})
</script>