/*
 Copyright (c) Data-Blitz, Inc.   All Rights Reserved
 THIS IS PROPRIETARY SOURCE CODE OF Data-Blitz, Inc. (Data-Blitz)
 This source code may not be copied, reverse engineered, or altered for any purpose.
 This source code is to be used exclusively by approved users and customers of Data-Blitz.
 */

module.exports = {

    self: null,
    generateView: function(aDocs, aViewIndex) {
        var view = {viewName:aViewIndex};
        view.numberOfCrimes = aDocs.length;
        view.crimes = [];
        for (i = 0; i < aDocs.length; i++) {
            var inputDoc = aDocs[i].value;
            var doc = {};
            doc.offense = inputDoc.Offense;
            doc.neighborhood = inputDoc.Neighborhood;
            doc.date =  inputDoc.ReportedDate;
            doc.timeOfDay = inputDoc.Time;
            doc.latitude = inputDoc.latitude;
            doc.longitude = inputDoc.longitude;
            view.crimes.push(doc);
        }
        self.logger.log('info', self.name + ' created a view for input ' + aDocs );
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


