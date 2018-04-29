package niaata.com.niaata.widgest;

import android.content.Context;
import android.graphics.Typeface;
import android.util.AttributeSet;

/**
 * Created by Meenakshi on 7/7/2016.
 */
public class CalibriTextviewLightActionBar extends android.support.v7.widget.AppCompatTextView {
    public CalibriTextviewLightActionBar(Context context) {
        super(context);
        init(context);
    }

    public CalibriTextviewLightActionBar(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    public CalibriTextviewLightActionBar(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }

    private void init(Context context) {
        this.setTypeface(Typeface.createFromAsset(context.getAssets(), "SanFranciscoDisplay-Regular.otf"));
//        this.setTextSize(context.getResources().getDimension(R.dimen.font_small));
    }

    public void makeBold(Context context) {
        this.setTypeface(Typeface.createFromAsset(context.getAssets(), "SanFranciscoDisplay-Regular.otf"), Typeface.BOLD);
    }


}
