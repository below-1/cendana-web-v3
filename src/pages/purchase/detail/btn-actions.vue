<template>
  <q-btn
    v-if="open"
    @click="$emit('show-seal')"
    label="Kunci Pembelian" 
    outline
    class="q-mr-md"
  />
  <q-btn 
    v-if="open"
    @click="$emit('show-update')"
    label="edit data pembelian"
    outline
    icon="edit" 
  />
</template>

<script lang="ts">
import { 
  defineComponent, 
  onMounted, 
  PropType, 
  computed, 
  toRef, 
  ref, 
  unref,
  provide
} from 'vue'

export default defineComponent({
  props: {
    open: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  }
})
</script>