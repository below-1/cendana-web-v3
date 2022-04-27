<template>
  <q-select
    class="q-mb-md"
    label="Pilih Beban Usaha"
    use-input
    @filter="onFilterOptions"
    :options="options"
    :model-value="modelValue"
    @update:model-value="v => $emit('update:modelValue', v)"
    option-label="title"
    :display-value="displayName"
    clearable
  />
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  toRef,
  unref,
  ref,
  computed
} from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<any>
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup(props, { emit }) {
    const modelValue = toRef(props, 'modelValue')
    const options = ref([])

    async function onFilterOptions(val: any, update: any) {
      const params = {
        keyword: val,
        page: 0,
        perPage: -1
      }
      try {
        const response = await api.get('/v1/api/opexes', { params })
        const result = response.data
        const items = result.items
        update(() => {
          options.value = items
        })
      } catch (err) {
        console.log(err)
        alert('gagal')
      }
    }

    const displayName = computed(() => {
      const v: any = unref(modelValue)
      return (v && v.title) ? v.title : ''
    })

    return {
      displayName,
      options,
      onFilterOptions
    }
  }
})
</script>
