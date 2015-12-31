/*
 Copyright (c) Data-Blitz, Inc.   All Rights Reserved
 THIS IS PROPRIETARY SOURCE CODE OF Data-Blitz, Inc. (Data-Blitz)
 This source code may not be copied, reverse engineered, or altered for any purpose.
 This source code is to be used exclusively by approved users and customers of Data-Blitz.
 */


var self;


var viewContainer = {
    views: {
        byOffense: {
            map: function (doc) {
                if (doc.Offense) {
                    emit(doc.Offense, doc)
                }
            }
        }
    }
}



module.exports = {

    getViews: function () {
        return views;

    },

    ready: function (aDsl) {
        self = this;
        self.logger.log('info', self.name + '  is ready');
        return (self);
    },
    shutdown: function (aDsl) {

    },
    audit: function (aDsl) {
    }
}

///