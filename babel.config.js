module.exports = {
  "presets": [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }],
    "@vue/babel-preset-jsx"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
