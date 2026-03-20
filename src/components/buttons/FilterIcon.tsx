import Image from 'next/image';
import SideBar from '../Sidebar';
import toggleFilters from '../Sidebar';

export default function Filtericon() {
  return (
    <>
      <div className="filterBox">
        <button className="filterButton">
          <img className="filterImage" src="/filter.png" alt="filter image" />
        </button>
      </div>
    </>
  );
}
