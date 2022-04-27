import { boot } from 'quasar/wrappers';
import { Chart, registerables } from 'chart.js'

export default boot(({ app }) => {
  Chart.register(...registerables)
})

