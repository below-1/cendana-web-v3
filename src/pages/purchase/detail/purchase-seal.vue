<template>
  <q-card flat bordered style="width: 500px;">
    <div class="q-pa-sm">
      <h6 class="q-my-none">Kunci Pembelian</h6>
    </div>
    <q-separator/>
    <q-card-section v-if="purchase.type == 'loading'">
    </q-card-section>
    <q-card-section v-else>
      <div class="text-weight-bold">
        Pembelian #{{ purchase.item.id }}
      </div>
      <payment-method-options
        v-model="payload.paymentMethod"
      />
      <rupiah-input
        label="Total Bayar"
        v-model="payload.nominal"
      />

      <template v-if="needDelay">
        <rupiah-input
          label="Total Hutang"
          readonly
          :model-value="debt.toString()"
        />

        <q-input
          class="q-mb-md"
          outlined
          label="Batas Waktu Pembayaran Hutang"
          type="number"
          v-model.number="payload.elapsedDelay"
          min="0"
        />
      </template>

      <q-btn
        @click="onSubmit"
        :loading="sealLoading"
        label="simpan"
        unelevated
        color="blue"
        dark
      />


    </q-card-section>
    <q-separator/>
  </q-card>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  reactive,
  Ref,
  onMounted,
  computed,
  unref,
} from 'vue'
import { addDays } from 'date-fns'
import Decimal from 'decimal.js'
import RupiahInput from 'components/rupiah-input.vue'
import { 
  TransactionStatus, 
  PaymentMethod, 
  PAYMENT_METHOD_OPTIONS 
} from 'src/data/transaction'
import { useSeal } from 'src/compose/purchase'
import PaymentMethodOptions from 'components/transaction/payment-method-options.vue'

export default defineComponent({
  components: {
    RupiahInput,
    PaymentMethodOptions,
  },
  emits: ['purchase-sealed'],
  setup(props, { emit }) {
    const purchase: Ref<any> | undefined = inject('purchase')
    const payload = reactive({
      nominal: '0',
      status: TransactionStatus.SUCCESS,
      paymentMethod: PaymentMethod.CASH,
      elapsedDelay: 30
    })

    const debt = computed(() => {
      const purchaseVal = unref(purchase)
      if (purchaseVal.type != 'data') return new Decimal('0');
      const nominal = payload.nominal
      const decNominal = new Decimal(payload.nominal)
      const decGrandTotal = new Decimal(purchaseVal.item.grandTotal)
      const result = decGrandTotal.sub(decNominal)
      return result
    })

    const needDelay = computed(() => debt.value.greaterThan(0))

    const { seal, loading: sealLoading } = useSeal()
    const onSubmit = () => {
      const { elapsedDelay, ...rest } = payload
      let realPayload: any = { ...rest }
      if (needDelay.value) {
        realPayload.delay = {
          dueDate: addDays(new Date(), elapsedDelay)
        }
      }
      seal(purchase!.value.item.id, realPayload)
        .then(() => {
          emit('purchase-sealed')
        })
    }

    onMounted(() => {
      payload.nominal = purchase!.value.item.grandTotal
    })

    return {
      purchase,
      payload,
      PAYMENT_METHOD_OPTIONS,
      debt,
      needDelay,
      onSubmit,
      sealLoading
    }
  }
})
</script>
