import themes from '@/style/variable'
import cssVars from 'css-vars-ponyfill'

export const initTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme)
  window.themeVariables = themes[theme + 'Theme']
  cssVars({
    watch: true,
    variables: themes[theme + 'Theme'],
    onlyLegacy: false
  })
}
