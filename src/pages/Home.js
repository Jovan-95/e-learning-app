import Navigation from "../components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, removeCourse } from "../redux/coursesSlice";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { Link, Outlet } from "react-router-dom";
import "../CSS/home.css";

function Home() {
  const dispatch = useDispatch();
  // Getting values from coursesSlice through the store
  const { courses, status, error } = useSelector((state) => state.courses);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Calling request
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  // Filter existing by search name
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div style={{ width: "100%" }}>
        <h2>HOME</h2>

        <Navigation />
        <div>
          <h3>Courses</h3>
          <label>Search by title:</label>
          <input
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            type="text"
            placeholder="Search by name"
          />
          {paginatedCourses.map((course) => (
            <li key={course.id}>
              <Link to={`/home/${course.id}`}>
                <span>{course.title}</span>
              </Link>
            </li>
          ))}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginatedCourses={courses}
            itemsPerPage={itemsPerPage}
          />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Home;
