<template>
  <q-page>
    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Tambah Perubahan Modal
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
  computed
} from 'vue'
import LoadingPane from 'components/loading-pane.vue'
import { 
  defaultDateTime, 
  toISO 
} from 'src/serv/datetime';
import { useCreateEntityV2 } from 'src/compose/entity'
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

export default defineComponent({
  components: {
    LoadingPane,
    OcatOptions,
    RupiahInput,
    DatetimeInput
  },
  setup(props) {
    const payload = reactive<any>({
      user: '',
      nominal: '0',
      status: 'SUCCESS',
      paymentMethod: 'ONLINE',
      type: 'DEBIT',
      createdAt: defaultDateTime(),
      description: ''
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

    const user = inject<any>('user')
    const { createEntity, result } = useCreateEntityV2({
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
      await createEntity('/v1/api/equity', payload)
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
