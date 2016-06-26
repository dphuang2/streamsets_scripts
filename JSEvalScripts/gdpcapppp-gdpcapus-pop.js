function writeRecord(Values, indicator){
    var ind;
    switch (indicator){
        case 'GDP per capita (current US$)':
            ind = 'gdpcapus';
            break;
        case 'GDP per capita, PPP (current international $)':
            ind = 'gdpcapppp';
            break;
        case 'Population, total':
            ind = 'pop';
            break; 
    }
    for(key in Values){
        var value = Values[key];
        // value : gdpcapppp, gdpcapus, or pop
        // key   : year
        record = records[i] //Make new variable just called for easier reading
            // Note: this is a pass by reference so a new record is not created
            record.value = { 
                '${ID}' : ind,
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

        var indicator = records[i].value['Indicator Name'];
        records[i].value.Values = {};
        records[i].value['${CT}'] = records[i].value['Country Code'];
        records[i].value['test'] = indicator;
        for(key in records[i].value){
            var value = records[i].value[key];
            if(value != "" && key > 1950){
                records[i].value['Values'][key] = value;
            }
        }
        // output.write(records[i]);

        var Values = records[i].value['Values'];
        writeRecord(Values, indicator);

    } catch (e) {
        // Send record to error
        error.write(records[i], e);
    }
}
