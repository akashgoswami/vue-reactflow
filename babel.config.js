module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset'],
    ["@babel/preset-env"],
    ["@babel/preset-react"],
  ],
  plugins: [
    ["@babel/plugin-syntax-jsx"],
    ["@babel/plugin-transform-react-jsx"],
    ["@babel/plugin-transform-runtime"],
  ]
}
