
var mongoose = require('mongoose'); 
var personalInfo = new mongoose.Schema{{
	"department" : string, 
    "hometown" : string, 
    "studentLevel" : string, 
    "firstName" : string, 
    "surname" : string, 
    "andrewId" : string, 
    "studentClass" : string,
    //location is a little messy  
    "location" : string, 
    "courses" : [string]
}}

var events = new mongoose.Schema{{
	// date includes time 
    "date" : Date, 
    "place" : string, 
    "buddy" : mongoose.Schema.Types.ObjectId 
}}

var userAppUsage = new mongoose.Schema{{
	"eventsScheduled" : [mongoose.Schema.Types.ObjectId], 
	"customizedSearch" : [mongoose.Schema.Types.ObjectId], 
	"buddies" : [mongoose.Schema.Types.ObjectId], 
	// So, the types for picture and chat are a little iffy ... ew 
	"picture" : string, 
	"chat" : string
}} 