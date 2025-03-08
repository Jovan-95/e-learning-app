import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();
  const { courses } = useSelector((state) => state.courses);
  const course = courses.find((course) => course.id === Number(id)); // Convert id to number

  if (!course) {
    return <h2>Course not found</h2>;
  }
  return (
    <>
      <h2>Course Details</h2>
      <Navigation />
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
      </div>
    </>
  );
}

export default CourseDetails;
