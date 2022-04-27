<template>
  <q-page>
    <q-toolbar class="text-grey-8 bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Tambah Data {{ ENTITY_NAME }}
      </q-toolbar-title>
    </q-toolbar>
    <div class="row flex-center q-my-xl">
      <div class="col-md-6 col-xs-12">
        <q-card class="rounded-borders">
          <q-card-section>
            <async-form
              :fields="FIELDS"
              :initial="initial"
              :loading="loading"
              @submit="onSubmit"
            />
          </q-card-section>
        </q-card>

      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { CREATE_FIELDS, ENTITY_NAME, BASE_API_URL } from 'src/data/inv-cat'
import { useCreateEntity } from 'src/compose/entity'
import AsyncForm from 'components/async-form.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    AsyncForm,
  },
  setup() {
    const initial = { title: '' };
    const { createEntity, result: createResult } = useCreateEntity(ENTITY_NAME);
    const loading = computed(() => createResult.value.type == 'loading');
    const $router = useRouter();
    const onSubmit = (payload: any) => {
      createEntity(BASE_API_URL, payload)
        .then(() => {
          $router.back();
        });
    };

    return {
      ENTITY_NAME,
      FIELDS: CREATE_FIELDS,
      initial,
      onSubmit,
      loading,
    };
  },
});
</script>
