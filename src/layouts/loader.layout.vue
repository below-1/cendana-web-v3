<template>
  <loading-layout v-if="!me" />
  <app-layout v-else />
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import { useMe } from 'src/compose/auth';
import LoadingLayout from './loading.layout.vue';
import AppLayout from './app.layout.vue';

export default defineComponent({
  components: {
    LoadingLayout,
    AppLayout,
  },
  setup() {
    const { me, error } = useMe();
    provide('user', me);
    return {
      me,
      error,
    };
  },
});
</script>
