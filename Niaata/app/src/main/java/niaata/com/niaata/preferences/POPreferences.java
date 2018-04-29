package niaata.com.niaata.preferences;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import static niaata.com.niaata.constants.IPOConstants.BASE_URL;


/**
 * Created by Meenakshi on 6/7/2016.
 */
public class POPreferences {

    public static final String KEY = "po_max_preferences.prefs";
    private static final String URL = "url";

    private static final String TOKEN = "token";

    private static final String USERNAME = "username";

    private static final String PIN = "pin";

    private static final String LogoutFLag = "logoutflag";

    private static final String GETPIN = "getpin";

    private static final String FirstTimeLOGIN = "firsttimelogin";
    private static final String PASSWORD = "password";
    private static final String CUSTOMER_ID = "customer_id";

    private static final String TIME_LIMIT = "idealtime";



    private static final String UTEN = "uten";
    private static final String PROFILE = "profile";
    private static final String EMAIL = "email";
    private static final String USER_IMAGE = "user_image";
    private static final String ADMIN = "admin";
    private static final String COMPANY_ID = "company_id";
    private static final String COMPANY_TEXT = "company_text";
    private static final String COMPANY_LIST = "company_list";
    private static final String PROCESS_ID = "projectprocess_id";
    private static final String PROCESS_TEXT = "projectprocess_text";
    private static final String ZeroPROCESS_ID = "zeroprocessid";
    private static final String ZeroPROCESS_TEXT = "zeroprocesstext";
    private static final String PROJECTTYPE_LIST = "projectprocesstype_list";

    private static final String ReqPROCESS_ID = "Reqprocess_id";
    private static final String ReqPROCESS_TEXT = "Reqprocess_text";
    private static final String ZeroReqPROCESS_ID = "zeroprid";
    private static final String ZeroReqPROCESS_TEXT = "zeroprtext";
    private static final String ReqPROJECTTYPE_LIST = "Reqprocesstype_list";
    private static final String FROM_DATE= "fromdate";
    private static final String TO_DATE= "todate";
    private static final String FFROM_DATE= "Ffromdate";
    private static final String FTO_DATE= "Ftodate";
    private static final String VIEW_TYPE = "view_type";
//    private static final String PROJECT_FORM_TYPE = "project_form_type";
    private static final String PROJECT_IDS = "project_ids";
    private static final String PROJECT_CHART_BY_ATTRIBUTES_YEARLY_SUMMARY_LABEL = "project_chart_by_attributes_yearly_summaryLabel";
    private static final String PROJECT_CHART_BY_ATTRIBUTES_YEARLY_SUMMARY_VALUE = "project_chart_by_attributes_yearly_summaryValue";
    private static final String PROJECT_CHART_BY_ATTRIBUTES_YEARLY_SERIES_VALUE = "project_chart_by_attributes_yearly_seriesValue";
    private static final String PROJECT_CHART_BY_ATTRIBUTES_CUMULATIVE_SUMMARY_LABEL = "project_chart_by_attributes_cumulative_summaryLabel";
    private static final String PROJECT_CHART_BY_ATTRIBUTES_CUMULATIVE_SUMMARY_VALUE = "project_chart_by_attributes_cumulative_summaryValue";
    private static final String PROJECT_CHART_BY_ATTRIBUTES_CUMULATIVE_SERIES_VALUE = "project_chart_by_attributes_cumulative_seriesValue";
    private static final String PROJECT_PIPELINE_SUMMARY_LABEL = "project_pipeline_summaryLabel";
    private static final String PROJECT_PIPELINE_SUMMARY_VALUE = "project_pipeline_summaryValue";
    private static final String RESOURCE_ANALYSIS_EFFORT_TYPE = "resource_analysis_effort_type";
    private static final String RESOURCE_ANALYSIS_EFFORT_UNIT = "resource_analysis_effort_unit";
    private static final String RESOURCE_ANALYSIS_GROUP_BY = "resource_analysis_group_by";
    private static final String PROJECT_ANALYSIS_BY_STATUS_SHOW_BAR = "project_analysis_by_status_show_bar";
    private static final String RESOURCE_CHART_XAXIS_VALUE = "resource_chart_xaxis_value";
    private static final String RESOURCE_CHART_YAXIS_VALUE = "resource_chart_yaxis_value";


