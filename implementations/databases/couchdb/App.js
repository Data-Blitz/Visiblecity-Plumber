/*
 Copyright (c) Data-Blitz, Inc.   All Rights Reserved
 THIS IS PROPRIETARY SOURCE CODE OF Data-Blitz, Inc. (Data-Blitz)
 This source code may not be copied, reverse engineered, or altered for any purpose.
 This source code is to be used exclusively by approved users and customers of Data-Blitz.
 */

var cradle = require('cradle');
var self;

var writeToDatabase = function (anId, aDocument, aDatabase) {
    aDatabase.save(anId,
        aDocument, function (anErr, aResult) {
            if (anErr)
                self.logger.log('error', self.name + ' has failed to write:' + aDocument + ' because ' + anErr);
            else
                self.logger.log('info', self.name + ' successfully wrote: ' + aDocument);
        });
}


var uploadChunk = function (aDocumentChunk, aDatabase) {
    aDatabase.save(aDocumentChunk,
        function (anErr, aResult) {
            if (anErr)
                self.logger.log('error', self.name + ' has failed to write:' + aDocumentChunk.length + ' because ' + anErr);
            else
                self.logger.log('info', self.name + ' successfully wrote: ' + aDocumentChunk.length + ' documents');
        });
}

var chunkUpload = function (aDocuments, aDatabase, aChunkSize) {
    var size = aDocuments.length / aChunkSize
    var numberOfChunks = Math.floor(size);
    var currentDocIndex = 0;
    var documentsChunk = null;
    for (chunk = 0; chunk < numberOfChunks; chunk++) {
        documentsChunk = [];
        for (docIndex = 0; docIndex < aChunkSize; docIndex++) {
            var doc = aDocuments[currentDocIndex++];
            documentsChunk.push(doc);
        }
        uploadChunk(documentsChunk, aDatabase);
    }
    //deal with the remainder
    remainder = aDocuments.length - (numberOfChunks * aChunkSize)
    var documentsChunk = [];
    for (i = 0; i < remainder; i++) {
        var doc = aDocuments[currentDocIndex++];
        documentsChunk.push(doc);
    }
    uploadChunk(documentsChunk, aDatabase);
}


var getDatabase = function (aDatabaseName, aConnection, aCallback) {
    var connnect = null;
    if (aConnection)
        connection = aConnection;
    else
        connection = cradle.Connection;
    var database = new (connection)().database(aDatabaseName);
    database.exists(function (err, exists) {
        if (err)
            self.logger.log('error', self.name + ' failed checking database existence because ' + err);

        else if (!exists) {
            self.logger.log('info', self.name + ' found database: ' + aDatabaseName);
            database.create();
        }
        aCallback(null, database);
    });
}

var getView = function (aDatabase, aViewGroupName, aViewName, aCallback) {
    aDatabase.get('_design/' + aViewGroupName, function (anErr, aDesignDoc) {
        if (anErr)
            aCallback(anErr, null);
        else {
            var view = aDatabase.view;
            aCallback(null, view )
        }

    });
}

getDocument = function (aDatabaseName, aDocumentId, aCallback) {
    getDatabase(aDatabaseName, null, function (anErr, aDatabase) {
        if (anErr) {
            self.logger.log('info', self.name + ' could find or create database: ' + aDatabaseName);
            aCallback({completionCode: ' could find or create database: ' + aDatabaseName}, null)
        }
        else if (aDatabase) {
            aDatabase.get(aDocumentId, function (anErr, aDoc) {
                if (anErr)
                    aCallback(anErr, null);
                else
                    aCallback(null, aDoc);
            });
        }
    })
}


