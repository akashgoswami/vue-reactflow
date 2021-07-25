module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/vue-reactflow/dist/' : '/',
    devServer: {
        disableHostCheck: true
    }
}
