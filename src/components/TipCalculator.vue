<template>
  <div class="tip-calculator">
    <div class="bill-info">
      <div class="bill-info__block">
        <p>Bill</p>
        <input type="text" name="bill-sum" id="bill-sum" placeholder="0" v-model="billSum" @blur="toFloatString('billSum')">
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
          <input type="text" name="custom-tip" id="custom-tip" placeholder="Custom" v-model="customTipPercent" @focus="resetTip">
        </div>
      </div>
      <div class="bill-info__block">
        <p>Number of People</p>
        <input type="text" name="people" id="people" placeholder="0" required v-model="peopleNum">
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
      billSum: '',
      peopleNum: '',
      tipPercent: 0,
      customTipPercent: ''
    }
  },
  computed: {
    calcTip() {
      return (this.customTipPercent || this.tipPercent) ? (this.customTipPercent || this.tipPercent) : 0;
    },
    calcPeople() {
      return this.peopleNum && parseFloat(this.peopleNum) ? parseFloat(this.peopleNum) : 0;
    },
    calcBill() {
      return this.billSum ? parseFloat(this.billSum) : 0;
    },
    tipPerPerson() {
      if (this.calcPeople !== 0) {
        return this.calcBill * (this.calcTip / 100) / this.calcPeople;
      } else {
        return 0;
      }
    },
    totalPerPerson() {
      if (this.calcPeople !== 0) {
        let total = this.calcBill + this.calcBill * (this.calcTip / 100);
        return total / this.calcPeople;
      } else {
        return 0;
      }
    }
  },
  methods: {
    reset() {
      this.billSum = '';
      this.peopleNum = '';
      this.tipPercent = 0;
      this.customTipPercent = '';
    },
    resetTip() {
      this.tipPercent = 0;
    },
    resetCustomTip() {
      if (this.customTipPercent) {
        this.customTipPercent = '';
      }
    },
    toFloatString(val) {
      this[val] = parseFloat(this[val]).toFixed(2).toString();
    },
    validateData(rule, calcData, newVal, oldVal) {
      if (newVal.match(rule)) {
        this[calcData] = newVal;
      } else {
        this[calcData] = oldVal;
      }
    }
  },
  watch: {
    billSum(newBillSum, oldBillSum) {
      const rule = /^[1-9]\d{0,6}$|^[1-9]\d{0,6}[.]\d{0,2}$|^[0]{0,1}[.]\d{0,2}$|^[0]$|^$/gm;
      this.validateData(rule, 'billSum', newBillSum, oldBillSum);
    },
    customTipPercent(newPercent, oldPersent) {
      const rule = /^[1-9]$|^[1-9][0-9]$|^100$|^$/gm;
      this.validateData(rule, 'customTipPercent', newPercent, oldPersent);
    },
    peopleNum(newPeopleNum, oldPeopleNum) {
      const rule = /^[1-9]$|^[1-9][0-9]$|^100$|^$/gm;
      this.validateData(rule, 'peopleNum', newPeopleNum, oldPeopleNum);
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
