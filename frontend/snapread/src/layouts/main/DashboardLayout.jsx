import Dashboard from '../../components/main/Dashboard';
import SideBar from '../../components/sideBar/SideBar';

function DashboardLayout() {
  return (
    <div className="flex w-screen h-screen">
      <SideBar />
      <Dashboard />
    </div>
  );
}

export default DashboardLayout;
