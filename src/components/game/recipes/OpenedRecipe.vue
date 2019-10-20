<template>
  <div class='opened-recipe' :class='{"active": showRecipe}'>
    <div class='base-info'>
      <div class='title'>
        <b-img
          :src='elementIcon'
          @error='setBaseIcon'
          :alt='recipe.result.name'
          width='45px'
          height="45px"
        />
        <strong>{{ recipe.result.name }}</strong>
      </div>

      <div class='buttons'>
        <b-btn variant='success' v-if='!showRecipe' @click='showRecipe = true'>Show recipe</b-btn>
        <b-btn variant='success' v-if='showRecipe' @click='showRecipe = false'>Hide recipe</b-btn>
      </div>
    </div>

    <div class='recipe' v-if='showRecipe'>
      <span>Recipe: {{ recipe.recipe[0].name }} + {{ recipe.recipe[1].name }}</span>
    </div>

    <div class='description' v-if='showRecipe'>
      <span>Description</span>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    recipe: Object
  },
  computed: {
    elementIcon () {
      return `/images/elements/${this.recipe.result.name}.png`
    }
  },
  data () {
    return {
      showRecipe: false
    }
  },
  methods: {
    setBaseIcon (event) {
      event.target.src = '/images/elements/Base.png'
    }
  }
}
</script>

<style lang='scss' scoped>
.opened-recipe {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  height: 60px;
  transition: height .2s;
  background-color: rgb(253, 253, 253);
  border: 1px solid black;
  box-shadow: 0 0 5px 0 rgb(150, 150, 150);
  margin-bottom: 20px;

  &.active {
    height: 200px;
    align-items: flex-start;
    align-content: flex-start;
  }

  .base-info {
    display: flex;
    flex: 0 0 100%;
    align-items: center;

    .title {
      flex: 0 0 70%;

      strong {
        margin-left: 10px;
        font-size: 1.4em;
      }
    }

    .buttons {
      text-align: right;
      flex: 0 0 30%;
    }
  }

  .recipe {
    flex: 0 0 100%;
    margin-top: 20px;
  }

  .description {
    flex: 0 0 100%;
    margin-top: 10px;
  }

}
</style>
