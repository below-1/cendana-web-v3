<template>
  <div style="display: flex; justify-content: center;">
    <q-btn
      v-if="open"
      @click="$emit('show-seal')"
      label="kunci transaksi" 
      outline
      class="q-mr-md"
    />
    <q-btn 
      v-if="open"
      @click="$emit('show-update')"
      label="edit data penjualan"
      outline
      icon="edit" 
    />
  </div>
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
  emits: ['show-update', 'show-seal'],
  props: {
    open: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  }
})
</script>