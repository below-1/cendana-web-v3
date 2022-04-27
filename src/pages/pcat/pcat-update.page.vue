<template>
  <q-page>
    <q-toolbar class="text-grey-8 bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Update Data {{ ENTITY_NAME }}
      </q-toolbar-title>
    </q-toolbar>

    <loading-pane v-if="loading" />

    <div v-else class="row flex-center q-my-xl">
      <div class="col-md-6 col-xs-12">
        <q-card class="rounded-borders">
          <q-card-section>
            <async-form
              :fields="FIELDS"
              :loading="loading"
              :initial="initial"
              @submit="onSubmit"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  PropType,
  onMounted,
  computed,
} from 'vue';
import { useSingleEntity, useUpdateEntity } from 'src/compose/entity';
import AsyncForm from 'components/async-form.vue';
import LoadingPane from 'components/loading-pane.vue';
import { UPDATE_FIELDS, ENTITY_NAME, BASE_API_URL } from 'src/data/pcat';

export default defineComponent({
  components: {
    AsyncForm,
    LoadingPane,
  },
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    },
  },
  setup(props) {
    const { id } = toRefs(props);
    const url = computed(() => `${BASE_API_URL}/${id.value}`);

    const {
      result: singleResult,
      getSingleEntity
    } = useSingleEntity(ENTITY_NAME);
    const initial = computed(() => singleResult.value.type == 'result' ? singleResult.value.data : {});

    const {
      result: updateResult,
      updateEntity
    } = useUpdateEntity(ENTITY_NAME);

    const loading = computed(() => singleResult.value.type == 'loading' || updateResult.value.type == 'loading');

    onMounted(() => {
      getSingleEntity(url.value);
    });

    function onSubmit(payload: any) {
      updateEntity(url.value, payload);
    }

    return {
      ENTITY_NAME,
      FIELDS: UPDATE_FIELDS,
      loading,
      onSubmit,
      initial,
    };
  },
});
</script>
