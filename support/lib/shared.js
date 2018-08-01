import breakpoints from './../constants/breakpoints'

export const setupViewportSize = (breakpoint) =>
    breakpoint === 'desktop'
        ? browser.setViewportSize(breakpoints.desktop)
        : browser.setViewportSize(breakpoints.mobile)

export const isMobileLayout = () => browser.options.breakpoint === 'mobile'

export const isDesktopLayout = () => browser.options.breakpoint === 'desktop'

export const removeElementFromDom = (selector) => {
    browser.execute((selector) => {
        const menuElements = window.document.querySelectorAll(selector)
        menuElements.forEach((element) => {
            element.remove()
        })
    }, selector)
}
