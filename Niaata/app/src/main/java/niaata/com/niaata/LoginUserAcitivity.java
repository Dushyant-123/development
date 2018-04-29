package niaata.com.niaata;

import android.content.Intent;
import android.graphics.Rect;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;

import cn.pedant.SweetAlert.SweetAlertDialog;
import niaata.com.niaata.models.login.LoginResponseModel;
import niaata.com.niaata.models.login.LoginSetModel;
import niaata.com.niaata.models.signup.SignupDataSetModel;
import niaata.com.niaata.models.signup.SignupResponseModel;
import niaata.com.niaata.rest.ApiClient;
import niaata.com.niaata.rest.ApiInterface;
import niaata.com.niaata.widgest.progress_bar.ChromeFloatingCirclesDrawable;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by POI on 3/25/2018.
 */

public class LoginUserAcitivity   extends BaseActivity
{

    EditText UserName,Password;
    Button LoginBtn;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loginuser);

        getAllWidgets();
        bindWidgetsWithEvents();


    }

    private void  getAllWidgets()
    {
        UserName=(EditText)findViewById(R.id.username);
        Password=(EditText)findViewById(R.id.password);
        LoginBtn=(Button)findViewById(R.id.loginbtn);
        mProgressBar = (ProgressBar) findViewById(R.id.progress_bar);
        Rect bounds = mProgressBar.getIndeterminateDrawable().getBounds();
        mProgressBar.setIndeterminateDrawable(new ChromeFloatingCirclesDrawable.Builder(this)
                .colors(getResources().getIntArray(R.array.google_colors))
                .build());
        mProgressBar.getIndeterminateDrawable().setBounds(bounds);



    }
    private void bindWidgetsWithEvents()
    {
        LoginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                    if (checkForDataValidation())
                    {
                        new SweetAlertDialog(LoginUserAcitivity.this, SweetAlertDialog.NORMAL_TYPE)
                                .setContentText(getString(R.string.blankerrormsg))
                                .show();
                    }
                    else
                    {

                           LoginSetModel loginSetModel=new LoginSetModel();
                           loginSetModel.setEmail(UserName.getText().toString());
                           loginSetModel.setPassword(Password.getText().toString());
                          if (isNetworkAvailable())
                        {
                            showProgress();
                            ApiInterface apiService =
                                    ApiClient.getClient(LoginUserAcitivity.this).create(ApiInterface.class);

                            Call<LoginResponseModel> call = apiService.getLoginResponse(loginSetModel);

                            call.enqueue(new Callback<LoginResponseModel>()
                            {
                                @Override
                                public void onResponse(Call<LoginResponseModel> call, Response<LoginResponseModel> response) {
                                    hideProgress();
                                    LoginResponseModel loginResponseModel = response.body();
                                    if (loginResponseModel != null)
                                    {
                                        if (loginResponseModel.getResponce().getStatus()==1)
                                        {
                                            showToast(loginResponseModel.getResponce().getMessage(),LoginUserAcitivity.this);

                                            Intent intent=new Intent(LoginUserAcitivity.this,HomeActivity.class);
                                            startActivity(intent);




                                        }
                                        else {
                                            showToast(loginResponseModel.getResponce().getMessage(),LoginUserAcitivity.this);

                                        }

                                    }
                                    else
                                    {


                                    }

                                }

                                @Override
                                public void onFailure(Call<LoginResponseModel> call, Throwable t) {
                                    hideProgress();

                                    showToast(R.string.error_fetching_result, LoginUserAcitivity.this);
                                }
                            });


                        }
                        else {
                            hideProgress();
                            showToast(R.string.network_error, LoginUserAcitivity.this);
                        }

                    }


                }



        });


    }
    private boolean checkForDataValidation()
    {

        String Username=UserName.getText().toString();

        String UserPWD=Password.getText().toString();

        if (Username.equalsIgnoreCase("") || UserPWD.equalsIgnoreCase(""))
        {
            return true;
        }

        return false;
    }
}


