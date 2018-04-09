package niaata.com.niaata;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;



public class SignUpActivity   extends AppCompatActivity
{

    EditText UserName,Password,PhoneNumber;
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
        Password=(EditText)findViewById(R.id.password);
        SignUpBtn=(Button)findViewById(R.id.signbtn);
        PhoneNumber=(EditText)findViewById(R.id.phonemunber);
        TermAccept=(CheckBox)findViewById(R.id.termcheck);


    }
    private void bindWidgetsWithEvents()
    {


        SignUpBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


            }
        });

    }
}

