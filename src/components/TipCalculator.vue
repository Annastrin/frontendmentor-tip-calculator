<template>
  <div class="tip-calculator">
    <div class="bill-info">
      <div class="bill-info__block">
        <p>Bill</p>
        <input type="text" name="bill-sum" id="bill-sum" placeholder="0" v-model.number="billSum">
      </div>
      <div class="bill-info__block">
        <p>Select Tip %</p>
        <div class="tip-amount">
          <input type="radio" name="tip-5" id="tip-5" value="5" v-model="tipPercent" @click="resetCustomTip">
          <label for="tip-5">5%</label>
          <input type="radio" name="tip-10" id="tip-10" value="10" v-model="tipPercent" @click="resetCustomTip">
          <label for="tip-10">10%</label>
          <input type="radio" name="tip-15" id="tip-15" value="15" v-model="tipPercent" @click="resetCustomTip">
          <label for="tip-15">15%</label>
          <input type="radio" name="tip-25" id="tip-25" value="25" v-model="tipPercent" @click="resetCustomTip">
          <label for="tip-25">25%</label>
          <input type="radio" name="tip-50" id="tip-50" value="50" v-model="tipPercent" @click="resetCustomTip">
          <label for="tip-50">50%</label>
          <input type="text" name="custom-tip" id="custom-tip" placeholder="Custom" v-model.number="customTipPercent" @focus="resetTip">
        </div>
      </div>
      <div class="bill-info__block">
        <p>Number of People</p>
        <input type="text" name="people" id="people" placeholder="0" required v-model.number="peopleNum">
      </div>
    </div>
    <div class="total-info">
      <div class="total-info__block">
        <p>Tip Amount<span>/ person</span></p>
        <p>${{ tipPerPerson }}</p>
      </div>
      <div class="total-info__block">
        <p>Total<span>/ person</span></p>
        <p>${{ totalPerPerson }}</p>
      </div>
      <button type="reset" @click="reset">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TipCalculator',
  data() {
    return {
      billSum: null,
      peopleNum: null,
      tipPercent: 0,
      customTipPercent: null
    }
  },
  computed: {
    tipPerPerson: function() {
      let tip = this.customTipPercent || this.tipPercent;
      if (this.peopleNum && this.peopleNum !== 0) {
        return this.billSum * (tip / 100) / this.peopleNum;
      } else {
        return 0;
      }
    },
    totalPerPerson: function() {
      let tip = this.customTipPercent || this.tipPercent;
      if (this.peopleNum && this.peopleNum !== 0) {
        let total = this.billSum + this.billSum * (tip / 100);
        return total / this.peopleNum;
      } else {
        return 0;
      }
    }
  },
  methods: {
    reset() {
      this.billSum = null;
      this.peopleNum = null;
      this.tipPercent = 0;
      this.customTipPercent = null;
    },
    resetTip() {
      this.tipPercent = 0;
    },
    resetCustomTip() {
      if (this.customTipPercent) {
        this.customTipPercent = null;
      }
    }
  },
  watch: {
    billSum(newBillSum, oldBillSum) {
      if (isNaN(newBillSum)) {
        this.billSum = oldBillSum;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .invalid {
    border: 1px solid red;
  }
</style>
