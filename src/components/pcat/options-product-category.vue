<template>
  <q-skeleton
    v-if="productCategories.type == 'loading'"
    class="q-my-md"
    type="rect"
  />
  <q-select
    v-else
    label="Kategori Produk"
    v-model="model"
    multiple
    option-label="title"
    option-value="id"
    outlined
    :options="productCategories.items"
  />
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed, onMounted } from 'vue'
import { useFindProductCategories } from 'src/compose/pcat'

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<any>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const {
      result: productCategories,
      params,
      getProductCategories
    } = useFindProductCategories()

    const model = computed({
      set: (selections: any) => {
        emit('update:modelValue', selections.map((item: any) => {
          return {
            ...item
          }
        }))
      },
      get: () => props.modelValue
    })

    onMounted(() => {
      getProductCategories()
    })

    return {
      productCategories,
      model
    }
  }
})
</script>