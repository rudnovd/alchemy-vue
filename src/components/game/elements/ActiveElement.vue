<template>
  <transition name="fade">
    <vue-draggable-resizable
      class-name="active-element"
      :resizable="false"
      :disable-user-select="true"
      :w="80"
      :h="80"
      :min-width="80"
      :min-height="80"
      :max-width="80"
      :max-height="80"
      :x="elementData.x"
      :y="elementData.y"
      :z="elementData.z"
      :parent="true"
      :on-drag-start="onDragStart"
      :class="{ 'fail-combine': elementDropped }"
      @activated="onActivated"
      @dragstop="onDragstop"
      @deactivated="onDeactivated"
    >
      <div class="active-element-data">
        <b-img
          class="active-element-image"
          :src="`/images/elements/${elementData.name}.png`"
          width="32"
          height="32"
          :alt="elementData.name"
          @error="setBaseIcon"
        />
        <span class="active-element-name">{{ elementData.name }}</span>
      </div>
    </vue-draggable-resizable>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as game from '@/js/game/game'
import Recipes from '@/services/api/recipes'

export default {
  name: 'ActiveElement',
  props: {
    elementData: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      elementDropped: false
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
  methods: {
    ...mapActions({
      addActiveElement: 'elements/addActiveElement',
      deleteActiveElement: 'elements/deleteActiveElement',
      setSelectedElement: 'elements/setSelectedElement',
      setSelectedElementCoordinates: 'elements/setSelectedElementCoordinates',
      deleteSelectedElement: 'elements/deleteSelectedElement',
      addOpenedRecipe: 'recipes/addOpenedRecipe',
      addHistory: 'game/addHistory',
      addOpenedElement: 'elements/addOpenedElement',
      setLastOpenedElement: 'game/setLastOpenedElement',
      checkRecipe: 'recipes/checkRecipe'
    }),

    // Called whenever the component gets clicked, in order to show handles
    onActivated() {
      this.setSelectedElement(this.elementData)
    },

    // Called whenever the user clicks anywhere outside the component, in order to deactivate it
    onDeactivated() {
      this.setSelectedElementCoordinates({
        x: this.elementData.x,
        y: this.elementData.y,
        z: 100
      })
      this.deleteSelectedElement()
      this.elementDropped = false
    },

    // Called when dragging starts (element is clicked or touched)
    onDragStart() {
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
    onDragstop(x, y) {
      if (!this.selectedElement) {
        return
      }
      this.setSelectedElementCoordinates({ x, y, z: 101 })

      let closestElement = game.findClosestElement(this.selectedElement, this.activeElements)
      if (closestElement.gameId) {
        let findedRecipe = game.findRecipeOfTwoElements(this.selectedElement, closestElement, this.openedRecipes)

        // if find recipe in opened recipes
        if (findedRecipe) {
          const resultElement = {
            ...findedRecipe.result,
            x,
            y
          }
          this.addActiveElement(resultElement)

          this.addHistory({
            firstElement: this.selectedElement.name,
            secondElement: closestElement.name,
            result: findedRecipe.result.name
          })
        } else {
          Recipes.check([this.selectedElement._id, closestElement._id]).then(response => {
            // if find recipe on server
            if (response.data.response.result) {
              this.addActiveElement(response.data.response.result)
              this.addOpenedRecipe(response.data.response.recipe)
              this.setLastOpenedElement(response.data.response.result)
              this.$root.$emit('newElementModalShow')

              this.addHistory({
                firstElement: this.selectedElement.name,
                secondElement: closestElement.name,
                result: response.data.response.result.name
              })
            } else {
              this.elementDropped = true
              this.addHistory({
                firstElement: this.selectedElement.name,
                secondElement: closestElement.name,
                result: ''
              })
            }
          })
          this.deleteActiveElement(this.selectedElement)
          this.deleteActiveElement(closestElement)
        }
      }
    },

    setBaseIcon(event) {
      event.target.src = '/images/elements/Base.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.active-element {
  font-size: 1rem;
  background-color: rgb(235, 235, 235);
  border: 1px solid map-get($colors, 'green');
  border-radius: 6px;
  transition: box-shadow 0.6s;

  &:hover {
    cursor: grab;
    box-shadow: 0 0 7px 0 black;
    transition: background-color 0.6s;
  }

  &:active {
    cursor: grabbing;
    background-color: map-get($colors, 'green');
    color: rgb(255, 255, 255);
    transition: background-color 0.6s;
  }
}

.active-element-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.9rem;
  padding: 2px;
  height: 100%;
  width: 100%;
}

.active-element-image {
  flex: 0 0 32px;
  margin-bottom: 2px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  animation: shake 0.7s;
}

.fail-combine {
  background-color: red;
  border-color: red;
  animation: shake 0.7s;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
