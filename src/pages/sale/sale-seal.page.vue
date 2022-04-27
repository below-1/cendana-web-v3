<template>
  <q-dialog :model-value="true" persistent>
    <q-card flat bordered style="width: 500px;">
      <div class="q-pa-sm">
        <h6 class="q-my-none">Kunci Penjualan</h6>
      </div>
      <q-separator/>
      <q-card-section v-if="sale.type == 'loading'">
      </q-card-section>
      <q-card-section v-else>
        <div class="text-weight-bold">
          Penjualan #{{ sale.item.id }}
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
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  reactive,
  Ref,
  onMounted,
  computed
} from 'vue'
import { addDays } from 'date-fns'
import Decimal from 'decimal.js'
import PaymentMethodOptions from 'components/transaction/payment-method-options.vue'
import RupiahInput from 'components/rupiah-input.vue'
import { 
  TransactionStatus, 
  PaymentMethod, 
  PAYMENT_METHOD_OPTIONS 
} from 'src/data/transaction'
import { useSeal } from 'src/compose/sale'

export default defineComponent({
  components: {
    RupiahInput,
    PaymentMethodOptions
  },
  setup(props) {
    const sale: Ref<any> | undefined = inject('sale')
    const payload = reactive({
      nominal: '',
      status: TransactionStatus.SUCCESS,
      paymentMethod: PaymentMethod.CASH,
      elapsedDelay: 30
    })

    const debt = computed(() => {
      const nominal = payload.nominal
      const decNominal = new Decimal(payload.nominal)
      const decGrandTotal = new Decimal(sale!.value.item.grandTotal)
      return decGrandTotal.sub(decNominal)
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
      seal(sale!.value.item.id, realPayload)
    }

    onMounted(() => {
      payload.nominal = sale!.value.item.grandTotal
    })

    return {
      sale,
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
