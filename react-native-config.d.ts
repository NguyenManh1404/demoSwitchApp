declare module 'react-native-config' {
  export interface NativeConfig {
    APP_NAME: string;
    ANDROID_STORE_FILE: string;
    ANDROID_STORE_PASSWORD: string;
    ANDROID_KEY_ALIAS: string;
    ANDROID_KEY_PASSWORD: string;
    GOOGLE_API_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
