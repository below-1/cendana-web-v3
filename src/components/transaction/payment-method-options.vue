<template>
  <q-select
    label="Metode Pembayaran"
    v-model="state"
    :options="PAYMENT_METHOD_OPTIONS"
    :display-value="selectedPaymentMethod"
    emit-value
    class="q-mb-md"
  />
</template>

<script lang="ts">
import { 
  defineComponent, 
  PropType,
  computed
} from 'vue'
import { 
  PaymentMethod, 
  PAYMENT_METHOD_OPTIONS 
} from 'src/data/transaction'
import { useModel } from 'src/compose/commons'

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props) {
    const state = useModel(props, 'modelValue')
    const selectedPaymentMethod = computed(() => {
      const selected = PAYMENT_METHOD_OPTIONS.find((it: any) => it.value == props.modelValue)
      if (!selected) return '-- pilih metode pembayaran --'
      return selected.label
    })
    return {
      PAYMENT_METHOD_OPTIONS,
      state,
      selectedPaymentMethod
    }
  }
})
</script>