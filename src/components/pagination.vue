<template>
  <q-select
    :options="[10, 25, 50]"
    :model-value="perPage"
    @update:model-value="onPerPageChange"
    label="jumlah item per halaman"
    dense
    outlined
    class="q-mr-lg"
    style="min-width: 200px;"/>
  <q-input
    :model-value="page + 1"
    @update:model-value="onPageChange"
    :shadow-text="`/${totalPage}`"
    :suffix="`/${totalPage}`"
    type="number"
    :max="totalPage"
    :min="1"
    label="halaman"
    dense
    outlined
    style="min-width: 100px;"/>  
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    page: {
      type: Number as PropType<number>,
      required: true
    },
    perPage: {
      type: Number as PropType<number>,
      required: true
    },
    totalPage: {
      type: Number as PropType<number>,
      required: true
    }
  },
  emits: ['update:page', 'update:perPage'],
  setup(props, { emit }) {
    const onPageChange = (v: any) => {
      if (!v || isNaN(v)) {
        return
      }
      const page = parseInt(v) - 1
      emit('update:page', page)
    }

    const onPerPageChange = (v: any) => {
      emit('update:perPage', v)
    }

    return {
      onPageChange,
      onPerPageChange
    }
  }
})
</script>
