import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Citation: https://www.npmjs.com/package/react-big-calendar
// Citation: https://github.com/arecvlohe/rbc-with-dnd-starter/blob/master/src/App.js

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

class MyCalendar extends Component {
  state = {
    plan: [
      {
        start: moment().toDate(),
        end: moment().toDate(),
        //end: moment().add(1, "days").toDate(),
        title: "Breakfast",
      },
      {
        start: moment().toDate(),
        end: moment().toDate(),
        title: "Lunch",
      },
      {
        start: moment().toDate(),
        end: moment().toDate(),
        title: "Dinner",
      },
    ],
  };

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.plan[0].start = start;
      state.plan[0].end = end;
      return { plan: [...state.plan] };
    });
  };

  onEventDrop = (data) => {
    console.log(data);
  };

  render() {
    return (
      <div className="App">
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={this.state.plan}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default MyCalendar;
