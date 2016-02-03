/*
 Copyright (c) Data-Blitz, Inc.   All Rights Reserved
 THIS IS PROPRIETARY SOURCE CODE OF Data-Blitz, Inc. (Data-Blitz)
 This source code may not be copied, reverse engineered, or altered for any purpose.
 This source code is to be used exclusively by approved users and customers of Data-Blitz.
 */

var self;

module.exports = {
    execute: function(anInputStream) {
        //var Array = require('node-array');
        var databaseName = anInputStream.index[1];
        var data = JSON.parse(anInputStream.input.input);
        self.logger.log('info', this.name + ' converted '+ data.length );
        self.uploadToDatabase(data, databaseName);
    },
    uploadToDatabase: function (aDocuments, aDatabaseName) {
        self.database.batch(aDocuments, aDatabaseName, self.idGenerator);
    },

    addToDatabase: function (aDocument, aDatabaseName) {
        var id = self.idGenerator.createId(aDocument);
        self.database.write(id, aDocument, aDatabaseName);
        //self.searchEngine.index(id, aDocument, self.configuration.index, self.configuration.type);
    },
    ready: function (aDsl) {
        self = this;
        return (self);
    },

    shutdown: function (aDsl) {

    },
    audit: function (aDsl) {

    }
}


