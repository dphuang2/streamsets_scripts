function findIndicator(i){
    var indicator = "";
    for(key in records[i].value){
        switch(key){
            case "WB H school life expectancy female/male": // WB H.csv
                indicator = "wbschoollifeexpfm";
                break;
            case "Freedom House - Freedom of the press": 
                indicator = "fhpress";
                break;
            case "Secondary enrolment rates (gross)": // WB D.csv
                indicator = "secondenroll";
                break;
            case "tertiary enrolment rates (gross) female/male": // WB C.csv
                indicator = " wbtertiaryenrollfm";
                break;
            case "Secure Internet Servers per million population": // WB A.csv
                indicator = "secservpermillion";
                break;
            case "E-participation index": // UN D.csv
                indicator = "wieparticipation";
                break;
            case "Government online services index": // UN C.csv
                indicator = "wigos";
                break;
            case "Press Freedom Index": // RSF A.csv
                indicator = "pressfreedom";
                break;
            case "IXPs (if have IXPs=1; if not=0)": // PCH A.csv
                indicator = "ixp";
                break;
            case "Mobile broadband monthly subscription per GDPC": // ITU S.csv
                indicator = "mbbmonthsubpergdpc";
                break;
            case "Freedom House - Freedom of the press": // FH C.csv
                indicator = "fhpress";
                break;
            case "Freedom House - Civil Rights": // FH B.csv
                indicator = "fhcivil";
                break;
            case "Freedom House - Political Rights": // FH A.csv
                indicator = "fhcivil";
                break;
        }
        return indicator;
    }

    for(var i = 0; i < records.length; i++) {
        try {
            var indicator = "";
            indicator = findIndicator(i);


        }
        output.write(records[i]);
    } catch (e) {
        // Send record to error
        error.write(records[i], e);
    }
}
