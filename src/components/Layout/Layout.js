import NavigationBar from './MainNavigation'; 

const Layout = (props) => {
  return (
    <div>
      <NavigationBar />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
