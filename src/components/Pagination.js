function Pagination({
  currentPage,
  setCurrentPage,
  paginatedCourses,
  itemsPerPage,
}) {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        Previous
      </button>
      <button
        disabled={
          currentPage === Math.ceil(paginatedCourses.length / itemsPerPage)
        }
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
