import { Outlet } from "react-router-dom";

import Header from "../../components/layout/header/component";

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default RootLayout;