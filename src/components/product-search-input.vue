<template>
  <q-select
    filled
    class="q-mb-md"
    label="Pilih Produk"
    use-input
    @filter="onFilterProducts"
    :options="productOptions"
    :model-value="modelValue"
    :rules="rules"
    @update:model-value="v => $emit('update:modelValue', v)"
    option-label="name"
    :display-value="displayName"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, unref, toRef, computed } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<any>
    },
    rules: {
      type: Array as PropType<any[]>
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const modelValue = toRef(props, 'modelValue')
    const productOptions = ref([])

    async function onFilterProducts(val: any, update: any) {
      try {
        const response = await api.get('/v1/api/products', { params: { keyword: val } })
        const result = response.data;
        const items = result.items;
        update(() => {
          productOptions.value = items;
        });
      } catch (err) {
        console.log(err);
        alert('gagal');
      }
    }

    const displayName = computed(() => {
      const v: any = unref(modelValue)
      return (v && v.name) ? v.name : ''
    })

    return {
      onFilterProducts,
      productOptions,
      displayName
    }
  }
})
</script>
