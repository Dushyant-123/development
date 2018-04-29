package niaata.com.niaata;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.Toast;



import java.util.ArrayList;
import java.util.HashMap;
import java.util.Timer;
import java.util.TimerTask;

import cn.pedant.SweetAlert.SweetAlertDialog;
import niaata.com.niaata.constants.IPOConstants;
import niaata.com.niaata.widgest.CalibriTextviewLightActionBar;


public class BaseActivity extends AppCompatActivity implements IPOConstants, View.OnClickListener {
    ProgressBar mProgressBar;

     public void setActionBarWithoutImage(String title) {

        ActionBar actionBar = getSupportActionBar();

        actionBar.setDisplayShowCustomEnabled(true);
        actionBar.setDisplayShowTitleEnabled(false);
        actionBar.setDisplayHomeAsUpEnabled(true);

        LayoutInflater inflator = LayoutInflater.from(this);
        View v = inflator.inflate(R.layout.titleview, null);
        ((CalibriTextviewLightActionBar) v.findViewById(R.id.title)).setText(title);
        actionBar.setCustomView(v);


    }
    public void setActionBarWithoutImage1(String title) {

        ActionBar actionBar = getSupportActionBar();

        actionBar.setDisplayShowCustomEnabled(true);
        actionBar.setDisplayShowTitleEnabled(false);
        actionBar.setDisplayHomeAsUpEnabled(true);

        LayoutInflater inflator = LayoutInflater.from(this);
        View v = inflator.inflate(R.layout.titleviewnew, null);
        ((CalibriTextviewLightActionBar) v.findViewById(R.id.title)).setText(title);
        actionBar.setCustomView(v);


    }


    @Override
    protected void onResume() {
        super.onResume();


    }
    @Override
    protected void onDestroy() {
        super.onDestroy();

    }

     @Override
     protected void onPause() {
         super.onPause();



     }

     @Override
     protected  void onStop()
     {
         super.onStop();
     }

      @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                // app icon in action bar clicked; goto parent activity.
                this.finish();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }


    public void goToNextActivity(Activity activityName, Class className) {
        Intent intent = new Intent(activityName, className);
        startActivity(intent);
    }

    public void showToast(String message, Context context) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
    }

    public void showAlart(int message, Context context) {
        // Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
        new SweetAlertDialog(context, SweetAlertDialog.ERROR_TYPE)
                .setTitleText("Oops...")
                .setContentText(context.getString(message))
                .show();
    }
    public void showToast(int messageStringId, Context context) {
        Toast.makeText(context, context.getString(messageStringId), Toast.LENGTH_SHORT).show();
    }

    public boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager
                = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }

    public void logOut(Activity activityName) {
        //clear logged in user info
    //    POPreferences.setLogoutflag(getApplicationContext(), "");
       /* POPreferences.setUten(getApplicationContext(), "");
        POPreferences.setProfile(getApplicationContext(), "");
        POPreferences.setEmail(getApplicationContext(), "");
        POPreferences.setUserImage(getApplicationContext(), "");
        POPreferences.setAdmin(getApplicationContext(), false);*/


        Intent intent = new Intent(activityName, BaseActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
        startActivity(intent);
        finish();
    }

    @Override
    public void onClick(View v) {

    }

    public void showProgress()
    {
        if (mProgressBar != null)
            mProgressBar.setVisibility(View.VISIBLE);
    }

    public void hideProgress() {

        if (mProgressBar != null)
            mProgressBar.setVisibility(View.GONE);
    }
}
