package niaata.com.niaata;

import android.content.Intent;
import android.graphics.Paint;
import android.graphics.Rect;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.ProgressBar;

import cn.pedant.SweetAlert.SweetAlertDialog;
import niaata.com.niaata.models.signup.SignupDataSetModel;
import niaata.com.niaata.models.signup.SignupResponseModel;
import niaata.com.niaata.preferences.POPreferences;
import niaata.com.niaata.rest.ApiClient;
import niaata.com.niaata.rest.ApiInterface;
import niaata.com.niaata.widgest.progress_bar.ChromeFloatingCirclesDrawable;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class SignUpActivity   extends BaseActivity
{

    EditText UserName,Password,PhoneNumber,Email,CountryCode;
    Button LoginBtn,SignUpBtn;
    CheckBox TermAccept;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);
        getAllWidgets();
        bindWidgetsWithEvents();


    }

    private void  getAllWidgets()
    {
        UserName=(EditText)findViewById(R.id.username);
        Email=(EditText)findViewById(R.id.email);
        Password=(EditText)findViewById(R.id.password);
        SignUpBtn=(Button)findViewById(R.id.signbtn);
        PhoneNumber=(EditText)findViewById(R.id.phonemunber);
        CountryCode=(EditText)findViewById(R.id.countycode);
        TermAccept=(CheckBox)findViewById(R.id.termcheck);
        mProgressBar = (ProgressBar) findViewById(R.id.progress_bar);
        Rect bounds = mProgressBar.getIndeterminateDrawable().getBounds();
        mProgressBar.setIndeterminateDrawable(new ChromeFloatingCirclesDrawable.Builder(this)
                .colors(getResources().getIntArray(R.array.google_colors))
                .build());
        mProgressBar.getIndeterminateDrawable().setBounds(bounds);

    }
    private void bindWidgetsWithEvents()
    {


        SignUpBtn.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View v)
            {
                if (TermAccept.isChecked())
                {
                    if (checkForDataValidation())
                    {
                        new SweetAlertDialog(SignUpActivity.this, SweetAlertDialog.NORMAL_TYPE)
                                .setContentText(getString(R.string.blankerrormsg))
                                .show();
                    }
                    else
                    {

                        final SignupDataSetModel signupDataSetModel=new SignupDataSetModel();
                        signupDataSetModel.setFirstName(UserName.getText().toString());
                        signupDataSetModel.setEmail(Email.getText().toString());
                        signupDataSetModel.setPassword(Password.getText().toString());
                        signupDataSetModel.setCountryCode(Integer.parseInt(CountryCode.getText().toString()));
                        signupDataSetModel.setContactNo(PhoneNumber.getText().toString());
                        if (isNetworkAvailable())
                        {
                            showProgress();
                            ApiInterface apiService =
                                    ApiClient.getClient(SignUpActivity.this).create(ApiInterface.class);

                            Call<SignupResponseModel> call = apiService.getSignupResponse(signupDataSetModel);

                            call.enqueue(new Callback<SignupResponseModel>()
                            {
                                @Override
                                public void onResponse(Call<SignupResponseModel> call, Response<SignupResponseModel> response) {
                                    hideProgress();
                                    SignupResponseModel signupResponseModel = response.body();
                                    if (signupResponseModel != null)
                                    {
                                        if (signupResponseModel.getResponce().getStatus()==1)
                                        {
                                            POPreferences.setEmail(SignUpActivity.this, signupResponseModel.getResponce().getData().getEmail());

                                            showToast(signupResponseModel.getResponce().getMessage(),SignUpActivity.this);
                                            setResult(RESULT_OK);
                                            finish();



                                        }
                                        else {
                                            showToast(signupResponseModel.getResponce().getMessage(),SignUpActivity.this);

                                        }

                                    }
                                    else
                                    {


                                    }

                                }

                                @Override
                                public void onFailure(Call<SignupResponseModel> call, Throwable t) {
                                    hideProgress();

                                      showToast(R.string.error_fetching_result, SignUpActivity.this);
                                }
                            });


                        }
                        else {
                            hideProgress();
                            showToast(R.string.network_error, SignUpActivity.this);
                        }

                    }


                }
                else
                    new SweetAlertDialog(SignUpActivity.this, SweetAlertDialog.ERROR_TYPE)
                            .setContentText(getString(R.string.checkterm))
                            .show();


            }
        });

    }
    private boolean checkForDataValidation()
    {

        String Username=UserName.getText().toString();
        String UserEmail=Email.getText().toString();
        String UserPWD=Password.getText().toString();
        String UserContact=PhoneNumber.getText().toString();
        String UserCountryCode=CountryCode.getText().toString();
        if (Username.equalsIgnoreCase("")||UserEmail.equalsIgnoreCase("")|| UserPWD.equalsIgnoreCase("") ||
                UserContact.equalsIgnoreCase("") || UserCountryCode.equalsIgnoreCase(""))
        {
            return true;
        }

        return false;
    }

}

