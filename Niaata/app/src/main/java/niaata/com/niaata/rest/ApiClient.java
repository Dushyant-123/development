package niaata.com.niaata.rest;

import android.content.Context;



import java.util.concurrent.TimeUnit;

import niaata.com.niaata.preferences.POPreferences;
import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;



/**
 * Created by raviprakashgupta on 3/21/17.
 */

public class ApiClient {

    private static Retrofit retrofit = null;

    public static Retrofit getClient(Context context)
    {
        if (retrofit == null) {


            OkHttpClient okHttpClient = new OkHttpClient().newBuilder()
                    .connectTimeout(120, TimeUnit.MINUTES)
                    .readTimeout(120, TimeUnit.SECONDS)
                    .writeTimeout(120, TimeUnit.SECONDS)
                    .build();
            retrofit = new Retrofit.Builder()
                    .baseUrl(POPreferences.getUrl(context))
                    .client(okHttpClient)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }


}
