<template>
  <q-page>

    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data Perubahan Modal
      </q-toolbar-title>
      <q-btn 
        to="/app/equity/create" 
        flat 
        color="primary" 
        label="tambah" 
        icon="add" />
    </q-toolbar>
    <q-separator/>
    <div class="q-px-lg flex q-py-md">
      <q-input dense placeholder="keyword..." v-model="params.keyword" class="q-mr-md" />
      <month-select 
        v-model:year="params.year"
        v-model:month="params.month"
      />
    </div>

    <loading-pane v-if="equityChanges.type == 'loading'" />
    <template v-else-if="equityChanges.type == 'data'">
      <section>
        <q-table
          hide-pagination
          :columns="COLUMNS"
          :rows="equityChanges.items"
          :rows-per-page-options="[0]"
          flat
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                icon="delete"
                color="red"
                flat size="xs"
                @click="onRemove(props.row.equityChange.id)"
              />
              <q-btn
                :to="`/app/equity/${props.row.equityChange.id}/update`"
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
            :total-page="equityChanges.totalPage"
          />
        </q-toolbar>
      </section>
    </template>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import MonthSelect from 'components/month-select.vue'
import LoadingPane from 'components/loading-pane.vue'
import Pagination from 'components/pagination.vue'
import { useFilterEntity, useRemoveEntity } from 'src/compose/entity'
import { COLUMNS } from 'src/data/equity'
import { currentYearMonth } from 'src/serv/datetime'

export default defineComponent({
  components: {
    LoadingPane,
    Pagination,
    MonthSelect
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
      type: 'EQUITY_CHANGE'
    }
    const {
      params,
      result: equityChanges,
      getEntities: getEquityChanges
    } = useFilterEntity({
      name: 'Perubahan Modal',
      url: '/v1/api/transactions',
      initialParams
    })

    const {
      result: removeResult,
      promptRemove
    } = useRemoveEntity('Perubahan Modal')

    const onRemove = (id: any) => {
      promptRemove(`/v1/api/equity/${id}`, `${id}`)
        .then(() => getEquityChanges())
    }

    onMounted(() => {
      getEquityChanges()
    })

    return {
      equityChanges,
      params,
      onRemove,
      promptRemove,
      COLUMNS
    }
  }
})
</script>