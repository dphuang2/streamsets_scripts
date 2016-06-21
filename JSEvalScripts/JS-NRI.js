function writeRecord(Values, year, indicator){
    for(key in Values){
        var value = Values[key];
        // value : GDP per capita
        // key   : year
        record = records[i] //Make new variable just called for easier reading
            // Note: this is a pass by reference so a new record is not created
            record.value = { 
                '${ID}' : 'nri'+indicator,
                '${CT}' : key,
                '${DT}' : year,
                '${VL}' : value,
            };
        output.write(record);
        // what is written to the record is what it outputs
    }
}

for(var i = 0; i < records.length; i++) {
    try {
        if(records[i].value['Attribute'] == 'Value'){

            var YR = "Edition"; 
            var indicator = "Placement";

            // Save Country Data
            var indicator = records[i].value[indicator];
            var year = records[i].value[YR];

            records[i].value.Values = {};
            for(key in records[i].value){
                var value = records[i].value[key];
                if(key.length == 3 && value != ""){
                    records[i].value['Values'][key] = value;
                }
            }
            //output.write(records[i]);

            // Save the map of values that was originally saved in the Record 
            // Under the 'Values' field
            var Values = records[i].value['Values'];
            writeRecord(Values, year, indicator);

        }
    } catch (e) {
        // Send record to error
        error.write(records[i], e);
    }
}
