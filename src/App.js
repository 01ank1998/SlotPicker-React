import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './index.css';
import moment from "moment";

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      startDate:new Date(),
      selectedHour:'',
      selectedSlot : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.updateHour = this.updateHour.bind(this);
    this.updateSlot = this.updateSlot.bind(this);
    this.alertData = this.alertData.bind(this);
  }
  
  //This function is used to handle the change in date
  handleChange (date) {
    this.setState({startDate: date})
    this.toggleCalendar()
  }
  
  toggleCalendar (e) {
    e && e.preventDefault()
    this.setState({isOpen: !this.state.isOpen})
  }

  //This function updates the state of hour
  updateHour(e){
     this.setState({selectedHour:`${e}`})
     
  }

   //This function updates the state of hour
  updateSlot(e){
    
    this.setState({selectedSlot:`${e}`})
    }

  //This function sends the date and slot ID to the console  
  alertData(){
    let selectDate = moment(this.state.startDate).format('ddd,MMM D YYYY')
    if(this.state.selectedSlot !== '')
    console.log('Selected Date '+selectDate+'\n Selected slot ' + this.state.selectedSlot )
  }

  render() {
    let selectDate = moment(this.state.startDate).format('ddd,MMM D YYYY')
    let date =  [
      {
        "date": "Sat,Mar 30 2019",
        "date_slots": [
          
        ]
      },
      {
        "date": "Thu,Mar 28 2019",
        "date_slots": [
          
        ]
      },
      {
        "date": "Sun,Mar 31 2019",
        "date_slots": [
          
        ]
      },
      {
    
        "date": "Mon,Apr 1 2019",
        "date_slots": [
          
        ]
      },
      {
        "date": "Wed,Mar 27 2019",
        "date_slots": [
          {
            "hour": "8",
            "hour_slots": [
              {
                "08:10 AM": "slotId001"
              },
              {
                "08:50 AM": "slotId005"
              }
            ]
          },
          {
            "hour": "3",
            "hour_slots": [
              {
                "03:00 PM": "slotId005"
              },
              {
                "03:30 PM": "slotId007"
              }
            ]
          }
        ]
      },
      {
        "date": "Wed,Apr 3 2019",
        "date_slots": [
          
        ]
      },
      {
        "date": "Thu,Apr 4 2019",
        "date_slots": [
          {
            "hour": "4",
            "hour_slots": [
              {
                "04:30 PM": "slotId105"
              },
              {
                "04:50 PM": "slotId106"
              }
            ]
          },
          {
            "hour": "5",
            "hour_slots": [
              {
                "05:30 PM": "slotId202"
              },
              {
                "05:45 PM": "slotId208"
              }
            ]
          }
        ]
      }
    ]
    return (
      
      <div className='date'>
          {
            //div element for getting the date
          }
          <div>
              <button
                  className="example-custom-input"
                  onClick={this.toggleCalendar}>
                  {moment(this.state.startDate).format('DD-MM-YYYY')}
              </button>
              {
                  this.state.isOpen && (
                      <DatePicker
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                          includeDates={date.map((d)=> new Date(d.date))}
                          withPortal
                          inline />
                  )
              }
          </div>


          {
            //div element for getting the hour
          }
          <div>
            <select 
               value={this.state.selectedHour}
               onChange ={(e)=>this.updateHour(e.target.value)}
               placeholder = 'Hour'>
               <option>Select Hour</option>
               {date.filter((d)=>d.date===selectDate)[0].date_slots.map((h)=>(
                 <option value ={h.hour}>{h.hour}</option>))}
            </select> 
          </div>



          {
            //div element for getting the slot
          }
           {(date.filter((d)=>d.date===selectDate)[0].date_slots.filter((h)=>h.hour===this.state.selectedHour)[0] !== undefined)&&( <div>
            <select 
                value={this.state.selectedSlot}
                onChange ={(e)=> this.updateSlot(e.target.value)}
                placeholder = 'Slot'>
                <option>Select Slot</option>
                {date.filter((d)=>d.date===selectDate)[0].date_slots.filter((h)=>h.hour===this.state.selectedHour)[0].hour_slots.map((h)=>(
                  <option value={(Object.values(h)[0])}>{Object.keys(h)[0]}</option>
                ))}
              </select> 
           </div>)}

          {
            //Displays No slot available if slot not available
          }
           {(date.filter((d)=>d.date===selectDate)[0].date_slots.length === 0)&&(<h3>No slot available</h3>)}

          {
            //Button to send Date and slot ID 
          }
           <button onClick={this.alertData}>submit</button>


           <h3>For output see the console</h3>
      </div>
    );
  }
}

export default App;
