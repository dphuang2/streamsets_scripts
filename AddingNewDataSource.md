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
    writeRecordS(){
        Write data to record and output record
        ${ID}, ${CT}, ${DT}, ${VL} are constants defined by pipeline
    }
    // save data if needed
    var cc ...
        var country ...
        var year ...

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
for(var i = 0; i <  records.length; i++){
    declare any variables needed for function execution logic
        try {
            switch statement that provides logic for which indicator function to execute
        } catch(e){
            // Send record to error
            error.write(records[i],e );
        }
}
```
