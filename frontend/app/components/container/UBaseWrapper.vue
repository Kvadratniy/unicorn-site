<template>
    <section class="container">
      <slot />
    </section>
  </template>
  
  <style scoped>
  .container {
    margin: 0 auto;
    max-width: 100%;
    width: 100%;
    padding: 0 16px;
  }
  
  @media (min-width: 1532px) {
    .container {
      padding: 0;
      max-width: 1500px;
    }
  }
  
  </style>
  