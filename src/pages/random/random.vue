<template>
  <div class="container">
    <b-form-group label="BS:" label-for="bs-select" style="margin-top:50px">
      <b-form-select v-model="selectedBS" :options="bsOptions" id="bs-select"></b-form-select>
    </b-form-group>
    <hr>
    <div style="font-size:24px;">
      OR Manual Input
    </div>
    <b-form-group label="B:" label-for="b-input">
      <b-form-input
        id="b-input"
        v-model="b"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="P:" label-for="p-input">
      <b-form-input
        id="p-input"
        v-model="p"
      ></b-form-input>
    </b-form-group>
    <hr>
    <div style="overflow:hidden;margin-top:2rem">
      <b-button class="r-btn col-lg-3" variant="outline-primary" @click="run">Run</b-button>
      <b-button class="r-btn float-right col-lg-3" @click="clear">Clear</b-button>
    </div>
    <template v-if="hasResult">
      <b-alert show :variant="(randomResult < callPercent) ? 'success' : 'danger'">
        {{ randomResult }} {{ op }} {{  callPercent }}
      </b-alert>
    </template>
    <b-alert show variant="info" v-if="infoText">{{ infoText }}</b-alert>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectedBS: null,
        bsArr: [
          2, 1.5, 1.2, 1, 0.75, 0.66, 0.5, 0.33
        ],
        randomInitResult: -1,
        randomResult: -1,
        callPercent: -1,
        b: '',
        p: '',
        infoText: ''
      }
    },
    computed: {
      bsOptions() {
        return this.bsArr.map((bs) => {
          return {
            value: bs,
            text: bs
          }
        })
      },
      op() {
        let diff = this.callPercent - this.randomResult
        let text = ''
        if (diff === 0) {
          text = '='
        } else if (diff > 0) {
          text = '<'
        } else {
          text = '>'
        }
        return text
      },
      hasResult() {
        return this.randomResult !== this.randomInitResult
      }
    },
    methods: {
      run() {
        this.clearInfoText()
        if (!this.selectedBS && !(this.b && this.p)) {
          this.infoText = 'please fill form'
          return
        }
        this.callPercent = this.calcCallPercent(this.selectedBS || (this.b / this.p))
        this.randomResult = this.calcRandomResult()
      },
      clear() {
        this.clearSelectedBS()
        this.clearInputBP()
        this.resetRandomResult()
        this.clearInfoText()
      },
      clearSelectedBS() {
        this.selectedBS = null
      },
      clearInputBP() {
        this.b = this.p = ''
      },
      clearInfoText() {
        this.infoText = ''
      },
      resetRandomResult() {
        this.randomResult = this.randomInitResult
      },
      calcRandomResult() {
        let result = Math.random() * 100
        return Number.parseFloat(result.toFixed(2))
      },
      calcCallPercent(bs) {
        let result = (1 / (bs + 1)) * 100
        return Number.parseFloat(result.toFixed(2))
      },
    }
  }
</script>

<style scoped>
  .r-btn {
    margin-bottom: 1rem;
  }
</style>
