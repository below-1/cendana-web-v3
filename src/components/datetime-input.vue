<template>
  <q-input
    v-model="model"
  >
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date
            v-model="model"
            mask="YYYY-MM-DD HH:mm">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time
            v-model="model"
            mask="YYYY-MM-DD HH:mm" format24h>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, unref, toRef, computed } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const modelValue: Ref<string> = toRef(props, 'modelValue')
    const model = computed({
      set: (v: string) => {
        emit('update:modelValue', v)
      },
      get: () => modelValue.value
    })

    return { model }
  }
})
</script>
