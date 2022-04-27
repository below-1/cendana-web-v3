<template>
  <q-select
    :options="bulanOptions"
    v-model="state"
    :label="label"
    :display-value="selectedBulan"
    emit-value
  />
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch
} from 'vue'
import { useModel } from 'src/compose/commons'

const bulanOptions = [
  { value: 0, label: 'januari' },
  { value: 1, label: 'februari' },
  { value: 2, label: 'maret' },
  { value: 3, label: 'april' },
  { value: 4, label: 'mei' },
  { value: 5, label: 'juni' },
  { value: 6, label: 'juli' },
  { value: 7, label: 'agustus' },
  { value: 8, label: 'september' },
  { value: 9, label: 'oktober' },
  { value: 10, label: 'november' },
  { value: 11, label: 'desember' }
]

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    label: String
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const state = useModel(props, 'modelValue')
    const selectedBulan = computed(() => {
      const selected = bulanOptions.find((it: any) => it.value == props.modelValue)
      if (!selected) return '-- pilih bulan --'
      return selected.label
    })

    return {
      state,
      bulanOptions,
      selectedBulan
    }
  }
})
</script>