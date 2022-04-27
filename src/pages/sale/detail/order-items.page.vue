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
      <order-item-table
        v-if="orderItems.type == 'data'"
        :open="open"
        :orderItems="orderItems.items"
        @delete="onItemDelete"
      />
    </q-card>

    <q-dialog v-model="showAddDialog">
      <order-item-add 
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
import OrderItemTable from './order-item-table.vue'
import OrderItemAdd from './order-item-add.vue'

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
    Pagination,
    OrderItemTable,
    OrderItemAdd,
  },
  emits: ['item-added', 'item-deleted'],
  setup(props, { emit }) {
    const orderId = toRef(props, 'orderId')
    const {
      params,
      getEntities: getOrderItems,
      result: orderItems,
    } = useFilterEntity({
      url: '/v1/api/order-items',
      name: 'Item Penjualan',
      initialParams: {
        target: 0,
        type: 'ORDER'
      }
    })

    onMounted(() => {
      params.target = props.orderId
    })

    const showAddDialog = ref(false)

    function onItemAdded() {
      showAddDialog.value = false
      emit('item-added')
      getOrderItems()
    }

    const {
      promptRemove
    } = useRemoveEntity('Item Penjualan')

    function onItemDelete(id: any) {
      const url = `/v1/api/order-items/${id}`
      promptRemove(url, id)
        .then(() => getOrderItems())
        .then(() => {
          emit('item-deleted')
        })
    }

    return {
      foo: 'bar',
      orderItems,
      params,
      showAddDialog,
      onItemAdded,
      onItemDelete
    }
  }
})
</script>