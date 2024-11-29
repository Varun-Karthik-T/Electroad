import * as React from "react";
import { Appbar, Icon } from "react-native-paper";
import { usePathname, router } from "expo-router";

const AppBar = ({title}) => {
  const pathname = usePathname();
  return (
    <>
      <Appbar.Header statusBarHeight={0} mode="center-aligned">
        {pathname != "/" && <Appbar.BackAction onPress={() => {router.back()}}/>}
          {title? <Appbar.Content title={title} />: <Appbar.Content title="Electroad" />}
      </Appbar.Header>
    </>
  );
};

export default AppBar;
