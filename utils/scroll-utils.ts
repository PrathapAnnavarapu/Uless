/**
 * Scrolls the window to the top with a smooth animation
 */
export const scrollToTop = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
}

/**
 * Scrolls the window to the top immediately without animation
 */
export const scrollToTopImmediate = () => {
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0)
  }
}

/**
 * Scrolls to a specific element with a smooth animation
 */
export const scrollToElement = (elementId: string) => {
  if (typeof window !== "undefined") {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }
}
