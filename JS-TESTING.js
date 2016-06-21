function writeRecordHeaderIsKey(Values, year, country, cc){
    for(key in Values){
        var value = Values[key];
        // value : Political Score
        // key   : indicator
        record = records[i] //Make new variable just called for easier reading
            // Note: this is a pass by reference so a new record is not created

            record.value = { 
                '${ID}' : key,
                '${CT}' : cc,
                '${DT}' : year,
                '${VL}' : value,
            };
        output.write(record);
        // what is written to the record is what it outputs
    }
}

for(var i = 0; i < records.length; i++) {
    try {
        var CC = "country_code"; // 1. Replace with Country Code Header
        var CT = "country"; // 2. Replace with Country Name Header
        var YR = "testing_date"; // 3. Replace with Year Header (If needed)
        var AvoidArray = [CC, CT, YR];

        // Save Country Data
        var cc = records[i].value['CC'];
        var country = records[i].value['CT'];
        var year = records[i].value['YR'];

        var Values = {}; // Make Values Hash to store Values

        for(key in records[i].value){
            var value = records[i].value[key];
            if(key != CC && key != CT && key != YR){
                Values[key] = value;
            }
        }
        // output.write(records[i]);

        // Save the map of values that was originally saved in the Record 
        // Under the 'Values' field
        writeRecordHeaderIsKey(Values, year, country, cc);

    } catch (e) {
        // Send record to error
        error.write(records[i], e);
    }
}
