<script>
  export default {
    props: ["login", "password", "validLogin", "validPassword"],
  }

</script>

<template>

  <!-- <button v-if="started" @click="checkLogging ? handleSave : handleValidation" class="btn">Save</button> -->
  <button @click="password = 1" class="btn">Load</button>
</template>