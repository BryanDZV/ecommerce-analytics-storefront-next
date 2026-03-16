import Image from 'next/image';
import ProductGrid from './product/ProductGrid';
import SideBar from './Sidebar';

export default function GridPage() {
  return (
    <>
      <div className="gridPage">
        <div className="sidebar-grid">
          <SideBar></SideBar>
        </div>
        <div>
          <ProductGrid></ProductGrid>
        </div>
      </div>
    </>
  );
}
