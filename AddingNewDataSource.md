<h3> Steps for adding a data source </h3>
<ol>
    <li> Add file to origin folder </li>
    <li> Edit JS Script </li>
    <ul>
        <li> Add new indicator function following the format provided in the pseudocode </li>
        <li> Add new condition to the switch statement for new file </li>
    </ul>
</ol>

<h4> Pseudocode for understanding the script: </h4>
```javascript
(defined at the top of the script.js file)
function outputRecord(record, indicator, country, date, value){
    if(parseFloat(value).isNaN()){ // if the value is a string, then output value as string
        record.value = { 
            '${ID}' : indicator.toString(),
            '${CT}' : country.toString(),
            '${DT}' : parseInt(date),
            '${VL}' : value.toString(),
            'filename' : fn.toString(),
        };
    } else { // otherwise, replace commas with nil and parseFloat() the value
        record.value = { 
            '${ID}' : indicator.toString(),
            '${CT}' : country.toString(),
            '${DT}' : parseInt(date),
            '${VL}' : stringToNum(value),
            'filename' : fn.toString(),
        };
    }
    output.write(record);
}

...
indicator functions
...
// Example indicator function
function indicator(){
    (defined at the top of a indicator function)
    writeRecord(Values){
    // iterate through Values hash and output record for each value
        for(key in Values){
            var value = Values[key];
            outputRecord(records[i], indicator, country, year, value); // Use outputRecord that is defined above to output all the records for the row that is being evaluated
        }

    }

    // save data if needed for writeRecord function
    var cc = records[i].value['header name'];
    var country = records[i].value['Country']; // Example of header name
    var year = records[i].value['testing date']; // Example of header name

    var Values = {}; // Create empty map of values
    // populate map with values and header (key)
    for(key in records[i].value){
        var value = records[i].value[key];
        if(condition that is met when you want to save the value){
            Values[key] = value;
        }
    }
    writeRecord(Values);
}
function indicator2(){
    ...
    ...
}
...
more functions for more indicators
...

// ______LOGIC FOR WHICH FUNCTION TO EXECUTE DEPENDING ON FILENAME______
for(var i = 0; i <  records.length; i++){
    declare any variables needed for function execution logic
    var fn = records[i].value['filename'];
        try {
            // switch statement that provides logic for which indicator function to execute
            switch(true){
                case (fn == '<insert file name>'):
                    indicatorFunction();
                    break;
                case (another condition for another file):
                    indicatorFunction();
                    break;
            }
        } catch(e){
            // Send record to error
            error.write(records[i],e );
        }
}
```
