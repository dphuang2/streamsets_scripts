function writeRecord(Values){
      for(key in Values){
      	var value = Values[key];
      	// value : GDP per capita
      	// key   : year
      	record = records[i] //Make new variable just called for easier reading
      	// Note: this is a pass by reference so a new record is not created
     	 record.value = { 
        	'${ID}' : 'gdpcapus',
        	'${CT}' : records[i].value['${CT}'],
        	'${DT}' : key,
        	'${VL}' : value,
      	};
      	output.write(record);
      	// what is written to the record is what it outputs
    }
}

for(var i = 0; i < records.length; i++) {
  try {
    // Change record root field value to a STRING value
    //records[i].value = 'Hello ' + i;
	
    records[i].value.Values = {};
    records[i].value['${CT}'] = records[i].value['Country Code'];
    for(key in records[i].value){
      	var value = records[i].value[key];
    	if(value != "" && key > 1950){
          	records[i].value['Values'][key] = value;
        }
    }
    //output.write(records[i]);
    
    // Save the map of values that was originally saved in the Record 
    // Under the 'Values' field
    var Values = records[i].value['Values'];
	writeRecord(Values);
    
  } catch (e) {
    // Send record to error
    error.write(records[i], e);
  }
}
