<template>
  <transition name='fade'>
    <vue-draggable-resizable
      class-name='active-element'
      :resizable='false'
      :disable-user-select='true'
      :w='100'
      :h='100'
      :min-width='100'
      :min-height='100'
      :max-height='100'
      :max-width='100'
      :x='elementData.x'
      :y='elementData.y'
      :z='elementData.z'
      :parent='true'
      :onDragStart='onDragStart'
      @activated='onActivated'
      @dragstop='onDragstop'
      @deactivated='onDeactivated'
      :class='{ "fail-combine": elementDropped }'
    >
      <div class='data'>
        <b-img :src='`/images/elements/${this.elementData.name}.png`' @error='setBaseIcon' width='45' height='45' :alt='elementData.name'/>
        <span>{{ elementData.name }}</span>
      </div>
    </vue-draggable-resizable>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import * as game from '@/js/game/game'

export default {
  props: {
    elementData: {
      value: Object,
      required: true,
      default: {}
    }
  },
  computed: {
    ...mapGetters({
      activeElements: 'elements/activeElements',
      selectedElement: 'elements/selectedElement',
      openedRecipes: 'recipes/openedRecipes',
      recipes: 'recipes/recipes',
      state: 'elements/state'
    })
  },
  data () {
    return {
      elementDropped: false
    }
  },
  methods: {
    ...mapActions({
      addActiveElement: 'elements/addActiveElement',
      deleteActiveElement: 'elements/deleteActiveElement',
      setSelectedElement: 'elements/setSelectedElement',
      setSelectedElementCoordinates: 'elements/setSelectedElementCoordinates',
      deleteSelectedElement: 'elements/deleteSelectedElement',
      addOpenedRecipe: 'recipes/addOpenedRecipe',
      addHistory: 'game/addHistory',
      addOpenedElement: 'elements/addOpenedElement'
    }),

    // Called whenever the component gets clicked, in order to show handles
    onActivated () {
      this.setSelectedElement(this.elementData)
    },

    // Called whenever the user clicks anywhere outside the component, in order to deactivate it
    onDeactivated () {
      this.setSelectedElementCoordinates({
        x: this.elementData.x,
        y: this.elementData.y,
        z: 100
      })
      this.deleteSelectedElement()
      this.elementDropped = false
    },

    // Called when dragging starts (element is clicked or touched)
    onDragStart () {
      if (this.elementDropped) {
        this.elementDropped = false
      }
      this.setSelectedElement(this.elementData)
      this.setSelectedElementCoordinates({
        x: this.elementData.x,
        y: this.elementData.y,
        z: 101
      })
    },

    // Called whenever the component stops getting dragged
    onDragstop (x, y) {
      if (!this.selectedElement) {
        return
      }
      this.setSelectedElementCoordinates({ x, y, z: 101 })

      let closestElement = game.findClosestElement(this.selectedElement, this.activeElements)
      if (closestElement.gameId) {
        let resultRecipe = game.findRecipeOfTwoElements(this.selectedElement, closestElement, this.recipes)
        if (resultRecipe) {
          let filteredByOpenedRecipes = this.openedRecipes.filter(openedRecipe => {
            return resultRecipe._id === openedRecipe._id
          })

          if (filteredByOpenedRecipes.length === 0) { // if recipe not opened for user, then open recipe
            this.addOpenedElement(resultRecipe.result).then(response => {
              if (!this.state.error) {
                this.addOpenedRecipe(resultRecipe)
              }
            })
          }

          const resultElement = {
            ...resultRecipe.result,
            x: x,
            y: y
          }
          this.addActiveElement(resultElement)
          this.addHistory({
            firstElement: this.selectedElement.name,
            secondElement: closestElement.name,
            result: resultRecipe.result.name
          })
          this.deleteActiveElement(this.selectedElement)
          this.deleteActiveElement(closestElement)
        } else {
          this.elementDropped = true
          this.addHistory({
            firstElement: this.selectedElement.name,
            secondElement: closestElement.name,
            result: ''
          })
        }
      }
    },

    setBaseIcon (event) {
      event.target.src = '/images/elements/Base.png'
    }
  }
}
</script>

<style lang='scss' scoped>
.active-element {
  font-size: 16px;
  background-color: rgb(235, 235, 235);
  border: 1px solid map-get($colors, 'alchemy-green');
  border-radius: 6px;
  transition: box-shadow .6s;

  &:hover {
    cursor: grab;
    box-shadow: 0 0 7px 0 black;
    transition: background-color .6s;
  }

  &:active {
    cursor: grabbing;
    background-color: map-get($colors, 'alchemy-green');
    color: rgb(255, 255, 255);
    transition: background-color .6s;
  }

  .data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    width: 100%;

    span {
      margin-top: 5px;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  animation: shake 1.5s;
}

.fail-combine {
  background-color: red;
  border-color: red;
  animation: shake .7s;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
