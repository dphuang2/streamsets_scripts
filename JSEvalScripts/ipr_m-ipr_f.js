function writeRecord(Values, year, country){
    for(key in Values){
        var value = Values[key];
        var indicator;

        if(key == 'Male'){
            indicator = 'ipr_m'; 
        } else {
            indicator = 'ipr_f';
        }

        record = records[i] //Make new variable just called for easier reading
            // Note: this is a pass by reference so a new record is not created
            record.value = { 
                '${ID}' : indicator,
                '${CT}' : country,
                '${DT}' : year,
                '${VL}' : value,
            };
        output.write(record);
        // what is written to the record is what it outputs
    }
}

for(var i = 0; i < records.length; i++) {
    try {
        // Save Country Data
        var year = records[i].value['year'];
        var country = records[i].value['country'];

        var Values = {};
        for(key in records[i].value){
            var value = records[i].value[key];
            if(key != 'country' && key != 'year'){
                Values[key] = value;
            }
        }
        //output.write(records[i]);

        // Save the map of values that was originally saved in the Record 
        // Under the 'Values' field
        writeRecord(Values, year, country);


    } catch (e) {
        // Send record to error
        error.write(records[i], e);
    }
}
