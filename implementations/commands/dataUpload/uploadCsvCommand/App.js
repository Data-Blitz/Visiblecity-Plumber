/*
 Copyright (c) Data-Blitz, Inc.   All Rights Reserved
 THIS IS PROPRIETARY SOURCE CODE OF Data-Blitz, Inc. (Data-Blitz)
 This source code may not be copied, reverse engineered, or altered for any purpose.
 This source code is to be used exclusively by approved users and customers of Data-Blitz.
 */

var Json = require('node-json-csv');

module.exports = {

    self: null,

    handleData: function (aDocument, aTranslationData) {
        Object.keys(self.dataHandlerStack).forEach(
            function (anAttributeDataKey) {
                if (anAttributeDataKey.indexOf(self.dataHandlerSubKey) !== -1) {
                    handler = self.dataHandlerStack[anAttributeDataKey];
                    handler.handle(aDocument, aTranslationData);
                }
            });
        return aDocument;
    },


    applyHandlers: function (aData, aTranslationData) {
        var handledData = [];
        for (i = 0; i < aData.length; i++) {
            var handledDocument = aData[i];
            if (self.idGenerator)
              handledDocument._id = self.idGenerator.createId(aData[i]);
            if (self.dataHandlerStack)
                handledDocument = self.handleData(handledDocument, aTranslationData);
            handledData.push(handledDocument);
        }
        return handledData;
    },
    execute: function(anInputStream) {
        self = this;
        var databaseName = anInputStream.index[1];
        self.logger.log('info', self.name + ' upload to ' + databaseName + ' database');
        //translate Csv data
        var jsonData = Json(anInputStream.input.input);
        self.logger.log('info', self.name + ' translated ' + jsonData.length + ' documents');
        //convert JSON to javascript
        var data = JSON.parse(jsonData);
        self.logger.log('info', self.name + ' parsed to ' + data.length + ' JSON Objects');
        // translate the data
        data = self.applyHandlers(data, anInputStream.index);
        self.database.batch(data, databaseName);
        self.logger.log('info', self.name + ' batched ' + data.length + ' to '+databaseName);
    },
    ready: function (aDsl) {
        self = this;
        self.dataHandlerSubKey = 'DataHandler';
        return (self);
    },

    shutdown: function (aDsl) {

    },
    audit: function (aDsl) {

    }
}


