<template>
  <q-select
    class="q-mb-md"
    label="Pilih Pelanggan"
    use-input
    :loading="loading"
    @filter="onFilterCustomers"
    :options="customers"
    v-model="model"
    :rules="rules"
    option-label="name"
    :display-value="displayName"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, unref, Ref, toRef, computed } from 'vue'
import { findCustomers } from 'src/serv/customer'

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<any>
    },
    rules: {
      type: Array as PropType<any[]>
    }
  },
  setup(props, { emit }) {
    const modelValue: Ref<any> = toRef(props, 'modelValue')
    const model = computed({
      set: (val: any) => {
        emit('update:modelValue', val)
      },
      get: () => modelValue.value
    })

    const customers = ref([])
    const loading = ref(false)
    async function onFilterCustomers(val: any, update: any) {
      loading.value = true
      try {
        const result = await findCustomers({
          keyword: val,
          page: 0,
          perPage: 10
        })
        update(() => {
          customers.value = result.items
        })
      } catch (err) {
        console.log(err)
      } finally {
        loading.value = false
      }
    }

    const displayName = computed(() => {
      const v: any = unref(modelValue)
      return (v && v.name) ? v.name : ''
    })

    return {
      customers,
      loading,
      model,
      displayName,
      onFilterCustomers
    }
  }
})
</script>
