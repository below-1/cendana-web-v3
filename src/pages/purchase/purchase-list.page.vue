<template>
  <q-page>

    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data {{ ENTITY_NAME }}
      </q-toolbar-title>
      <q-btn flat color="primary" label="tambah" icon="add" :to="CREATE_URL" />
    </q-toolbar>

    <q-separator/>
    <filter-toolbar
      v-model:year="params.year"
      v-model:month="params.month"
      v-model:keyword="params.keyword"
      :total-data="listResult.totalData"
    />
    <q-separator/>

    <loading-pane v-if="showLoading" />

    <section v-else>
      <q-table
        flat
        hide-pagination
        :columns="COLUMNS"
        :rows="listResult.items"
        :rows-per-page-options="[0]"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <order-status-chip 
              :status="props.row.orderStatus"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              icon="details"
              color="teal"
              flat 
              size="sm"
              :to="`/app/purchase/${props.row.id}/detail`"
            />
            <q-btn
              icon="delete"
              color="red"
              flat 
              size="sm"
              @click="onRemove(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </section>

    <section class="q-px-lg">
      <q-toolbar class="text-grey-8 q-py-lg">
        <q-select
          :options="[10, 25, 50]"
          v-model.number="params.per_page"
          label="jumlah item per halaman"
          dense
          outlined
          class="q-mr-lg"
          style="min-width: 200px;"/>
        <q-input
          :model-value="params.page + 1"
          @update:model-value="v => {
            params.page = v - 1;
          }"
          :shadow-text="`/${listResult.totalPage}`"
          :suffix="`/${listResult.totalPage}`"
          type="number"
          :max="listResult.totalPage - 1"
          :min="1"
          label="halaman"
          dense
          outlined
          style="max-width: 100px;"/>
      </q-toolbar>
    </section>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useFilterEntity, useListEntity, useRemoveEntity } from 'src/compose/entity';
import { id as LocaleID } from 'date-fns/locale'
import { rupiah } from 'src/serv/currency'
import FilterToolbar from 'components/transaction/filter-toolbar.vue'
import LoadingPane from 'components/loading-pane.vue';
import OrderStatusChip from 'components/order/order-status-chip.vue'
import MonthSelect from 'components/month-select.vue'
import {
  ENTITY_NAME,
  BASE_APP_URL,
  BASE_API_URL,
  COLUMNS
} from 'src/data/purchase';
import { currentYearMonth } from 'src/serv/datetime'

export default defineComponent({
  components: {
    FilterToolbar,
    LoadingPane,
    MonthSelect,
    OrderStatusChip,
  },
  setup() {
    const CREATE_URL = BASE_APP_URL + '/create';

    function generateUpdateURL(id: number) {
      return BASE_APP_URL + `/${id}/update`;
    }
    const {
      year,
      month
    } = currentYearMonth()

    const initialParams = {
      year,
      month,
      keyword: ''
    }
    const {
      params,
      result: listResult,
      getEntities,
    } = useFilterEntity({ 
      name: ENTITY_NAME,
      url: BASE_API_URL,
      initialParams
    });

    const {
      result: removeResult,
      promptRemove
    } = useRemoveEntity(ENTITY_NAME);

    const onRemove = (item: any) => {
      promptRemove(`${BASE_API_URL}/${item.id}`, item.id)
        .then(() => getEntities());
    }

    const showLoading = computed(() => listResult.value.type == 'loading' || removeResult.value.type == 'loading');

    onMounted(getEntities)

    return {
      COLUMNS,
      ENTITY_NAME,
      CREATE_URL,
      params,
      listResult,
      generateUpdateURL,
      onRemove,
      showLoading,
    };
  },
});
</script>
