<template>
  <q-page>
    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Update Beban Usaha
      </q-toolbar-title>
      <q-btn flat color="primary" label="tambah" icon="add" />
    </q-toolbar>
    <q-separator/>
    <div class="row flex-center q-my-xl">
      <div class="col-md-6 col-xs-12">
        <q-card 
          flat 
          bordered>
          <q-card-section>
            <q-form ref="form">
              <ocat-options
                v-model="payload.opex"
                class="q-mb-md"
                :rules="[
                  v => !!v || 'Beban Usaha Harus Diisi'
                ]"
              />
              <rupiah-input
                label="Nominal"
                v-model="payload.nominal"
                class="q-mb-md"
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
                label="Status Transaksi"
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
  useSingleEntity, 
  useUpdateEntityV2
} from 'src/compose/entity'
import { 
  TransactionStatus, 
  PaymentMethod, 
  TRANSACTION_STATUS_OPTIONS,
  PAYMENT_METHOD_OPTIONS
} from 'src/data/transaction'
import OcatOptions from 'components/ocat/ocat-options.vue'
import RupiahInput from 'components/rupiah-input.vue'
import DatetimeInput from 'components/datetime-input.vue'
import { useRouter } from 'vue-router'

function getInitialData(id: string | number) {
  const { 
    getSingleEntity: getOpex
  } = useSingleEntity('Beban Usaha')

  return getOpex(`/v1/api/opex-trans/${id}`)
}

export default defineComponent({
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    }
  },
  components: {
    LoadingPane,
    OcatOptions,
    RupiahInput,
    DatetimeInput
  },
  setup(props) {

    const payload = reactive<any>({
      opex: {},
      nominal: '0',
      status: 'SUCCESS',
      paymentMethod: 'ONLINE',
      createdAt: defaultDateTime()
    })

    onMounted(async () => {
      const data: any = await getInitialData(props.id)
      payload.opex = data.opex
      payload.nominal = data.nominal
      payload.status = data.status
      payload.paymentMethod = data.paymentMethod
      payload.createdAt = formatDateTime(new Date(data.createdAt))
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

    const { updateEntity, result } = useUpdateEntityV2({
      entityName: 'Beban Usaha',
      transform: (p) => {
        const { opex, createdAt, ...rest } = p
        return {
          ...rest,
          opexId: opex.id,
          createdAt: toISO(createdAt)
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
      await updateEntity(`/v1/api/opex-trans/${props.id}`, payload)
      router.back()
    }

    return {
      form,
      onSubmit,
      payload,
      PAYMENT_METHOD_OPTIONS,
      TRANSACTION_STATUS_OPTIONS,
      selectedPaymentMethod,
      selectedStatus,
      result
    }
  }
})
</script>