    public static void setUrl(Context context, String url) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(URL, url);
            editor.commit();
        }
    }

    public static String getUrl(Context context) {
        String url = BASE_URL;
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            url = savedSession.getString(URL, BASE_URL);
        }
        return url;
    }

    public static void setToken(Context context, String token) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(TOKEN, token);
            editor.commit();
        }
    }

    public static String getToken(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(TOKEN, "");
        }
        return "";
    }

    public static void setProfile(Context context, String profile) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(PROFILE, profile);
            editor.commit();
        }
    }

    public static String getProfile(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(PROFILE, "");
        }
        return "";
    }

    public static void setEmail(Context context, String email) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(EMAIL, email);
            editor.commit();
        }
    }

    public static String getEmail(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(EMAIL, "");
        }
        return "";
    }

    public static void setUserImage(Context context, String userimage) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(USER_IMAGE, userimage);
            editor.commit();
        }

    }

    public static String getUserImage(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(USER_IMAGE, "");
        }
        return "";
    }

    public static void setUsername(Context context, String username) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(USERNAME, username);
            editor.commit();
        }
    }

    public static String getUsername(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(USERNAME, "");
        }
        return "";
    }

    public static void setLoginPIN(Context context, String pin) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(PIN, pin);
            editor.commit();
        }
    }

    public static String getLoginPIN(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(PIN, "");
        }
        return "";
    }

    public static void setLogoutflag(Context context, String flag) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(LogoutFLag, flag);
            editor.commit();
        }
    }

    public static String getLogoutlfag(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(LogoutFLag, "");
        }
        return "";
    }
    public static void setpin(Context context, String flag) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(GETPIN, flag);
            editor.commit();
        }
    }
    public static String getpin(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(GETPIN, "");
        }
        return "";
    }
    public static void setfirsttimelogin(Context context, String flag) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(FirstTimeLOGIN, flag);
            editor.commit();
        }
    }

    public static String getfirsttimelogin(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(FirstTimeLOGIN, "");
        }
        return "";
    }
    public static void setPassword(Context context, String password) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(PASSWORD, password);
            editor.commit();
        }
    }

    public static String getPassword(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(PASSWORD, null);
        }
        return "";
    }

    public static void setCustomerId(Context context, int customerId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putInt(CUSTOMER_ID, customerId);
            editor.commit();
        }
    }

    public static int getCustomerId(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getInt(CUSTOMER_ID, 0);
        }
        return 0;
    }


    public static void settimelimit(Context context, int timelimit) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putInt(TIME_LIMIT, timelimit);
            editor.commit();
        }
    }

    public static int gettimelimit(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getInt(TIME_LIMIT, 0);
        }
        return 0;
    }

    public static void setUten(Context context, String token) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(UTEN, token);
            editor.commit();
        }
    }

    public static String getUten(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(UTEN, "40707154155540");
        }
        return "40707154155540";
    }

    public static void setAdmin(Context context, boolean isAdmin) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putBoolean(ADMIN, isAdmin);
            editor.commit();
        }
    }

    public static Boolean isAdmin(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getBoolean(ADMIN, true);
        }
        return true;
    }
    public static void setFromdate(Context context, String companyId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(FROM_DATE, companyId);
            editor.commit();
        }
    }
    public static String getFromDate(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(FROM_DATE, "");
        }
        return "";
    }
    public static void setTOdate(Context context, String companyId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(TO_DATE, companyId);
            editor.commit();
        }
    }
    public static String getToDate(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(TO_DATE, "");
        }
        return "";
    }
    public static void setFinishFromdate(Context context, String companyId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(FFROM_DATE, companyId);
            editor.commit();
        }
    }
    public static String getFinishmDate(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(FFROM_DATE, "");
        }
        return "";
    }
    public static void setFinishTOdate(Context context, String companyId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(FTO_DATE, companyId);
            editor.commit();
        }
    }
    public static String getFinishToDate(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(FTO_DATE, "");
        }
        return "";
    }

    public static void setCompanytext(Context context, String companyId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(COMPANY_TEXT, companyId);
            editor.commit();
        }
    }

    public static String getCompanytext(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(COMPANY_TEXT, "");
        }
        return "";
    }

    public static void setCompanyId(Context context, String companyId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(COMPANY_ID, companyId);
            editor.commit();
        }
    }



    public static String getCompanyId(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(COMPANY_ID, "");
        }
        return "";
    }


    public static void setProcesstypeId(Context context, String processId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(PROCESS_ID, processId);
            editor.commit();
        }
    }
    public static String getProcesstypeId(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(PROCESS_ID, "");
        }
        return "";
    }

    public static void setProcesstypetext(Context context, String processId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(PROCESS_TEXT, processId);
            editor.commit();
        }
    }
    public static String getProcesstypetext(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(PROCESS_TEXT, "");
        }
        return "";
    }
    public static void setZeroProcesstypeId(Context context, String processId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(ZeroPROCESS_ID, processId);
            editor.commit();
        }
    }
    public static String getZeroProcesstypeId(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(ZeroPROCESS_ID, "");
        }
        return "";
    }
    public static void setZeroProcesstypetext(Context context, String processId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(ZeroPROCESS_TEXT, processId);
            editor.commit();
        }
    }
    public static String getZeroProcesstypetext(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(ZeroPROCESS_TEXT, "");
        }
        return "";
    }




    public static void setProcessrequesttypeId(Context context, String processId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(ReqPROCESS_ID, processId);
            editor.commit();
        }
    }
    public static String getProcessrequesttypeId(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(ReqPROCESS_ID, "");
        }
        return "";
    }
    public static void setProcessrequesttypetext(Context context, String processId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(ReqPROCESS_TEXT, processId);
            editor.commit();
        }
    }
    public static String getProcessrequesttypetext(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(ReqPROCESS_TEXT, "");
        }
        return "";
    }
    public static void setZeroProcessrequesttypeId(Context context, String processId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(ZeroReqPROCESS_ID, processId);
            editor.commit();
        }
    }
    public static String getZeroProcessrequesttypeId(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(ZeroReqPROCESS_ID, "");
        }
        return "";
    }
    public static void setZeroProcessrequesttypetext(Context context, String processId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(ZeroReqPROCESS_TEXT, processId);
            editor.commit();
        }
    }
    public static String getZeroProcessrequesttypetext(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(ZeroReqPROCESS_TEXT, "");
        }
        return "";
    }



    public static void setViewType(Context context, int companyId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putInt(VIEW_TYPE, companyId);
            editor.commit();
        }
    }

    public static int getViewType(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getInt(VIEW_TYPE, 0);
        }
        return 0;
    }

