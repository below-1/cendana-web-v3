<script lang="ts">
  import { 
    defineComponent,
    onMounted
  } from 'vue'
  import LoadingPane from 'components/loading-pane.vue'
  import ErrorMessage from './error-message.vue'
  import useFinanceReport from './useFinanceReport'

  export default defineComponent({
    components: {
      LoadingPane,
      ErrorMessage
    },
    setup() {
      const {
        result,
        getSingleEntity: getLabaRugi,
        transformed: labaRugi,
        error
      } = useFinanceReport({
        name: 'Laba Rugi'
      })

      onMounted(getLabaRugi)

      return {
        result,
        labaRugi,
        error
      }
    }
  })
</script>

<template>
  <LoadingPane v-if="result.type == 'loading'"/>
  <q-markup-table v-else-if="labaRugi" separator="horizontal" flat square style="font-family: monospace !important;">
    <tbody>
      <tr>
        <td class="text-left">
          Penjualan
        </td>
        <td class="text-left">
          {{ labaRugi.totalPenjualan }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Harga Pokok Penjualan
        </td>
        <td class="text-left">
          {{ labaRugi.hpp }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Laba Kotor
        </td>
        <td class="text-left">
          {{ labaRugi.labaKotor }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Jumlah Beban Usaha
        </td>
        <td class="text-left">
          {{ labaRugi.opex }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Laba Sebelum Pajak
        </td>
        <td class="text-left">
          {{ labaRugi.labaSebelumPajak }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Pajak
        </td>
        <td class="text-left">
          {{ labaRugi.pajak }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Laba Bersih
        </td>
        <td class="text-left">
          {{ labaRugi.labaBersih }}
        </td>
      </tr>
    </tbody>
  </q-markup-table>
  <error-message v-else-if="error" 
    :message="error.message" 
    :report-not-created="error.code == 'FST_REPORT_NOT_FOUND'"
  />
</template>