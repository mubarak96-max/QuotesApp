import React, { useEffect, useState } from "react";
// import {
//   InterstitialAd,
//   AdEventType,
//   TestIds
// } from "react-native-google-mobile-ads";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InterstitialAdComponent = () => {
  const [adShown, setAdShown] = useState(false);
  const interstitial = InterstitialAd.createForAdRequest(
    "ca-app-pub-8237514940582521/9356958145",
    {
      requestNonPersonalizedAdsOnly: true
    }
  );

  const SCREEN_OPENINGS_KEY = "screenOpeningsKey";

  useEffect(() => {
    const loadAndShowAd = async () => {
      // Get the number of screen openings from AsyncStorage
      const openingsStr = await AsyncStorage.getItem(SCREEN_OPENINGS_KEY);
      const openings = openingsStr ? parseInt(openingsStr, 10) : 0;

      // Increment the number of screen openings
      await AsyncStorage.setItem(
        SCREEN_OPENINGS_KEY,
        (openings + 1).toString()
      );

      // If the screen has been opened less than 3 times, do not load or show the ad
      if (openings < 5) return;

      // Reset the number of screen openings to 0 after the third opening
      await AsyncStorage.setItem(SCREEN_OPENINGS_KEY, "0");

      let timerId;

      const unsubscribeLoading = interstitial.addAdEventListener(
        AdEventType.LOADED,
        () => {
          // Schedule to show the ad 5 seconds after it has loaded
          timerId = setTimeout(() => {
            interstitial.show();
            setAdShown(true); // Mark the ad as shown
          }, 4000);
        }
      );

      const unsubscribeClosed = interstitial.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          // Do not load a new ad when the user closes the current ad
        }
      );

      interstitial.load(); // Load the ad when the component mounts

      return () => {
        clearTimeout(timerId); // Clear the timer when the component unmounts
        unsubscribeLoading(); // Unsubscribe from the LOADED event when the component unmounts
        unsubscribeClosed(); // Unsubscribe from the CLOSED event when the component unmounts
      };
    };

    loadAndShowAd();
  }, [adShown]); // This effect runs whenever adShown changes

  return null; // This component does not render anything
};

export default InterstitialAdComponent;
