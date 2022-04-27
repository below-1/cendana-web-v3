<template>
  <q-page>

    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data Hutang
      </q-toolbar-title>
      <q-input
        placeholder="keyword..."
        v-model="params.keyword"
        hide-hint
        outlined
        dense
        class="q-mr-md"
      />
    </q-toolbar>
    <q-separator/>
    <loading-pane v-if="delays.type == 'loading'" />
    <template v-else-if="delays.type == 'data'">
      <section>
        <q-table
          hide-pagination
          :columns="columns"
          :rows="delays.items"
          :rows-per-page-options="[0]"
          flat
        >
          <template v-slot:body-cell-complete="props">
            <q-td :props="props">
              <delay-status-chip
                :complete="props.row.complete"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-order="props">
            <q-td :props="props">
              <router-link
                :to="`/app/sale/${props.row.orderId}/detail`"
              >
                {{ props.row.orderId }}
              </router-link>
            </q-td>
          </template>

          <template v-slot:body-cell-customer="props">
            <q-td :props="props">
              <router-link
                :to="`/app/supplier/${props.row.order.targetUserId}/detail`"
              >
                #{{ props.row.order.targetUser.name }}
              </router-link>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                :to="`/app/delay-payable/${props.row.id}/detail`"
                icon="more_horiz" 
                color="primary" 
                flat 
                size="xs" />
            </q-td>
          </template>
        </q-table>
      </section>
      <section class="q-px-lg">
        <q-toolbar class="text-grey-8 q-py-lg">
          <pagination
            v-model:page="params.page"
            v-model:per-page="params.perPage"
            :total-page="delays.totalPage"
          />
        </q-toolbar>
      </section>
    </template>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useFilterEntity } from 'src/compose/entity'
import { format } from 'date-fns'
import { id as LocaleID } from 'date-fns/locale'
import { rupiah } from 'src/serv/currency'

import MonthSelect from 'components/month-select.vue'
import LoadingPane from 'components/loading-pane.vue'
import Pagination from 'components/pagination.vue'
import DelayStatusChip from 'components/delay/delay-status-chip.vue'

const columns = [
  {
    name: 'id',
    align: 'left',
    field: 'id',
    label: 'id',
    required: true,
  },
  {
    name: 'complete',
    align: 'left',
    field: 'complete',
    label: 'status',
    required: true,
  },
  {
    name: 'order',
    align: 'left',
    field: 'orderId',
    label: 'Penjualan',
    required: true,
  },
  {
    name: 'supplier',
    align: 'left',
    field: (v: any) => v.order.targetUser.name,
    label: 'Supplier',
    required: true,
  },
  {
    name: 'waktu',
    align: 'left',
    field: 'createdAt',
    format: (v: string) => {
      const d = new Date(v)
      return format(d, 'd MMMM yyyy, HH:mm', { locale: LocaleID })
    },
    label: 'Waktu Dibuat',
    required: true,
  },
  {
    name: 'waktu',
    align: 'left',
    field: 'dueDate',
    format: (v: string) => {
      const d = new Date(v)
      return format(d, 'd MMMM yyyy, HH:mm', { locale: LocaleID })
    },
    label: 'Batas Waktu Pembayaran',
    required: true,
  },
  {
    name: 'total',
    align: 'left',
    field: 'total',
    format: rupiah,
    label: 'Total',
    required: true,
  },
  {
    name: 'actions',
    align: 'right',
    field: 'id',
    label: '',
  }
]

export default defineComponent({
  components: {
    LoadingPane,
    Pagination,
    MonthSelect,
    DelayStatusChip,
  },
  setup() {
    const {
      params,
      result: delays,
      getEntities: getDelays
    } = useFilterEntity({
      name: 'Hutang',
      url: '/v1/api/delays',
      initialParams: {
        type: 'PAYABLE'
      }
    })

    onMounted(() => {
      getDelays()
    })

    return {
      delays,
      params,
      columns
    }
  }
})
</script>