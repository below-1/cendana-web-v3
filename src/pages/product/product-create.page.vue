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
              :options="options"
              @submit="onSubmit"
            />
          </q-card-section>
        </q-card>

      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, Ref, reactive } from 'vue';
import { CREATE_FIELDS, ENTITY_NAME, BASE_API_URL } from 'src/data/product';
import * as ProductCategoryData from 'src/data/pcat';
import { useCreateEntity } from 'src/compose/entity';
import { getOptionsEntity } from 'src/serv/entity/options-entity.serv';
import AsyncForm from 'components/async-form.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    AsyncForm,
  },
  setup() {
    const initial = { 
      name: '',
      unit: '',
      categories: []
    };
    const { createEntity, result: createResult } = useCreateEntity(ENTITY_NAME);
    const loading = computed(() => createResult.value.type == 'loading');
    const $router = useRouter();
    const onSubmit = (payload: any) => {
      const _p = {...payload}
      _p.categories = _p.categories.map((it: any) => ({
        id: it.value
      }) as any)
      createEntity(BASE_API_URL, _p)
        .then(() => {
          $router.back();
        });
    };
    const options: any = reactive({
      categories: []
    });

    onMounted(() => {
      getOptionsEntity(ProductCategoryData.BASE_API_URL)
        .then(opts => {
          options.categories = opts;
        })
        .catch(err => {
          console.log(err);
        });
    })

    return {
      ENTITY_NAME,
      FIELDS: CREATE_FIELDS,
      options,
      initial,
      onSubmit,
      loading,
    };
  },
});
</script>
