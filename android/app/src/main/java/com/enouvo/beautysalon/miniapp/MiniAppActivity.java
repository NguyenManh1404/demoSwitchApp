package com.enouvo.beautysalon.miniapp;

import android.os.Bundle;

import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.rnmaps.maps.MapsPackage;
import com.enouvo.beautysalon.MainActivity;
import io.invertase.firebase.storage.ReactNativeFirebaseStoragePackage; // <-- Add this line
import io.invertase.firebase.firestore.ReactNativeFirebaseFirestorePackage;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import com.ReactNativeBlobUtil.ReactNativeBlobUtilPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import org.wonday.pdf.RCTPdfView;
import com.swmansion.reanimated.ReanimatedPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MiniAppActivity extends ReactActivity implements DefaultHardwareBackBtnHandler {
    private static MiniAppActivity mInstance;
    private String mMainComponentName;
    private static ReactInstanceManager mReactInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mInstance = this;
        Bundle bundle = getIntent().getExtras();
        assert bundle != null;
        mMainComponentName = bundle.getString("bundleName", "");
        boolean devLoad = bundle.getBoolean("devLoad");
        Bundle initProps = bundle.getBundle("initProps");

        ReactRootView mReactRootView = new ReactRootView(this);

//        val packages: List<ReactPackage> = PackageList(application).packages
            String appPath = bundle.getString("appPath", "");
            mReactInstanceManager = ReactInstanceManager.builder()
                    .setApplication(getApplication())
                    .setJavaScriptExecutorFactory(new HermesExecutorFactory())
                    .setCurrentActivity(this)
                    .setBundleAssetName(appPath)
                    .setJSMainModulePath("index")
                    .addPackages(getPackages())
                    .setUseDeveloperSupport(devLoad)
                    .setInitialLifecycleState(LifecycleState.RESUMED)
                    .build();
        mReactRootView.startReactApplication(mReactInstanceManager, mMainComponentName, initProps);
        setContentView(mReactRootView);
    }


    public ArrayList<ReactPackage> getPackages() {
        return new ArrayList<>(Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new ConnectNativePackage(),
                new MapsPackage(),
                new ReactNativeFirebaseStoragePackage(),
                new ReactNativeFirebaseFirestorePackage(),
                new ReactNativeFirebaseAppPackage(),
                new ReactNativeBlobUtilPackage(),
                new RNScreensPackage(),
                new RNGestureHandlerPackage(),
                new PickerPackage(),
                new RCTPdfView(),
                new ReanimatedPackage(),
                new SafeAreaContextPackage()
        ));
    }

    @Override
    protected String getMainComponentName() {
        return mMainComponentName;
    }

    public static void close() {
        if (mInstance != null) mInstance.finish();
        mInstance = null;
    }
    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }
    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }
}