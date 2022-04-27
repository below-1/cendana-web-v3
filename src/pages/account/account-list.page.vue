<template>
  <q-page>

    <q-toolbar class="bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data Akun
      </q-toolbar-title>
      <q-input
        placeholder="keyword..."
        v-model="params.keyword"
        hide-hint
        outlined
        dense
        class="q-mr-md"
      />
      <q-btn flat color="primary" label="tambah" icon="add" :to="CREATE_URL" />
    </q-toolbar>

    <q-separator/>

    <loading-pane v-if="loading" />
    <template v-else>
      <section>
        <q-table
          hide-pagination
          :columns="COLUMNS"
          :rows="customers.items"
          :rows-per-page-options="[0]"
          flat
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                icon="delete"
                color="red"
                flat size="xs"
              />
              <q-btn
                :to="updateUrl(props.row.id)"
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
            :total-page="customers.totalPage"
          />
        </q-toolbar>
      </section>
    </template>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import LoadingPane from 'components/loading-pane.vue'
import Pagination from 'components/pagination.vue'
import { useListCustomer } from 'src/compose/customer'
import { 
  COLUMNS, 
  ENTITY_NAME, 
  BASE_APP_URL, 
  BASE_API_URL 
} from 'src/data/customer'
import { Customer } from 'src/models/customer.model'
import { useFilterEntity } from 'src/compose/entity'

export default defineComponent({
  components: {
    LoadingPane,
    Pagination
  },
  setup() {
    const updateUrl = (id: any) => `${BASE_APP_URL}/${id}/update`

    const {
      result: customers,
      getEntities: getCustomers,
      params
    } = useFilterEntity({
      name: ENTITY_NAME,
      url: BASE_API_URL,
      initialParams: {
        keyword: ''
      }
    })
    const loading = computed(() => customers.value.type == 'loading')

    onMounted(() => {
      getCustomers()
    })

    const CREATE_URL = `${BASE_APP_URL}/create`

    return {
      customers,
      loading,
      CREATE_URL,
      updateUrl,
      COLUMNS,
      params
    }
  }
})
</script>
