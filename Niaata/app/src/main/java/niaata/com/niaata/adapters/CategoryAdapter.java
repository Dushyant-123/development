package niaata.com.niaata.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;


import com.bumptech.glide.Glide;

import java.util.List;

import niaata.com.niaata.R;
import niaata.com.niaata.models.category.CategoryDataModel;


/**
 * Created by POI on 3/28/2018.
 */

public class CategoryAdapter extends   BaseAdapter {

    private Context mContext;
    List<CategoryDataModel> mData;

    public CategoryAdapter(Context context, List<CategoryDataModel> data) {
        mContext = context;
        this.mData = data;

    }

    public void onDataChange(List<CategoryDataModel> data) {
        this.mData = data;
        notifyDataSetChanged();


    }
    @Override
    public int getCount() {
        return mData.size();
    }

    @Override
    public Object getItem(int i) {
        return null;
    }

    @Override
    public long getItemId(int i) {
        return 0;
    }

    @Override
    public View getView(int i, View convertView, ViewGroup parent) {
        View gridView;
        LayoutInflater inflater = (LayoutInflater) mContext
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        if (convertView == null) {

            gridView = new View(mContext);
            gridView = inflater.inflate(R.layout.home_grid, null);
            TextView textView = (TextView) gridView.findViewById(R.id.android_gridview_text);
            ImageView imageView = (ImageView) gridView.findViewById(R.id.android_gridview_image);
            textView.setText(mData.get(i).getCategoryName());
            Glide.with(mContext)
                    .load(mData.get(i).getCategoryAvtar())
                    .into(imageView);



        } else {
            gridView = (View) convertView;
        }

        return gridView;
    }
}