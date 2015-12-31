# Visible City Geospatial Processing Engine

---

## About

**Visible City Geospatial Processing Engine** is the logic runtime for the Visible City Geo Analysis Platform; built on
Data-Blitz-Geo, a specialized version of Data-Blitz ContentRouter for geospatial analysis.

## Installing
1. install Node.js (https://nodejs.org/en/download/)
2. install ElasticSearch (https://www.elastic.co/products/elasticsearch)
3. install CouchDB (http://couchdb.apache.org)
4. move to your visiblecity-back directory
5. type-> npm install 
6. run plumber type-> node Plumber ./VisibleCityPlumber.json

####You should get the following response..

ready ./
Readying BluePrintapp:ExamplePlumber
info using existing instance of wintonlogger id:undefined
info successfully built app:WinstonLogger[object Object]
Readying Plumber App:WinstonLogger
2015-11-24T16:39:06.855Z - info: the logger:WinstonLogger is ready
2015-11-24T16:39:06.857Z - info: creating new instance of UploadCsvRoute id:0
2015-11-24T16:39:06.858Z - info: creating new instance of ExecutorSink id:1
2015-11-24T16:39:06.858Z - info: creating new instance of IndexedCommandExecutor id:2
2015-11-24T16:39:06.859Z - info: creating new instance of WorkOrderHandler id:3
2015-11-24T16:39:06.860Z - info: creating new instance of UrlIndexHandler id:4
2015-11-24T16:39:06.860Z - info: creating new instance of UrlIndexHandler id:5
2015-11-24T16:39:06.861Z - info: creating new instance of UploadCsvCommand id:6
2015-11-24T16:39:07.024Z - info: creating new instance of IndexElasticSearch id:7
2015-11-24T16:39:07.026Z - info: using existing instance of undefined id:undefined
2015-11-24T16:39:07.094Z - info: creating new instance of CrimesCouchdb id:8
2015-11-24T16:39:07.094Z - info: creating new instance of HttpBinarySource id:9
2015-11-24T16:39:07.094Z - info: successfully built app:CsvUploadContentRouter[object Object]
Readying Plumber App:CsvUploadContentRouter
2015-11-24T16:39:07.095Z - info: the logger:WinstonLogger is ready
2015-11-24T16:39:07.095Z - info: the logger:WinstonLogger is ready
2015-11-24T16:39:07.095Z - info: the logger:WinstonLogger is ready
2015-11-24T16:39:07.095Z - info: the logger:WinstonLogger is ready
2015-11-24T16:39:07.096Z - info: the logger:WinstonLogger is ready
2015-11-24T16:39:07.096Z - info: the logger:WinstonLogger is ready
2015-11-24T16:39:07.096Z - info: the logger:WinstonLogger is ready
2015-11-24T16:39:07.096Z - info: the logger:WinstonLogger is ready
2015-11-24T16:39:07.096Z - info: the logger:WinstonLogger is ready
2015-11-24T16:39:07.097Z - info: the logger:WinstonLogger is ready
Elasticsearch INFO: 2015-11-24T16:39:07Z
  Adding connection to http://localhost:9200/

2015-11-24T16:39:07.101Z - info: the logger:WinstonLogger is ready
2015-11-24T16:39:07.102Z - info: the logger:WinstonLogger is ready
2015-11-24T16:39:07.102Z - info: CrimesCouchdb has created connection to:crimes
2015-11-24T16:39:07.102Z - info: IndexedCommandExecutor is ready
2015-11-24T16:39:07.102Z - info: ExecutorSink is ready
2015-11-24T16:39:07.102Z - info: the logger:WinstonLogger is ready
2015-11-24T16:39:07.169Z - info: UploadCsvRoute is ready
2015-11-24T16:39:07.171Z - info: loading HttpBinarySource::run for execution
2015-11-24T16:39:07.171Z - info: executing app: HttpBinarySource
instanceId:9 Opening http://*****/:8000//visibleCity
instanceId:9 Opened http://*****/:8000//visibleCity

# API
##1.upload
As the name might suggest, This APIs for uploading data 
in the Visible City Spatial Knowledgebase
The  Visible City Spatial Knowledgebase is a collaboration 
of multiple Real-time databases along with search engines.
All of upload data Is passed via HTTP Post.
###upLoadCsv
below is an example which uploads the file /data/fakeData/crime.csv into the a database named crime
####curl http://localhost:8000/visibleCity/execute/uploadCsv/crime --data-binary @./crime.csv -H 'Content-type:text/plain; charset=utf-8'

below is an example which uploads the file /data/fakeData/crime.csv into the a database named crime use the attributes "Lat" and "Long" as 
geoPoint coordinates Latitude/Longitude ..
####curl http://localhost:8000/visibleCity/execute/uploadCsv/crime/geo/Lat/Long --data-binary @./crime.csv -H 'Content-type:text/plain; charset=utf-8'

###uploadJsonArray,
###uploadJson,
###uploadGeoJson
###uploadShapefileZip

##2. analytic
Analytic represents the container of some type of computation. Each analytic can support multiple views.

##3. map
Map is a visual representation of one or more analytics. Maps represent the geospatial view of Visible city. 
Maps can contain a stack of analytics.views.mapView. 


