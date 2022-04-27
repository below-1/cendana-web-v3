<template>
  <q-input
    class="q-mb-md"
    :model-value="displayed"
    @keyup="onKeyUp"
    :label="label"
    :rules="transformedRules"
    :readonly="readonly"
    prefix="Rp, "
  />
</template>

<script lang="ts">
import { 
  defineComponent,
  computed,
  PropType,
  toRef,
  reactive,
  unref,
  Ref
} from 'vue';
import Decimal from 'decimal.js'

function replaceAll(s: string, target: string, replacement: string) {
  const re = new RegExp(target, 'g')
  const result = s.replace(re, replacement)
  return result
}

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<string>
    },
    label: {
      type: String as PropType<string>
    },
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    rules: {
      type: Array as PropType<any[]>,
      default: []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const modelValue: Ref<string | undefined> = toRef(props, 'modelValue')

    const displayed = computed(() => {
      const s = unref(modelValue)
      if (!s) return '0';
      const parts = s.split('.')
      let first = parts[0]
      let last = ''
      if (parts.length > 1) {
        last = parts[1]
      }
      const parsed = parseInt(first)
      if (isNaN(parsed)) {
        return '0';
      }
      const separated = parsed.toLocaleString('id')
      let result = separated
      if (last) {
        result = result + ',' + last
      }
      return result
    })

    const transformedRules = props.rules.map(f => {
      return (v: any) => {
        const parsedV = v.replaceAll('.', '')
        return f(parsedV)
      }
    })

    function onKeyUp(event: any) {
      const s = event.target.value
      const v = s.replaceAll('.', '').replaceAll(',', '.')
      try {
        const d = new Decimal(v)
        const result = d.toString()
        emit('update:modelValue', d.toString())
      } catch (err) {
      }
    }

    return {
      onKeyUp,
      displayed,
      transformedRules
    }
  }
})
</script>