<script>
import { onMount } from 'svelte'
import interact from 'interactjs'

onMount(() => {

var element = document.getElementById('card')
var x = 0; var y = 0

interact(element)
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
        target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],

    inertia: true
  })
  .draggable({
    modifiers: [
      interact.modifiers.snap({
        targets: [
          interact.snappers.grid({ x: 30, y: 30 })
        ],
        range: Infinity,
        relativePoints: [ { x: 0, y: 0 } ]
      }),
      interact.modifiers.restrict({
        restriction: element.parentNode,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        endOnly: true
      })
    ],
    inertia: true
  })
  .on('dragmove', function (event) {
    x += event.dx
    y += event.dy

    event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
  })

})
</script>


<div id="card">
  <p>Card</p>
</div>


<style>
#card {
  width: 120px;
  border-radius: 8px;
  padding: 20px;
  margin: 1rem;
  background-color: #29e;
  color: white;
  font-size: 20px;
  font-family: sans-serif;

  touch-action: none;

  /* This makes things *much* easier */
  box-sizing: border-box;
}

</style>
