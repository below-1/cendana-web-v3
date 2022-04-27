<template>
  <q-page>
    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Tambah Biaya Peralatan
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
              <tcat-options
                v-model="payload.tool"
                class="q-mb-md"
                :rules="[
                  v => !!v || 'Kategori Peralatan Harus Diisi'
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
  TRANSACTION_STATUS_OPTIONS,
  PAYMENT_METHOD_OPTIONS
} from 'src/data/transaction'
import TcatOptions from 'components/tcat/tcat-options.vue'
import RupiahInput from 'components/rupiah-input.vue'
import { useRouter } from 'vue-router'
import DatetimeInput from 'components/datetime-input.vue'

export default defineComponent({
  components: {
    LoadingPane,
    TcatOptions,
    RupiahInput,
    DatetimeInput
  },
  setup(props) {
    const payload = reactive<any>({
      tool: {},
      nominal: '0',
      status: 'SUCCESS',
      paymentMethod: 'ONLINE',
      createdAt: defaultDateTime()
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

    const user = inject<any>('user')
    const { createEntity, result } = useCreateEntityV2({
      entityName: 'Biaya Peralatan',
      transform: (p) => {
        const { tool, createdAt, ...rest } = p
        const userVal = user.value
        return {
          ...rest,
          createdAt: toISO(createdAt),
          toolId: tool.id,
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
      const result = await createEntity('/v1/api/tool-trans', payload)
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
