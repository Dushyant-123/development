package niaata.com.niaata;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

/**
 * Created by POI on 3/25/2018.
 */

public class LoginUserAcitivity   extends AppCompatActivity
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



    }
    private void bindWidgetsWithEvents()
    {
        LoginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent=new Intent(LoginUserAcitivity.this,HomeActivity.class);
                startActivity(intent);

            }
        });


    }
}


