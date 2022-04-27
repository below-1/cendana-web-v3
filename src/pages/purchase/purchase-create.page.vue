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
import { defineComponent, computed, onMounted, Ref, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
import { CREATE_FIELDS, ENTITY_NAME, BASE_API_URL } from 'src/data/purchase';
import { useCreateEntity } from 'src/compose/entity';
import { getOptionsEntity } from 'src/serv/entity/options-entity.serv';
import { defaultDateTime, toISO } from 'src/serv/datetime';
import AsyncForm from 'components/async-form.vue';
import { User } from 'src/models/user.model';

export default defineComponent({
  components: {
    AsyncForm,
  },
  setup() {
    const initial = { 
      description: '',
      targetUserId: null,
      createdAt: defaultDateTime()
    };
    const { createEntity, result: createResult } = useCreateEntity(ENTITY_NAME);
    const loading = computed(() => createResult.value.type == 'loading');
    const $router = useRouter();
    const user = inject<Ref<User>>('user');
    const onSubmit = (payload: any) => {
      if (!user) {
        throw new Error('user is not defined');
      }
      const realPayload = {
        ...payload,
        authorId: user.value.id,
        targetUserId: payload.targetUserId.value,
        createdAt: toISO(payload.createdAt)
      };
      // console.log(JSON.parse(JSON.stringify(realPayload)));
      // console.log('realPayload');
      // console.log(realPayload);
      // return;
      createEntity(BASE_API_URL, realPayload)
        .then((data) => {
          const { id } = data
          $router.push(`/app/purchase/${id}/detail`);
        });
    };
    const options: any = reactive({
      targetUserId: []
    });

    onMounted(() => {
      getOptionsEntity('/v1/api/users/suppliers')
        .then(opts => {
          options.targetUserId = opts;
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
