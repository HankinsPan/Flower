package com.flower;

import android.os.Bundle;
import android.os.Environment;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.flower.utils.ZipFloderUtil;

import java.io.IOException;

public class MainActivity extends ReactActivity {
    public static final String TAG = ">>> Flower TAG >>>";
    private String DB_TOPATH = Environment.getExternalStorageDirectory() + "/word/db/";

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Flower";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.e(TAG, "==== onResume === ");
        _unZipFile();
    }

    private void _unZipFile() {

        try {
            ZipFloderUtil.UnZipFile(
                    MainActivity.this,
                    this.getFilesDir().getAbsolutePath() + "/",
                    getAssets().open("zip/assets.zip"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
