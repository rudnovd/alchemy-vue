<template>
  <vue-draggable-resizable
    class-name="element"
    :draggable="true"
    :disable-user-select="true"
    :drag-handle="'.element-image'"
    :resizable="false"
    :min-height="64"
    :max-height="64"
    :w="width"
    :h="64"
    :x="elementData.x"
    :y="elementData.y"
    :z="elementData.z"
    :on-drag-start="onDragStart"
    @activated="onActivated"
    @dragstop="onDragstop"
  >
    <div class="data">
      <b-img
        class="element-image"
        :src="`/images/elements/${elementData.name}.png`"
        :alt="elementData.name"
        @error="setBaseIcon"
      />
      <span :class="{ hidden: isDragging }">{{ elementData.name }}</span>
    </div>
  </vue-draggable-resizable>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'OpenedElement',
  props: {
    elementData: {
      type: Object,
      default: function() {
        return {}
      },
      required: true
    }
  },
  data() {
    return {
      width: 100,
      isDragging: false,
      elementDropped: false
    }
  },
  computed: {
    ...mapGetters({
      gameFieldSize: 'game/gameFieldSize',
      selectedElement: 'elements/selectedElement',
      activeElements: 'elements/activeElements'
    })
  },
  mounted() {
    const elementsList = document.getElementsByClassName('opened-elements-list')[0].clientWidth
    this.width = elementsList
    window.addEventListener('resize', () => {
      const elementsList = document.getElementsByClassName('opened-elements-list')
      if (elementsList.length > 0) {
        this.width = document.getElementsByClassName('opened-elements-list')[0].clientWidth
      }
    })
  },
  methods: {
    ...mapActions({
      addActiveElement: 'elements/addActiveElement',
      setSelectedElement: 'elements/setSelectedElement',
      setSelectedElementCoordinates: 'elements/setSelectedElementCoordinates',
      deleteSelectedElement: 'elements/deleteSelectedElement',
      updateOpenedElementsPositions: 'elements/updateOpenedElementsPositions'
    }),

    // Called whenever the component gets clicked, in order to show handles
    onActivated() {
      this.isDragging = true
    },

    // Called whenever the user clicks anywhere outside the component, in order to deactivate it
    onDeactivated() {
      this.deleteSelectedElement()
    },

    // Called when dragging starts (element is clicked or touched)
    onDragStart() {
      this.setSelectedElement(this.elementData)
      this.setSelectedElementCoordinates({
        x: this.elementData.x,
        y: this.elementData.y,
        z: 101
      })
    },

    // Called whenever the component stops getting dragged
    onDragstop(x, y) {
      this.isDragging = false

      if (x < -100) {
        // if element dropped on game board
        let newX = 0
        let newY = 0

        if (this.gameFieldSize.x + x < 0) {
          newX = 0
        } else {
          newX = this.gameFieldSize.x + x
        }

        if (y < 0) {
          newY = 0
        } else if (y > this.gameFieldSize.y - 100) {
          newY = this.gameFieldSize.y - 100
        } else {
          newY = y
        }

        this.setSelectedElementCoordinates({
          x: newX,
          y: newY,
          z: 100
        })

        this.addActiveElement(this.selectedElement)
        this.$nextTick(() => {
          const lastElement = document.getElementsByClassName('active-element')[
            document.getElementsByClassName('active-element').length - 1
          ]
          lastElement.dispatchEvent(new Event('mousedown'))
          lastElement.dispatchEvent(new Event('mouseup'))
        })
      } else if (x === 0) {
        this.setSelectedElementCoordinates({
          x: this.gameFieldSize.x / 2,
          y: this.gameFieldSize.y / 2,
          z: 100
        })
        this.addActiveElement(this.selectedElement)
      }

      this.setSelectedElementCoordinates({
        x: x,
        y: y,
        z: 100
      })

      this.$nextTick(() => {
        this.updateOpenedElementsPositions()
      })
    },

    setBaseIcon(event) {
      event.target.src = '/images/elements/Base.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.element {
  padding-left: 5px;

  .data {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    width: 100%;

    .element-image {
      transition: box-shadow 0.8s;
      transition: border-radius 0.4s;
      margin-left: 5px;

      &:hover {
        cursor: grab;
        padding: 5px;
        border-radius: 100%;
        box-shadow: inset 0 0 6px 0 rgb(60, 60, 60);
      }

      &:active {
        cursor: grabbing;
        box-shadow: none;
      }
    }

    span {
      text-align: left;
      padding-left: 5px;
      flex: 1 0 0;
    }
  }
}

.hidden {
  opacity: 0;
}

@media screen and (min-width: map-get($grid-breakpoints, 'md')) {
  .element {
    font-size: 1.2em;
  }

  .element-image {
    flex: 0 0 64px;
    width: 64px;
    height: 64px;
  }
}

@media screen and (max-width: map-get($grid-breakpoints, 'md')) {
  .element {
    font-size: 0.9rem;
  }

  .element-image {
    flex: 0 0 48px;
    width: 48px;
    height: 48px;
  }
}
</style>
