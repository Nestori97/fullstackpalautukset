import { useState } from 'react'
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const Statistics  = (props) => {
  const average = (props.good +props.bad*(-1))/props.all
  const positives = props.good/props.all
  if(props.all<=0){
    return (
      <div>
        <p> No Feedback given</p>
      </div>
    )
  }
   return(
  <div>
  <h1>Statistics</h1>
  <table>
  <tbody>
    <tr><StatisticLine text="good" value = {props.good}/></tr>
    <tr><StatisticLine text="neutral" value = {props.neutral}/></tr>
    <tr><StatisticLine text="bad" value = {props.bad}/></tr>
    <tr><StatisticLine text="all" value = {props.all}/></tr>
    <tr><StatisticLine text="average" value = {average}/></tr>
    <tr><StatisticLine text="positives" value = {positives} percent = "%"/></tr>
    </tbody>
    </table>
  </div>
)
}
const StatisticLine = (props) => (
 <td>{props.text} {props.value}{props.percent}</td>
    
)
const App = () => {
      const [good, setGood] = useState(0)
      const [neutral, setNeutral]  = useState(0)
      const [bad, setBad] = useState(0)
      const all = good + neutral + bad
      return (
        <div>
          <h1>Give feedback</h1>
          <Button handleClick={()=>setGood(good+1)} text="good" ></Button>
          <Button handleClick={()=>setNeutral(neutral+1)} text="neutral" ></Button>
          <Button handleClick={()=>setBad(bad+1)} text="bad" ></Button>
          <Statistics  good = {good} neutral = {neutral} bad = {bad} all= {all}> </Statistics >
        </div>
      )
}

export default App
