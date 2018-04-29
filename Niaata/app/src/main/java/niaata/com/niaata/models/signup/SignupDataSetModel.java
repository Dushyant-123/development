package niaata.com.niaata.models.signup;

/**
 * Created by POI on 4/15/2018.
 */

public class SignupDataSetModel {



    private String first_name;

    public String getFirstName() {
        return first_name;
    }

    public void setFirstName(String firstName) {
        this.first_name = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getCountryCode() {
        return country_code;
    }

    public void setCountryCode(Integer countryCode) {
        this.country_code = countryCode;
    }

    public String getContactNo() {
        return contact_no;
    }

    public void setContactNo(String contactNo) {
        this.contact_no = contactNo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String email;

    private Integer country_code;

    private String contact_no;



    private String password;


}
