<template>
  <div>
    <h1>Horizontal Pod Autoscalers (HPA's) List:</h1>
    <b-table striped hover :fields="fields" :busy="isLoading" :items="hpaData" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'HPAList',
  data () {
    return {
      hpaData: {},
      sortBy: 'name',
      sortDesc: false,
      isLoading: true,
      fields: [
        { key: 'name', sortable: true, label: 'Name' },
        { key: 'reference', sortable: true, label: 'Reference' },
        { key: 'targets', sortable: true, label: 'Targets' },
        { key: 'minPods', sortable: true, label: 'Min. Pods' },
        { key: 'maxPods', sortable: true, label: 'Max. Pods' },
        { key: 'replicas', sortable: true, label: 'Replicas' }
      ]
    }
  },
  async mounted () {
    setInterval(async () => {
      const { data } = await this.axios.get('/hpas')
      this.hpaData = data.items.map((hpa) => ({
        name: hpa.metadata.name,
        reference: `${hpa?.spec?.scaleTargetRef?.kind ?? 'No available data'}/${hpa?.spec?.scaleTargetRef?.name ?? 'No available data'}`,
        targets: `${hpa?.status?.currentCPUUtilizationPercentage ?? 'No available data'}%/${hpa?.spec?.targetCPUUtilizationPercentage ?? 'No available data'}%`,
        minPods: hpa?.spec?.minReplicas ?? 'No available data',
        maxPods: hpa?.spec?.maxReplicas ?? 'No available data',
        replicas: `Cur. ${hpa?.status?.currentReplicas ?? 'No available data'} / Des. ${hpa?.status?.desiredReplicas ?? 'No available data'}`
      }))
      this.isLoading = false
    }, process.env.VUE_APP_INTERVAL_MS)
  }
}
</script>

<style lang="scss" scoped>
strong {
  margin-left: 20px;
}
</style>
