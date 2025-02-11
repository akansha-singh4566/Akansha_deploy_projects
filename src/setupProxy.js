const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://spotify-downloader9.p.rapidapi.com",
            changeOrigin: true,
            pathRewrite: { "^/api": "" },
        })
    );
};
