import { View } from "react-native";
import React from "react";
// import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { useState } from "react";

export const Banner = () => {
  const [showAd, setShowAd] = useState(false);
  return (
    <View style={{ overflow: "hidden", height: showAd ? "auto" : 0 }}>
      <BannerAd
        // unitId="ca-app-pub-8237514940582521/6183999893"
        unitId="ca-app-pub-8237514940582521/6183999893"
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
        onAdLoaded={() => setShowAd(true)}
        style={showAd ? {} : { position: "absolute", top: -2000 }}
      />
    </View>
  );
};

// unitId="ca-app-pub-8237514940582521/1002851284"
