import { Link, Route, Routes } from 'react-router-dom'

const convertCtoF = (c) => {
  return ((c * 9/5) + 32).toFixed(1);
}
const List = (props) => {
  // date, temperature, cloud cover, wind_spd
  const filterDate = () => {
    props.filter(true);
    props.search(document.getElementById('userInputDate').value);
  }

  const filterClouds = () => {
    props.filter(true);
    props.clouds(document.getElementById('userInputClouds').value);
  }

  const filterDateandClouds = () => {
    props.filter(true);
    filterDate();
    filterClouds();
  }
  return (
    <>
    <div>
      <input className='input-box' id='userInputDate' placeholder='Filter Date'></input>
      <input className='input-box' id='userInputClouds' placeholder='Filter Clouds e.g. input 2 for 2 or more clouds in a day'></input>

      <button className='search-button' onClick={filterDateandClouds}></button>
      <div className='list-container'>
        <p>Date</p>
        <p>Clouds</p>
        <p>Temperature</p>
        <p>Wind Speed</p>
        <p>Details</p>
        {props.data.map((data, index) => (
          <>
            <p>{data['datetime']}</p>
            <p>{data['clouds']}</p>
            <p>{convertCtoF(data['temp'])}</p>
            <p>{data['wind_spd']}</p>
            <Link className='link-container' to={`/${data.datetime}`}><div className='link-img'>🔗</div></Link>
          </>
        ))}
      </div>

    </div>

    </>
  )
}


export default List