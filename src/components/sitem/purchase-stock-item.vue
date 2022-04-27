<template>
  <loading-pane v-if="stockItems.type == 'loading'" />
  <q-card v-else flat bordered>
    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title>
        Data Item Pembelian
      </q-toolbar-title>
      <q-btn
        v-if="open"
        @click="$emit('add')"
        outline
        color="primary" 
        label="tambah" 
        icon="add" 
      />
    </q-toolbar>
    <q-table
      flat
      hide-pagination
      :columns="columns"
      :rows="stockItems.items"
      :rows-per-page-options="[0]">
      <template
        v-slot:body-cell-product="props">
        <q-td 
          :props="props">
          <router-link 
            :to="`/app/product/${props.row.product.id}/detail`">
            <div
              class="text-weight-bold"
            >{{ props.row.product.name }}</div>
          </router-link>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            v-if="open"
            icon="delete"
            color="red"
            flat 
            size="sm"
            @click="onRemove(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
    <div class="row">
      <div class="col-md-4">
        <q-list dense separator>
          <q-item>
            <q-item-section>
              <div class="text-weight-bold">Total</div>
            </q-item-section>
            <q-item-section>
              {{ totals.total }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <div class="text-weight-bold">Sub Total</div>
            </q-item-section>
            <q-item-section>
              {{ totals.subTotal }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <div class="text-weight-bold">Grand Total</div>
            </q-item-section>
            <q-item-section>
              {{ totals.grandTotal }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-card>

</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  PropType,
  onMounted,
  toRef,
  Ref
} from 'vue'
import { useRoute } from 'vue-router'
import { useRemoveEntity } from 'src/compose/entity'
import { useFilterForOrder } from 'src/compose/sitem'
import columns from './columns'

import AddStockItem from 'components/sitem/add-stock-item.vue'
import LoadingPane from 'components/loading-pane.vue'

type Totals = {
  subTotal: string;
  total: string;
  grandTotal: string;
}

export default defineComponent({
  components: {
    LoadingPane,
  },
  props: {
    orderId: {
      type: String as PropType<string>,
      required: true
    },
    open: {
      type: Boolean as PropType<boolean>,
      required: true
    },
    totals: {
      type: Object as PropType<Totals>,
      required: true
    }
  },
  emits: ['deleted', 'add'],
  setup(props, { emit }) {
    const orderId: Ref<any> = toRef(props, 'orderId')
    const route = useRoute()
    const addURL = computed(() => `/app/stock-items/order/${orderId.value}/add`)
    const {
      params,
      stockItems,
      getStockItems
    } = useFilterForOrder(orderId)
    const {
      result: removeResult,
      promptRemove
    } = useRemoveEntity('Item Pembelian')

    const onRemove = (id: any) => {
      promptRemove(`/v1/api/stock-items/${id}`, id)
        .then((deleted: boolean) => {
          if (!deleted) return;
          emit('deleted')
        })
    }

    onMounted(() => {
      getStockItems()
    })

    return {
      addURL,
      value: 'OK',
      params,
      stockItems,
      removeResult,
      promptRemove,
      onRemove,
      columns
    }
  }
})
</script>
