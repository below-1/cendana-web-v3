<template>
  <q-table
    flat
    hide-pagination
    :columns="columns"
    :rows="stockItems"
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
          @click="$emit('delete', props.row.id)"
          color="red"
          flat 
          size="sm"
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
import { COLUMNS } from 'src/data/sitem'

export default defineComponent({
  props: {
    open: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    stockItems: {
      type: Array as PropType<any[]>,
      required: true
    }
  },
  emits: ['update', 'delete', 'deleted', 'item-added'],
  setup(props, { emit }) {
    return { 
      columns: COLUMNS
    }
  }
})
</script>