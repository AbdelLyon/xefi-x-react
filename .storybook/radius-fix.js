window.addEventListener("DOMContentLoaded", function () {
  function applyRadiusFix() {
    function buttonRadius() {
      const buttons = document.querySelectorAll("button")

      buttons.forEach((button) => {
        const radiusAttr =
          button.getAttribute("data-radius") || button.getAttribute("radius")

        if (!radiusAttr) return

        const radiusMap = {
          none: "0px",
          sm: "4px",
          md: "6px",
          lg: "8px",
          full: "9999px",
        }

        if (radiusMap[radiusAttr]) {
          button.style.borderRadius = radiusMap[radiusAttr]
          console.log(
            `Applied radius ${radiusMap[radiusAttr]} to button with radius="${radiusAttr}"`
          )
        }
      })
    }

    buttonRadius()

    const observer = new MutationObserver(function (mutations) {
      let shouldFix = false
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          shouldFix = true
        }
      })
      if (shouldFix) {
        setTimeout(buttonRadius, 100)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  applyRadiusFix()

  setTimeout(applyRadiusFix, 1000)
})
