function writeRecord(Values){
    for(key in Values){
        var value = Values[key];
        // value : GDP per capita
        // key   : year
        record = records[i] //Make new variable just called for easier reading
            // Note: this is a pass by reference so a new record is not created
            record.value = { 
                '${ID}' : records[i].value['${ID}'],
                '${CT}' : records[i].value['${CT}'],
                '${DT}' : key,
                '${VL}' : value,
            };
        output.write(record);
        // what is written to the record is what it outputs
    }
}

function findIndicator(i){
    var indicator = "";
    for(key in records[i].value){
        switch(key){
            case "WB H school life expectancy female/male": // WB H.csv
                records[i].value["${CT}"] = records[i].value["WB H school life expectancy female/male"];
                indicator = "wbschoollifeexpfm";
                break;
            case "Freedom House - Freedom of the press": 
                records[i].value["${CT}"] = records[i].value["Freedom House - Freedom of the press"];
                indicator = "fhpress";
                break;
            case "Secondary enrolment rates (gross)": // WB D.csv
                records[i].value["${CT}"] = records[i].value["Secondary enrolment rates (gross)"];
                indicator = "secondenroll";
                break;
            case "tertiary enrolment rates (gross) female/male": // WB C.csv
                records[i].value["${CT}"] = records[i].value["tertiary enrolment rates (gross) female/male"];
                indicator = " wbtertiaryenrollfm";
                break;
            case "Secure Internet Servers per million population": // WB A.csv
                records[i].value["${CT}"] = records[i].value["Secure Internet Servers per million population"];
                indicator = "secservpermillion";
                break;
            case "E-participation index": // UN D.csv
                records[i].value["${CT}"] = records[i].value["E-participation index"];
                indicator = "wieparticipation";
                break;
            case "Government online services index": // UN C.csv
                records[i].value["${CT}"] = records[i].value["Government online services index"];
                indicator = "wigos";
                break;
            case "Press Freedom Index": // RSF A.csv
                records[i].value["${CT}"] = records[i].value["Press Freedom Index"];
                indicator = "pressfreedom";
                break;
            case "IXPs (if have IXPs=1; if not=0)": // PCH A.csv
                records[i].value["${CT}"] = records[i].value["IXPs (if have IXPs=1; if not=0)"];
                indicator = "ixp";
                break;
            case "Mobile broadband monthly subscription per GDPC": // ITU S.csv
                records[i].value["${CT}"] = records[i].value["Mobile broadband monthly subscription per GDPC"];
                indicator = "mbbmonthsubpergdpc";
                break;
            case "Freedom House - Freedom of the press": // FH C.csv
                records[i].value["${CT}"] = records[i].value["Freedom House - Freedom of the press"];
                indicator = "fhpress";
                break;
            case "Freedom House - Civil Rights": // FH B.csv
                records[i].value["${CT}"] = records[i].value["Freedom House - Civil Rights"];
                indicator = "fhcivil";
                break;
            case "Freedom House - Political Rights": // FH A.csv
                records[i].value["${CT}"] = records[i].value["Freedom House - Political Rights"];
                indicator = "fhcivil";
                break;
        }
        return indicator;
    }
}

for(var i = 0; i < records.length; i++) {
    try {
        var indicator = "";
        indicator = findIndicator(i);
        records[i].value["${ID}"] = indicator;

        records[i].value.Values = {};
        for (key in records[i].value){
                var value = records[i].value[key];
                if(key > 2000 && value != '..' && value != ""){
                        records[i].value['Values'][key] = value;
                }
        }
        
        var Values = records[i].value['Values'];
        writeRecord(Values);

        output.write(records[i]);
    } catch (e) {
        // Send record to error
        error.write(records[i], e);
    }
}
