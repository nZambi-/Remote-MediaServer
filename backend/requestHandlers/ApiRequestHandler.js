"use strict";

var RequestHandler = require("./RequestHandler");
var SettingsApiHandler = require("./apiHandler/SettingsApiHandler");
var DatabaseApiHandler = require("./apiHandler/DatabaseApiHandler");
var DirectoryBrowserHandler = require("./apiHandler/DirectoryBrowserHandler");
var SubtitleApiHandler = require("./apiHandler/SubtitleApiHandler");
var url = require('url');

class ApiRequestHandler extends RequestHandler{
    handleRequest()
    {
        var parsedUrl = url.parse(this.request.url);
        for(var c = 0; c<ApiRequestHandler.chain.length && !new (ApiRequestHandler.chain[c])().handle(this.request, this.response, parsedUrl); c++)
            ;
    }
}

ApiRequestHandler.chain = [
        SettingsApiHandler,
        DirectoryBrowserHandler,
        SubtitleApiHandler,
        DatabaseApiHandler
    ];

module.exports = ApiRequestHandler;