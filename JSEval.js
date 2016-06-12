/**
 * Sample JavaScript code
 *
 * Available Objects:
 * 
 *  records: an array of records to process, depending on the JavaScript processor
 *           processing mode it may have 1 record or all the records in the batch.
 *
 *  state: a dict that is preserved between invocations of this script. 
 *        Useful for caching bits of data e.g. counters.
 *
 *  log.<loglevel>(msg, obj...): use instead of print to send log messages to the log4j log instead of stdout.
 *                               loglevel is any log4j level: e.g. info, error, warn, trace.
 *
 *  output.write(record): writes a record to processor output
 *
 *  error.write(record, message): sends a record to error
 *
 */

for(var i = 0; i < records.length; i++) {
  try {
    // Change record root field value to a STRING value
    //records[i].value = 'Hello ' + i;
	
    records[i].value.Values = {};
    records[i].value['${CI}'] = records[i].value['Country Name'] + ' (GDP per capita)';
    for(key in records[i].value){
      	var value = records[i].value[key];
    	if(value != "" && key > 1950){
          	records[i].value['Values'][key] = value;
        }
    }
    
    // Save the map of values that was originally saved in the Record 
    // Under the 'Values' field
    var Values = records[i].value['Values'];
    
    for(key in Values){
      var value = Values[key];
      // value : GDP per capita
      // key   : year
      record = records[i] //Make new variable just called for easier reading
      // Note: this is a pass by reference so a new record is not created
      record.value = { 
        '${CC}' : records[i].value['${CC}'],
        '${CI}' : records[i].value['${CI}'],
        '${YR}' : key,
        '${VL}' : value,
      };
      output.write(record);
      // what is written as it is written to
    }
    
    
    // Change record root field value to a MAP value and create an entry
    //records[i].value = { V : 'Hello' };

    // Access a MAP entry
    //records[i].value.X = records[i].value['V'] + ' World';

    // Modify a MAP entry
    //records[i].value.V = 5;

    // Create an ARRAY entry
    //records[i].value.A = ['Element 1', 'Element 2'];

    // Access a Array entry
    //records[i].value.B = records[i].value['A'][0];

    // Modify an existing ARRAY entry
    //records[i].value.A[0] = 100;

    // Write record to procesor output
    // output.write(records[i]);
  } catch (e) {
    // Send record to error
    error.write(records[i], e);
  }
}
