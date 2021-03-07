import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Cell from "./Cell";
import "./Calendar.css";
import { connect } from "react-redux";
import ViewTaskModal from "./ViewTaskModal";
import {
  getMonthlyTasks,
  getDailyTasks,
  setCurrentDate,
  changeEmail,
  changePassword,
  auth,
  authCheckState,
  setCalendarMode
} from "../store/actions/index";
import Button from "react-bootstrap/Button";
import {
  range,
  DateOutTime,
  months,
  TotalHours,
  rows,
  dayColumns,
  daysInMonth
} from "../Utilities";
import AppointmentModal from "./AppointmentModal";

const Calendar = (props) => {
  const [currentDateDay, setCurrentDateDay] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  
  const [selectedTask, setSelectedTask] = useState({});
  const [firstDay, setFirstDay] = useState(new Date(currentYear, currentMonth).getDay());
  const [addModalShow, setAddModalShow] = useState(false);
  const [viewModalShow, setViewModalShow] = useState(false);
  const [allowAddEdit, setAllowAddEdit] = useState(false);
  
  useEffect(() => {
    if (props.currentDate) {
      setCurrentDateDay(props.currentDate.day);
      setCurrentMonth(props.currentDate.month);
      setCurrentYear(props.currentDate.year);
      setFirstDay(
        new Date(
          props.currentDate.year,
          props.currentDate.month - 1
        ).getDay() === 0
          ? 7
          : new Date(
              props.currentDate.year,
              props.currentDate.month - 1
            ).getDay()
      );
      setAllowAddEdit(
        DateOutTime(
          new Date(
            props.currentDate.year +
              "/" +
              props.currentDate.month +
              "/" +
              props.currentDate.day
          )
        ) < DateOutTime(new Date())
      );
      if ( props.isAuthenticated ) {
        if (props.calendarMode) {
          props.getMonthlyTasks(props.currentDate.year, props.currentDate.month);
        } else if (!props.calendarMode) {
          props.getDailyTasks(
            props.currentDate.year,
            props.currentDate.month,
            props.currentDate.day
          );
        }
      }
    } else {
      setCurrentDateDay(new Date().getDate());
      setCurrentMonth(new Date().getMonth() + 1);
      setCurrentYear(new Date().getFullYear());
      props.setCurrentDate({
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      });
      setFirstDay(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1 - 1
        ).getDay() === 0
          ? 7
          : new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1 - 1
            ).getDay()
      );
      setAllowAddEdit(
        DateOutTime(
          new Date(
            new Date().getFullYear() +
              "/" +
              (new Date().getMonth() + 1) +
              "/" +
              new Date().getDate()
          )
        ) < DateOutTime(new Date())
      );
      if ( props.isAuthenticated ) {
      if (props.calendarMode) {
        props.getMonthlyTasks(
          new Date().getFullYear(),
          new Date().getMonth() + 1
        );
      } else if (!props.calendarMode) {
        props.getDailyTasks(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          new Date().getDate()
        );
      }
    }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.currentDate) {
      setCurrentDateDay(props.currentDate.day);
      setCurrentMonth(props.currentDate.month);
      setCurrentYear(props.currentDate.year);
      setFirstDay(
        new Date(
          props.currentDate.year,
          props.currentDate.month - 1
        ).getDay() === 0
          ? 7
          : new Date(
              props.currentDate.year,
              props.currentDate.month - 1
            ).getDay()
      );
      setAllowAddEdit(
        DateOutTime(
          new Date(
            props.currentDate.year +
              "/" +
              props.currentDate.month +
              "/" +
              props.currentDate.day
          )
        ) < DateOutTime(new Date())
      );
      if ( props.isAuthenticated ) {
      if (props.calendarMode) {
        props.getMonthlyTasks(props.currentDate.year, props.currentDate.month);
      } else if (!props.calendarMode) {
        props.getDailyTasks(
          props.currentDate.year,
          props.currentDate.month,
          props.currentDate.day
        );
      }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentDate]);

  useEffect(()=>{
    if(props.currentDate){
      props.getDailyTasks(
        props.currentDate.year,
        props.currentDate.month,
        props.currentDate.day
      );
    }
  },[props.calendarMode]);
  
  const onMonthChange = (NewMonth) => {
    setCurrentMonth(NewMonth);
    props.setCurrentDate({
      day: 1,
      month: NewMonth,
      year: currentYear,
    });
    setCurrentDateDay(1);
  };

  const onYearChange = (NewYear) => {
    setCurrentYear(NewYear);
    props.setCurrentDate({
      day: 1,
      month: currentMonth,
      year: NewYear,
    });
    setCurrentDateDay(1);
  };

  const nextMonth = () => {
    if (props.calendarMode) {
      setCurrentYear(currentMonth === 12 ? currentYear + 1 : currentYear);
      setCurrentMonth(currentMonth === 12 ? 1 : currentMonth + 1);
      props.setCurrentDate({
        day: 1,
        month: currentMonth === 12 ? 1 : currentMonth + 1,
        year: currentMonth === 12 ? currentYear + 1 : currentYear,
      });
    } else {
      var date = new Date(
        props.currentDate.year +
          "/" +
          props.currentDate.month +
          "/" +
          props.currentDate.day
      );
      date.setDate(date.getDate() + 1);
      props.setCurrentDate({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
      setCurrentDateDay(date.getDate());
    }
  };

  const previousMonth = () => {
    if (props.calendarMode) {
      setCurrentYear(currentMonth === 1 ? currentYear - 1 : currentYear);
      setCurrentMonth(currentMonth === 1 ? 12 : currentMonth - 1);
      props.setCurrentDate({
        day: 1,
        month: currentMonth === 1 ? 12 : currentMonth - 1,
        year: currentMonth === 1 ? currentYear - 1 : currentYear,
      });
    } else {
      var date = new Date(
        props.currentDate.year +
          "/" +
          props.currentDate.month +
          "/" +
          props.currentDate.day
      );
      date.setDate(date.getDate() - 1);
      props.setCurrentDate({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
      setCurrentDateDay(date.getDate());
    }
  };

  // const renderDailyCalendar = () => {
  //   return props.dailytasks.length > 0 &&
  //   TotalHours.map((h) => {
  //     return (
  //       <tr key={h}>
  //         <td
  //           key={h + "-c1"}
  //           className="bg-dark text-light"
  //           style={{
  //             width: "50px",
  //             height: "50px",
  //             verticalAlign: "center",
  //           }}
  //         >
  //           <strong>{h < 10 ? "0" + h : h}</strong>
  //         </td>
  //         {props.dailytasks.map((task, index) => {
  //           return (
  //             <td
  //               key={h + "-c" + task.id + index}
  //               className={
  //                 task.start <= h && task.end > h
  //                   ? "bg-" + task.priority
  //                   : ""
  //               }
  //               style={{
  //                 cursor: "pointer",
  //                 whiteSpace: "nowrap",
  //                 overflow: "hidden",
  //                 textOverflow: "ellipsis",
  //                 verticalAlign: "center",
  //               }}
  //               onClick={() => {
  //                 setSelectedTask(task);
  //                 setViewModalShow(true);
  //               }}
  //             >
  //               {task.start <= h && task.end > h && (
  //                 <span></span>
  //               )}

  //               {task.start === h ? task.details : ""}
  //             </td>
  //           );
  //         })}
  //       </tr>
  //     );
  //   })
  // };

  const renderDailyCalendar = () => {
    let StartHour = 0, EndHour = 0;
    let dailyHoursArray = [];
    if(props.dailytasks.length > 0){
      if(props.dailytasks[0]){
        StartHour = props.dailytasks[0].start;
      }
      if(props.dailytasks[props.dailytasks.length-1]){
        EndHour = props.dailytasks[props.dailytasks.length-1].end;
      }
      if(StartHour >= 0 && EndHour > 0){
        dailyHoursArray = range(StartHour, EndHour-1);
      }
    }
    
    return props.dailytasks.length > 0 &&
    dailyHoursArray.map((h) => {
      return (
        <tr key={h}>
          <td
            key={h + "-c1"}
            className="bg-dark text-light"
            style={{
              width: "50px",
              height: "50px",
              verticalAlign: "center",
            }}
          >
            <strong>{h < 10 ? "0" + h : h}</strong>
          </td>
          {props.dailytasks.map((task, index) => {
            return (
              <td
                key={h + "-c" + task.id + index}
                className={
                  task.start <= h && task.end > h
                    ? "bg-" + task.priority
                    : ""
                }
                style={{
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  verticalAlign: "center",
                }}
                onClick={() => {
                  setSelectedTask(task);
                  setViewModalShow(true);
                }}
              >
                {task.start <= h && task.end > h && (
                  <span></span>
                )}

                {task.start === h ? 
                  <div>
                    <div>task.details</div>
                    <div>Start: {task.start}:
                      {task.startMin < 10 ? "0" + task.startMin : task.startMin}{" "}
                      - End: {task.end}:
                      {task.endMin < 10 ? "0" + task.endMin : task.endMin}
                    </div>
                  </div> : ""}
              </td>
            );
          })}
        </tr>
      );
    })
  };

  const renderMonthCalendar = () => {
    let date = 1;
    return rows.map((r) => {
      return (
        <tr className="grey" key={r}>
          {dayColumns.map((c) => {
            if (r === 1 && c.index < firstDay) {
              return (
                <td
                  className="bg-light hide_td"
                  key={r + "" + c.index}
                  data-th={c.weekday}
                ></td>
              );
            } else if (date > daysInMonth(currentYear, currentMonth)) {
              return null;
            } else {
              date++;
              return (
                <Cell
                  key={date - 1 + "-" + currentMonth + "-" + currentYear}
                  day={date - 1}
                  row={r}
                  col={c.index}
                  month={currentMonth}
                  year={currentYear}
                  dayOfWeek={c.weekday}
                  cellClick={() => {
                    // var currentDate = ;
                    props.setCurrentDate({
                      day: date - 1,
                      month: currentMonth,
                      year: currentYear,
                    });
                  }}
                  dayTasks={props.monthlytasks.filter(
                    (x) => x.day === date - 1
                  )}
                />
              );
            }
          })}
        </tr>
      );
    });
  };
  
  return (
    <div style={{ backgroundColor: " lightgrey" }}>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col">
              {/* <button
                className="btn btn-outline-primary col-sm-6"
                style={{width:"40px"}}
                onClick={() => previousMonth()}
              >
                <i className="bi bi-caret-left-fill mb-1"></i>
              </button> */}
              <span onClick={() => previousMonth()} style={{cursor: "pointer"}}>
                <h1>
                  <i className="bi bi-chevron-double-left"></i>
                  </h1>
              </span>
            </div>
            <div className="col">
              <h3 style={{color:"black"}}>
                {!props.calendarMode && currentDateDay + " "}
                {months[currentMonth - 1] + " " + currentYear}
              </h3>
            </div>
            <div className="col">
              {/* <button
                className="btn btn-outline-primary col-sm-6"
                style={{width:"40px"}}
                onClick={() => nextMonth()}
              >
                <i className="bi bi-caret-right-fill mb-1"></i>
              </button> */}
              <span onClick={() => nextMonth()}  style={{cursor: "pointer"}}>
                <h1>
                  <i className="bi bi-chevron-double-right"></i>
                </h1>
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <Form>
                <Form.Group controlId="selectMon">
                  <Form.Control
                    as="select"
                    value={currentMonth}
                    onChange={(e) => {
                      setCurrentMonth(parseInt(e.target.value));
                      onMonthChange(parseInt(e.target.value));
                    }}
                  >
                    <option value={1}>JANUARY</option>
                    <option value={2}>FEBRUARY</option>
                    <option value={3}>MARCH</option>
                    <option value={4}>APRIL</option>
                    <option value={5}>MAY</option>
                    <option value={6}>JUNE</option>
                    <option value={7}>JULY</option>
                    <option value={8}>AUGUEST</option>
                    <option value={9}>SEPTEMBER</option>
                    <option value={10}>OCTOBER</option>
                    <option value={11}>NOVEMBER</option>
                    <option value={12}>DECEMBER</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            <div className="col-lg-6">
              <Form>
                <Form.Group controlId="selectYr">
                  <Form.Control
                    as="select"
                    value={currentYear}
                    onChange={(e) => {
                      setCurrentYear(parseInt(e.target.value));
                      onYearChange(parseInt(e.target.value));
                    }}
                  >
                    <option value={2000}>2000</option>
                    <option value={2001}>2001</option>
                    <option value={2002}>2002</option>
                    <option value={2003}>2003</option>
                    <option value={2004}>2004</option>
                    <option value={2005}>2005</option>
                    <option value={2006}>2006</option>
                    <option value={2007}>2007</option>
                    <option value={2008}>2008</option>
                    <option value={2009}>2009</option>
                    <option value={2010}>2010</option> 
                    <option value={2011}>2011</option>
                    <option value={2012}>2012</option>
                    <option value={2013}>2013</option>
                    <option value={2014}>2014</option>
                    <option value={2015}>2015</option>
                    <option value={2016}>2016</option>
                    <option value={2017}>2017</option>
                    <option value={2018}>2018</option>
                    <option value={2019}>2019</option>
                    <option value={2020}>2020</option>
                    <option value={2021}>2021</option>
                    <option value={2022}>2022</option>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {props.isAuthenticated && !props.calendarMode && (
                <Button
                  variant="outline-success"
                  onClick={() => setAddModalShow(true)}
                  disabled={allowAddEdit}
                >
                  ADD TASK
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          {props.calendarMode && (
            <div
              className="container-fluid mt-2"
              // style={{ height: dailyDivHeight + "px" }}
            >
              <table className="responsive_table table-bordered mb-0  mt-2">
                <thead className="bg-dark text-light">
                  <tr>
                    <th className="p-0">MONDAY</th>
                    <th className="p-0">TUESDAY</th>
                    <th className="p-0">WEDNESDAY</th>
                    <th className="p-0">THURSDAY</th>
                    <th className="p-0">FRIDAY</th>
                    <th className="p-0">SATURDAY</th>
                    <th className="p-0">SUNDAY</th>
                  </tr>
                </thead>
                <tbody>{renderMonthCalendar()}</tbody>
              </table>
            </div>
          )}
          {!props.calendarMode && (
            <div
              className="container-fluid mt-2"
              // style={{ height: dailyDivHeight + "px" }}
            >
              <table className="table" style={{ verticalAlign: "center", tableLayout: "fixed" }}>
                <tbody>
                  {renderDailyCalendar()}
                  {props.dailytasks.length === 0 && (
                    <tr>
                      <td>No tasks for this date</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AppointmentModal
        show={addModalShow}
        onHide={() => {
          setAddModalShow(false);
          props.getDailyTasks(currentYear, currentMonth, currentDateDay);
        }}
        date={{ day: currentDateDay, month: currentMonth, year: currentYear }}
      />

      <ViewTaskModal
        show={viewModalShow}
        onHide={() => {
          setViewModalShow(false);
          props.getDailyTasks(currentYear, currentMonth, currentDateDay);
        }}
        task={selectedTask}
      />
      
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    calendarMode: state.calendarMode,
    dailytasks: state.dailytasks,
    monthlytasks: state.monthlytasks,
    currentDate: state.currentDate,
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = { setCalendarMode, getMonthlyTasks, getDailyTasks, setCurrentDate, changeEmail, changePassword, auth, authCheckState };

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
