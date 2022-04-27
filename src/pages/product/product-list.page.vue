<template>
  <q-page>

    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data {{ ENTITY_NAME }}
      </q-toolbar-title>
      <q-input v-model="params.keyword" hide-hint placeholder="keyword..." />
      <q-btn flat color="primary" label="rekam data" class="q-mr-sm" @click="dialogRekamData = true" />
      <q-btn flat color="primary" label="tambah" icon="add" :to="CREATE_URL" />
    </q-toolbar>

    <loading-pane v-if="showLoading" />

    <template v-else>
      <q-separator/>
      <section class="q-px-lg">
        <q-table
          flat
          hide-pagination
          :columns="COLUMNS"
          :rows="products.items"
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
              <q-btn-dropdown 
                color="primary" 
                icon="settings" 
                flat 
                size="xs">
                <q-list separator>
                  <q-item :to="getPurchaseURL(props.row.id)">
                    <q-item-section>
                      <q-item-label>Daftar Pembelian</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item :to="getSaleURL(props.row.id)">
                    <q-item-section>
                      <q-item-label>Daftar Penjualan</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-td>
          </template>
        </q-table>
      </section>
      <q-separator/>
      <section class="q-px-lg">
        <q-toolbar class="text-grey-8 q-py-lg">
          <pagination
            v-model:page="params.page"
            v-model:per-page="params.perPage"
            :total-page="products.totalPage"
          />
        </q-toolbar>
      </section>
    </template>

    <q-dialog v-model="dialogRekamData">
      <q-card flat bordered style="width: 500px;">
        <div class="q-pa-sm">
          <h6 class="q-my-none">Form Rekam Data</h6>
        </div>
        <q-card-section>
          <q-form>
            <bulan-input
              label="pilih bulan"
              v-model="payloadRekamData.bulan"
              class="q-mb-md"
            />
            <q-select
              label="Pilih poin rekam data"
              v-model="payloadRekamData.target"
              :options="targetRekamDataOptions"
            />
          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-btn @click="snapshotInventory" label="simpan" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, reactive } from 'vue';
import { lastDayOfMonth, format } from 'date-fns'
import { api } from 'boot/axios'
import { defaultDateTime, toISO } from 'src/serv/datetime'
import { useRoute } from 'vue-router'
import { useFilterEntity, useRemoveEntity } from 'src/compose/entity';
import LoadingPane from 'components/loading-pane.vue';
import Pagination from 'components/pagination.vue'
import DatetimeInput from 'components/datetime-input.vue'
import BulanInput from 'components/bulan-input.vue'
import {
  ENTITY_NAME,
  BASE_APP_URL,
  BASE_API_URL,
  COLUMNS
} from 'src/data/product'

export default defineComponent({
  components: {
    LoadingPane,
    Pagination,
    DatetimeInput,
    BulanInput
  },
  setup() {
    const CREATE_URL = BASE_APP_URL + '/create';

    function generateUpdateURL(id: number) {
      return BASE_APP_URL + `/${id}/update`;
    }

    const {
      params,
      getEntities: getProducts,
      result: products
    } = useFilterEntity({
      url: BASE_API_URL,
      name: 'Produk',
      initialParams: {
        keyword: ''
      }
    })

    const {
      result: removeResult,
      promptRemove
    } = useRemoveEntity(ENTITY_NAME);

    const onRemove = (item: any) => {
      promptRemove(`${BASE_API_URL}/${item.id}`, item.title)
        .then(() => getProducts())
    }

    const showLoading = computed(() => products.value.type == 'loading' || removeResult.value.type == 'loading');

    const dialogRekamData = ref(false)
    const payloadRekamData = reactive<any>({
      bulan: (new Date()).getMonth(),
      target: ''
    })
    const targetRekamDataOptions = ['awal', 'akhir']

    async function snapshotInventory() {
      const { bulan, target } = payloadRekamData
      let date = new Date()
      date.setMonth(bulan)
      if (target == 'awal') {
        date.setDate(1)
      } else {
        date = lastDayOfMonth(date)
      }
      const response = await api.post('/v1/api/products/snapshot', {}, {
        params: {
          target: format(date, 'yyyy-MM-dd')
        }
      })
      console.log(response.data)
    }

    const route = useRoute()
    const getSaleURL = (id: number) => 
      `${route.fullPath}/${id}/sales`
    const getPurchaseURL = (id: number) => 
      `${route.fullPath}/${id}/purchases`

    onMounted(getProducts)

    return {
      COLUMNS,
      ENTITY_NAME,
      CREATE_URL,
      params,
      products,
      generateUpdateURL,
      onRemove,
      showLoading,
      getSaleURL,
      getPurchaseURL,
      dialogRekamData,
      payloadRekamData,
      targetRekamDataOptions,
      snapshotInventory
    };
  },
});
</script>
