import * as Font from "expo-font";
import * as React from "react";
import {
  ABeeZee_400Regular,
  ABeeZee_400Regular_Italic,
} from '@expo-google-fonts/abeezee';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          ABeeZee_400Regular,
          ABeeZee_400Regular_Italic,
            ABeeZee: ABeeZee_400Regular,
          ABeeZee_Italic: ABeeZee_400Regular_Italic
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.log("============================");

        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
