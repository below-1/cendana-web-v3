<template>
  <q-page>
    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data Penjualan
      </q-toolbar-title>
      <q-btn flat color="primary" label="tambah" icon="add" :to="createURL" />
    </q-toolbar>
    
    <q-separator/>
    <filter-toolbar
      v-model:year="params.year"
      v-model:month="params.month"
      v-model:keyword="params.keyword"
      :total-data="sales.totalData"
    />
    <q-separator/>

    <loading-pane v-if="sales.type == 'loading'" />
    <template v-else>
      <q-table
        flat
        hide-pagination
        :columns="COLUMNS"
        :rows="sales.items"
        :rows-per-page-options="[0]"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip v-if="props.row.orderStatus == 'OPEN'"
              size="sm"
              color="red" text-color="white">
              Open
            </q-chip>
            <q-chip v-else
              size="sm"
              color="green" text-color="white">
              Locked
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              icon="details"
              color="teal"
              flat 
              size="sm"
              :to="`/app/sale/${props.row.id}/detail`"
            />
            <q-btn
              @click="onRemove(props.row)"
              icon="delete"
              color="red"
              flat 
              size="sm"
            />
          </q-td>
        </template>
      </q-table>
      <section class="q-px-lg">
        <q-toolbar class="text-grey-8 q-py-lg">
          <pagination
            v-model:page="params.page"
            v-model:per-page="params.perPage"
            :total-page="sales.totalPage"
          />
        </q-toolbar>
      </section>
    </template>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { 
  ENTITY_NAME, 
  BASE_APP_URL, 
  BASE_API_URL, 
  COLUMNS 
} from 'src/data/sale'
import FilterToolbar from 'components/transaction/filter-toolbar.vue'
import LoadingPane from 'components/loading-pane.vue'
import Pagination from 'components/pagination.vue'
import { useFilterEntity, useRemoveEntity } from 'src/compose/entity'
import { currentYearMonth } from 'src/serv/datetime'

export default defineComponent({
  components: {
    FilterToolbar,
    LoadingPane,
    Pagination,
  },
  setup() {
    const {
      year,
      month
    } = currentYearMonth()

    const initialParams = {
      year,
      month,
      keyword: ''
    }
    const createURL = `${BASE_APP_URL}/create`
    const { params, result: sales, getEntities: getSales } = useFilterEntity({
      initialParams,
      url: BASE_API_URL,
      name: ENTITY_NAME
    })

    const {
      result: removeResult,
      promptRemove
    } = useRemoveEntity(ENTITY_NAME);
    const onRemove = (item: any) => {
      promptRemove(`${BASE_API_URL}/${item.id}`, item.id)
        .then(() => getSales())
    }

    onMounted(getSales)

    return {
      params,
      sales,
      getSales,
      createURL,
      COLUMNS,
      onRemove
    }
  }
})
</script>
