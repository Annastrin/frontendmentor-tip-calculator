<template>
  <div class="tip-calculator">
    <div class="bill-info">
      <div class="bill-info__block">
        <p class="field-name">Bill</p>
        <div class="field-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="17"><path fill="#9EBBBD" d="M6.016 16.328v-1.464c1.232-.08 2.22-.444 2.964-1.092.744-.648 1.116-1.508 1.116-2.58v-.144c0-.992-.348-1.772-1.044-2.34-.696-.568-1.708-.932-3.036-1.092V4.184c.56.144 1.012.4 1.356.768.344.368.516.816.516 1.344v.288h1.824v-.432c0-.448-.088-.876-.264-1.284a3.783 3.783 0 00-.744-1.116A4.251 4.251 0 007.54 2.9a5.324 5.324 0 00-1.524-.492V.872H4.288V2.36a5.532 5.532 0 00-1.416.324c-.448.168-.84.392-1.176.672-.336.28-.604.616-.804 1.008-.2.392-.3.844-.3 1.356v.144c0 .96.316 1.708.948 2.244.632.536 1.548.884 2.748 1.044v3.912c-.704-.16-1.248-.472-1.632-.936-.384-.464-.576-1.08-.576-1.848v-.288H.256v.576c0 .464.08.924.24 1.38.16.456.404.88.732 1.272.328.392.744.728 1.248 1.008s1.108.476 1.812.588v1.512h1.728zM4.288 7.424c-.688-.128-1.164-.332-1.428-.612-.264-.28-.396-.644-.396-1.092 0-.464.176-.832.528-1.104.352-.272.784-.448 1.296-.528v3.336zm1.728 5.712V9.344c.768.128 1.328.328 1.68.6.352.272.528.688.528 1.248 0 .544-.196.984-.588 1.32-.392.336-.932.544-1.62.624z"/></svg>
          <input type="text" name="bill-sum" id="bill-sum" class="input-field input-field--bill" placeholder="0" v-model="billSum" @blur="toFloatString('billSum')">
        </div>
      </div>
      <div class="bill-info__block">
        <p class="field-name">Select Tip %</p>
        <div class="tip-amount">
          <button class="btn tip-btn" :class="{'tip-btn__active': btn.active}" @click="resetCustomTip(), setTipPercent(btn.value), setActiveTipBtn(btn.id)" v-for="btn in tipPercentBtn" :key="btn.id">{{btn.value}}%</button>
          <input type="text" name="custom-tip" id="custom-tip" class="input-field input-field--tip" placeholder="Custom" v-model="customTipPercent" @focus="resetTip">
        </div>
      </div>
      <div class="bill-info__block">
        <div class="field-name-box">
          <p class="field-name">Number of People</p>
          <span class="field-error" v-if="this.billSum && !this.peopleNum">Can&#39;t be zero</span>
        </div>
        <div class="field-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16"><path fill="#9EBBBD" d="M9.573 7.729c.406 0 .784.07 1.126.209.342.14.639.33.881.569.232.227.438.503.614.82a5.1 5.1 0 01.407.949c.097.312.178.654.242 1.016.062.359.105.699.126 1.011.02.307.031.624.031.945 0 .836-.259 1.512-.768 2.01-.504.492-1.17.742-1.98.742H2.748c-.81 0-1.477-.25-1.98-.742C.259 14.76 0 14.084 0 13.248c0-.322.01-.64.032-.945.02-.312.063-.652.126-1.01.063-.363.144-.705.242-1.017.1-.323.238-.643.407-.948.176-.318.382-.594.613-.821.243-.238.54-.43.882-.57.342-.138.72-.208 1.125-.208.16 0 .313.067.61.265.183.123.397.264.636.421.204.134.48.259.822.372.333.11.671.167 1.005.167a3.19 3.19 0 001.006-.167c.341-.113.618-.238.822-.372l.636-.42c.296-.2.45-.266.61-.266zM6.598 0C7.63 0 8.522.38 9.252 1.129s1.1 1.666 1.1 2.724c0 1.06-.37 1.976-1.1 2.725-.73.75-1.623 1.13-2.654 1.13-1.03 0-1.924-.38-2.653-1.13-.73-.749-1.1-1.666-1.1-2.725 0-1.058.37-1.975 1.1-2.724C4.675.379 5.567 0 6.598 0z"/></svg>
          <input type="text" name="people" id="people" class="input-field input-field--people" :class="{'input-field__invalid': this.billSum && !this.peopleNum}" placeholder="0" required v-model="peopleNum">
        </div>
      </div>
    </div>
    <div class="total-info">
      <div class="total-info__block">
        <div class="total-info__title">
          <div class="total-info__title-name">Tip Amount</div>
          <div class="total-info__title-details">/ person</div>
        </div>
        <p class="total-info__sum">${{ tipPerPerson }}</p>
      </div>
      <div class="total-info__block">
        <div class="total-info__title">
          <div class="total-info__title-name">Total</div>
          <div class="total-info__title-details">/ person</div>
        </div>
        <p class="total-info__sum">${{ totalPerPerson }}</p>
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
        return parseFloat(0).toFixed(2);
      }
    },
    totalPerPerson() {
      if (this.calcPeople !== 0) {
        let total = this.calcBill + this.calcBill * (this.calcTip / 100);
        return (total / this.calcPeople).toFixed(2);
      } else {
        return parseFloat(0).toFixed(2);
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
  @import '../assets/scss/_variables.scss';

  .btn {
    display: block;
    width: 100%;
    height: 48px;
    border: 0;
    border-radius: 5px;
    padding: 0;
    background-color: $btnBg;
    color: $btnText;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
  }

  .tip-btn {
    background-color: $btnBg;
    color: $btnText;

    &__active {
      background-color: $btnActiveBg;
      color: $btnActiveText;
    }
  }

  .reset-btn {
    background-color: $btnActiveBg;
    color: $resetBtnText;
    font-size: 20px;

    @media screen and (min-width: $desktop) {
      margin-top: 122px;
    }

    &:disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }
  }

  .input-field {
    width: 100%;
    max-width: 100%;
    height: 48px;
    padding: 0 17px;
    border-radius: 5px;
    background-color: $inputBg;
    border: 1px solid $inputBg;
    outline: 1px solid $inputBg;
    font-size: 1rem;
    text-align: right;
    color: $inputFocusText;
    transition: all 0.3s;

    &:focus {
      border: 1px solid $inputFocusBorder;
      outline: 1px solid $inputFocusBorder;
    }

    &__invalid {
      border: 1px solid $inputInfalidBorder;
      outline: 1px solid $inputInfalidBorder;
    }

    &--bill,
    &--people {
      padding: 0 17px 0 40px;
    }

    &--tip {
      @media screen and (min-width: $desktop) {
        padding: 0 13px;
      }
    }
  }

  .tip-calculator {
    max-width: 704px;
    width: 100%;
    margin: 0 auto;
    border-radius: 30px;
    padding: 34px 24px;
    background-color: $calculatorBg;
    font-weight: 700;

    @media screen and (min-width: $desktop) {
      display: flex;
      justify-content: space-between;
      flex: 1;
      max-width: 922px;
      padding: 32px 34px 34px 50px;
    }
  }

  .bill-info {
    padding: 0 8px;
    color: $billInfoText;

    @media screen and (min-width: $desktop) {
      max-width: 378px;
      padding: 14px 0 0 0;
    }

    &__block:not(:last-of-type) {
      margin-bottom: 33px;

      @media screen and (min-width: $desktop) {
        margin-bottom: 42px;
      }
    }
  }

  .total-info {
    border-radius: 12px;
    padding: 39px 24px 24px;
    background-color: $totalInfoBg;

    @media screen and (min-width: $desktop) {
      flex: 1;
      max-width: 412px;
      padding: 42px 40px 38px;
    }

    &__block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      @media screen and (min-width: $desktop) {
        margin-bottom: 28px;
      }
    }

    &__title-name {
      color: $totalInfoTitleText;
      font-size: 0.65rem;
    }

    &__title-details {
      font-size: 13px;
      color: $totalInfoDetailsText;
    }

    &__sum {
      margin: 0;
      font-size: 30px;
      color: $totalSumText;

      @media screen and (min-width: $desktop) {
        font-size: 46px;
      }
    }
  }

  .field-name,
  .field-name-box {
    margin: 0 0 6px;
    font-size: 0.65rem;
  }

  .field-name-box {
    display: flex;
    justify-content: space-between;

    .field-name {
      margin: 0;
    }
  }

  .field-box {
    width: 100%;
    position: relative;

    svg {
      position: absolute;
      left: 18px;
      top: calc(50% - 8.5px);
    }
  }

  .field-error {
    color: $errorText;
  }

  .tip-amount {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    padding-top: 10px;

    @media screen and (min-width: $desktop) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
