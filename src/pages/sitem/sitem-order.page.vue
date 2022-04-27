<template>
  <q-page>
    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data Item Pembelian #{{ order }}
      </q-toolbar-title>
      <q-btn flat color="primary" label="tambah" icon="add" :to="addURL" />
    </q-toolbar>
    <loading-pane v-if="stockItems.type == 'loading'" />
    <section v-else-if="stockItems.type == 'data'">
      <q-table
        flat
        hide-pagination
        :columns="COLUMNS"
        :rows="stockItems.items"
        :rows-per-page-options="[0]">
        <template
          v-slot:body-cell-product="props">
          <q-td 
            :props="props">
            <router-link 
              :to="`/app/product/${props.row.product.id}/detail`">
              <div
                class="text-weight-bold"
              >{{ props.row.product.name }}</div>
            </router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
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
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  PropType,
  onMounted,
  toRef
} from 'vue';
import { useRoute } from 'vue-router';
import LoadingPane from 'components/loading-pane.vue';
import { useRemoveEntity } from 'src/compose/entity'
import { useFilterForOrder } from 'src/compose/sitem'
import { COLUMNS } from 'src/data/sitem'

export default defineComponent({
  components: {
    LoadingPane,
  },
  props: {
    order: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const order = toRef(props, 'order')
    const route = useRoute()
    const addURL = computed(() => route.fullPath + '/add')
    const {
      params,
      stockItems,
      getStockItems
    } = useFilterForOrder(order)
    const {
      result: removeResult,
      promptRemove
    } = useRemoveEntity('Item Pembelian')

    onMounted(() => getStockItems())

    return {
      addURL,
      value: 'OK',
      params,
      stockItems,
      removeResult,
      promptRemove,
      COLUMNS
    }
  }
})
</script>
