<template>
  <div id="app">
    <hpa-list></hpa-list>
    <deployment-graph></deployment-graph>
  </div>
</template>

<script>
import HPAList from './components/HPAList.vue'
import DeploymentGraph from './components/DeploymentGraph.vue'

export default {
  name: 'App',
  components: {
    'hpa-list': HPAList,
    'deployment-graph': DeploymentGraph
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
