package niaata.com.niaata.rest;




import java.util.Map;

import niaata.com.niaata.models.category.CategoryMasterModel;
import niaata.com.niaata.models.login.LoginResponseModel;
import niaata.com.niaata.models.login.LoginSetModel;
import niaata.com.niaata.models.signup.SignupDataSetModel;
import niaata.com.niaata.models.signup.SignupResponseModel;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;
import retrofit2.http.QueryMap;

/**
 * Created by raviprakashgupta on 3/21/17.
 */

public interface ApiInterface {

    @POST("tbl-users/add.json")
    Call<SignupResponseModel>getSignupResponse(@Body SignupDataSetModel credentials);

    @POST("tbl-users/login.json")
    Call<LoginResponseModel>getLoginResponse(@Body LoginSetModel credentials);

    @GET("mst-subcategories/getcategorydata.json")
    Call<CategoryMasterModel>getCategoryList();



}

