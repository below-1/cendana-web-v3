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
        getSingleEntity: getNeraca,
        transformed: neraca,
        error
      } = useFinanceReport({
        name: 'Neraca'
      })

      onMounted(getNeraca)

      return {
        result,
        neraca,
        error
      }
    }
  })
</script>

<template>
  <LoadingPane v-if="result.type == 'loading'"/>
  <q-markup-table v-else-if="neraca" separator="horizontal" flat square style="font-family: monospace !important;">
    <tbody>
      <tr>
        <th class="text-left" colspan="2">
          <div style="font-weight: bold; font-size: 1rem;">Aktiva Lancar</div>
        </th>
      </tr>
      <tr>
        <td class="text-left">
          Kas
        </td>
        <td class="text-left">
          {{ neraca.kas }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Piutang
        </td>
        <td class="text-left">
          {{ neraca.piutang }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Persediaan
        </td>
        <td class="text-left">
          {{ neraca.persediaan }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Jumlah Aktiva Lancar
        </td>
        <td class="text-left">
          {{ neraca.aktivaLancar }}
        </td>
      </tr>
      <tr>
        <th class="text-left" colspan="2">
          <div style="height: 10px;"></div>
        </th>
      </tr>
      <tr>
        <th class="text-left" colspan="2">
          <div style="font-weight: bold; font-size: 1rem;">Aktiva Tetap</div>
        </th>
      </tr>      
      <tr>
        <td class="text-left">
          Peralatan
        </td>
        <td class="text-left">
          {{ neraca.peralatan }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Akumulasi Penyusutan Peralatan
        </td>
        <td class="text-left">
          {{ neraca.akumulasiPeralatan }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Jumlah Aktiva Tetap
        </td>
        <td class="text-left">
          {{ neraca.aktivaTetap }}
        </td>
      </tr>
      <tr>
        <th class="text-left" colspan="2">
          <div style="height: 10px;"></div>
        </th>
      </tr>
      <tr>
        <td class="text-left">
          Utang Dagang
        </td>
        <td class="text-left">
          {{ neraca.utangDagang }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Jumlah Kewajiban Jangka Pendek
        </td>
        <td class="text-left">
          {{ neraca.utangDagang }}
        </td>
      </tr>
      <tr>
        <td class="text-left text-weight-bold">
          Jumlah Aktiva
        </td>
        <td class="text-left">
          {{ neraca.aktiva }}
        </td>
      </tr>

      <tr>
        <th class="text-left" colspan="2">
          <div style="height: 10px;"></div>
        </th>
      </tr>

      <tr>
        <th class="text-left" colspan="2">
          <div style="font-weight: bold;">Ekuitas (Modal)</div>
        </th>
      </tr>
      <tr>
        <td class="text-left">
          Modal Awal
        </td>
        <td class="text-left">
          {{ neraca.modalAwal }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Laba
        </td>
        <td class="text-left">
          {{ neraca.labaBersih }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Jumlah Modal
        </td>
        <td class="text-left">
          {{ neraca.modalAkhir }}
        </td>
      </tr>

      <tr>
        <td class="text-left text-weight-bold">
          Jumlah Passiva
        </td>
        <td class="text-left">
          {{ neraca.passiva }}
        </td>
      </tr>
    </tbody>
  </q-markup-table>
  <error-message 
    v-else-if="error" 
    :message="error.message" 
    :report-not-created="error.code == 'FST_REPORT_NOT_FOUND'"
  />
</template>