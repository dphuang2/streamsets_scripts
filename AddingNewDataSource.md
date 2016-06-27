<h3> Steps for adding a data source </h3>
<ol>
    <li> Add file to origin folder </li>
    <li> Edit JS Script </li>
    <ul>
        <li> Add new indicator function following the format provided in the pseudocode </li>
        <li> Add new condition to the switch statement for new file </li>
    </ul>
    <li> Add new Stream Selector condition for new file </li>
    <li> Add new Local FS Destination and configure output file name to indicator </li>
</ol>

<h4> Pseudocode for understanding the script: </h4>
```javascript
function indicator(){
    writeRecord(){
        - Write data to record and output record
        - ${ID}, ${CT}, ${DT}, ${VL} are constants defined by pipeline
        output.write(record); // Syntax for outputting a record
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
