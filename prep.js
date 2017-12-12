/*
  CREDITS:
  ConvertToCSV was inspired by the contributions on this page:
  https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable
  
  downloadCSV was inspired by the contributions on this page:
  https://github.com/mholt/PapaParse/issues/175
  
  isBlank was inspired by the contributions on this page:
  https://stackoverflow.com/questions/154059/how-do-you-check-for-an-empty-string-in-javascript
*/
function isBlank(stri) {return (!stri || /^\s*$/.test(stri));}
function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
	str += Object.getOwnPropertyNames(array[0]).join(",") + '\r\n';
    for (var i = 0; i < array.length; i++) {
		
		var skipLine = false;
        var line = '';
        for (var index in array[i]) {
			
            if (line != '') line += ',';
			
            line += array[i][index];
			
        }
		if(skipLine == false){
			str += line + '\r\n';
		}
    }

    return str;
}

function downloadCSV(data,fileName)
{
  var convertedJSON = ConvertToCSV(data);
  var csvData = new Blob([convertedJSON], {
			type: 'text/csv;charset=utf-8;'
		});
	
	//IE11 & Edge
	if (navigator.msSaveBlob) {
		navigator.msSaveBlob(csvData, fileName+'.csv');
	} else {
		//In FF link must be added to DOM to be clicked
		var link = document.createElement('a');
		link.href = window.URL.createObjectURL(csvData);
		link.setAttribute('download', fileName+'.csv');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}; // end else
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function prepJSONforCSV(jsonData){
	var props = getUniqueAttributeList(jsonData);
	return jsonData.map(function(row){
		var obj = {};
		props.forEach(function(prop){
			if (!row.hasOwnProperty(prop)) {
				obj[prop] = "[[blank]]";
			}else{
				obj[prop] = row[prop];
			}
		})
		
		return obj;
	})

}

function elementAttributesToJSON (value, index, ar) {
	var obj = {};
	for (var att, i = 0, atts = value.attributes, n = atts.length; i < n; i++){
		att = atts[i];
			obj[att.nodeName] = att.nodeValue.replace(/[\t\n\r,]/g,' ').replace(/\s+/g,' ').trim();
	}
	if(value.textContent)
	{
		obj.textContent = value.textContent.replace(/[\t\n\r,]/g,' ').replace(/\s+/g,' ').trim();
	}else
	{
		obj.textContent = "[[blank]]";
	}
  return obj;
}

function scrapeByElementName(elementName, fileName){
	var getElements = document.getElementsByTagName(elementName);
	var collection = Array.prototype.slice.call(getElements).map(elementAttributesToJSON);
	var preppedData = prepJSONforCSV(collection);
	downloadCSV(preppedData, fileName);
}	

function getUniqueAttributeList(data){
	return data.map(function(row){
		return Object.getOwnPropertyNames(row)
	}).reduce(function(a, b){return a.concat(b)},[]).filter( onlyUnique );
	
}
