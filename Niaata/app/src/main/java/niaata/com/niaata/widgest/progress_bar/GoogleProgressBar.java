package niaata.com.niaata.widgest.progress_bar;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.drawable.Drawable;
import android.util.AttributeSet;
import android.widget.ProgressBar;

import niaata.com.niaata.R;


public class GoogleProgressBar extends ProgressBar {


    public GoogleProgressBar(Context context) {
        this(context, null);
    }

    public GoogleProgressBar(Context context, AttributeSet attrs) {
        this(context, attrs, android.R.attr.progressBarStyle);
    }

    public GoogleProgressBar(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);

        // Due to some new ADT features, initialing with values from resource file may meet preview problems.
        // If View.isInEditMode() returns true, skip drawing.
        if (isInEditMode())
            return;

        TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.GoogleProgressBar, defStyle, 0);
        final int typeIndex = a.getInteger(R.styleable.GoogleProgressBar_type, context.getResources().getInteger(R.integer.default_type));
        final int colorsId = a.getResourceId(R.styleable.GoogleProgressBar_colors, R.array.google_colors);
        a.recycle();

        Drawable drawable = buildDrawable(context, typeIndex, colorsId);
        if (drawable != null)
            setIndeterminateDrawable(drawable);
    }

    private Drawable buildDrawable(Context context, int typeIndex, int colorsId) {
        Drawable drawable = new ChromeFloatingCirclesDrawable.Builder(context)
                .colors(getResources().getIntArray(colorsId))
                .build();


        return drawable;
    }
}
