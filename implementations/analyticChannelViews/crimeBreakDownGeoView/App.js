/*
 Copyright (c) Data-Blitz, Inc.   All Rights Reserved
 THIS IS PROPRIETARY SOURCE CODE OF Data-Blitz, Inc. (Data-Blitz)
 This source code may not be copied, reverse engineered, or altered for any purpose.
 This source code is to be used exclusively by approved users and customers of Data-Blitz.
 */

module.exports = {

    self: null,
    generateView: function(anInput) {
        var view = {thing:'crimeBreakDownGeoView',number:69}
        self.logger.log('info', self.name + ' created a view for input ' + anInput );
        return view;
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


