<template>
  <q-page>
    <q-toolbar class="bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Detail Piutang #{{ id }}
      </q-toolbar-title>
    </q-toolbar>
    <q-separator />
    <div class="row q-my-xl q-mx-md">
      <div class="col-md-6 col-xs-12">
        <q-card 
          v-if="delay.type == 'result'"
          flat 
          bordered>
          <q-list separator>
            <q-item>
              <q-item-section>
                <q-item-label>Pelanggan</q-item-label>
              </q-item-section>
              <q-item-section>
                  {{ delay.data.order.targetUser.name }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Pegawai</q-item-label>
              </q-item-section>
              <q-item-section>
                  {{ delay.data.order.author.name }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Batas Waktu Pembayaran</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ displayDateTime(delay.data.dueDate) }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Jumlah Hutang</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ rupiah(delay.data.total) }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Sisa Hutang</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ rupiah(remainingPaid) }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Status</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ open ? 'Belum Lunas' : 'Lunas' }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <div class="row q-my-xl q-mx-md">
      <div class="col-12">
        <q-card
          flat
          bordered
        >
          <q-toolbar class="bg-grey-2">
            <q-toolbar-title class="text-subtitle1">Daftar Pembayaran</q-toolbar-title>
            <q-btn
              v-if="open"
              @click="showAddDialog = true"
              flat
              dark
              color="primary"
              icon="add"
              label="tambah pembayaran"
            />
          </q-toolbar>
          <q-separator/>
          <payment-list
            :items="payments"
            @remove="onRemovePayment"
          />
        </q-card>
      </div>
    </div>

    <q-dialog
      v-model="showAddDialog"
    >
      <add-payment 
        :id="id"
        style="width: 500px"
        :max="remainingPaid"
        @payment-added="loadData"
      >
      </add-payment>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  Ref,
  unref,
  toRef,
  computed,
  onMounted,
  ref,
} from 'vue'
import {
  useSingleEntityV2,
  useFilterEntity,
  useRemoveEntity
} from 'src/compose/entity'
import {
  rupiah
} from 'src/serv/currency'
import {
  displayDateTime
} from 'src/serv/datetime'
import { usePayments } from 'src/compose/delay'
import PaymentList from 'components/delay/payment-list.vue'
import AddPayment from 'components/delay/add-payment.vue'
import Decimal from 'decimal.js'

export default defineComponent({
  components: {
    PaymentList,
    AddPayment,
  },
  props: {
    id: {
      type: [Number, String] as PropType<number | string>,
      required: true
    }
  },
  emits: ['remove'],
  setup(props) {
    const $id = toRef(props, 'id')
    const url = computed(() => `/v1/api/delays/${props.id}`)
    const {
      result: $delay,
      getSingleEntity: getDelay
    } = useSingleEntityV2({
      entityName: 'Hutang',
      url
    })
    const open = computed(() => {
      const delay: any = unref($delay)
      if (delay.type != 'result') {
        return false
      }
      return !delay.data.complete
    })

    const {
      payments: $payments,
      getPayments
    } = usePayments($id)

    function loadData() {
      getDelay()
      getPayments()
    }

    const remainingPaid = computed(() => {
      const defaultVal = new Decimal('0')

      const delay: any = unref($delay)
      if (delay.type != 'result') {
        return defaultVal
      }
      const total = new Decimal(delay.data.total)

      const payments = unref($payments)
      const totalPaid = payments
        .map((p: any) => {
          const nominal = new Decimal(p.nominal)
          return nominal
        })
        .reduce((a: Decimal, b: Decimal) => a.plus(b), defaultVal)

      return total.sub(totalPaid).toString()
    })

    const showAddDialog = ref(false)

    const {
      result: removeResult,
      promptRemove
    } = useRemoveEntity('Pembayaran');

    const onRemovePayment = (paymentId: any) => {
      console.log(`paymentId`)
      console.log(paymentId)
      promptRemove(`/v1/api/delays/payments/${paymentId}`, paymentId)
        .then(() => loadData())
    }

    onMounted(loadData)


    return {
      delay: $delay,
      payments: $payments,
      rupiah,
      displayDateTime,
      showAddDialog,
      remainingPaid,
      open,
      loadData,
      onRemovePayment
    }
  }
})
</script>

