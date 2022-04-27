<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-indigo-8" style="flex-direction: column;">
        <div class="app-desc text-white text-center q-mb-xl">
          <h3 class="q-my-none text-weight-bold">{{ data.app.name }}</h3>
          <h6 class="q-my-none text-grey-5">{{ data.app.description }}</h6>
        </div>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as data from 'src/data/commons/app.data';

export default defineComponent({
  setup() {
    return {
      data,
    };
  },
});
</script>
