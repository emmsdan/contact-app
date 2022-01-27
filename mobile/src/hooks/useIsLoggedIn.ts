import * as React from "react";

import AsyncStorage from "@react-native-community/async-storage";
import { environment } from "../environments/environment";

export default function useIsLoggedIn() {
  const [content, setContent] = React.useState<null | string>(null);

  React.useEffect(() => {
    async function loadStorage() {
      try {
        const userStore = await AsyncStorage.getItem(
          environment.userStorageName
        );
        setContent(userStore || null);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
      }
    }
    loadStorage();
  }, []);

  return[
    content || false,
  ]
}
