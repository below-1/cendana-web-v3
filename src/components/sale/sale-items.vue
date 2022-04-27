<template>
  <loading-pane v-if="orderItems.type == 'loading'"/>
  <q-card v-else-if="orderItems.type == 'data'" flat bordered>
    <q-toolbar class="bg-grey-2">
      <q-toolbar-title>Daftar Item Penjualan #{{ saleId }}</q-toolbar-title>
      <q-btn 
        v-if="!sealed"
        @click="$emit('add-item')" 
        flat 
        color="blue" 
        icon="add" 
        label="tambah item" />
    </q-toolbar>
    <q-table 
      flat
      :columns="COLUMNS"
      :rows="orderItems.items">

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            :disabled="sealed"
            @click="() => $emit('remove-item', props.row)"
            icon="delete"
            color="red"
            flat
            size="sm"
          />
          <q-btn
            :disabled="sealed"
            @click="() => $emit('update-item', props.row)"
            icon="edit"
            color="primary"
            flat
            size="sm" />
        </q-td>
      </template>

    </q-table>
  </q-card>
</template>

<script lang="ts">
import { 
  defineComponent, 
  PropType, 
  computed, 
  onMounted,
  inject
} from 'vue'
import { COLUMNS } from 'src/data/oitem'
import { useFilterEntity } from 'src/compose/entity'
import LoadingPane from 'components/loading-pane.vue'

export default defineComponent({
  components: {
    LoadingPane,
  },
  props: {
    saleId: {
      type: String as PropType<string>,
      required: true
    }
  },
  emits: ['add-item', 'update-item', 'remove-item'],
  setup(props, { emit }) {
    const { params, result: orderItems, getEntities: getOrderItems } = useFilterEntity({
      url: '/v1/api/order-items',
      name: 'Item Penjualan',
      initialParams: {
        perPage: -1,
        type: 'ORDER',
        target: props.saleId
      },
    })

    const sealed = inject('sealed')

    onMounted(getOrderItems)

    return {
      COLUMNS,
      orderItems,
      getOrderItems,
      sealed
    }
  }
})
</script>
