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

        var converter = new JsonConverter({});
        converter.fromString(anInputStream.input.input, function(err, jsonData) {
            dataSource.numberOfDocuments = jsonData.length;
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
            self.logger.log('info', self.name + ' parsed to ' + jsonData.length + ' JSON Objects');
            // translate the data old school
            jsonData = self.applyHandlers(jsonData, anInputStream.index);
            self.database.batch(jsonData, databaseName);
            self.logger.log('info', self.name + ' batched ' + jsonData.length + ' to '+databaseName);
            var designDoc = self.viewFactory.createView(dataSource.index);
            designDoc = JSON.parse( designDoc);
            self.logger.log('info', self.name + ' generated indexes: ' + JSON.stringify(designDoc) + ' in '+databaseName);
            self.database.write( designDoc._id, designDoc, databaseName);
            dataSource.completionCode = [ "indexing",0];
            aFutureCallback(null,dataSource);
            //collect attribute counts
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
