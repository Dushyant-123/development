package niaata.com.niaata.models.login;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by POI on 4/15/2018.
 */

public class LoginResponseModel {


    @SerializedName("responce")
    @Expose
    private LoginResponseDataModel responce;

    public LoginResponseDataModel getResponce() {
        return responce;
    }

    public void setResponce(LoginResponseDataModel responce) {
        this.responce = responce;
    }
}
