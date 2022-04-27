<template>
  <q-chip 
    outline 
    :color="data.color" 
    class="text-weight-bold text-uppercase"
  >
    {{ data.message }}
  </q-chip>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed
} from 'vue'

export default defineComponent({
  props: {
    complete: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },
  setup(props) {
    const data = computed(() => {
      const color = props.complete ? 'positive' : 'negative'
      const message = props.complete ? 'Lunas' : 'Belum Lunas'
      return {
        color,
        message
      }
    })
    return {
      data
    }
  }
})
</script>