//    public static void setProjectFormType(Context context, String projectFormType) {
//        if (context != null) {
//            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
//                    .edit();
//            editor.putString(PROJECT_FORM_TYPE, projectFormType);
//            editor.commit();
//        }
//    }
//
//    public static String getProjectFormType(Context context) {
//        if (context != null) {
//            SharedPreferences savedSession = context.getSharedPreferences(KEY,
//                    Context.MODE_PRIVATE);
//            return savedSession.getString(PROJECT_FORM_TYPE, "0");
//        }
//        return "";
//    }

    public static void setSelectedProjectIds(Context context, String projectId) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(PROJECT_IDS, projectId);
            editor.commit();
        }
    }

    public static String getSelectedProjectIds(Context context) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            String ids = savedSession.getString(PROJECT_IDS, "");
            Log.e("savedProjectIds", ids);
            return ids;
        }
        return "";
    }

    public static void setProjectChartByAttributesYearlySummaryLabel(Context context, String value, int index) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(PROJECT_CHART_BY_ATTRIBUTES_YEARLY_SUMMARY_LABEL + index, value);
            editor.commit();
        }
    }

    public static String getProjectChartByAttributesYearlySummaryLabel(Context context, int index) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(PROJECT_CHART_BY_ATTRIBUTES_YEARLY_SUMMARY_LABEL + index, null);
        }
        return "";
    }

    public static void setProjectChartByAttributesYearlySummaryValue(Context context, String value, int index) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(PROJECT_CHART_BY_ATTRIBUTES_YEARLY_SUMMARY_VALUE + index, value);
            editor.commit();
        }
    }

    public static String getProjectChartByAttributesYearlySummaryValue(Context context, int index) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(PROJECT_CHART_BY_ATTRIBUTES_YEARLY_SUMMARY_VALUE + index, null);
        }
        return "";
    }

    public static void setProjectChartByAttributesYearlySeriesValue(Context context, String value, int index) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(PROJECT_CHART_BY_ATTRIBUTES_YEARLY_SERIES_VALUE + index, value);
            editor.commit();
        }
    }

    public static String getProjectChartByAttributesYearlySeriesValue(Context context, int index) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(PROJECT_CHART_BY_ATTRIBUTES_YEARLY_SERIES_VALUE + index, null);
        }
        return "";
    }

    public static void setProjectChartByAttributesCumulativeSummaryLabel(Context context, String value, int index) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(PROJECT_CHART_BY_ATTRIBUTES_CUMULATIVE_SUMMARY_LABEL + index, value);
            editor.commit();
        }
    }

    public static String getProjectChartByAttributesCumulativeSummaryLabel(Context context, int index) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(PROJECT_CHART_BY_ATTRIBUTES_CUMULATIVE_SUMMARY_LABEL + index, null);
        }
        return "";
    }

    public static void setProjectChartByAttributesCumulativeSummaryValue(Context context, String value, int index) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(PROJECT_CHART_BY_ATTRIBUTES_CUMULATIVE_SUMMARY_VALUE + index, value);
            editor.commit();
        }
    }

    public static String getProjectChartByAttributesCumulativeSummaryValue(Context context, int index) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(PROJECT_CHART_BY_ATTRIBUTES_CUMULATIVE_SUMMARY_VALUE + index, null);
        }
        return "";
    }

    public static void setProjectChartByAttributesCumulativeSeriesValue(Context context, String value, int index) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(PROJECT_CHART_BY_ATTRIBUTES_CUMULATIVE_SERIES_VALUE + index, value);
            editor.commit();
        }
    }

    public static String getProjectChartByAttributesCumulativeSeriesValue(Context context, int index) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(PROJECT_CHART_BY_ATTRIBUTES_CUMULATIVE_SERIES_VALUE + index, null);
        }
        return "";
    }

    public static void setProjectPipelineSummaryLabel(Context context, String value, int index) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(PROJECT_PIPELINE_SUMMARY_LABEL + index, value);
            editor.commit();
        }
    }

    public static String getProjectPipelineSummaryLabel(Context context, int index) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(PROJECT_PIPELINE_SUMMARY_LABEL + index, null);
        }
        return "";
    }

    public static void setProjectPipelineSummaryValue(Context context, String value, int index) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(PROJECT_PIPELINE_SUMMARY_VALUE + index, value);
            editor.commit();
        }
    }

    public static String getProjectPipelineSummaryValue(Context context, int index) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(PROJECT_PIPELINE_SUMMARY_VALUE + index, null);
        }
        return "";
    }

    public static void setResourceAnalysisEffortType(Context context, String value, int index) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(RESOURCE_ANALYSIS_EFFORT_TYPE + index, value);
            editor.commit();
        }
    }

    public static String getResourceAnalysisEffortType(Context context, int index) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(RESOURCE_ANALYSIS_EFFORT_TYPE + index, null);
        }
        return "";
    }

    public static void setResourceAnalysisEffortUnit(Context context, String value, int index) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(RESOURCE_ANALYSIS_EFFORT_UNIT + index, value);
            editor.commit();
        }
    }

    public static String getResourceAnalysisEffortUnit(Context context, int index) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(RESOURCE_ANALYSIS_EFFORT_UNIT + index, null);
        }
        return "";
    }

    public static void setResourceAnalysisGroupBy(Context context, String value, int index) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(RESOURCE_ANALYSIS_GROUP_BY + index, value);
            editor.commit();
        }
    }

    public static String getResourceAnalysisGroupBy(Context context, int index) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(RESOURCE_ANALYSIS_GROUP_BY + index, null);
        }
        return "";
    }

    public static void setProjectAnalysisByStatusShowBar(Context context, boolean value, int index) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putBoolean(PROJECT_ANALYSIS_BY_STATUS_SHOW_BAR + index, value);
            editor.commit();
        }
    }

    public static boolean getProjectAnalysisByStatusShowBar(Context context, int index) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getBoolean(PROJECT_ANALYSIS_BY_STATUS_SHOW_BAR + index, true);
        }
        return true;
    }


    public static void setResourceChartXaxisValue(Context context, String value, int index) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(RESOURCE_CHART_XAXIS_VALUE + index, value);
            editor.commit();
        }
    }

    public static String getResourceChartXaxisValue(Context context, int index) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(RESOURCE_CHART_XAXIS_VALUE + index, null);
        }
        return "";
    }

    public static void setResourceChartYaxisValue(Context context, String value, int index) {
        if (context != null) {
            SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE)
                    .edit();
            editor.putString(RESOURCE_CHART_YAXIS_VALUE + index, value);
            editor.commit();
        }
    }

    public static String getResourceChartYaxisValue(Context context, int index) {
        if (context != null) {
            SharedPreferences savedSession = context.getSharedPreferences(KEY,
                    Context.MODE_PRIVATE);
            return savedSession.getString(RESOURCE_CHART_YAXIS_VALUE + index, null);
        }
        return "";
    }
}
