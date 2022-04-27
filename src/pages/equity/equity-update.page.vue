<template>
  <q-page>
    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Update Perubahan Modal
      </q-toolbar-title>
    </q-toolbar>
    <q-separator/>
    <div class="row flex-center q-my-xl">
      <div class="col-md-6 col-xs-12">
        <q-card 
          flat 
          bordered>
          <q-card-section>
            <q-form ref="form">
              <q-input
                label="User"
                v-model="payload.user"
              />
              <rupiah-input
                label="Nominal"
                v-model="payload.nominal"
                class="q-mb-md"
              />
              <q-select
                label="Tipe Transaksi"
                v-model="payload.type"
                :options="TRANSACTION_TYPE_OPTIONS"
                emit-value
                class="q-mb-md"
                :display-value="selectedType"
              />
              <q-select
                label="Status Transaksi"
                v-model="payload.status"
                :options="TRANSACTION_STATUS_OPTIONS"
                emit-value
                class="q-mb-md"
                :display-value="selectedStatus"
              />
              <q-select
                label="Metode Pembayaran"
                v-model="payload.paymentMethod"
                :options="PAYMENT_METHOD_OPTIONS"
                :display-value="selectedPaymentMethod"
                emit-value
                class="q-mb-md"
              />
              <datetime-input
                label="Waktu Transaksi"
                v-model="payload.createdAt"
              />
              <q-input
                label="Keterangan"
                type="textarea"
                v-model="payload.description"
                class="q-mb-md"
              />
            </q-form>
          </q-card-section>
          <q-separator/>
          <q-card-actions align="center">
            <q-btn 
              @click="onSubmit" 
              :loading="result.type == 'loading'"
              unelevated 
              dark 
              color="primary" 
              label="simpan" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { 
  defineComponent, 
  ref, 
  inject, 
  reactive,
  computed,
  onMounted,
  PropType
} from 'vue'
import LoadingPane from 'components/loading-pane.vue'
import { 
  defaultDateTime, 
  formatDateTime,
  toISO 
} from 'src/serv/datetime';
import { 
  useUpdateEntityV2,
  useSingleEntity
} from 'src/compose/entity'
import { 
  TransactionStatus, 
  PaymentMethod, 
  TransactionType,
  TRANSACTION_STATUS_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS
} from 'src/data/transaction'
import OcatOptions from 'components/ocat/ocat-options.vue'
import RupiahInput from 'components/rupiah-input.vue'
import DatetimeInput from 'components/datetime-input.vue'
import { useRouter } from 'vue-router'

function getInitialData(id: string | number) {
  const { 
    getSingleEntity: getEquityChange
  } = useSingleEntity('Perubahan Modal')

  return getEquityChange(`/v1/api/equity/${id}`)
}

export default defineComponent({
  components: {
    LoadingPane,
    OcatOptions,
    RupiahInput,
    DatetimeInput
  },
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const payload = reactive<any>({
      user: '',
      nominal: '0',
      status: 'SUCCESS',
      paymentMethod: 'ONLINE',
      type: 'DEBIT',
      createdAt: defaultDateTime(),
      description: '',
      transactionId: 0
    })
    const selectedStatus = computed(() => {
      const selected = TRANSACTION_STATUS_OPTIONS.find((it: any) => it.value == payload.status)
      if (!selected) return '-- pilih status transaksi --'
      return selected.label
    })
    const selectedPaymentMethod = computed(() => {
      const selected = PAYMENT_METHOD_OPTIONS.find((it: any) => it.value == payload.paymentMethod)
      if (!selected) return '-- pilih metode pembayaran --'
      return selected.label
    })
    const selectedType = computed(() => {
      const selected = TRANSACTION_TYPE_OPTIONS.find((it: any) => it.value == payload.type)
      if (!selected) return '-- pilih tipe transaksi --'
      return selected.label
    })    

    onMounted(async () => {
      const data: any = await getInitialData(props.id)
      payload.nominal = data.transaction.nominal
      payload.type = data.transaction.type
      payload.status = data.transaction.status
      payload.paymentMethod = data.transaction.paymentMethod
      payload.createdAt = formatDateTime(new Date(data.createdAt))
      payload.user = data.user
      payload.transactionId = data.transaction.id
    })

    const user = inject<any>('user')
    const { updateEntity, result } = useUpdateEntityV2({
      entityName: 'Perubahan Modal',
      transform: (p) => {
        const { createdAt, ...rest } = p
        const userVal = user.value
        return {
          ...rest,
          createdAt: toISO(createdAt),
          authorId: userVal.id
        }
      }
    })

    const router = useRouter()
    const form = ref<any>(null)
    const onSubmit = async () => {
      const formElement = form.value
      if (!formElement) {
        return
      }
      const isValid = await formElement.validate(true)
      if (!isValid) {
        return
      }
      await updateEntity('/v1/api/equity/' + props.id, payload)
      router.back()
    }

    return {
      form,
      onSubmit,
      payload,
      PAYMENT_METHOD_OPTIONS,
      TRANSACTION_STATUS_OPTIONS,
      TRANSACTION_TYPE_OPTIONS,
      selectedPaymentMethod,
      selectedStatus,
      selectedType,
      result
    }
  }
})
</script>