module.exports = {

    self: null,

    batch: function (aDocuments, aDatabaseName) {
        var database = new (cradle.Connection)().database(aDatabaseName);
        database.exists(function (err, exists) {
            if (err)
                self.logger.log('error', self.name + ' failed checking database existence because ' + err);

            else if (exists) {
                self.logger.log('info', self.name + ' found database: ' + aDatabaseName);
                chunkUpload(aDocuments, database, 10000);
                self.logger.log('info', self.name + ' successfully upload ' + aDocuments.size + ' to ' + aDatabaseName);
            }
            else {
                self.logger.log('info', self.name + ' cannot find database: ' + aDatabaseName + ' creating one');
                database.create();
                chunkUpload(aDocuments, database, 10000);
                self.logger.log('info', self.name + ' successfully upload ' + aDocuments.length + ' to ' + aDatabaseName);
            }
        });
    },

    view: function (aViewGroupName, aViewName, aDatabaseName, aViewKey, aCallback) {
        getDatabase(aDatabaseName, null, function (anErr, aDatabase) {
            if (anErr) {
                self.logger.log('info', self.name + ' could find or create database: ' + aDatabaseName);
                aCallback({completionCode: ' could find or create database: ' + aDatabaseName}, null)
            }
            if (aDatabase) {
                self.logger.log('info', self.name + ' found or created database: ' + aDatabaseName);
                getView(aDatabase, aViewGroupName, aViewName, function (anErr, aView) {
                    if (anErr) {
                        self.logger.log('info', self.name + ' could find or create view: ' + aViewName + ' on database: ' + aDatabaseName);
                        aCallback({completionCode: self.name + ' could find or create view: ' + aViewName + ' on database: ' + aDatabaseName}, null)
                    }
                    else if (aView) {
                        self.logger.log('info', self.name + ' found view: ' + aViewName + ' on database: ' + aDatabaseName);
                        var viewOptions = {
                           // key: "AUDUBON PARK",
                        };
                        var opts = {}


                         if (aViewKey) {
                            opts.startkey = [aViewKey.start];
                            opts.endkey = [aViewKey.stop, {}];
                        }


                        var path = aViewGroupName+'/'+aViewName;
                        //aDatabase.view( path , opts, function (anErr, aDocs) {
                            aDatabase.view( path, opts, function (anErr, aDocs) {
                            aCallback(null, aDocs)
                        })
                    }
                })
            }
        });
    },

    read: function (aDocumentId, aDatabaseName, aCallback) {
        var database = new (cradle.Connection)().database(aDatabaseName);
        database.exists(function (err, exists) {
            if (err)
                self.logger.log('error', self.name + ' failed checking database existence because ' + err);

            else if (exists) {


                writeToDatabase(anId, aDocument, database);
                self.logger.log('info', self.name + ' successfully wrote ' + aDocument.toString() + ' to ' + aDatabaseName);
            }
            else {
                self.logger.log('info', self.name + ' cannot find database: ' + aDatabaseName + ' creating one');
                database.create();
                writeToDatabase(anId, aDocument, database);
                self.logger.log('info', self.name + ' successfully wrote ' + aDocument.toString() + ' to ' + aDatabaseName);
            }
        });
    },



    get: function (anId, aDatabaseName, aCallback) {
        getDocument(aDatabaseName, anId, function (anErr, aDocument) {
            if (anErr)
                aCallback(anErr);
            else if (aDocument)
                aCallback(null, aDocument);
        })

    },


    write: function (anId, aDocument, aDatabaseName) {
        var database = new (cradle.Connection)().database(aDatabaseName);
        database.exists(function (err, exists) {
            if (err)
                self.logger.log('error', self.name + ' failed checking database existence because ' + err);

            else if (exists) {
                writeToDatabase(anId, aDocument, database);
                self.logger.log('info', self.name + ' successfully wrote ' + aDocument.toString() + ' to ' + aDatabaseName);
            }
            else {
                self.logger.log('info', self.name + ' cannot find database: ' + aDatabaseName + ' creating one');
                database.create();
                writeToDatabase(anId, aDocument, database);
                self.logger.log('info', self.name + ' successfully wrote ' + aDocument.toString() + ' to ' + aDatabaseName);
            }
        });
    },
    ready: function (aDsl) {
        self = this;
        self.databases = {};
        self.logger.log('info', self.name + ' couchdb database is ready');
        return (self);
    }
    ,
    shutdown: function (aDsl) {
        self.database.close();
    }
    ,
    audit: function (aDsl) {
    }
}

///