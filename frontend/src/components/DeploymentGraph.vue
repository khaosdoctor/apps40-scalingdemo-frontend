<template>
  <div class="main">
    <h1>Deployment Graph</h1>
    <graph :net-nodes="nodes" :net-links="links" :options="options"></graph>
  </div>
</template>

<script>
import Graph from 'vue-d3-network'

export default {
  name: 'DeploymentGraph',
  data () {
    return {
      nodes: [],
      links: [],
      totalAvailablePods: 0,
      totalUnavailablePods: 0,
      options: {
        force: 5000,
        nodeSize: 40,
        nodeLabels: true,
        linkWidth: 2
      }
    }
  },
  components: {
    graph: Graph
  },
  async mounted () {
    setInterval(async () => {
      const { data: { items } } = await this.axios.get('/deployments')
      const currentAvailable = items.reduce((acc, cur) => acc + cur.status.availableReplicas || 0, 0)
      const currentUnavailable = items.reduce((acc, cur) => acc + cur.status.unavailableReplicas || 0, 0)
      if (this.totalAvailablePods + this.totalUnavailablePods === currentUnavailable + currentAvailable) return

      this.totalAvailablePods = currentAvailable
      this.totalUnavailablePods = currentUnavailable
      this.nodes = []
      this.links = []

      for (const deployment of items) {
        const deploymentName = deployment?.metadata?.name ?? 'No name'
        const available = deployment.status.availableReplicas || 0
        const unavailable = deployment.status.unavailableReplicas || 0
        this.nodes.push({ name: `[DEPLOY] ${deploymentName}`, _color: 'purple', id: deploymentName })

        for (let pod = 1; pod <= available; pod++) {
          const podName = `[POD] ${deploymentName} Pod ${pod}`
          this.nodes.push({ name: podName, id: podName, _color: 'green' })
          this.links.push({ name: `${podName}_link`, id: `${deploymentName}_${podName}`, sid: deploymentName, tid: podName })
        }

        for (let pod = 1; pod <= unavailable; pod++) {
          const podName = `${deploymentName}_pod${pod}`
          this.nodes.push({ name: podName, id: podName, _color: 'red' })
          this.links.push({ name: `${podName}_link`, id: `${deploymentName}_${podName}`, sid: deploymentName, tid: podName })
        }
      }
    }, process.env.VUE_APP_INTERVAL_MS)
  }
}
</script>

<style lang="scss" scoped>
div {
  margin-top: 50px;
}
</style>
