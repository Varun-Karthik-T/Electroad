import * as React from "react";
import { Appbar } from "react-native-paper";
import { usePathname, router } from "expo-router";

const AppBar = () => {
  const pathname = usePathname();
  return (
    <>
      <Appbar.Header statusBarHeight={0} mode="center-aligned">
        {pathname != "/" && <Appbar.BackAction onPress={() => {router.back()}}/>}
        <Appbar.Content title="Electroad" />
      </Appbar.Header>
    </>
  );
};

export default AppBar;
