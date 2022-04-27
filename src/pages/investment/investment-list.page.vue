<template>
  <q-page>

    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data Investasi
      </q-toolbar-title>
      <q-btn 
        to="/app/investment/create" 
        flat 
        color="primary" 
        label="tambah" 
        icon="add" />
    </q-toolbar>

    <q-separator/>
    <filter-toolbar
      v-model:year="params.year"
      v-model:month="params.month"
      v-model:keyword="params.keyword"
      :total-data="investment.totalData"
    />
    <q-separator/>

    <loading-pane v-if="investment.type == 'loading'" />
    <template v-else-if="investment.type == 'data'">
      <section>
        <q-table
          hide-pagination
          :columns="COLUMNS"
          :rows="investment.items"
          :rows-per-page-options="[0]"
          flat
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
                :to="`/app/investment/${props.row.id}/update`"
                icon="edit" 
                color="primary" 
                flat 
                size="xs" />
            </q-td>
          </template>
        </q-table>
      </section>
      <section class="q-px-lg">
        <q-toolbar class="text-grey-8 q-py-lg">
          <pagination
            v-model:page="params.page"
            v-model:per-page="params.perPage"
            :total-page="investment.totalPage"
          />
        </q-toolbar>
      </section>
    </template>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import FilterToolbar from 'components/transaction/filter-toolbar.vue'
import LoadingPane from 'components/loading-pane.vue'
import Pagination from 'components/pagination.vue'
import { useFilterEntity, useRemoveEntity } from 'src/compose/entity';
import { COLUMNS } from 'src/data/investment'
import { currentYearMonth } from 'src/serv/datetime'

export default defineComponent({
  components: {
    LoadingPane,
    Pagination,
    FilterToolbar
  },
  setup() {
    const {
      year,
      month
    } = currentYearMonth()

    const initialParams = {
      year,
      month,
      keyword: '',
      type: 'INVESTMENT'
    }
    const {
      params,
      result: investment,
      getEntities: getInvestment
    } = useFilterEntity({
      name: 'Biaya Peralatan',
      url: '/v1/api/transactions',
      initialParams
    })

    const {
      result: removeResult,
      promptRemove
    } = useRemoveEntity('Investasi');

    const onRemove = (item: any) => {
      promptRemove(`/v1/api/investment-trans/${item.id}`, item.id)
        .then(() => getInvestment());
    }

    onMounted(() => {
      getInvestment()
    })

    return {
      investment,
      params,
      COLUMNS,
      onRemove
    }
  }
})
</script>
