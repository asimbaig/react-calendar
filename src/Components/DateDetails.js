import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AppointmentModal from "./AppointmentModal";
import ViewTaskModal from "./ViewTaskModal";
import { connect } from "react-redux";
import { getMonthlyTasks, setCurrentDate } from "../store/actions/index";
import { DateOutTime, deleteTask } from "../Utilities";

function DateDetails(props) {
  const [addModalShow, setAddModalShow] = useState(false);
  const [viewModalShow, setViewModalShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [tasks, setTasks] = useState([]);
  var CellData = props.location.state;

  const [allowAddEdit, setAllowAddEdit] = useState(false);
  const [months] = useState([
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUEST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ]);

  // const deleteTask = (task) => {
  //   var Day = CellData.day,
  //     Month = CellData.month,
  //     Year = CellData.year;
  //   if (task.repeatbase) {
  //     Day = task.repeatbase.day;
  //     Month = task.repeatbase.month;
  //     Year = task.repeatbase.year;
  //   }
  //   var TaskId = task.id;

  //   if (TaskId.charAt(0) !== "-") {
  //     TaskId = TaskId.slice(TaskId.indexOf("-"));
  //   }
  //   axios
  //     .delete(
  //       "/DailyTasks/" + Year + "/" + Month + "/" + Day + "/" + TaskId + ".json"
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       props.getMonthlyTasks(CellData.year, CellData.month);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  useEffect(() => {
    setTasks(
      props.monthlytasks.filter(
        (t) =>
          t.day === CellData.day &&
          t.month === CellData.month &&
          t.year === CellData.year
      )
    );
    setAllowAddEdit(
      DateOutTime(
        new Date(CellData.year + "/" + CellData.month + "/" + CellData.day)
      ) < DateOutTime(new Date())
    );
  }, [props.monthlytasks]);

  return (
    <div
      className="container-fluid center pt-2"
    >
      {/* <div className="row ml-2">
        <Link to="/">
          <h1>
            <i className="bi bi-arrow-return-left"></i>
          </h1>
        </Link>
      </div> */}
      <br/>
      <div className="row justify-content-center">
        <Card
          bg="dark"
          text="white"
          style={{ width: "15rem" }}
          className="mb-2"
        >
          <Card.Header>
            <p className="h3">{months[CellData.month - 1]}</p>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <h1 className="display-3">{CellData.day}</h1>
              {CellData.dayOfWeek}
            </Card.Title>
          </Card.Body>
          <Card.Footer>
            <p className="h3">{CellData.year}</p>
          </Card.Footer>
        </Card>
      </div>
      <Button
        variant="outline-success"
        onClick={() => setAddModalShow(true)}
        style={{ width: "240px" }}
        disabled={allowAddEdit}
      >
        ADD TASK
      </Button>
      <hr />
      <div className="row  mr-2 float-right">
        <Link to="/">
          <h1>
            <i className="bi bi-arrow-return-left"></i>
          </h1>
        </Link>
      </div>


      <div className="row justify-content-center mt-2">
        {tasks.length > 0 &&
          tasks.map((task) => (
            <div key={"col" + task.id}>
              <Card
                bg={task.priority}
                key={task.id}
                text="white"
                style={{ width: "18rem" }}
                className="shadow-sm m-3"
              >
                <Card.Header>
                  {task.day < 10 ? "0" + task.day : task.day} .{" "}
                  {task.month < 10 ? "0" + task.month : task.month} .{" "}
                  {task.year}
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    <Badge pill variant="light">
                      Start: {task.start}:
                      {task.startMin < 10 ? "0" + task.startMin : task.startMin}{" "}
                      - End: {task.end}:
                      {task.endMin < 10 ? "0" + task.endMin : task.endMin}
                    </Badge>
                  </Card.Title>
                  <Card.Text style={{color:"white"}}>
                    {task.details}
                    <br />
                    <strong>{task.location}</strong>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="p-0">
                  <ButtonGroup style={{ width: "100%" }}>
                    <Button
                      variant="light"
                      onClick={() => {
                        setSelectedTask(task);
                        setViewModalShow(true);
                      }}
                      disabled={allowAddEdit}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        deleteTask(task, 
                        {day: CellData.day, month: CellData.month, year: CellData.year}).then((delRes) => {
                          props.getMonthlyTasks(CellData.year, CellData.month);  
                            });
                      }}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </Card.Footer>
              </Card>
            </div>
          ))}
      </div>

      <AppointmentModal
        show={addModalShow}
        onHide={() => {
          setAddModalShow(false);
          props.getMonthlyTasks(CellData.year, CellData.month);
        }}
        date={CellData}
      />
      <ViewTaskModal
        show={viewModalShow}
        onHide={() => {
          setViewModalShow(false);
          props.getMonthlyTasks(CellData.year, CellData.month);
        }}
        task={selectedTask}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    monthlytasks: state.monthlytasks,
    currentDate: state.currentDate,
  };
};

const mapDispatchToProps = { getMonthlyTasks, setCurrentDate };

export default connect(mapStateToProps, mapDispatchToProps)(DateDetails);
