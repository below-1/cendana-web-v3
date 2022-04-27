<script lang="ts">
  import { 
    defineComponent, 
    computed, 
    onMounted,
    reactive
  } from 'vue'

  export default defineComponent({
    setup () {
      const menus = [
        { label: 'Laba Rugi', 
          icon: 'sync_alt', 
          path: 'laba_rugi', 
          color: 'green',
          description: 'laporan keuangan yang dapat mengetahui jumlah total pendapatan dan pengeluaran baik harga pokok penjualan maupun biaya operasional.' },
        { label: 'Neraca', 
          icon: 'scale',
          path: 'neraca',
          color: 'blue',
          description: 'bagian dari laporan keuangan dari entitas bisnis atau perusahaan yang mencatat informasi tentang aset, kewajiban, dan ekuitas pemegang saham pada waktu tertentu.'
        },
        { label: 'Arus Kas', icon: 'ait', path: 'arus_kas' },
      ]
      return {
        menus
      }
    }
  })
</script>

<template>
  <q-markup-table separator="horizontal" flat bordered square>
    <thead class="bg-grey-2">
      <tr>
        <td style="width: 10%;">No.</td>
        <td>Laporan</td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="menu, index in menus"
        :key="menu.path"
      >
        <td>{{ index + 1 }}</td>
        <td>
          <router-link :to="`finance/${menu.path}`">
            {{ menu.label }}
          </router-link>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>