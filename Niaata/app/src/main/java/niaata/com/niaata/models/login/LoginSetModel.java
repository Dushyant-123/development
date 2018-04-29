package niaata.com.niaata.models.login;

/**
 * Created by POI on 4/15/2018.
 */

public class LoginSetModel {

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String email;

    private String password;
}
