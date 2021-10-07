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

$white: hsl(0, 0%, 100%);
$primary: hsl(172, 67%, 45%);
$darkCyan: hsl(183, 100%, 15%);
$greyishCyan-1: hsl(186, 14%, 43%);
$greyishCyan-2: hsl(184, 14%, 56%);
$lightGreyishCyan-1: hsl(185, 41%, 84%);
$lightGreyishCyan-2: hsl(189, 41%, 97%);

$backgroundColor: $lightGreyishCyan-1;

* {
  box-sizing: border-box;
}

html {
  font-family: 'Space Mono', monospace;
  font-size: 24px;
  background-color: $backgroundColor;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  margin-top: 40px;
}

.logo {
  margin: 0 auto;
  max-width: 150px;
  font-size: 1rem;

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
