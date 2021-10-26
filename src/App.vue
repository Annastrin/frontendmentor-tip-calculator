<template>
  <h1 class="logo">
    <div>
      <span>s</span>
      <span>p</span>
      <span>l</span>
      <span>i</span>
    </div>
    <div>
      <span>t</span>
      <span>t</span>
      <span>e</span>
      <span>r</span>
    </div>
  </h1>
  <TipCalculator/>
</template>

<script>
import TipCalculator from './components/TipCalculator.vue'


export default {
  name: 'App',
  components: {
    TipCalculator
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
@import 'assets/scss/_variables.scss';

* {
  box-sizing: border-box;
}

html {
  font-family: 'Space Mono', monospace;
  font-size: 24px;
  background-color: $mainBg;
}

body {
  margin: 0;
  padding: 0;
}

input {
  font-family: inherit;
  font-weight: 700;
}

#app {
  min-height: 933px;
  padding-top: 40px;

  @media screen and (min-width: $desktop) {
    min-height: 1024px;
    padding-top: 153px;
  }
}

.logo {
  margin: 0 auto 31px;
  max-width: 150px;
  font-size: 1rem;

  @media screen and (min-width: $desktop) {
    margin-bottom: 79px;
  }

  div {
    line-height: 1.5;
    text-align: center;
    text-transform: uppercase;
  }

  span {
    padding: 0 5px;
  }
}
</style>
