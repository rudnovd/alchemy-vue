<template>
  <section class='section-home'>
    <b-container>
      <b-row>
        <b-col cols='12'>
          <div class='jumbotron'>
            <h1>
              Alchemy — logical online game.
            </h1>

            <p class='lead'>
              Our whole world consists of a huge number of elements. In our game, we give you the opportunity to recreate the entire process of the development of the Earth, creating your own world! You can combine elements, thereby creating more and
              more complex substances. No one will say exactly how to combine the resulting things right! Use your logic and ingenuity to make progress, but if you fail to discover something new, you can always rely on luck. We dare not hold you
              any longer, go ahead!
            </p>

            <h4><router-link to='/game'>Play</router-link></h4>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<style lang="scss" scoped>
.section-home {
  margin-top: 10px;
}
</style>
