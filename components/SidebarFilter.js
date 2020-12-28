const SidebarFilter = () => {
  return (
    <div className="sidebar">
      <h2 className="text-lg font-medium">Filter</h2>

      <form>
        <div className="sidebar-section">
          <h5 className="font-medium">Brand</h5>
          <select>
            <option value="brand1">Brand 1</option>
            <option value="brand2">Brand 2</option>
            <option value="brand3">Brand 3</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default SidebarFilter;
