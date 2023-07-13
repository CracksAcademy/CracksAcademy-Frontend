import React, { useState, useEffect } from 'react';
import fetchData from '../../services/utils/fetchData';
import coachService from '../../services/coaches';
import studentService from '../../services/students';


export default function UserFormRol(roleSelected, createdUser) {

  const [moneybox, setMoneybox] = useState('');
  const [coordinator, setCoordinator] = useState('');
  const [course, setCourse] = useState('');
  // const [coach, setCoach] = useState('');

  const [courses, setCourses] = useState([]);
  const [coaches, setCoaches] = useState([]);

  const handleMoneyboxChange = (event) => setMoneybox(event.target.value);
  const handleCoordinatorChange = (event) => setCoordinator(event.target.value);
  const handleCourseChange = (event) => setCourse(event.target.value);
  // const handleCoachChange = (event) => setCoach(event.target.value);

  useEffect(() => {
    if (roleSelected.roleSelected == 3) {
      fetchData(studentService.courses, setCourses);
      fetchData(coachService.allCoaches, setCoaches);
    }
  }, [roleSelected.roleSelected]);

  console.log(coaches);

  console.log("rol", roleSelected);
  console.log("user", createdUser);

  const handleCreateRol = async (event) => {
    event.preventDefault();
    if (roleSelected.roleSelected == 1) {
      try {
        console.log("entra");
        const newCoach = {
          moneybox: moneybox,
          coordinator: coordinator,
          user: roleSelected.createdUser,
        };
        const response = await coachService.newCoach(newCoach);
        console.log("respuesta",response);
      } catch (error) {
        console.log(error);
      }
    } else if (roleSelected.roleSelected == 3) {
      try {
        const newStudent = {
          course: course,
          moneybox: moneybox,
          user: roleSelected.createdUser,
          //coach: coach,
        };
        const response = await studentService.newStudent(newStudent);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    window.location.href = '/';
  };


  return (
    <>
      {roleSelected.roleSelected == 1 && (
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-4">
            <h1 className="text-center pt-4 pb-4">Registro de coach</h1>
            <form onSubmit={handleCreateRol}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={moneybox}
                  name="Moneybox"
                  placeholder="Moneybox"
                  onChange={handleMoneyboxChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={coordinator}
                  name="Coordinator"
                  placeholder="Coordinator"
                  onChange={handleCoordinatorChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Registrarse
              </button>
            </form>

          </div>
        </div>
      )};

      {roleSelected.roleSelected == 3 && (
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-4">
            <h1 className="text-center pt-4 pb-4">Registro de alumno</h1>
            <form onSubmit={handleCreateRol}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={moneybox}
                  name="Moneybox"
                  placeholder="Moneybox"
                  onChange={handleMoneyboxChange}
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-control"
                  value={course}
                  name="course"
                  placeholder="Curso del alumno"
                  onChange={handleCourseChange}
                >
                  <option value="">Selecciona un curso</option>
                  {courses.map((curso) => (
                    <option key={curso.id} value={curso.id}>
                      {curso.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div className="mb-3">
                <select
                  className="form-control"
                  value={coach}
                  name="coach"
                  placeholder="Coach del alumno"
                  onChange={handleCoachChange}
                >
                  <option value="">Selecciona un coach</option>
                  {coaches.map((coach) => (
                    <option key={coach.id} value={coach.id}>
                      {coach.name}
                    </option>
                  ))}
                </select>
              </div> */}

              <button type="submit" className="btn btn-primary">
                Registrarse
              </button>
            </form>

          </div>
        </div>
      )}
    </>

  );


}