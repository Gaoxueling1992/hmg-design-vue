import themes from '@/style/variable'
import cssVars from 'css-vars-ponyfill'

const createLink = (() => {
  let $link = null
  return () => {
    if ($link) {
      return $link
    }
    $link = document.createElement('link')
    $link.rel = 'stylesheet'
    $link.type = 'text/css'
    document.querySelector('head').appendChild($link)
    return $link
  }
})

export const initTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme)
  // const $link = createLink()
  // $link.href = `./default-${theme}.css`
  cssVars({
    watch: true,
    variables: themes[theme + 'Theme'],
    onlyLegacy: false
  })
}
