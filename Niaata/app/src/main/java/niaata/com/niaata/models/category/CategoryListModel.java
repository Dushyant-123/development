package niaata.com.niaata.models.category;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by POI on 4/21/2018.
 */

public class CategoryListModel {

    private Integer categoryId;
    @SerializedName("category_name")
    @Expose
    private String categoryName;
    @SerializedName("category_avtar")
    @Expose
    private String categoryAvtar;
    @SerializedName("mst_subcategories")
    @Expose
    private List<CategorySubListModel> mstSubcategories = null;

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryAvtar() {
        return categoryAvtar;
    }

    public void setCategoryAvtar(String categoryAvtar) {
        this.categoryAvtar = categoryAvtar;
    }

    public List<CategorySubListModel> getMstSubcategories() {
        return mstSubcategories;
    }

    public void setMstSubcategories(List<CategorySubListModel> mstSubcategories) {
        this.mstSubcategories = mstSubcategories;
    }
}
