<template>
  <q-select
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
    clearable
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
    orderId: {
      type: [Number, String] as PropType<number | string>,
      required: true
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
      const params = {
        keyword: val,
        orderId: props.orderId
      }
      try {
        const response = await api.get('/v1/api/products/free-for-order', { params })
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
