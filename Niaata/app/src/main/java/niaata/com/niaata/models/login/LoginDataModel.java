package niaata.com.niaata.models.login;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by POI on 4/15/2018.
 */

public class LoginDataModel {

    @SerializedName("user_id")
    @Expose
    private Integer userId;
    @SerializedName("first_name")
    @Expose
    private String firstName;
    @SerializedName("last_name")
    @Expose
    private Object lastName;
    @SerializedName("email")
    @Expose
    private String email;
    @SerializedName("country_code")
    @Expose
    private Integer countryCode;
    @SerializedName("contact_no")
    @Expose
    private String contactNo;
    @SerializedName("date_of_add")
    @Expose
    private String dateOfAdd;
    @SerializedName("status")
    @Expose
    private Boolean status;
    @SerializedName("verified_profile")
    @Expose
    private Object verifiedProfile;
    @SerializedName("premium_user")
    @Expose
    private Object premiumUser;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Object getLastName() {
        return lastName;
    }

    public void setLastName(Object lastName) {
        this.lastName = lastName;
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

    public String getDateOfAdd() {
        return dateOfAdd;
    }

    public void setDateOfAdd(String dateOfAdd) {
        this.dateOfAdd = dateOfAdd;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Object getVerifiedProfile() {
        return verifiedProfile;
    }

    public void setVerifiedProfile(Object verifiedProfile) {
        this.verifiedProfile = verifiedProfile;
    }

    public Object getPremiumUser() {
        return premiumUser;
    }

    public void setPremiumUser(Object premiumUser) {
        this.premiumUser = premiumUser;
    }

}
