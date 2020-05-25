/* eslint-disable */
export const printANSI = () => {
  // console.clear()
  console.log('[Relem Pro] created()')
  // ASCII - ANSI Shadow
  let text = `______ _____ _      ________  ___
| ___ \\  ___| |    |  ___|  \\/  |
| |_/ / |__ | |    | |__ | .  . |
|    /|  __|| |    |  __|| |\\/| |
| |\\ \\| |___| |____| |___| |  | |
\\_| \\_\\____/\\_____/\\____/\\_|  |_/
                                                                
\t\t\t\t\tPublished ${APP_VERSION}-${GIT_HASH}
\t\t\t\t\tBuild date: ${BUILD_DATE}`
  console.log(`%c${text}`, 'color: #fc4d50')
  console.log('%c感谢使用 Relem Pro!', 'color: #000; font-size: 14px;    font-family: Hiragino Sans GB,Microsoft YaHei,sans-serif;')
  console.log('%cThanks for using Relem Pro!', 'color: #fff; font-size: 14px; font-weight: 300; text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;')
}
