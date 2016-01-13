var self;

module.exports = {




    createView: function (aViewIndex) {
        var designDocument = {};
        designDocument._id = '_design/' + aViewIndex.name;
        designDocument.views = {};
        for (viewKey in aViewIndex.views) {
            designDocument.views[viewKey] = {};
            designDocument.views[viewKey].map =
                function (aDoc) {
                    if (doc[viewKey]) {
                        emit(doc.aViewIndex.views[viewKey].keyAttributeName,  doc.aViewIndex.views[viewKey].value.AttributeName)

                    }
                };
            designDocument.views[viewKey].reduce = function (aDoc) {
            };
        }
        return designDocument;
    },


    ready: function (aDsl) {
        self = this;
    },

    shutdown: function (aDsl) {

    },
    audit: function (aDsl) {

    }
}

/*

 "index": {
 "name": "buthead-scratch-pad",
 "views": {
 "by-publicaddress": {
 "keyAttributeName": "publicaddress",
 "valueAttributeName": "publicaddress"
 },
 "by-controlnbr": {
 "keyAttributeName": "controlnbr",
 "valueAttributeName": "controlnbr"
 },
 "by-CCN": {
 "keyAttributeName": "CCN",
 "valueAttributeName": "CCN"
 },
 "by-Precinct": {
 "keyAttributeName": "Precinct",
 "valueAttributeName": "Precinct"
 },
 "by-ReportedDate": {
 "keyAttributeName": "ReportedDate",
 "valueAttributeName": "ReportedDate"
 },
 "by-BeginDate": {
 "keyAttributeName": "BeginDate",
 "valueAttributeName": "BeginDate"
 },
 "by-Time": {
 "keyAttributeName": "Time",
 "valueAttributeName": "Time"
 },
 "by-Offense": {
 "keyAttributeName": "Offense",
 "valueAttributeName": "Offense"
 },
 "by-Description": {
 "keyAttributeName": "Description",
 "valueAttributeName": "Description"
 },
 "by-UCRCode": {
 "keyAttributeName": "UCRCode",
 "valueAttributeName": "UCRCode"
 },
 "by-EnteredDate": {
 "keyAttributeName": "EnteredDate",
 "valueAttributeName": "EnteredDate"
 },
 "by-Long": {
 "keyAttributeName": "Long",
 "valueAttributeName": "Long"
 },
 "by-Lat": {
 "keyAttributeName": "Lat",
 "valueAttributeName": "Lat"
 },
 "by-Neighborhood": {
 "keyAttributeName": "Neighborhood",
 "valueAttributeName": "Neighborhood"
 },
 "by-lastchanged": {
 "keyAttributeName": "lastchanged",
 "valueAttributeName": "lastchanged"
 },
 "by-LastUpdateDate": {
 "keyAttributeName": "LastUpdateDate",
 "valueAttributeName": "LastUpdateDate"
 }
 }
 }





 */