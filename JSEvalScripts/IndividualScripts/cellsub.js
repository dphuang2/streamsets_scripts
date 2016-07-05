function writeRecord(Values, country){
    for(key in Values){
        var value = Values[key];
        // value : cellsub
        // key   : year
        record = records[i] //Make new variable just called for easier reading
            // Note: this is a pass by reference so a new record is not created
            record.value = { 
                '${ID}' : 'cellsub',
                '${CT}' : country,
                '${DT}' : key,
                '${VL}' : value,
            };
        output.write(record);
        // what is written to the record is what it outputs
    }
}

for(var i = 0; i < records.length; i++) {
    try {

        records[i].value.Values = {};
        var country  = records[i].value['country'];
        for(key in records[i].value){
            var value = records[i].value[key];
            if(value != "" && key > 1950){
                records[i].value['Values'][key] = value;
            }
        }
        // output.write(records[i]);

        var Values = records[i].value['Values'];
        writeRecord(Values, country);

    } catch (e) {
        // Send record to error
        error.write(records[i], e);
    }
}
