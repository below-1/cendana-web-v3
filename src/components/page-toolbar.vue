<template>
  <q-toolbar class="bg-grey-2 q-px-lg">
    <q-toolbar-title class="text-weight-bold text-h6">
      {{ title }}
    </q-toolbar-title>
    <slot></slot>
  </q-toolbar>
  <q-separator/>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType
} from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
      required: true
    }
  }
})
</script>
