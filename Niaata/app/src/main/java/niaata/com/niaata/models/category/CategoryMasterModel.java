package niaata.com.niaata.models.category;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by POI on 4/21/2018.
 */

public class CategoryMasterModel {
    @SerializedName("response")
    @Expose
    private CategoryResponseModel response;

    public CategoryResponseModel getResponse() {
        return response;
    }

    public void setResponse(CategoryResponseModel response) {
        this.response = response;
    }
}
