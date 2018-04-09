package niaata.com.niaata;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

/**
 * Created by POI on 3/25/2018.
 */

public class LoginActivity extends AppCompatActivity
{


    Button LoginBtn,SignUpBtn;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        getAllWidgets();
        bindWidgetsWithEvents();


    }

    private void  getAllWidgets()
    {

        LoginBtn=(Button)findViewById(R.id.loginbtn);
        SignUpBtn=(Button)findViewById(R.id.signbtn);

    }
      private void bindWidgetsWithEvents()
          {
              LoginBtn.setOnClickListener(new View.OnClickListener() {
                  @Override
                  public void onClick(View v) {
                      Intent i = new Intent(LoginActivity.this, LoginUserAcitivity.class);
                      startActivity(i);

                  }
              });

              SignUpBtn.setOnClickListener(new View.OnClickListener() {
                  @Override
                  public void onClick(View v) {
                      Intent i = new Intent(LoginActivity.this, SignUpActivity.class);
                      startActivity(i);

                  }
              });

          }
}

