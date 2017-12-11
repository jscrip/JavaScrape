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
	
    for (var i = 0; i < array.length; i++) {
		var skipLine = false;
        var line = '';
        for (var index in array[i]) {
			if(isBlank(array[i][index]))
			{
				skipLine = true;
			}else{
				array[i][index] = array[i][index].replace(",", " ");
			}
			
            if (line != '') line += ','
			
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
  var csvData = new Blob([ConvertToCSV(data)], {
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
