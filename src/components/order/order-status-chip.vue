<template>
  <q-chip :color="state.color" :label="state.label" class="q-mx-none" dark />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

export default defineComponent({
  props: {
    status: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const state = computed(() => {
      let color = 'red'
      let label = 'Terbuka'

      if (props.status != 'OPEN') {
        color = 'green'
        label = 'Terkunci'
      }

      return {
        color,
        label
      }
    })
    return {
      state
    }
  }
})
</script>