/*
 Copyright (c) Data-Blitz, Inc.   All Rights Reserved
 THIS IS PROPRIETARY SOURCE CODE OF Data-Blitz, Inc. (Data-Blitz)
 This source code may not be copied, reverse engineered, or altered for any purpose.
 This source code is to be used exclusively by approved users and customers of Data-Blitz.
 */

var JsonConverter = require("csvtojson").Converter;

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
        var databaseName = anInputStream.index[1];// get database name from url
        self.logger.log('info', self.name + ' upload to ' + databaseName + ' database');

        var converter = new JsonConverter({});
        converter.fromString(anInputStream.input.input, function(err, jsonData) {
            self.logger.log('info', self.name + ' parsed to ' + jsonData.length + ' JSON Objects');
            // translate the data
            jsonData = self.applyHandlers(jsonData, anInputStream.index);
            self.database.batch(jsonData, databaseName);
            self.logger.log('info', self.name + ' batched ' + jsonData.length + ' to '+databaseName);
        });
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


