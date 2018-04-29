package niaata.com.niaata.fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.GridView;

import java.util.ArrayList;
import java.util.List;

import niaata.com.niaata.R;
import niaata.com.niaata.adapters.CategoryAdapter;
import niaata.com.niaata.models.category.CategoryDataModel;
import niaata.com.niaata.models.category.CategoryMasterModel;
import niaata.com.niaata.models.category.CategoryResponseModel;
import niaata.com.niaata.rest.ApiClient;
import niaata.com.niaata.rest.ApiInterface;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


/**
 * Created by POI on 4/7/2018.
 */

public class MainScreen extends BaseFragment {

    GridView gridView;
    List<CategoryDataModel> mCategoryData;
    CategoryAdapter categoryAdapter;





    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        //returning our layout file
        //change R.layout.yourlayoutfilename for each of your fragments
        View view= inflater.inflate(R.layout.content_home, container, false);

        gridView=(GridView)view.findViewById(R.id.grid_view_image_text);
        mCategoryData = new ArrayList<>();
        categoryAdapter = new CategoryAdapter(getActivity(), mCategoryData);
        gridView.setAdapter(categoryAdapter);
        categoryAdapter.notifyDataSetChanged();

        GetCategoryList();
        return view;
    }


    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Home");
    }

    private void GetCategoryList() {
        if (isNetworkAvailable(getActivity())) {
            ApiInterface apiService =
                    ApiClient.getClient(getActivity()).create(ApiInterface.class);

            Call<CategoryMasterModel> call = apiService.getCategoryList();
            showProgress();
            call.enqueue(new Callback<CategoryMasterModel>() {
                @Override
                public void onResponse(Call<CategoryMasterModel> call, Response<CategoryMasterModel> response)
                {
                    hideProgress();
                    CategoryMasterModel categoryMasterModel = response.body();
                    if (categoryMasterModel != null)
                    {
                        if ( categoryMasterModel.getResponse().getStatus()==1)
                        {
                            mCategoryData.addAll(categoryMasterModel.getResponse().getData());
                            categoryAdapter.onDataChange(mCategoryData);

                        } else {
                            showToast(R.string.error_fetching_result, getActivity());
                        }
                    }
                }

                @Override
                public void onFailure(Call<CategoryMasterModel> call, Throwable t) {
                    hideProgress();
                    showToast(R.string.error_fetching_result, getActivity());
                }
            });

        } else
            showToast(R.string.network_error, getActivity());
    }
}
