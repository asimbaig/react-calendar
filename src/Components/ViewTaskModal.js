import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { range, addTasks, deleteTask } from "../Utilities";

export default function ViewTaskModal(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setValue("details", props.task.details, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("priority", props.task.priority, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("start", props.task.start, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("startMin", props.task.startMin, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("end", props.task.end, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("endMin", props.task.endMin, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("location", props.task.location, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("repeat", props.task.repeat, {
      shouldValidate: true,
      shouldDirty: true,
    });
  });
  const onSubmit = (data) => {
    //console.log("task:>>>>> "+JSON.stringify(props.task));
    var Day = props.task.day,
      Month = props.task.month,
      Year = props.task.year;
    if (props.task.repeatbase) {
      Day = props.task.repeatbase.day;
      Month = props.task.repeatbase.month;
      Year = props.task.repeatbase.year;
    }
    var EditTask = {
      start: parseInt(data.start),
      end: parseInt(data.end),
      startMin: parseInt(data.startMin),
      endMin: parseInt(data.endMin),
      details: data.details,
      priority: data.priority,
      day: Day,
      month: Month,
      year: Year,
      location: data.location,
      repeat: data.repeat,
    };
    if (
      EditTask.start === EditTask.end &&
      EditTask.endMin <= EditTask.startMin
    ) {
      alert("Please select right start and end time values");
    } else {
      var startDate = {
        day: props.task.day,
        month: props.task.month,
        year: props.task.year,
      };
      deleteTask(props.task, startDate).then((delRes) => {
        addTasks(EditTask).then((addRes) => {
          props.onHide();
        });
      });
    }

    //console.log("task:>>>>> "+JSON.stringify(EditTask));
    // axios
    //   .put("/DailyTasks/"+props.task.year+"/"+props.task.month+"/"+props.task.day+"/" + EditTask.id + ".json", EditTask)
    //   .then((response) => {
    //     console.log(response);
    //     props.onHide();
    //   })
    //   .catch((err) => console.log(err));
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Task</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Details</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="details"
                ref={register({ maxLength: 100 })}
                placeholder="Details"
              />
              {errors.details && (
                <p>"This Field must less than 100 characters"</p>
              )}
            </div>
          </div>
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">Priority</legend>
              <div className="col-sm-10">
                <div className="form-check bg-primary text-white mb-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priority"
                    value="primary"
                    ref={register}
                  />
                  <label className="form-check-label">Low</label>
                </div>
                <div className="form-check bg-warning text-white mb-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priority"
                    value="warning"
                    ref={register}
                  />
                  <label className="form-check-label">Medium</label>
                </div>
                <div className="form-check bg-danger text-white mb-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priority"
                    value="danger"
                    ref={register}
                  />
                  <label className="form-check-label">High</label>
                </div>
              </div>
            </div>
          </fieldset>
          <hr />
          <div className="row justify-content-md-center">
            <div className="col-2">
              <label>Start</label>
            </div>
            <div className="col-5">
              <select
                className="form-control"
                name="start"
                ref={register({ required: true })}
                onChange={(e) => {
                  setStartIndex(parseInt(e.target.value) + 1);
                }}
              >
                <option></option>
                <option value="0">00</option>
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
                <option value="6">06</option>
                <option value="7">07</option>
                <option value="8">08</option>
                <option value="9">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
              </select>
            </div>
            <div className="col-5">
              <select
                className="form-control"
                name="startMin"
                ref={register({ required: true })}
              >
                <option value="0">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>
              {errors.startMin && (
                <p style={{ color: "red" }}>Must select start minutes time</p>
              )}
            </div>
          </div>

          <div className="row justify-content-md-center mt-1">
            <div className="col-2">
              <label htmlFor="inputState">End</label>
            </div>
            <div className="col-5">
              <select
                className="form-control"
                name="end"
                ref={register({ required: true })}
              >
                <option></option>
                {range(startIndex, 24).length > 0 &&
                  range(startIndex, 24).map((index) => {
                    return (
                      <option key={index} value={index}>
                        {index}
                      </option>
                    );
                  })}
              </select>
              {errors.end && (
                <p style={{ color: "red" }}>Must select end hour time</p>
              )}
            </div>
            <div className="col-5">
              <select
                className="form-control"
                name="endMin"
                ref={register({ required: true })}
              >
                <option value="0">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>
              {errors.endMin && (
                <p style={{ color: "red" }}>Must select end minutes time</p>
              )}
            </div>
          </div>
          <hr />
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Location</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="location"
                ref={register({ required: true, maxLength: 7 })}
                placeholder="PostCode"
              />
              {errors.location && <p>"Please enter PostCode as location"</p>}
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-2">
              <label>Repeat</label>
            </div>
            <div className="col-10">
              <select
                className="form-control"
                name="repeat"
                ref={register({ required: true })}
                //onChange={(e) => { setStartIndex(parseInt(e.target.value) + 1) }}
              >
                <option value="0">None</option>
                <option value="1">Repeat everyday for rest of week</option>
                <option value="2">Repeat everyday for rest of month</option>
                <option value="3">Same day of week for rest of month</option>
                {/* <option value="4">Same date of month for rest of year</option> */}
              </select>
              {/* {errors.start && <p style={{color:"red"}}>Must select start time</p>} */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success">
            Save
          </Button>
          <Button onClick={props.onHide} variant="danger">
            Close
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}