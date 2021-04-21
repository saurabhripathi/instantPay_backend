const _  = require('lodash');
let EXP_BIZ_DATA = {};
function getSiccode(params) {
    let sic = params;
    let flag = -1;
    let siccode = '';
    for (let i = 0; i < sic.length; i++) {
        if (sic.charAt(i) == '(') {
            flag = i;
            break;
        }
    }
    if (flag == -1) {
        flag = 0;
    }
    else {
        flag++;
    }
    while (sic.charAt(flag) != ')' && flag < sic.length) {
        siccode = siccode +sic.charAt(flag);
        flag++;
    }
    if (siccode == 0) {
        return sic;
    }
    else {
        return siccode.toString();
    }
}
 const setExpBizData = (expData) => {
    if(expData && expData.data && expData.data.net_connect_response && expData.data.net_connect_response.products && expData.data.net_connect_response.products.intelliscore.key_model_elements&&expData.data.net_connect_response.products.intelliscore.business_name_and_address) {
        let data = expData.data.net_connect_response.products.intelliscore.key_model_elements;
        let data1= expData.data.net_connect_response.products.intelliscore.executive_elements?expData.data.net_connect_response.products.intelliscore.executive_elements:'';
        let data2= expData.data.net_connect_response.products.intelliscore.business_name_and_address;

        EXP_BIZ_DATA['ebnobankruptcy']      = String(Number(data.bankruptcy_lines));
        EXP_BIZ_DATA['eblegalitems']        = Number(data.legal_amount_total) > 0 ? 'Y' : 'N';
        EXP_BIZ_DATA['ebnojudgements']      = String(Number(data.judgment_lines));
        EXP_BIZ_DATA['ebnotaxliens']        = String(Number(data.tax_liens_lines));
        EXP_BIZ_DATA['ebnocollectionaccts'] = String(Number(data.collection_lines));
        EXP_BIZ_DATA['ebnoderuccfilings']   = data1?String(Number(data1.ucc_derogatory_count)):'';
        EXP_BIZ_DATA['city']   = data2?data2.city:'';
        EXP_BIZ_DATA['state']   = data2?data2.state:'';
        EXP_BIZ_DATA['zip']   = data2?data2.zip:'';

       


        


        
    }
}
const fetchAdditionalData=(business,owners)=>{
    let obj={};
    obj['appZipCode']  = _.get(business, 'registered_address.us_street_address.zip_code', "");
    obj['appState']  = _.get(business, 'registered_address.us_street_address.state', "");
    obj['appCity']  = _.get(business, 'registered_address.us_street_address.city', "");
    obj['appSicCode1']= getSiccode(_.get(business, "industries[0].name", ""));
    obj['appSicCode2']= getSiccode(_.get(business, "industries[1].name", ""));
    obj['appSicCode3']= getSiccode(_.get(business, "industries[2].name", ""));
    obj['ownerDOB1']= getSiccode(_.get(owners[0], "date_of_birth", ""));
    obj['ownerDOB2']= getSiccode(_.get(owners[1], "date_of_birth", ""));
    obj['ownerDOB3']= getSiccode(_.get(owners[2], "date_of_birth", ""));
    obj['ownerDOB4']= getSiccode(_.get(owners[3], "date_of_birth", ""));
    obj['expBizCity']= _.get( EXP_BIZ_DATA ,'city', "");
    obj['expBizState']= _.get( EXP_BIZ_DATA ,'state', "");
    obj['expBizZip']= _.get( EXP_BIZ_DATA ,'zip', "");
    obj['expBizSicCode']= _.get( EXP_BIZ_DATA ,'sic.code', "");

    console.log(obj);
}
setExpBizData({
    "status": "success",
    "code": 200,
    "data": {
        "net_connect_response": {
            "xmlns": "http://www.experian.com/NetConnectResponse",
            "completion_code": "0000",
            "transaction_id": "111401358",
            "products": {
                "xmlns": "http://www.experian.com/ARFResponse",
                "intelliscore": {
                    "input_summary": {
                        "subscriber_number": "300137",
                        "inquiry_transaction_number": "C701317323",
                        "cpu_version": "CPU006",
                        "inquiry": "NARQ/LOYOLA UNIVERSITY MEDICAL CENTER;CA-2160 S 1ST AVE  105-0914/MAYWOOD IL 60153/IR/BP/V-BIS077"
                    },
                    "business_name_and_address": {
                        "experian_file_number": "759162456",
                        "profile_type": {
                            "code": "SCORE     "
                        },
                        "profile_date": "20200824",
                        "profile_time": "07:30:09",
                        "terminal_number": "-ADQ",
                        "file_establish_date": "19770100",
                        "file_establish_flag": {
                            "code": "P",
                            "text": "Business was added prior to Jan 1977"
                        },
                        "business_name": "LOYOLA UNIVERSITY MEDICAL CENTER",
                        "street_address": "2160 S 1ST AVE  105-0914",
                        "city": "MAYWOOD",
                        "state": "IL",
                        "zip": "60153",
                        "zip_extension": "3328",
                        "phone_number": "708-216-8537",
                        "sic": {
                            "code": "8221",
                            "text": "COLLEGES, UNIVERSITIES & PROF SCHOOLS"
                        }
                    },
                    "executive_elements": {
                        "bankruptcy_count": "000",
                        "tax_lien_count": "002",
                        "earliest_tax_lien_date": "20180723",
                        "most_recent_tax_lien_date": "20190223",
                        "judgment_count": "011",
                        "earliest_judgment_date": "20131104",
                        "most_recent_judgment_date": "20180206",
                        "collection_count": "013",
                        "legal_balance": "01007029",
                        "ucc_filings": "040",
                        "ucc_derogatory_count": "027",
                        "current_account_balance": "00795400",
                        "current_tradeline_count": "027",
                        "monthly_average_dbt": "006",
                        "highest_dbt6_months": "017",
                        "highest_dbt5_quarters": "008",
                        "active_tradeline_count": "026",
                        "all_tradeline_balance": "01092000",
                        "all_tradeline_count": "054",
                        "average_balance5_quarters": "00426640",
                        "single_line_high_credit": "01080200",
                        "low_balance6_months": "00313700",
                        "high_balance6_months": "00553200",
                        "earliest_collection_date": "20140900",
                        "most_recent_collection_date": "20180200",
                        "current_dbt": "017",
                        "yearof_incorporation": "20140722",
                        "tax_id": "237298283",
                        "tax_lien_flag": "Y"
                    },
                    "executive_summary": {
                        "business_dbt": {
                            "code": "017"
                        },
                        "predicted_dbt": "016",
                        "predicted_dbt_date": "20200716",
                        "industry_dbt": "004",
                        "all_industry_dbt": "003",
                        "lowest_total_account_balance": {
                            "modifier": {
                                "code": " "
                            },
                            "amount": "00313700"
                        },
                        "highest_total_account_balance": {
                            "modifier": {
                                "code": " "
                            },
                            "amount": "00553200"
                        },
                        "current_total_account_balance": {
                            "modifier": {
                                "code": " "
                            },
                            "amount": "00512100"
                        },
                        "high_credit_amount_extended": "00919900",
                        "median_credit_amount_extended": "00019550",
                        "industry_payment_comparison": {
                            "code": "S",
                            "text": "the same as"
                        },
                        "payment_trend_indicator": {
                            "code": "N",
                            "text": "No Trend Identifiable"
                        },
                        "industry_description": "PROFESSIONAL ORGS",
                        "common_terms": "NET 30",
                        "common_terms2": "CONTRCT",
                        "common_terms3": "CREDIT"
                    },
                    "collection_data": [
                        {
                            "account_status": {
                                "code": "03",
                                "text": "Paid in Full"
                            },
                            "date_placed_for_collection": "20170600",
                            "date_closed": "20171100",
                            "amount_placed_for_collection": "00000344",
                            "amount_paid": "00000410",
                            "collection_agency_info": {
                                "agency_name": "A.G. ADJUSTMENTS LTD",
                                "phone_number": "6314258800"
                            }
                        },
                        {
                            "account_status": {
                                "code": "03",
                                "text": "Paid in Full"
                            },
                            "date_placed_for_collection": "20171200",
                            "date_closed": "20180200",
                            "amount_placed_for_collection": "00000373",
                            "amount_paid": "00000444",
                            "collection_agency_info": {
                                "agency_name": "A.G. ADJUSTMENTS LTD",
                                "phone_number": "6314258800"
                            }
                        },
                        {
                            "account_status": {
                                "code": "05",
                                "text": "Closed, Partial Payment"
                            },
                            "date_placed_for_collection": "20180200",
                            "date_closed": "20180300",
                            "amount_placed_for_collection": "00000342",
                            "amount_paid": "00000322",
                            "collection_agency_info": {
                                "agency_name": "A.G. ADJUSTMENTS LTD",
                                "phone_number": "6314258800"
                            }
                        },
                        {
                            "account_status": {
                                "code": "09",
                                "text": "Closed, Creditors Request"
                            },
                            "date_placed_for_collection": "20180200",
                            "date_closed": "20180600",
                            "amount_placed_for_collection": "00000946",
                            "amount_paid": "00000000",
                            "collection_agency_info": {
                                "agency_name": "A.G. ADJUSTMENTS LTD",
                                "phone_number": "6314258800"
                            }
                        },
                        {
                            "account_status": {
                                "code": "00",
                                "text": "Open Account"
                            },
                            "date_placed_for_collection": "20161000",
                            "date_closed": "00000000",
                            "amount_placed_for_collection": "00000088",
                            "amount_paid": "00000000",
                            "collection_agency_info": {
                                "agency_name": "G PRICE & STERN",
                                "phone_number": "8005759702"
                            }
                        },
                        {
                            "account_status": {
                                "code": "06",
                                "text": "Uncollected"
                            },
                            "date_placed_for_collection": "20150200",
                            "date_closed": "20150300",
                            "amount_placed_for_collection": "00000076",
                            "amount_paid": "00000000",
                            "collection_agency_info": {
                                "agency_name": "RECEIVABLE MANAGEMENT SERVICES",
                                "phone_number": "4842424000"
                            }
                        },
                        {
                            "account_status": {
                                "code": "03",
                                "text": "Paid in Full"
                            },
                            "date_placed_for_collection": "20160200",
                            "date_closed": "20160400",
                            "amount_placed_for_collection": "00000216",
                            "amount_paid": "00000216",
                            "collection_agency_info": {
                                "agency_name": "RECEIVABLE MANAGEMENT SERVICES",
                                "phone_number": "4842424000"
                            }
                        },
                        {
                            "account_status": {
                                "code": "00",
                                "text": "Open Account"
                            },
                            "date_placed_for_collection": "20140900",
                            "date_closed": "00000000",
                            "amount_placed_for_collection": "00000554",
                            "amount_paid": "00000000",
                            "collection_agency_info": {
                                "agency_name": "RECEIVABLE MANAGEMENT SERVICES",
                                "phone_number": "4842424000"
                            }
                        },
                        {
                            "account_status": {
                                "code": "00",
                                "text": "Open Account"
                            },
                            "date_placed_for_collection": "20171000",
                            "date_closed": "00000000",
                            "amount_placed_for_collection": "00000981",
                            "amount_paid": "00000000",
                            "collection_agency_info": {
                                "agency_name": "US TREASURY",
                                "phone_number": "2028748202"
                            }
                        },
                        {
                            "account_status": {
                                "code": "03",
                                "text": "Paid in Full"
                            },
                            "date_placed_for_collection": "20160400",
                            "date_closed": "00000000",
                            "amount_placed_for_collection": "00001247",
                            "amount_paid": "00001247",
                            "collection_agency_info": {
                                "agency_name": "GC SERVICES",
                                "phone_number": "7132196795"
                            }
                        },
                        {
                            "account_status": {
                                "code": "03",
                                "text": "Paid in Full"
                            },
                            "date_placed_for_collection": "20161200",
                            "date_closed": "00000000",
                            "amount_placed_for_collection": "00000484",
                            "amount_paid": "00000484",
                            "collection_agency_info": {
                                "agency_name": "GC SERVICES",
                                "phone_number": "7132196795"
                            }
                        },
                        {
                            "account_status": {
                                "code": "06",
                                "text": "Uncollected"
                            },
                            "date_placed_for_collection": "20160500",
                            "date_closed": "00000000",
                            "amount_placed_for_collection": "00000553",
                            "amount_paid": "00000000",
                            "collection_agency_info": {
                                "agency_name": "GC SERVICES",
                                "phone_number": "7132196795"
                            }
                        },
                        {
                            "account_status": {
                                "code": "03",
                                "text": "Paid in Full"
                            },
                            "date_placed_for_collection": "20160900",
                            "date_closed": "20161200",
                            "amount_placed_for_collection": "00000151",
                            "amount_paid": "00000151",
                            "collection_agency_info": {
                                "agency_name": "CAINE & WEINER",
                                "phone_number": "8182511718"
                            }
                        }
                    ],
                    "trade_payment_experiences": [
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "ACCT SVCS",
                            "date_reported": "20200300",
                            "date_last_activity": "00000000",
                            "terms": "VARIED",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00919900"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "ACCT SVCS",
                            "date_reported": "20200400",
                            "date_last_activity": "00000000",
                            "terms": "VARIED",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "01080200"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00232700"
                            },
                            "current_percentage": "099",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "001",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "AIR TRANS",
                            "date_reported": "20200400",
                            "date_last_activity": "20200400",
                            "terms": "OTHER",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00123300"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00060900"
                            },
                            "current_percentage": "092",
                            "dbt30": "000",
                            "dbt60": "008",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "AIR TRANS",
                            "date_reported": "20200400",
                            "date_last_activity": "20200400",
                            "terms": "OTHER",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00122800"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00076700"
                            },
                            "current_percentage": "093",
                            "dbt30": "007",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "APPAREL",
                            "date_reported": "20200500",
                            "date_last_activity": "20150400",
                            "terms": "VARIED",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000600"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "CERAMICS",
                            "date_reported": "20200400",
                            "date_last_activity": "00000000",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "COMMUNICTN",
                            "date_reported": "20200400",
                            "date_last_activity": "00000000",
                            "terms": "VARIED",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00045200"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00001000"
                            },
                            "current_percentage": "100",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "DISTRIBUTR",
                            "date_reported": "20200500",
                            "date_last_activity": "20200400",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00054500"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00013400"
                            },
                            "current_percentage": "045",
                            "dbt30": "055",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "DRUGS",
                            "date_reported": "20200500",
                            "date_last_activity": "20200400",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00319200"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00148200"
                            },
                            "current_percentage": "046",
                            "dbt30": "001",
                            "dbt60": "000",
                            "dbt90": "053",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "FINCL SVCS",
                            "date_reported": "20200500",
                            "date_last_activity": "00000000",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "comments": "ACCTCLOSED",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "FINCL SVCS",
                            "date_reported": "20200500",
                            "date_last_activity": "20140700",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00004100"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "comments": "ACCTCLOSED",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "FINCL SVCS",
                            "date_reported": "20200400",
                            "date_last_activity": "00000000",
                            "terms": "REVOLVE",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00001900"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000800"
                            },
                            "current_percentage": "100",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "FOOD DISTR",
                            "date_reported": "20200500",
                            "date_last_activity": "00000000",
                            "terms": "VARIED",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": "+",
                                    "text": "More than amount reported"
                                },
                                "amount": "00100000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00078800"
                            },
                            "current_percentage": "100",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "FOOD DISTR",
                            "date_reported": "20200400",
                            "date_last_activity": "20200400",
                            "terms": "VARIED",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00048700"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00017500"
                            },
                            "current_percentage": "083",
                            "dbt30": "000",
                            "dbt60": "009",
                            "dbt90": "000",
                            "dbt90_plus": "008",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "GIFTWARE",
                            "date_reported": "20200200",
                            "date_last_activity": "00000000",
                            "terms": "VARIED",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000300"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000300"
                            },
                            "current_percentage": "029",
                            "dbt30": "071",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": "Y"
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "HEARING",
                            "date_reported": "20200500",
                            "date_last_activity": "00000000",
                            "terms": "NET 45",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "HEARING",
                            "date_reported": "20200300",
                            "date_last_activity": "20200200",
                            "terms": "VARIED",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "comments": "CUST 13 YR",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "HEARING",
                            "date_reported": "20200200",
                            "date_last_activity": "00000000",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00002000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00001600"
                            },
                            "current_percentage": "100",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "HEARING",
                            "date_reported": "20200500",
                            "date_last_activity": "20160600",
                            "terms": "NET 60",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "comments": "CUST 31 YR",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "INDUS SUPL",
                            "date_reported": "20200400",
                            "date_last_activity": "00000000",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00002200"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00001500"
                            },
                            "current_percentage": "017",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "083",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "MANUFCTRNG",
                            "date_reported": "20200500",
                            "date_last_activity": "00000000",
                            "terms": "CASHADV",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "MED EQUIP",
                            "date_reported": "20200400",
                            "date_last_activity": "20170200",
                            "terms": "OTHER",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000300"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "MED EQUIP",
                            "date_reported": "20200400",
                            "date_last_activity": "00000000",
                            "terms": "NET30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00190300"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00155300"
                            },
                            "current_percentage": "042",
                            "dbt30": "053",
                            "dbt60": "005",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "comments": "CUST 24 YR",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "MED SUPPLY",
                            "date_reported": "20200400",
                            "date_last_activity": "00000000",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00003100"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00001300"
                            },
                            "current_percentage": "011",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "089",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "MED SUPPLY",
                            "date_reported": "20200400",
                            "date_last_activity": "00000000",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00003300"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000200"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "100",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "PACKAGING",
                            "date_reported": "20200500",
                            "date_last_activity": "20191200",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00011500"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00003300"
                            },
                            "current_percentage": "071",
                            "dbt30": "025",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "004",
                            "comments": "CUST 23 YR",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "PACKAGING",
                            "date_reported": "20200500",
                            "date_last_activity": "20200400",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00013500"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00002000"
                            },
                            "current_percentage": "037",
                            "dbt30": "006",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "057",
                            "comments": "CUST 23 YR",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "PERSNLSVCS",
                            "date_reported": "20200400",
                            "date_last_activity": "20170900",
                            "terms": "ROI",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00084600"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "PERSNLSVCS",
                            "date_reported": "20200400",
                            "date_last_activity": "20180400",
                            "terms": "ROI",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00084600"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "PICTFRMMFG",
                            "date_reported": "20200400",
                            "date_last_activity": "20190600",
                            "terms": "VARIED",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "comments": "CUST  3 YR",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "PRNTG&PUBL",
                            "date_reported": "20200500",
                            "date_last_activity": "00000000",
                            "terms": "COD",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "comments": "COD CUSREQ",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "payment_indicator": {
                                "code": " "
                            },
                            "business_category": "TEMP HELP",
                            "date_reported": "20200400",
                            "date_last_activity": "20200400",
                            "terms": "NET 7",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00069400"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000200"
                            },
                            "current_percentage": "100",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "comments": "CUST  3 YR",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        }
                    ],
                    "additional_payment_experiences": [
                        {
                            "business_category": "AUTO RENTL",
                            "date_reported": "20200500",
                            "date_last_activity": "00000000",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00009100"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00006700"
                            },
                            "current_percentage": "100",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "DRUGS",
                            "date_reported": "20191100",
                            "date_last_activity": "00000000",
                            "terms": "VARIOUS",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00182500"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00073700"
                            },
                            "current_percentage": "099",
                            "dbt30": "001",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "ELEC EQUIP",
                            "date_reported": "20170900",
                            "date_last_activity": "20170900",
                            "terms": "CONTRCT",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000900"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000900"
                            },
                            "current_percentage": "100",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "FACTOR",
                            "date_reported": "20180400",
                            "date_last_activity": "00000000",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "FINCL SVCS",
                            "date_reported": "20170900",
                            "date_last_activity": "00000000",
                            "terms": "VARIOUS",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "FRGHT FWRD",
                            "date_reported": "20190400",
                            "date_last_activity": "00000000",
                            "terms": "OTHER",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000700"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000200"
                            },
                            "current_percentage": "100",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "GOVT/CDC",
                            "date_reported": "20190800",
                            "date_last_activity": "00000000",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00099400"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00025200"
                            },
                            "current_percentage": "084",
                            "dbt30": "007",
                            "dbt60": "000",
                            "dbt90": "001",
                            "dbt90_plus": "008",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "GENERAL",
                            "date_reported": "20171000",
                            "date_last_activity": "00000000",
                            "terms": "CONTRCT",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "HEARING",
                            "date_reported": "20181200",
                            "date_last_activity": "20140800",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "HEARING",
                            "date_reported": "20191000",
                            "date_last_activity": "20190600",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00025600"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "comments": "CUST  5 YR",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "HEARING",
                            "date_reported": "20170800",
                            "date_last_activity": "00000000",
                            "terms": "VARIED",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000200"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000200"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "100",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "INDUS MACH",
                            "date_reported": "20181200",
                            "date_last_activity": "00000000",
                            "terms": "ROI",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "LEASING",
                            "date_reported": "20200200",
                            "date_last_activity": "00000000",
                            "terms": "NET 10",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "LEASING",
                            "date_reported": "20200500",
                            "date_last_activity": "00000000",
                            "terms": "CONTRCT",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00229800"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00168500"
                            },
                            "current_percentage": "100",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "MED EQUIP",
                            "date_reported": "20170600",
                            "date_last_activity": "00000000",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000200"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000200"
                            },
                            "current_percentage": "100",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "MED SUPPLY",
                            "date_reported": "20181000",
                            "date_last_activity": "00000000",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000400"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000200"
                            },
                            "current_percentage": "034",
                            "dbt30": "066",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "MED SUPPLY",
                            "date_reported": "20190100",
                            "date_last_activity": "00000000",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00115300"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00009300"
                            },
                            "current_percentage": "100",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "PLUMBING",
                            "date_reported": "20170600",
                            "date_last_activity": "00000000",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "PRNTG&PUBL",
                            "date_reported": "20190600",
                            "date_last_activity": "20190500",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00025600"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00010500"
                            },
                            "current_percentage": "013",
                            "dbt30": "028",
                            "dbt60": "003",
                            "dbt90": "008",
                            "dbt90_plus": "048",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "PRNTG&PUBL",
                            "date_reported": "20181100",
                            "date_last_activity": "20180300",
                            "terms": "OTHER",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": "<"
                                },
                                "amount": "00000100"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "TRANSPORTN",
                            "date_reported": "20180400",
                            "date_last_activity": "00000000",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000000"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        },
                        {
                            "business_category": "WHLSE TRAD",
                            "date_reported": "20190200",
                            "date_last_activity": "00000000",
                            "terms": "NET 30",
                            "recent_high_credit": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00005000"
                            },
                            "account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000700"
                            },
                            "current_percentage": "000",
                            "dbt30": "000",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "100",
                            "trade_line_flag": {
                                "code": " "
                            },
                            "newly_reported_indicator": {
                                "code": " "
                            }
                        }
                    ],
                    "payment_totals": {
                        "newly_reported_trade_lines": {
                            "number_of_lines": "001",
                            "dbt": "011",
                            "total_high_credit_amount": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000300"
                            },
                            "total_account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000300"
                            },
                            "current_percentage": "029",
                            "dbt30": "071",
                            "dbt60": "000",
                            "dbt90": "000",
                            "dbt90_plus": "000"
                        },
                        "continously_reported_trade_lines": {
                            "number_of_lines": "026",
                            "dbt": "017",
                            "total_high_credit_amount": {
                                "modifier": {
                                    "code": "+",
                                    "text": "More than amount reported"
                                },
                                "amount": "01982500"
                            },
                            "total_account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00795400"
                            },
                            "current_percentage": "062",
                            "dbt30": "019",
                            "dbt60": "002",
                            "dbt90": "016",
                            "dbt90_plus": "001"
                        },
                        "combined_trade_lines": {
                            "number_of_lines": "027",
                            "dbt": "017",
                            "total_high_credit_amount": {
                                "modifier": {
                                    "code": "+",
                                    "text": "More than amount reported"
                                },
                                "amount": "01982800"
                            },
                            "total_account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00795700"
                            },
                            "current_percentage": "062",
                            "dbt30": "019",
                            "dbt60": "002",
                            "dbt90": "016",
                            "dbt90_plus": "001"
                        }
                    },
                    "payment_trends": {
                        "current_month": {
                            "date": "20190800",
                            "dbt": "006",
                            "total_account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00389700"
                            },
                            "current_percentage": "071",
                            "dbt30": "026",
                            "dbt60": "002",
                            "dbt90": "000",
                            "dbt90_plus": "001"
                        },
                        "prior_month": [
                            {
                                "date": "20190700",
                                "dbt": "006",
                                "total_account_balance": {
                                    "modifier": {
                                        "code": " "
                                    },
                                    "amount": "00317600"
                                },
                                "current_percentage": "066",
                                "dbt30": "032",
                                "dbt60": "001",
                                "dbt90": "000",
                                "dbt90_plus": "001"
                            },
                            {
                                "date": "20190600",
                                "dbt": "009",
                                "total_account_balance": {
                                    "modifier": {
                                        "code": " "
                                    },
                                    "amount": "00330900"
                                },
                                "current_percentage": "066",
                                "dbt30": "026",
                                "dbt60": "005",
                                "dbt90": "000",
                                "dbt90_plus": "003"
                            },
                            {
                                "date": "20190500",
                                "dbt": "006",
                                "total_account_balance": {
                                    "modifier": {
                                        "code": "+",
                                        "text": "More than amount reported"
                                    },
                                    "amount": "00553200"
                                },
                                "current_percentage": "072",
                                "dbt30": "024",
                                "dbt60": "002",
                                "dbt90": "001",
                                "dbt90_plus": "001"
                            },
                            {
                                "date": "20190400",
                                "dbt": "005",
                                "total_account_balance": {
                                    "modifier": {
                                        "code": "+",
                                        "text": "More than amount reported"
                                    },
                                    "amount": "00551200"
                                },
                                "current_percentage": "084",
                                "dbt30": "011",
                                "dbt60": "003",
                                "dbt90": "000",
                                "dbt90_plus": "002"
                            },
                            {
                                "date": "20190300",
                                "dbt": "005",
                                "total_account_balance": {
                                    "modifier": {
                                        "code": "+",
                                        "text": "More than amount reported"
                                    },
                                    "amount": "00464500"
                                },
                                "current_percentage": "086",
                                "dbt30": "011",
                                "dbt60": "000",
                                "dbt90": "000",
                                "dbt90_plus": "003"
                            }
                        ]
                    },
                    "industry_payment_trends": {
                        "sic": "822",
                        "current_month": {
                            "date": "20190800",
                            "dbt": "008",
                            "total_account_balance": {
                                "modifier": {
                                    "code": " "
                                },
                                "amount": "00000023837"
                            },
                            "current_percentage": "079"
                        },
                        "prior_month": [
                            {
                                "date": "20190700",
                                "dbt": "008",
                                "total_account_balance": {
                                    "modifier": {
                                        "code": " "
                                    },
                                    "amount": "00000024257"
                                },
                                "current_percentage": "079"
                            },
                            {
                                "date": "20190600",
                                "dbt": "009",
                                "total_account_balance": {
                                    "modifier": {
                                        "code": " "
                                    },
                                    "amount": "00000023534"
                                },
                                "current_percentage": "077"
                            },
                            {
                                "date": "20190500",
                                "dbt": "010",
                                "total_account_balance": {
                                    "modifier": {
                                        "code": " "
                                    },
                                    "amount": "00000020316"
                                },
                                "current_percentage": "074"
                            },
                            {
                                "date": "20190400",
                                "dbt": "011",
                                "total_account_balance": {
                                    "modifier": {
                                        "code": " "
                                    },
                                    "amount": "00000022175"
                                },
                                "current_percentage": "074"
                            },
                            {
                                "date": "20190300",
                                "dbt": "010",
                                "total_account_balance": {
                                    "modifier": {
                                        "code": " "
                                    },
                                    "amount": "00000023473"
                                },
                                "current_percentage": "075"
                            }
                        ]
                    },
                    "quarterly_payment_trends": {
                        "most_recent_quarter": {
                            "dbt": "008",
                            "total_account_balance": {
                                "modifier": {
                                    "code": "+",
                                    "text": "More than amount reported"
                                },
                                "amount": "00343700"
                            },
                            "current_percentage": "066",
                            "dbt30": "029",
                            "dbt60": "003",
                            "dbt90": "000",
                            "dbt90_plus": "002",
                            "quarter_within_year": {
                                "code": "3",
                                "text": "Third quarter (Jul, Aug & Sep)"
                            },
                            "year_of_quarter": "20180000"
                        },
                        "prior_quarter": [
                            {
                                "dbt": "006",
                                "total_account_balance": {
                                    "modifier": {
                                        "code": "+",
                                        "text": "More than amount reported"
                                    },
                                    "amount": "00366600"
                                },
                                "current_percentage": "082",
                                "dbt30": "013",
                                "dbt60": "002",
                                "dbt90": "000",
                                "dbt90_plus": "003",
                                "quarter_within_year": {
                                    "code": "2",
                                    "text": "Second quarter (Apr, May & Jun)"
                                },
                                "year_of_quarter": "20180000"
                            },
                            {
                                "dbt": "007",
                                "total_account_balance": {
                                    "modifier": {
                                        "code": "+",
                                        "text": "More than amount reported"
                                    },
                                    "amount": "00539500"
                                },
                                "current_percentage": "077",
                                "dbt30": "014",
                                "dbt60": "007",
                                "dbt90": "001",
                                "dbt90_plus": "001",
                                "quarter_within_year": {
                                    "code": "1",
                                    "text": "First quarter (Jan, Feb & Mar)"
                                },
                                "year_of_quarter": "20180000"
                            },
                            {
                                "dbt": "007",
                                "total_account_balance": {
                                    "modifier": {
                                        "code": "+",
                                        "text": "More than amount reported"
                                    },
                                    "amount": "00464100"
                                },
                                "current_percentage": "080",
                                "dbt30": "014",
                                "dbt60": "003",
                                "dbt90": "000",
                                "dbt90_plus": "003",
                                "quarter_within_year": {
                                    "code": "4",
                                    "text": "Fourth quarter (Oct, Nov & Dec)"
                                },
                                "year_of_quarter": "20170000"
                            },
                            {
                                "dbt": "005",
                                "total_account_balance": {
                                    "modifier": {
                                        "code": " "
                                    },
                                    "amount": "00419300"
                                },
                                "current_percentage": "093",
                                "dbt30": "003",
                                "dbt60": "000",
                                "dbt90": "000",
                                "dbt90_plus": "004",
                                "quarter_within_year": {
                                    "code": "3",
                                    "text": "Third quarter (Jul, Aug & Sep)"
                                },
                                "year_of_quarter": "20170000"
                            }
                        ]
                    },
                    "tax_lien": [
                        {
                            "date_filed": "20190413",
                            "legal_type": {
                                "code": "03",
                                "text": "STATE TAX"
                            },
                            "legal_action": {
                                "code": "07",
                                "text": "RELEASED"
                            },
                            "document_number": "1707210006",
                            "filing_location": "COOK COUNTY RECORDER",
                            "liability_amount": "000469499",
                            "tax_lien_description": {
                                "code": " "
                            }
                        },
                        {
                            "date_filed": "20190223",
                            "legal_type": {
                                "code": "03",
                                "text": "STATE TAX"
                            },
                            "legal_action": {
                                "code": "06",
                                "text": "LIEN"
                            },
                            "document_number": "1702341020",
                            "filing_location": "COOK COUNTY RECORDER",
                            "liability_amount": "000469499",
                            "tax_lien_description": {
                                "code": " "
                            }
                        },
                        {
                            "date_filed": "20180913",
                            "legal_type": {
                                "code": "03",
                                "text": "STATE TAX"
                            },
                            "legal_action": {
                                "code": "07",
                                "text": "RELEASED"
                            },
                            "document_number": "1707210006",
                            "filing_location": "COOK COUNTY RECORDER",
                            "liability_amount": "000469499",
                            "tax_lien_description": {
                                "code": " "
                            }
                        },
                        {
                            "date_filed": "20180723",
                            "legal_type": {
                                "code": "03",
                                "text": "STATE TAX"
                            },
                            "legal_action": {
                                "code": "06",
                                "text": "LIEN"
                            },
                            "document_number": "1702341020",
                            "filing_location": "COOK COUNTY RECORDER",
                            "liability_amount": "000469499",
                            "tax_lien_description": {
                                "code": " "
                            }
                        }
                    ],
                    "judgment_or_attachment_lien": [
                        {
                            "date_filed": "20180206",
                            "legal_type": {
                                "code": "05",
                                "text": "JUDGMENT"
                            },
                            "legal_action": {
                                "code": "01",
                                "text": "FILED"
                            },
                            "document_number": "15M1119847",
                            "filing_location": "CHICAGO MUNICIPAL CO",
                            "liability_amount": "000005798",
                            "plaintiff_name": "HZ CNAC INC"
                        },
                        {
                            "date_filed": "20170706",
                            "legal_type": {
                                "code": "05",
                                "text": "JUDGMENT"
                            },
                            "legal_action": {
                                "code": "01",
                                "text": "FILED"
                            },
                            "document_number": "15M1119847",
                            "filing_location": "CHICAGO MUNICIPAL CO",
                            "liability_amount": "000005798",
                            "plaintiff_name": "HZ CNAC INC"
                        },
                        {
                            "date_filed": "20151026",
                            "legal_type": {
                                "code": "05",
                                "text": "JUDGMENT"
                            },
                            "legal_action": {
                                "code": "01",
                                "text": "FILED"
                            },
                            "document_number": "13M1125895",
                            "filing_location": "CHICAGO MUNICIPAL CO",
                            "liability_amount": "000009498",
                            "plaintiff_name": "GATEWAY FINANCIAL"
                        },
                        {
                            "date_filed": "20150601",
                            "legal_type": {
                                "code": "05",
                                "text": "JUDGMENT"
                            },
                            "legal_action": {
                                "code": "01",
                                "text": "FILED"
                            },
                            "document_number": "13M1108441",
                            "filing_location": "CHICAGO MUNICIPAL CO",
                            "liability_amount": "000007956",
                            "plaintiff_name": "CNAC DOWNERS GROVE"
                        },
                        {
                            "date_filed": "20150326",
                            "legal_type": {
                                "code": "05",
                                "text": "JUDGMENT"
                            },
                            "legal_action": {
                                "code": "01",
                                "text": "FILED"
                            },
                            "document_number": "13M1125895",
                            "filing_location": "CHICAGO MUNICIPAL CO",
                            "liability_amount": "000009498",
                            "plaintiff_name": "GATEWAY FINANCIAL"
                        },
                        {
                            "date_filed": "20141209",
                            "legal_type": {
                                "code": "05",
                                "text": "JUDGMENT"
                            },
                            "legal_action": {
                                "code": "01",
                                "text": "FILED"
                            },
                            "document_number": "12M1145656",
                            "filing_location": "CHICAGO MUNICIPAL CO",
                            "liability_amount": "000001116",
                            "plaintiff_name": "J B ROBINSON JEWEL"
                        },
                        {
                            "date_filed": "20141101",
                            "legal_type": {
                                "code": "05",
                                "text": "JUDGMENT"
                            },
                            "legal_action": {
                                "code": "01",
                                "text": "FILED"
                            },
                            "document_number": "13M1108441",
                            "filing_location": "CHICAGO MUNICIPAL CO",
                            "liability_amount": "000007956",
                            "plaintiff_name": "CNAC DOWNERS GROVE"
                        },
                        {
                            "date_filed": "20140604",
                            "legal_type": {
                                "code": "05",
                                "text": "JUDGMENT"
                            },
                            "legal_action": {
                                "code": "01",
                                "text": "FILED"
                            },
                            "document_number": "12M1116106",
                            "filing_location": "CHICAGO MUNICIPAL CO",
                            "liability_amount": "000007346",
                            "plaintiff_name": "ASPIRE CARD"
                        },
                        {
                            "date_filed": "20140509",
                            "legal_type": {
                                "code": "05",
                                "text": "JUDGMENT"
                            },
                            "legal_action": {
                                "code": "01",
                                "text": "FILED"
                            },
                            "document_number": "12M1145656",
                            "filing_location": "CHICAGO MUNICIPAL CO",
                            "liability_amount": "000001116",
                            "plaintiff_name": "J B ROBINSON JEWEL"
                        },
                        {
                            "date_filed": "20131105",
                            "legal_type": {
                                "code": "05",
                                "text": "JUDGMENT"
                            },
                            "legal_action": {
                                "code": "01",
                                "text": "FILED"
                            },
                            "document_number": "10M1174843",
                            "filing_location": "CHICAGO MUNICIPAL CO",
                            "liability_amount": "000004603",
                            "plaintiff_name": "GREATER CHICAGO FI"
                        },
                        {
                            "date_filed": "20131104",
                            "legal_type": {
                                "code": "05",
                                "text": "JUDGMENT"
                            },
                            "legal_action": {
                                "code": "01",
                                "text": "FILED"
                            },
                            "document_number": "12M1116106",
                            "filing_location": "CHICAGO MUNICIPAL CO",
                            "liability_amount": "000007346",
                            "plaintiff_name": "ASPIRE CARD"
                        }
                    ],
                    "ucc_filings_summary_counts": {
                        "ucc_filings_total": "00100",
                        "most_recent6_months": {
                            "start_date": "20200101",
                            "filings_total": "001",
                            "filings_with_derogatory_collateral": "000",
                            "releases_and_terminations_total": "000",
                            "continuations_total": "000",
                            "amended_and_assigned_total": "000"
                        },
                        "previous6_months": [
                            {
                                "start_date": "20190701",
                                "filings_total": "001",
                                "filings_with_derogatory_collateral": "001",
                                "releases_and_terminations_total": "000",
                                "continuations_total": "000",
                                "amended_and_assigned_total": "000"
                            },
                            {
                                "start_date": "20190101",
                                "filings_total": "002",
                                "filings_with_derogatory_collateral": "001",
                                "releases_and_terminations_total": "000",
                                "continuations_total": "000",
                                "amended_and_assigned_total": "002"
                            },
                            {
                                "start_date": "20180701",
                                "filings_total": "002",
                                "filings_with_derogatory_collateral": "001",
                                "releases_and_terminations_total": "000",
                                "continuations_total": "000",
                                "amended_and_assigned_total": "001"
                            },
                            {
                                "start_date": "20180101",
                                "filings_total": "000",
                                "filings_with_derogatory_collateral": "000",
                                "releases_and_terminations_total": "000",
                                "continuations_total": "000",
                                "amended_and_assigned_total": "000"
                            },
                            {
                                "start_date": "20180101",
                                "filings_total": "034",
                                "filings_with_derogatory_collateral": "024",
                                "releases_and_terminations_total": "012",
                                "continuations_total": "022",
                                "amended_and_assigned_total": "023"
                            }
                        ]
                    },
                    "corporate_information": {
                        "state_of_origin": "IL",
                        "original_filing_date": "00000000",
                        "recent_filing_date": "00000000",
                        "incorporated_date": "20140722",
                        "business_type": {
                            "code": "O",
                            "text": "Other"
                        },
                        "status_flag": {
                            "code": "A",
                            "text": "Active"
                        },
                        "profit_flag": {
                            "code": "P",
                            "text": "Profit"
                        },
                        "charter_number": "2013012300",
                        "dba_name": "LOYOLA UNIVERSITY MEDICAL CENTER, AN ILL",
                        "agent_information": {
                            "name": "C T CORPORATION SYSTEM",
                            "street_address": "150 WEST MARKET STREET",
                            "city": "INDIANAPOLIS",
                            "state": "IN"
                        }
                    },
                    "demographic_information": {
                        "primary_sic_code": "8221",
                        "sic_description": "COLLEGES, UNIVERSITIES & PROF SCHO",
                        "secondary_sic_code": "8060",
                        "secondary_sic_description": "HOSPITALS",
                        "additional_sic_codes": {
                            "sic_code": [
                                "8062",
                                "6061"
                            ]
                        },
                        "years_in_business_indicator": {
                            "code": "1",
                            "text": "Actual Amount Provided"
                        },
                        "years_in_business_or_low_range": "041",
                        "high_range_years": "000",
                        "sales_indicator": {
                            "code": " "
                        },
                        "sales_revenue_or_low_range": "000000000000",
                        "high_range_of_sales": "000000000000",
                        "profit_loss_indicator": {
                            "code": " "
                        },
                        "profit_loss_code": {
                            "code": " "
                        },
                        "profit_amount_or_low_range": "000000000000",
                        "high_range_of_profit": "000000000000",
                        "net_worth_indicator": {
                            "code": " "
                        },
                        "net_worth_amount_or_low_range": {
                            "modifier": {
                                "code": " "
                            },
                            "amount": "00000000000"
                        },
                        "high_range_or_net_worth": {
                            "modifier": {
                                "code": " "
                            },
                            "amount": "00000000000"
                        },
                        "employee_indicator": {
                            "code": " "
                        },
                        "employee_size_or_low_range": "000000000",
                        "high_employee_range": "000000000",
                        "in_building_date": "00000000",
                        "building_size": "0000000",
                        "building_ownership": {
                            "code": " "
                        },
                        "ownership": {
                            "code": " "
                        },
                        "location": {
                            "code": " "
                        },
                        "business_type": {
                            "code": "C",
                            "text": "Corporation"
                        },
                        "customer_count": "0000000",
                        "date_founded": "19790000"
                    },
                    "key_personnel_executive_information": [
                        {
                            "name_flag": {
                                "code": "0",
                                "text": "Name Fielded into First, Middle and Last"
                            },
                            "name": "LARRY M GOLDBERG",
                            "title": {
                                "code": "PRES",
                                "text": "PRESIDENT"
                            }
                        },
                        {
                            "name_flag": {
                                "code": "0",
                                "text": "Name Fielded into First, Middle and Last"
                            },
                            "name": "AJAY S SIAL",
                            "title": {
                                "code": "TREASURER",
                                "text": "TREASURER"
                            }
                        },
                        {
                            "name_flag": {
                                "code": "0",
                                "text": "Name Fielded into First, Middle and Last"
                            },
                            "name": "JILL M RAPPIS",
                            "title": {
                                "code": "SECRETARY",
                                "text": "SECRETARY"
                            }
                        }
                    ],
                    "inquiry": [
                        {
                            "inquiry_business_category": "APPLIANCE",
                            "inquiry_count": [
                                {
                                    "date": "20200500",
                                    "count": "000"
                                },
                                {
                                    "date": "20200400",
                                    "count": "000"
                                },
                                {
                                    "date": "20200300",
                                    "count": "000"
                                },
                                {
                                    "date": "20200200",
                                    "count": "001"
                                },
                                {
                                    "date": "20200100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191200",
                                    "count": "000"
                                },
                                {
                                    "date": "20191100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191000",
                                    "count": "000"
                                },
                                {
                                    "date": "20190900",
                                    "count": "000"
                                }
                            ]
                        },
                        {
                            "inquiry_business_category": "BUREAU",
                            "inquiry_count": [
                                {
                                    "date": "20200500",
                                    "count": "000"
                                },
                                {
                                    "date": "20200400",
                                    "count": "002"
                                },
                                {
                                    "date": "20200300",
                                    "count": "000"
                                },
                                {
                                    "date": "20200200",
                                    "count": "001"
                                },
                                {
                                    "date": "20200100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191200",
                                    "count": "000"
                                },
                                {
                                    "date": "20191100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191000",
                                    "count": "001"
                                },
                                {
                                    "date": "20190900",
                                    "count": "000"
                                }
                            ]
                        },
                        {
                            "inquiry_business_category": "EQUIP LEAS",
                            "inquiry_count": [
                                {
                                    "date": "20200500",
                                    "count": "000"
                                },
                                {
                                    "date": "20200400",
                                    "count": "000"
                                },
                                {
                                    "date": "20200300",
                                    "count": "000"
                                },
                                {
                                    "date": "20200200",
                                    "count": "001"
                                },
                                {
                                    "date": "20200100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191200",
                                    "count": "000"
                                },
                                {
                                    "date": "20191100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191000",
                                    "count": "000"
                                },
                                {
                                    "date": "20190900",
                                    "count": "000"
                                }
                            ]
                        },
                        {
                            "inquiry_business_category": "FINCL SVCS",
                            "inquiry_count": [
                                {
                                    "date": "20200500",
                                    "count": "000"
                                },
                                {
                                    "date": "20200400",
                                    "count": "001"
                                },
                                {
                                    "date": "20200300",
                                    "count": "000"
                                },
                                {
                                    "date": "20200200",
                                    "count": "000"
                                },
                                {
                                    "date": "20200100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191200",
                                    "count": "000"
                                },
                                {
                                    "date": "20191100",
                                    "count": "001"
                                },
                                {
                                    "date": "20191000",
                                    "count": "000"
                                },
                                {
                                    "date": "20190900",
                                    "count": "000"
                                }
                            ]
                        },
                        {
                            "inquiry_business_category": "GENERAL",
                            "inquiry_count": [
                                {
                                    "date": "20200500",
                                    "count": "000"
                                },
                                {
                                    "date": "20200400",
                                    "count": "000"
                                },
                                {
                                    "date": "20200300",
                                    "count": "000"
                                },
                                {
                                    "date": "20200200",
                                    "count": "000"
                                },
                                {
                                    "date": "20200100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191200",
                                    "count": "001"
                                },
                                {
                                    "date": "20191100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191000",
                                    "count": "000"
                                },
                                {
                                    "date": "20190900",
                                    "count": "000"
                                }
                            ]
                        },
                        {
                            "inquiry_business_category": "GIFTWARE",
                            "inquiry_count": [
                                {
                                    "date": "20200500",
                                    "count": "000"
                                },
                                {
                                    "date": "20200400",
                                    "count": "000"
                                },
                                {
                                    "date": "20200300",
                                    "count": "000"
                                },
                                {
                                    "date": "20200200",
                                    "count": "000"
                                },
                                {
                                    "date": "20200100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191200",
                                    "count": "001"
                                },
                                {
                                    "date": "20191100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191000",
                                    "count": "000"
                                },
                                {
                                    "date": "20190900",
                                    "count": "000"
                                }
                            ]
                        },
                        {
                            "inquiry_business_category": "PAINTS",
                            "inquiry_count": [
                                {
                                    "date": "20200500",
                                    "count": "000"
                                },
                                {
                                    "date": "20200400",
                                    "count": "000"
                                },
                                {
                                    "date": "20200300",
                                    "count": "000"
                                },
                                {
                                    "date": "20200200",
                                    "count": "000"
                                },
                                {
                                    "date": "20200100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191200",
                                    "count": "000"
                                },
                                {
                                    "date": "20191100",
                                    "count": "001"
                                },
                                {
                                    "date": "20191000",
                                    "count": "000"
                                },
                                {
                                    "date": "20190900",
                                    "count": "000"
                                }
                            ]
                        },
                        {
                            "inquiry_business_category": "TRANSPORTN",
                            "inquiry_count": [
                                {
                                    "date": "20200500",
                                    "count": "000"
                                },
                                {
                                    "date": "20200400",
                                    "count": "000"
                                },
                                {
                                    "date": "20200300",
                                    "count": "000"
                                },
                                {
                                    "date": "20200200",
                                    "count": "000"
                                },
                                {
                                    "date": "20200100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191200",
                                    "count": "000"
                                },
                                {
                                    "date": "20191100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191000",
                                    "count": "000"
                                },
                                {
                                    "date": "20190900",
                                    "count": "001"
                                }
                            ]
                        },
                        {
                            "inquiry_business_category": "TOTALS",
                            "inquiry_count": [
                                {
                                    "date": "20200500",
                                    "count": "000"
                                },
                                {
                                    "date": "20200400",
                                    "count": "003"
                                },
                                {
                                    "date": "20200300",
                                    "count": "000"
                                },
                                {
                                    "date": "20200200",
                                    "count": "003"
                                },
                                {
                                    "date": "20200100",
                                    "count": "000"
                                },
                                {
                                    "date": "20191200",
                                    "count": "001"
                                },
                                {
                                    "date": "20191100",
                                    "count": "001"
                                },
                                {
                                    "date": "20191000",
                                    "count": "001"
                                },
                                {
                                    "date": "20190900",
                                    "count": "000"
                                }
                            ]
                        }
                    ],
                    "custom_header": [
                        {
                            "code": "H",
                            "text": "THE OBJECTIVE OF THE EXPERIAN INTELLISCORE MODEL IS TO PREDICT"
                        },
                        {
                            "code": "H",
                            "text": "SERIOUSLY DEROGATORY PAYMENT BEHAVIOR.  SCORES RANGE FROM 0 TO"
                        },
                        {
                            "code": "H",
                            "text": "100 WHERE 0 REPRESENTS A HIGH RISK AND 100 REPRESENTS A LOW RISK."
                        }
                    ],
                    "intelliscore_score_information": {
                        "publicly_held_company": {
                            "code": "N"
                        },
                        "limited_profile": {
                            "code": "N"
                        },
                        "filler": "02",
                        "score_info": {
                            "score": "0000001032"
                        },
                        "model_information": {
                            "model_code": "000113",
                            "model_title": "COMMERCIAL ALL-INDUSTRY",
                            "custom_model_code": "02"
                        },
                        "percentile_ranking": "001"
                    },
                    "score_factors": {
                        "score_factor": [
                            {
                                "code": "0043",
                                "text": "PRESENCE OF SLOW-PAYING TRADE LINE(S)"
                            },
                            {
                                "code": "0069",
                                "text": "PRESENCE OF DEROGATORY LEGAL BALANCE"
                            },
                            {
                                "code": "0002",
                                "text": "RISK ASSOCIATED W/ THE COMPANY'S INDUSTRY IS HIGHER THAN AVG"
                            },
                            {
                                "code": "0A03",
                                "text": "LARGE-SIZE BUSINESS INDICATED BY BALANCE ON RECENT TRD LINES"
                            }
                        ]
                    },
                    "key_model_elements": {
                        "days_beyond_terms": "017",
                        "highest_dbt_in_past6_months": "017",
                        "highest_dbt_in_past5_quarters": "008",
                        "monthly_average_dbt": "006",
                        "all_accounts": {
                            "total_active_trade_payment_records": "054",
                            "account_balance": "01092000"
                        },
                        "single_high_credit_amount": "01080200",
                        "median_credit": "00019550",
                        "last5_quarters_average_balance": "00426640",
                        "bankruptcy_lines": "000",
                        "judgment_lines": "011",
                        "tax_liens_lines": "002",
                        "collection_lines": "013",
                        "original_ucc_filings": "040",
                        "legal_amount_total": "001007029",
                        "years_in_file": "043",
                        "sic": {
                            "code": "8221"
                        }
                    },
                    "custom_footer": [
                        {
                            "code": "F",
                            "text": "TERMS:_________________________ CREDIT LIMIT:_________________________"
                        },
                        {
                            "code": "F"
                        },
                        {
                            "code": "F",
                            "text": "COMMENTS:______________________ SIGNATURE:____________________________"
                        }
                    ],
                    "billing_indicator": {
                        "code": "F",
                        "text": "Full Charge"
                    }
                }
            }
        },
        "created_at": "2020-08-24 12:30:10"
    }
})
fetchAdditionalData({
    "_id": "5f4546109d9a391b5130d3c6",
    "business_name": "SCHERING BERLIN INC",
    "business_email": "terence.o.mcleod@us.hsbc.com",
    "tax_id_type": "EIN",
    "tax_id": "030000289",
    "company_registration_date": "1993-10-01T00:00:00.000Z",
    "customer_legal_entity_structure": "CORPORATION",
    "customer_number": "100618046",
    "industries": [
        {
            "name": "(3115)-CORN",
            "percentage": "100"
        }
    ],
    "average_annual_revenue": "9803274.00",
    "business_phone_number": "+(1)-(2939283989)",
    "registered_address": {
        "us_street_address": {
            "country": "US",
            "street_number": "340",
            "street_name": "CHANGEBRIDGE RD",
            "city": "PINE BROOK",
            "state": "NJ"
            
        }
    },
    "correspondence_address": {
        "us_street_address": {
            "country": "US",
            "street_number": "340",
            "street_name": "CHANGEBRIDGE RD",
            "city": "PINE BROOK",
            "state": "NJ",
            "zip_code": "070589714"
        }
    },
    "permanent_address": {
        "us_street_address": {
            "country": "US",
            "street_number": "340",
            "street_name": "CHANGEBRIDGE RD",
            "city": "PINE BROOK",
            "state": "NJ",
            "zip_code": "070589714"
        }
    },
    "site_visit": {
        "staff_performed_site_visit": "NA",
        "last_site_visit_date": "NA",
        "note": "NA"
    },
    "is_lexis_nexis_verified": false,
    "rm_assigned": "KLJLRWL F HWYLZG",
    "rm_cost_center": "111003",
    "rm_region": "NYC Manhattan South",
    "aggregator_reference_number": "202023810062237",
    "customer_segment": "Retail Business Banking",
    "aggregator_source": "DA",
    "profit_indicator": "Profit",
    "rm_phone": "0264138738",
    "rm_email": "terence.o.mcleod@us.hsbc.com",
    "is_client_scc": "N",
    "aml_risk_rating": "Low",
    "aml_last_review_date": "2020-07-29T00:00:00.000Z",
    "is_applicant_convicted": "N",
    "existing_trc_amount": "31000.00",
    "months_in_business": "301",
    "is_open_account_status_active": "Y",
    "qpa_indicator": "N",
    "sw_relationship": "1",
    "oldest_active_account": "1",
    "total_relationship_assets": "50000.00",
    "scu_flag": "N",
    "facility_grade": "3",
    "business_alert_code": "",
    "tot_reldda_30avg": "0",
    "cash_secured": "N",
    "application_signed_date": "08/03/2020",
    "business_return_type": "NA",
    "rm_employee_id": "USGFF165",
    "fraud_checks": {
        "name": "Pass",
        "tax_id": "Pass",
        "phone": "Pass",
        "address": "Pass"
    },
    "is_bank_statement_required": "N",
    "is_app_stp": "Y",
    "app_id": "5f4546109d9a391b533bee42",
    "user_id": "5f4545f4be26cf003a1939df",
    "created_at": "2020-08-25T17:10:40+0000",
    "updated_at": "2020-08-25T17:10:40+0000"
},[
    {
        "_id": "5f4546189d9a391b545b4f52",
        "is_primary": true,
        "owner_type": "Individual",
        "prefix": "Default",
        "first_name": "Darlene",
        "middle_name": "Default",
        "last_name": "Coleman",
        "suffix": "Default",
        "business_name": "NA",
        "tax_id_type": "None",
        "tax_id": "656243768",
        "date_of_birth": "1945-10-10",
        "owner_role": "CHIEF EXECUTIVE OFFICER",
        "customer_legal_entity_structure": "NA",
        "citizenship_country": "US",
        "residential_status": "US CITIZEN",
        "customer_number": "100616843",
        "ownership_percentage": "80",
        "is_lexis_nexis_verified": false,
        "permanent_address": {
            "us_street_address": {
                "country": "US",
                "street_number": "2525",
                "street_name": "W A ST",
                "city": "TORRINGTON",
                "state": "WY",
                "zip_code": "822401943"
            }
        },
        "net_worth": "982389",
        "annual_salary": "87866",
        "personal_cash_and_investments": "239723",
        "years_principal_owned_business": "26",
        "market_sector": "N",
        "significant_alert_code": "",
        "fraud_checks": {
            "name": "Pass",
            "tax_id": "Pass",
            "phone": "Not Selected",
            "address": "Pass"
        },
        "level": 1,
        "app_id": "5f4546109d9a391b533bee42",
        "user_id": "5f4545f4be26cf003a1939df",
        "parent_id": "0",
        "consent": "received",
        "created_at": "2020-08-25T17:10:48+0000",
        "updated_at": "2020-08-25T17:11:50+0000",
        "experian_fico_score": 816,
        "experian_first_name": "DARLENE",
        "experian_last_name": "COLEMAN"
    }
])