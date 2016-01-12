/*
 Copyright (c) Data-Blitz, Inc.   All Rights Reserved
 THIS IS PROPRIETARY SOURCE CODE OF Data-Blitz, Inc. (Data-Blitz)
 This source code may not be copied, reverse engineered, or altered for any purpose.
 This source code is to be used exclusively by approved users and customers of Data-Blitz.
 */
//var sugar = require('sugar');
module.exports = {

    self: null,

    generateView: function (aDocs, aViewIndex) {
        var view = {viewName: aViewIndex};
        view.numberOfCrimes = aDocs.length;
        view.neighborhoods = {};
        for (i = 0; i < aDocs.length; i++) {
            var inputDoc = aDocs[i].value;
            var neighborhood = {};
            if (inputDoc.Neighborhood in view.neighborhoods) {
                neighborhood = view.neighborhoods[inputDoc.Neighborhood];
            }
            else {
                view.neighborhoods[inputDoc.Neighborhood] = {};
                neighborhood = view.neighborhoods[inputDoc.Neighborhood];
                neighborhood.lats = 0;
                neighborhood.longs = 0;
                neighborhood.crimeCount = 0;
                //neighborhood.offenses = {};
            }
            neighborhood.lats = neighborhood.lats + parseFloat(inputDoc.latitude);
            neighborhood.longs = neighborhood.longs + parseFloat(inputDoc.longitude);
            neighborhood.crimeCount++;

        }
        for (var neighborhoodKey in view.neighborhoods) {
            neighborhood = view.neighborhoods[neighborhoodKey];
            neighborhood.latitude = neighborhood.lats / neighborhood.crimeCount;
            neighborhood.longitude = neighborhood.longs / neighborhood.crimeCount;
            for (var offenseKey in view.neighborhoods.offenses) {
                delete neighborhood.lats;
                delete neighborhood.longs;
            }
            //self.logger.log('info', self.name + ' created a view for input ' + aDocs);
            return view;
        }
    },
        ready: function (aDsl) {
            self = this;
            return (self);
        }
        ,

        shutdown: function (aDsl) {

        }
        ,
        audit: function (aDsl) {

        }
    }


