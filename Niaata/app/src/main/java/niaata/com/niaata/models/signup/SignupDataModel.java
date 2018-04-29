package niaata.com.niaata.models.signup;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by POI on 4/15/2018.
 */

public class SignupDataModel {


    @SerializedName("first_name")
    @Expose
    private String firstName;
    @SerializedName("email")
    @Expose
    private String email;
    @SerializedName("country_code")
    @Expose
    private Integer countryCode;
    @SerializedName("contact_no")
    @Expose
    private String contactNo;
    @SerializedName("status")
    @Expose
    private Boolean status;
    @SerializedName("date_of_add")
    @Expose
    private String dateOfAdd;
    @SerializedName("user_id")
    @Expose
    private Integer userId;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(Integer countryCode) {
        this.countryCode = countryCode;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getDateOfAdd() {
        return dateOfAdd;
    }

    public void setDateOfAdd(String dateOfAdd) {
        this.dateOfAdd = dateOfAdd;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
