<template>
    <div class="row">
      <div class="col s12">
        <div class="voz">
          <i class="grey-text mic material-icons center-align">mic</i>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SpeechRecognition',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.voz {
    text-align: right;
    border-bottom: 1px solid #9e9e9e;
    line-height: 37px;
    font-size: 1.2rem;
}

.mic {
    font-size: 40px;
    top: 8px;
    right: -8px;
    position: relative;
}
</style>
