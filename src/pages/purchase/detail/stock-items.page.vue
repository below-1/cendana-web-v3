<template>
  <div>
    <q-card bordered flat>
      <q-toolbar class="bg-grey-2">
        <q-toolbar-title class="text-subtitle1 text-weight-bold">Daftar Item</q-toolbar-title>
        <q-btn
          v-if="open"
          @click="showAddDialog = true"
          icon="add"
          label="tambah item"
          outline
        />
      </q-toolbar>
      <q-separator/>
      <stock-item-table
        @delete="onItemDelete"
        :open="open"
        :stockItems="stockItems.items"
      />
      <section class="q-px-lg">
        <q-toolbar class="text-grey-8 q-py-lg">
          <pagination
            v-model:page="params.page"
            v-model:per-page="params.perPage"
            :total-page="stockItems.totalPage"
          />
        </q-toolbar>
      </section>
    </q-card>

    <q-dialog v-model="showAddDialog">
      <stock-item-add 
        @item-added="onItemAdded"
        :order-id="orderId"
        style="width: 500px;"
      />
    </q-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  onMounted,
  watch,
  toRef,
  ref,
} from 'vue'
import {
  useFilterEntity,
  useRemoveEntity
} from 'src/compose/entity'

import Pagination from 'components/pagination.vue'
import StockItemTable from './stock-item-table.vue'
import StockItemAdd from './stock-item-add.vue'

export default defineComponent({
  props: {
    orderId: {
      type: [Number, String] as PropType<number | string>,
      required: true,
    },
    open: {
      type: Boolean as PropType<boolean>,
      required: true,
    }
  },
  components: {
    StockItemTable,
    StockItemAdd,
    Pagination,
  },
  emits: ['item-added', 'item-deleted'],
  setup(props, { emit }) {
    const orderId = toRef(props, 'orderId')
    const {
      params,
      getEntities: getStockItems,
      result: stockItems,
    } = useFilterEntity({
      url: '/v1/api/stock-items',
      name: 'Item Pembelian',
      initialParams: {
        target: 0,
        type: 'ORDER'
      }
    })

    const {
      promptRemove
    } = useRemoveEntity('Item Pembelian')

    onMounted(() => {
      params.target = props.orderId
    })

    const showAddDialog = ref(false)

    function onItemAdded() {
      emit('item-added')
      getStockItems()
    }

    function onItemDelete(id: any) {
      console.log('id = ', id)
      const url = `/v1/api/stock-items/${id}`
      promptRemove(url, id)
        .then(() => {
          emit('item-deleted')
        })
    }

    return {
      foo: 'bar',
      stockItems,
      params,
      showAddDialog,
      onItemAdded,
      onItemDelete
    }
  }
})
</script>