'use strict';
const url = require('url'),
    rewriteModule = require('http-rewrite-middleware'),

    HTTP_STATUS = {
        success: 200,
        unauthorized: 401,
        moved_permanently: 301
    };

module.exports = {
    init: function (opts) {
        const options = opts || {};

        this.clientId = options.clientId;
        this.clientSecret = options.clientSecret;
        this.serverUrl = options.serverUrl;
        this.accessTokenPath = options.accessTokenPath;
        this.authorizationPath = options.authorizationPath;
        this.checkTokenPath = options.checkTokenPath;
        this.authorizationGrant = options.authorizationGrant;
        this.redirectUri = options.redirectUri;
        this.zoneId = options.zoneId;
        this.defaultClientRoute = options.defaultClientRoute;
        this.serverPort = options.serverPort;
        this.scope = options.scope;

        this.accessToken = null;
        this.user = null;

        return this.getMiddlewares();
    },


    getAccessTokenFromCode: function (authCode, successCallback, errorCallback) {
        const request = require('request'),
            that = this,
            options = {
                method: 'POST',
                url: this.serverUrl + that.accessTokenPath,
                auth: {
                    username: that.clientId,
                    password: that.clientSecret
                },
                form: {
                    grant_type: that.authorizationGrant,
                    code: authCode,
                    redirect_uri: `http://localhost:${that.serverPort}${that.redirectUri}`,
                    state: that.defaultClientRoute
                }
            };

        request(options, function (err, response, body) {
            if (!err && response.statusCode === HTTP_STATUS.success) {
                const res = JSON.parse(body);
                that.accessToken = `${res.token_type} ${res.access_token}`;

                // get user info
                request({
                    method: 'post',
                    url: that.serverUrl + that.checkTokenPath,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    auth: {
                        username: that.clientId,
                        password: that.clientSecret
                    },
                    form: {
                        token: res.access_token
                    }
                }, function (error, response, body) {
                    that.user = JSON.parse(body);
                    successCallback(that.accessToken);
                });
            } else {
                errorCallback(err, response, body);
            }
        });
    },
    getMiddlewares: function () {
        // get access token here
        const middlewares = [],
            that = this,
            rewriteMiddleware = rewriteModule.getMiddleware([
                {
                    from: '^/login(.*)$',
                    to: `${that.serverUrl}${that.authorizationPath}$1?response_type=code&scope=${that.scope}` +
                        `&client_id=${that.clientId}&redirect_uri=http%3A%2F%2Flocalhost%3A${that.serverPort}` +
                        `${encodeURIComponent(that.redirectUri)}`,
                    redirect: 'permanent'
                },
                {
                    from: '^/logout',
                    to: `${that.serverUrl}/logout?redirect=http://localhost:${that.serverPort}`,
                    redirect: 'permanent'
                }
            ]
            );

        middlewares.push(function (req, res, next) {
            if (req.url.match(that.redirectUri)) {
                const params = url.parse(req.url, true).query;

                that.getAccessTokenFromCode(params.code, function (token) {
                    console.log('uaa access token: ', token);
                    params.state = params.state || that.defaultClientRoute;
                    const url = req._parsedUrl.pathname.replace(that.redirectUri, params.state);

                    res.statusCode = HTTP_STATUS.moved_permanently;
                    res.setHeader('Location', url);
                    res.end();
                }, function (err) {
                    console.error('error getting access token: ', err);
                    next(err);
                });
            } else if (req.url.match('/userinfo')) {
                console.log('valid session', that.hasValidSession());
                if (that.hasValidSession()) {
                    res.end(JSON.stringify({
                        email: that.user.email,
                        user_name: that.user.user_name
                    }));
                } else {
                    res.status(HTTP_STATUS.unauthorized);
                    res.end();
                }
            } else if (req.url.match('/logout')) {
                console.log('\n\nDeleting user sesssion');
                that.deleteSession();
                next();
            } else {
                next();
            }
        });

        middlewares.push(rewriteMiddleware);

        return middlewares;
    },
    hasValidSession: function () {
        return !!this.accessToken;
    },
    deleteSession: function () {
        this.accessToken = null;
    }
};
