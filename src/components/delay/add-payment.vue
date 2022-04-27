<template>
  <q-card>
    <q-card-section class="bg-grey-2">
      <h6>Tambah Pembayaran</h6>
    </q-card-section>
    <q-separator/>
    <q-form 
      ref="form"
      @submit="onSubmit"
    >
      <q-card-section>
          <rupiah-input
            label="Nominal"
            v-model="payload.nominal"
            class="q-mb-md"
            :rules="[
              decGreaterThan('0', 'Harus lebih besar dari 0'),
              lessThanMax
            ]"
          />
          <datetime-input
            label="Waktu dan Tanggal"
            v-model="payload.createdAt"
            class="q-mb-md"
          />
          <payment-method-options
            v-model="payload.paymentMethod"
          />
      </q-card-section>
    </q-form>
    <q-separator/>
    <q-card-actions align="center">
      <q-btn
        @click="onSubmit"
        outline
        label="simpan"
        dark
        color="primary"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  toRef,
  inject,
  reactive,
  computed,
  ref,
  unref,
} from 'vue'
import Decimal from 'decimal.js'
import {
  useCreateEntityV2
} from 'src/compose/entity'
import {
  defaultDateTime,
  toISO
} from 'src/serv/datetime'
import PaymentMethodOptions from 'components/transaction/payment-method-options.vue'
import RupiahInput from 'components/rupiah-input.vue'
import DatetimeInput from 'components/datetime-input.vue'
import { 
  TransactionStatus,
  PaymentMethod
} from 'src/data/transaction'
import {
  decGreaterThan,
  decLessThan
} from 'src/serv/decimal'
import {
  rupiah,
} from 'src/serv/currency'

export default defineComponent({
  components: {
    PaymentMethodOptions,
    RupiahInput,
    DatetimeInput,
  },
  props: {
    id: {
      type: [Number, String] as PropType<number | string>,
      required: true,
    },
    max: {
      type: String as PropType<string>,
      required: true
    }
  },
  emits: ['payment-added'],
  setup(props, { emit }) {
    const $user = inject<any>('user')
    const payload = reactive({
      nominal: '0',
      createdAt: defaultDateTime(),
      status: TransactionStatus.SUCCESS,
      paymentMethod: PaymentMethod.CASH
    })

    const {
      result: $createResult,
      createEntity: createPayment
    } = useCreateEntityV2({
      entityName: 'Pembayaran',
      transform: (v: any) => {
        const user = unref($user)
        if (!user) {
          throw new Error('user is undefined')
        }
        return {
          ...v,
          createdAt: toISO(v.createdAt),
          authorId: user.id
        }
      }
    })
    const $form = ref<any>(null)

    async function onSubmit() {
      const form = unref($form)
      if (!form) {
        throw new Error('form is undefined')
      }
      const isValid = await form.validate(true)
      console.log(`isValid = ${isValid}`)
      if (!isValid) {
        return
      }
      const url = `/v1/api/delays/${props.id}/payments`
      createPayment(url, payload)
        .then(() => {
          emit('payment-added')
        })
    }

    const lessThanMax = computed(() => {
      const max = props.max
      return decLessThan(max, `Harus kurang dari ${rupiah(max)}`)
    })

    return {
      payload,
      form: $form,
      createResult: $createResult,
      onSubmit,
      decGreaterThan,
      lessThanMax
    }
  }
})
</script>
