package niaata.com.niaata.fragments;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.Toast;



import cn.pedant.SweetAlert.SweetAlertDialog;

/**
 * Created by raviprakashgupta on 5/30/17.
 */

public class BaseFragment extends Fragment {
    public ProgressBar mProgressBar;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return super.onCreateView(inflater, container, savedInstanceState);
    }

    public void showProgress() {
        if (getActivity() != null && mProgressBar != null)
            mProgressBar.setVisibility(View.VISIBLE);
    }

    public void hideProgress() {

        if (getActivity() != null && mProgressBar != null)
            mProgressBar.setVisibility(View.GONE);
    }

    public boolean isNetworkAvailable(Context context) {
        ConnectivityManager connectivityManager
                = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
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


}
