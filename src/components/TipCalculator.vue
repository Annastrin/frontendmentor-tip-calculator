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
          <button class="btn tip-btn" :class="{'tip-btn__active': btn.active}" @click="resetCustomTip(), setTipPercent(btn.value), setActiveTipBtn(btn.id)" v-for="btn in tipPercentBtn" :key="btn.id">{{btn.value}}%</button>
          <input type="text" name="custom-tip" id="custom-tip" class="input-field input-field-tip" placeholder="Custom" v-model="customTipPercent" @focus="resetTip">
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
      <button type="reset" class="btn reset-btn" @click="reset" :disabled="isResetDisabled">Reset</button>
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
      customTipPercent: '',
      tipPercentBtn: [
        {
          id: 0,
          value: 5,
          active: false
        },
        {
          id: 1,
          value: 10,
          active: false
        },
        {
          id: 2,
          value: 15,
          active: false
        },
        {
          id: 3,
          value: 25,
          active: false
        },
        {
          id: 4,
          value: 50,
          active: false
        }
      ]
    }
  },
  computed: {
    calcTipPercent: {
      get() {
        return this.tipPercent;
      },
      set(val) {
        this.tipPercent = val;
      }
    },
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
        let calcTipPerPerson = this.calcBill * (this.calcTip / 100) / this.calcPeople;
        return calcTipPerPerson.toFixed(2);
      } else {
        return 0;
      }
    },
    totalPerPerson() {
      if (this.calcPeople !== 0) {
        let total = this.calcBill + this.calcBill * (this.calcTip / 100);
        return (total / this.calcPeople).toFixed(2);
      } else {
        return 0;
      }
    },
    isResetDisabled() {
      return this.billSum || this.peopleNum || this.customTipPercent || this.tipPercent !== 0 ? false : true;
    }
  },
  methods: {
    setTipPercent(val) {
      this.calcTipPercent = val;
    },
    setActiveTipBtn(id) {
      this.tipPercentBtn.forEach(btn => btn.active = false);
      this.tipPercentBtn[id].active = true;
    },
    reset() {
      this.billSum = '';
      this.peopleNum = '';
      this.tipPercent = 0;
      this.customTipPercent = '';
      this.tipPercentBtn.forEach(btn => btn.active = false);
    },
    resetTip() {
      if (this.tipPercent !== 0) {
        this.tipPercentBtn.forEach(btn => btn.active = false);
      this.tipPercent = 0;
      }
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
