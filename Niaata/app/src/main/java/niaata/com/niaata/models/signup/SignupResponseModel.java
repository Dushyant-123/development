package niaata.com.niaata.models.signup;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by POI on 4/15/2018.
 */

public class SignupResponseModel {

    @SerializedName("responce")
    @Expose
    private SignupResultModel responce;

    public SignupResultModel getResponce() {
        return responce;
    }

    public void setResponce(SignupResultModel responce) {
        this.responce = responce;
    }
}
