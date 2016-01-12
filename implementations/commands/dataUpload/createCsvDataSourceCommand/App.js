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
    execute: function(anInputStream, aFutureCallback) {
        var dataSource = {};
        dataSource.reference = {};
        dataSource.numberOfDocuments
        // create JSON-Schema.org schema
        dataSource.schema = {};
        dataSource.schema.type = "object";
        dataSource.schema.properties = {};
        self = this;
        var databaseName = anInputStream.index[1];// get database name from url
        self.logger.log('info', self.name + ' upload to ' + databaseName + ' database');
        var jsonData = Json(anInputStream.input.input);
        self.logger.log('info', self.name + ' translated ' + jsonData.length + ' documents');
        //convert JSON to javascript
        var data = JSON.parse(jsonData);
        dataSource.numberOfDocuments = data.length;
        var sampleDoc = data[0];
        for (var attritbuteName in sampleDoc)
            dataSource.schema.properties[attritbuteName] = {};//collect property names for schema generation

        dataSource.index = {};
        dataSource.index.name = databaseName+'-scratch-pad';
        dataSource.index.views = {};

        //specify map/reduce (index) each attribute for data set analysis
        for (var propertyName in dataSource.schema.properties) {
            viewName = 'by-'+propertyName;
            dataSource.index.views[viewName] = {};
            dataSource.index.views[viewName].keyAttributeName = propertyName;
            dataSource.index.views[viewName].valueAttributeName = propertyName;
        }
        self.logger.log('info', self.name + ' parsed to ' + data.length + ' JSON Objects');
        // translate the data old school
        data = self.applyHandlers(data, anInputStream.index);
        self.database.batch(data, databaseName);
        self.logger.log('info', self.name + ' batched ' + data.length + ' to '+databaseName);
        aFutureCallback(null, dataSource);
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

/*
 "schema": {
 "title": "Crime-Minneapolis-2015",
 "type": "object",
 "properties": {
 "publicaddress": {
 },
 */