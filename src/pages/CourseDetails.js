import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { removeCourse } from "../redux/coursesSlice";
import { enrollCourse } from "../redux/authSlice";
import Modal from "../components/modal";
import { useState } from "react";

function CourseDetails() {
  const { id } = useParams();
  const { courses } = useSelector((state) => state.courses);
  const course = courses.find((course) => course.id === Number(id)); // Convert id to number
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  if (!course) {
    return <h2>Course not found</h2>;
  }

  function removeModal() {
    setIsOpen((state) => !state);
  }

  function enrollModal() {
    setIsEnrollModalOpen((state) => !state);
  }

  // Remove course
  function handleRemoveCourse(course) {
    // console.log(course);
    dispatch(removeCourse(course.id));
    navigate("/home");
  }

  // Enroll course
  function handleCourseEnroll(course) {
    console.log("Enroll this course:", course);
    dispatch(enrollCourse(course));
    navigate("/userDashboard");
  }

  return (
    <>
      <h2>Course Details - single page</h2>
      <div>
        <h3>Details</h3>
        <p>
          <strong>Title:</strong> {course.title}
        </p>
        <p>
          <strong>Body:</strong> {course.body}
        </p>
        <p>
          <strong>ID:</strong> {course.id}
        </p>
        <div>
          <button onClick={removeModal}>Remove course?</button>
          <button onClick={enrollModal}>Enroll this course?</button>
        </div>
        <div className={isOpen ? "d-block" : "d-none"}>
          <Modal>
            <span onClick={removeModal} className="close">
              &times;
            </span>

            <p>Delete this course?</p>
            <button onClick={() => handleRemoveCourse(course)}>
              Remove course!
            </button>
          </Modal>
        </div>
        <div className={isEnrollModalOpen ? "d-block" : "d-none"}>
          <Modal>
            <span onClick={enrollModal} className="close">
              &times;
            </span>

            <p>Enroll this course?</p>
            <button onClick={() => handleCourseEnroll(course)}>
              Enroll course!
            </button>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default CourseDetails;
