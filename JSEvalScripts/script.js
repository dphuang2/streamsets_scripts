function outputRecord(record, indicator, country, date, value){
    record.value = { 
        '${ID}' : indicator,
        '${CT}' : country,
        '${DT}' : parseFloat(date),
        '${VL}' : parseFloat(value),
    };
    output.write(record);
}
function ONI(){
    function writeRecords(Values, year, country, cc){
        for(key in Values){
            var value = Values[key];
            // value : Political Score
            // key   : indicator
            var ind;
            switch(key){
                case 'political_score':
                    ind = "ONIp";
                    break;
                case 'social_score':
                    ind = "ONIs";
                    break;
                case 'tools_score':
                    ind = "ONIit";
                    break;
                case 'conflict/security_score':
                    ind = "ONIcs";
                    break;
                case 'transparency':
                    ind = "ONItr";
                    break;
                case 'consistency':
                    ind = "ONIco";
                    break;
            }
            outputRecord(records[i], ind, cc, year, value);
        }
    }

    var cc = records[i].value['country_code'];
    var country = records[i].value['country'];
    var year = records[i].value['testing_date'];
    var Values = {};
    for (key in records[i].value){
        var value = records[i].value[key];
        if(value != 'n/a' && key != 'filename' && key != 'social_description' && key != 'tools_description' && key != 'conflict_security_description' && key != 'political_description' && key != 'country' && key != 'country_code' && key != 'testing_date' && key != 'url'){
            //records[i].value['Values'][key] = value;
            Values[key] = value;
        }
    }
    writeRecords(Values, year, country, cc);

}
function cellsub(){ 
    function writeRecords(Values, country){
        for(key in Values){
            var value = Values[key];
            // value : cellsub
            // key   : year
            outputRecord(records[i],'cellsub',country, key, value);
        }
    } 
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
    writeRecords(Values, country); 
}
function gdp_pop(){ 
    function writeRecords(Values, indicator){
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
            outputRecord(records[i], ind, records[i].value['${CT}'], key, value);
        }
    } 
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
    writeRecords(Values, indicator);
}
function nri1_68(){
    function writeRecords(Values, year, indicator){
        for(key in Values){
            var value = Values[key];
            // value : GDP per capita
            // key   : year
            outputRecord(records[i],'nri'+indicator,key, year, value);
        }
    }
    if(records[i].value['Attribute'] == 'Value'){

        var YR = "Edition"; 
        var indicator = "Placement";

        // Save Country Data
        var indicator = records[i].value[indicator];
        var year = records[i].value[YR];

        records[i].value.Values = {};
        for(key in records[i].value){
            var value = records[i].value[key];
            if(key.length == 3 && value != "" && value != 'n/a'){
                records[i].value['Values'][key] = value;
            }
        }
        //output.write(records[i]);

        // Save the map of values that was originally saved in the Record 
        // Under the 'Values' field
        var Values = records[i].value['Values'];
        writeRecords(Values, year, indicator);

    }
}
function ipr_mf(){
    function writeRecords(Values, year, country){
        for(key in Values){
            var value = Values[key];
            var indicator;

            if(key == 'Male'){
                indicator = 'ipr_m'; 
            } else {
                indicator = 'ipr_f';
            }

            outputRecord(records[i], indicator, country, year, value);
        }
    }
    // Save Country Data
    var year = records[i].value['year'];
    var country = records[i].value['country'];

    var Values = {};
    for(key in records[i].value){
        var value = records[i].value[key];
        if(key != 'filename' && key != 'country' && key != 'year'){
            Values[key] = value;
        }
    }
    // Save the map of values that was originally saved in the Record 
    // Under the 'Values' field
    writeRecords(Values, year, country);
}
function ipr_fixnetsub(){
    function writeRecords(Values, filename){
        var indicator;
        if(filename == 'Fixed_broadband_2000-2014.csv'){
            indicator = 'fixnetsub';
        }
        if(filename == 'Individuals_Internet_2000-2014.csv'){
            indicator = 'ipr';
        }
        for(key in Values){
            var value = Values[key];
            // value : ipr, fixnetsub
            // key   : year
            //
            outputRecord(records[i], records[i].value['${CT}'], key, value);
        }
    }

    records[i].value.Values = {};
    records[i].value['${CT}'] = records[i].value['country']; // 1. Alter this line to the column that identifys the Country
    var filename = records[i].value['filename'];
    for(key in records[i].value){
        var value = records[i].value[key];
        if(value != "" && key > 1950){
            records[i].value['Values'][key] = value;
        }
    }
    var Values = records[i].value['Values'];
    writeRecords(Values, filename);
}
function WebIndexData(){
    function writeRecords(Values){
        for(key in Values){
            var value = Values[key];
            // value : GDP per capita
            // key   : year
            outputRecord(records[i], records[i].value['${ID}'], records[i].value['${CT}'], key, value);
        }
    }
    function findIndicator(i){
        var indicator = "";
        for(key in records[i].value){ // Uses for loop because records are treated as maps (not arrays or lists)
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
                    indicator = "wbtertiaryenrollfm";
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
                    indicator = "fhpolitical";
                    break;
            }
            return indicator;
        }
    }
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
    writeRecords(Values); // will write errors when there are no values in the Values map (ie. '..' and '')
}
function WebIndexSurvey(){
    function writeRecords(Values, country){
        var regex1 = new RegExp("[A-Z]{2,3}");
        var regex2 = new RegExp("[0-9]{4}");
        var regex3 = new RegExp("[A-Z][0-9]+");
        for(key in Values){
            var value = Values[key];
            // value : survey score
            var year = regex2.exec(key); // grab year from key
            var indicator = regex1.exec(key) + regex3.exec(key); // grab correct format of indicator from key
            outputRecord(records[i], indicator.toLowerCase(), year, value);
        }
    } 
    var country = records[i].value['Country'];
    var Values = {};
    for (key in records[i].value){
        var value = records[i].value[key];
        if(key != 'Country' && key != 'filename'){
            Values[key] = value;
        }
    }
    writeRecords(Values, country);
}
function WebIndexScores(){
    function writeRecords(Values, Countries){
        var regex = new RegExp(".+?(?=-)");
        for(key in Values){
            var value = Values[key];
            var country = Countries[key];
            var indicator;
            switch(key){
                case 'Universal Access':
                    indicator = 'wiuniversalaccess';
                    break;
                case 'Freedom & Openness':
                    indicator = 'wifreedom';
                    break;
                case 'Relevant content':
                    indicator = 'wirelevantcontent';
                    break;
                case 'Empowerment':
                    indicator = 'wiempowerment';
                    break;
                case 'Communications Infrastructure':
                    indicator = 'wiinfrastructure';
                    break;
                case 'Access & Affordability':
                    indicator = 'wiaccess';
                    break;
                case 'Education and Awareness':
                    indicator = 'wieducation';
                    break;
                case 'Free & Open':
                    indicator = 'wifreeopen';
                    break;
                case 'Content & use':
                    indicator = 'wicontent';
                    break;
                case 'Economic':
                    indicator = 'wieconomic';
                    break;
                case 'Political':
                    indicator = 'wipolitical';
                    break;
                case 'Social and Environmental':
                    indicator = 'wisocial';
                    break;
                case 'Overall score':
                    indicator = 'wiscore';
                    break;
                case 'Overall rank':
                    indicator = 'wirank';
                    break;
            }
            // value : country scores
            outputRecord(records[i], indicator, country, 2014, value);
        }
    } 
    var regex = new RegExp(".+?(?=-)");
    var Countries = {}; // Key is indicator and value is country
    var Values = {};
    for(key in records[i].value){
        var value = records[i].value[key];
        if(key != 'filename'){
            if(regex.test(key)){
                var indicator = regex.exec(key);
                Countries[indicator] = value;
            } else {
                Values[key] = value;
            }
        }
    }
    writeRecords(Values, Countries);
}
function hhnet(){
    var record = records[i];
    var value = record.value['value'];
    var date = record.value['date'];
    var country = record.value['country'];
    if(value != ""){
        outputRecord(record, 'hhnet', country, date, value);
    }
}
// ____________________________________________________
// This code runs the logic for which script to run
for(var i = 0; i < records.length; i++) {
    var fn = records[i].value['filename'];
    var regex = new RegExp("([A-Z]{2})[A-Z]?[^A-Z][A-Z].csv");
    try {
        switch(true){
            case (fn == 'Mobile_cellular_2000-2014.csv'):
                cellsub();
                break;
            case (fn == 'oni_country_data_2013-09-20.csv'):
                ONI();
                break;
            case (fn == 'API_NY.GDP.PCAP.CD_DS2_en_csv_v2.csv' || fn == 'API_NY.GDP.PCAP.PP.CD_DS2_en_csv_v2.csv' || fn == 'API_SP.POP.TOTL_DS2_en_csv_v2.csv'):
                gdp_pop();
                break;
            case (fn == 'WEF_NRI_2012-2015_Historical_Dataset.csv'):
                nri1_68();
                break;
            case (fn == 'Gender_2010-2014.csv'):
                ipr_mf();
                break;
            case (fn == 'Individuals_Internet_2000-2014.csv' || fn == 'Fixed_broadband_2000-2014.csv'):
                ipr_fixnetsub();
                break;
            case (regex.test(fn)):
                WebIndexData();
                break;
            case (fn == 'Survey Scores Primary Raw Data.csv'):
                WebIndexSurvey();
                break;
            case (fn == 'RanksScores.csv'):
                WebIndexScores();
                break;
            case (fn == 'CoreHouseholdIndicator.csv'):
                hhnet();
                break;
        }
    } catch (e) {
        // Send record to error
        error.write(records[i], e);
    }
}
