package niaata.com.niaata.models.category;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by POI on 4/21/2018.
 */

public class CategorySubListModel {

    @SerializedName("subcategory_id")
    @Expose
    private Integer subcategoryId;
    @SerializedName("subcategory_name")
    @Expose
    private String subcategoryName;
    @SerializedName("subcategory_avtar")
    @Expose
    private String subcategoryAvtar;
    @SerializedName("category_id")
    @Expose
    private Integer categoryId;

    public Integer getSubcategoryId() {
        return subcategoryId;
    }

    public void setSubcategoryId(Integer subcategoryId) {
        this.subcategoryId = subcategoryId;
    }

    public String getSubcategoryName() {
        return subcategoryName;
    }

    public void setSubcategoryName(String subcategoryName) {
        this.subcategoryName = subcategoryName;
    }

    public String getSubcategoryAvtar() {
        return subcategoryAvtar;
    }

    public void setSubcategoryAvtar(String subcategoryAvtar) {
        this.subcategoryAvtar = subcategoryAvtar;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

}
