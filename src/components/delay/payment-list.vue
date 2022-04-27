<template>
  <q-table 
    hide-pagination
    :columns="columns"
    :rows="items"
    :rows-per-page-options="[0]"
    flat
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          icon="delete"
          color="red"
          flat size="xs"
          @click="$emit('remove', props.row.id)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts">
import { 
  defineComponent,
  PropType,
  computed,
  onMounted
} from 'vue'
import { useFilterEntity } from 'src/compose/entity'
import { displayDateTime } from 'src/serv/datetime'
import { rupiah } from 'src/serv/currency'

const columns = [
  {
    name: 'id',
    align: 'left',
    field: 'id',
    label: 'id',
    required: true,
  },
  {
    name: 'waktu',
    align: 'left',
    field: 'createdAt',
    format: displayDateTime,
    label: 'Waktu',
    required: true,
  },
  {
    name: 'nominal',
    align: 'left',
    field: 'nominal',
    format: (s: any) => 'IDR ' + rupiah(s),
    label: 'Nominal',
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
  props: {
    items: {
      type: Array as PropType<any[]>,
      required: true
    }
  },
  emits: ['remove'],
  setup(props, { emit }) {
    return {
      columns
    }
  }
})
</script>
