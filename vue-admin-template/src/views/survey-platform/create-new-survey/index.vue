<template>
  <div>
    <breadcrumb class="breadcrumb-container" />
    <p>{{ greeting }}</p>
  </div>
</template>

<script>

  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    data() {
      return {
        greeting: 'Create New Survey'
      }
    },
    components: {
      Breadcrumb,
    },

  }
</script>

<style scoped>
  p {
    font-size: 2em;
    text-align: center;
  }
</style>
