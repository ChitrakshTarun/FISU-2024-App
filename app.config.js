export default {
  expo: {
    name: "FISU 2024",
    slug: "FISU-2024-App",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    extra: {
      eas: {
        projectId: "a94d1654-1980-42d6-a0a6-65cf57d9819f",
      },
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.chitrakshtarun.fisu",
      googleServicesFile: process.env.APPLE_SERVICES_PLIST,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.chitrakshtarun.fisu",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "@react-native-firebase/app",
      "expo-router",
      "expo-secure-store",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
