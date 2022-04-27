<template>
  <q-table
    flat
    hide-pagination
    :columns="columns"
    :rows="orderItems"
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
          @click="$emit('delete', props.row.id)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
} from 'vue'
import { COLUMNS } from 'src/data/oitem'

export default defineComponent({
  props: {
    open: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    orderItems: {
      type: Array as PropType<any[]>,
      required: true
    }
  },
  emits: ['update', 'delete', 'deleted'],
  setup(props, { emit }) {
    return { 
      columns: COLUMNS
    }
  }
})
</script>