<template>
  <q-form>
    <q-select
      label="supplier"
      class="q-mb-3"
      :model-value="modelValue.targetUserId"
      @update:model-value="(v) => onUpdate('targetUserId', v)"
      option-label="name"
      option-value="id"
      :options="suppliers"
    />
  </q-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, computed, toRef, unref, Ref } from 'vue'
import { useListSupplier } from 'src/compose/supplier'

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<any>,
      required: true
    }
  },
  setup() {
    const { suppliers, getSuppliers } = useListSupplier()
    onMounted(() => {
      getSuppliers()
    })

    const onUpdate = (key: string, val: any) => {
      console.log(`${key} = ${val}`)
    }

    return {
      suppliers
    }
  }
})
</script>
