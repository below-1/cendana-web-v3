<template>
  <q-page>

    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data {{ ENTITY_NAME }}
      </q-toolbar-title>
      <q-btn flat color="primary" label="tambah" icon="add" :to="CREATE_URL" />
    </q-toolbar>

    <loading-pane v-if="showLoading" />

    <section v-else class="q-px-lg">
      <q-table
        flat
        hide-pagination
        :columns="COLUMNS"
        :rows="listResult.items"
        :rows-per-page-options="[0]"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              icon="delete"
              color="red"
              flat size="xs"
              @click="onRemove(props.row)"
            />
            <q-btn
              :to="generateUpdateURL(props.row.id)"
              icon="edit" color="primary" flat size="xs" />
          </q-td>
        </template>
      </q-table>
    </section>

    <section class="q-px-lg">
      <q-toolbar class="text-grey-8 q-py-lg">
        <pagination
          v-model:page="params.page"
          v-model:per-page="params.perPage"
          :total-page="listResult.totalPage"
        />
      </q-toolbar>
    </section>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useListEntity, useRemoveEntity } from 'src/compose/entity';
import LoadingPane from 'components/loading-pane.vue';
import Pagination from 'components/pagination.vue'
import {
  ENTITY_NAME,
  BASE_APP_URL,
  BASE_API_URL,
  COLUMNS
} from 'src/data/supplier';

export default defineComponent({
  components: {
    LoadingPane,
    Pagination,
  },
  setup() {
    const CREATE_URL = BASE_APP_URL + '/create';

    function generateUpdateURL(id: number) {
      return BASE_APP_URL + `/${id}/update`;
    }

    const {
      params,
      result: listResult,
      getEntityList,
    } = useListEntity({ 
      name: ENTITY_NAME,
      url: BASE_API_URL 
    });

    const {
      result: removeResult,
      promptRemove
    } = useRemoveEntity(ENTITY_NAME);

    const onRemove = (item: any) => {
      promptRemove(`${BASE_API_URL}/${item.id}`, item.id)
        .then(() => getEntityList());
    }

    const showLoading = computed(() => listResult.value.type == 'loading' || removeResult.value.type == 'loading');
    
    const onPageChange = (v: any) => {
      if (!v || isNaN(v)) {
        return
      }
      params.page = v - 1
    }

    return {
      COLUMNS,
      ENTITY_NAME,
      CREATE_URL,
      params,
      listResult,
      generateUpdateURL,
      onRemove,
      showLoading,
      onPageChange
    };
  },
});
</script>
