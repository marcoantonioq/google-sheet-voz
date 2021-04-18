<template>
  <Materialize/>
  <SpeechRecogniotion msg="App"/>

  <SheetInfo/>

  v.1.0.1

</template>

<script>
import Materialize from './components/Materialize.vue';
import SpeechRecogniotion from './components/SpeechRecognition.vue'
import SheetInfo from './components/SheetInfo.vue'


export default {
  name: 'App',
  components: {
    SpeechRecogniotion,
    SheetInfo,
    Materialize,
  }
}
</script>

<style>
</style>
