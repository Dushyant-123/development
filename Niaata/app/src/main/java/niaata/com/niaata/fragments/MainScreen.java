package niaata.com.niaata.fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.GridView;

import niaata.com.niaata.R;
import niaata.com.niaata.adapters.ImageAdapter;


/**
 * Created by POI on 4/7/2018.
 */

public class MainScreen extends android.support.v4.app.Fragment {

    GridView gridView;

    public static   Integer[] imageIDs = {
            R.mipmap.bike,
            R.mipmap.books,
            R.mipmap.pets,
            R.mipmap.property,
            R.mipmap.services,
            R.mipmap.mobile,
            R.mipmap.furniture,
            R.mipmap.fashion,
            R.mipmap.electronic,
            R.mipmap.car,
            R.mipmap.bike,
            R.mipmap.books,
            R.mipmap.pets,
            R.mipmap.property,
            R.mipmap.services,
            R.mipmap.mobile,
            R.mipmap.furniture,
            R.mipmap.fashion,
            R.mipmap.electronic,
    };


    String[] gridViewString = {
            "Bikes", "Books", "Pets", "Properties", "Services", "Mobile",
            "Furniture", "Fashion", "Electronic", "Cars",

    } ;
    int[] gridViewImageId = {
            R.mipmap.bike,
            R.mipmap.books,
            R.mipmap.pets,
            R.mipmap.property,
            R.mipmap.services,
            R.mipmap.mobile,
            R.mipmap.furniture,
            R.mipmap.fashion,
            R.mipmap.electronic,
            R.mipmap.car,
    };

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        //returning our layout file
        //change R.layout.yourlayoutfilename for each of your fragments
        View view= inflater.inflate(R.layout.content_home, container, false);

        gridView=(GridView)view.findViewById(R.id.grid_view_image_text);

        gridView.setAdapter(new ImageAdapter(getActivity(), gridViewString, gridViewImageId));
        return view;
    }


    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Home");
    }
}
