import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import NavbarComponent from "../../pages/header/Navbar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pageName,setPageName] = useState('Dashboard')

  return (
    <div className="admin-layout p-0" style={{ display: 'flex', height: '100vh', overflowX: 'hidden' }}>
      {/* Sidebar - Left */}
      <div style={{ 
        width: sidebarOpen ? '250px' : '60px', 
        backgroundColor: '#f8f9fa', 
        borderRight: '1px solid #dee2e6',
        transition: 'width 0.3s ease', padding:"0px"
      }}>
        <Sidebar setPageName={setPageName} onToggle={setSidebarOpen} />
      </div>
      
      {/* Main Content Area */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        marginLeft: '0',
        transition: 'margin-left 0.3s ease',
        padding:"0px"

      }}>
        {/* Navbar - Top */}
        <div className="p-0" style={{ borderBottom: '1px solid #dee2e6', width: '100%' }}>
          <NavbarComponent pageName={pageName} />
        </div>
        
        {/* Page Content */}
        <div className="admin-scrollable-content p-0" style={{ 
          flex: 1, 
          padding: '0px', 
          overflowY: 'auto',
          overflowX: 'hidden',
          width: '100%',
          maxWidth: '100%'
        }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
