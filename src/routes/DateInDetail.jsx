const DateInDetail = (props) => {
  const { datetime, clouds, temp, max_temp, min_temp, wind_spd } = props.data;
  return (
    <>
    <div className="right-container">
      <p>Datatime: {datetime}</p>
      <p>Clouds: {clouds}</p>
      <p>Temperature: {temp}</p>
      <p>Max Temperature: {max_temp}</p>
      <p>Min Temperature: {min_temp}</p>
      <p>Wind Speed: {wind_spd}</p>

    </div>
    </>
  )
}

export default DateInDetail;