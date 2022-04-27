<template>
  <q-list separator>
    <q-item
      v-for="item in items"
      :key="item.label"
    >
      <q-item-section>
        {{ item.label }}
      </q-item-section>
      <q-item-section>
        {{ item.value }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<any[]>,
      required: true
    }
  }
})
</script>
