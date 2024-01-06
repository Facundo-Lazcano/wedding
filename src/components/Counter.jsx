/* eslint-disable react/prop-types */
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { AddToCalendarButton } from 'add-to-calendar-button-react'
import useIsMobile from '../hooks/useIsMobile'

const useStyles = isMobile => ({
  timeLeft: {
    textAlign: 'center',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(27,27,27,0.9)',
    padding: '15px'
  },
  timeLeftContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    padding: '10px',
    fontWeight: 'bold',
    fontFamily: 'Centaur, sans-serif'
  },
  timeLeftCard: {
    textAlign: 'center',
    border: '2px solid rgb(219, 172, 52)',
    boxShadow: '10px 5px 5px black',
    borderRadius: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: isMobile ? '80px' : '90px',
    height: isMobile ? '80px' : '90px',
    padding: '10px',
    color: 'white'
  },
  date: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: '3vh',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Centaur, sans-serif',
    marginRight: '45px'
  },
  dateBox: {
    borderTop: '2px solid white',
    borderBottom: '2px solid white',
    height: 'fit-content',
    margin: '50px 0'
  },
  number: {
    fontSize: '90px'
  },
  dateNumber: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default function TimeLeftCounter () {
  const isMobile = useIsMobile()
  const styles = useStyles(isMobile)
  const epochTime = 1710014400
  // State to store the time left
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(epochTime))

  // Calculate the time left
  function calculateTimeLeft (epochTime) {
    const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds
    const timeLeftInSeconds = epochTime - currentTime
    if (timeLeftInSeconds <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
    const days = Math.floor(timeLeftInSeconds / 86400)
    const hours = Math.floor((timeLeftInSeconds % 86400) / 3600)
    const minutes = Math.floor((timeLeftInSeconds % 3600) / 60)
    const seconds = timeLeftInSeconds % 60
    return { days, hours, minutes, seconds }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Recalculate and update the time left every second
      setTimeLeft(calculateTimeLeft(epochTime))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [epochTime])

  return (
    <Grid style={styles.timeLeft}>
      <Grid style={styles.date}>
        <Grid style={styles.dateBox}>SABADO</Grid>
        <Grid style={styles.dateNumber}>
          <div className='warp' aria-labelledby='warp-label'>
            <span>
              <span className='warp__0'>M</span>
              <span className='warp__1'>A</span>
              <span className='warp__2'>R</span>
              <span className='warp__3'>Z</span>
              <span className='warp__4'>O</span>
            </span>
          </div>
          <Grid style={styles.number}>9</Grid>
        </Grid>
        <Grid style={styles.dateBox}>2024</Grid>
      </Grid>
      <Grid style={styles.timeLeftContainer}>
        <TimeLeftCard time={timeLeft.days} text={'Días'} />
        <TimeLeftCard time={timeLeft.hours} text={'Horas'} />
        <TimeLeftCard time={timeLeft.minutes} text={'Minutos'} />
        <TimeLeftCard time={timeLeft.seconds} text={'Segundos'} />
      </Grid>
      <AddToCalendarButton
        name='Casamiento China y Womo'
        label='Guardar en el calendario'
        buttonStyle='round'
        startDate='2024-03-09'
        startTime='16:30'
        endDate='2024-03-10'
        endTime='05:00'
        options={['Google']}
        language='es'
      />
    </Grid>
  )
}

function TimeLeftCard ({ time, text }) {
  const styles = useStyles(useIsMobile())
  return (
    <Grid style={styles.timeLeftCard}>
      <Grid>{time}</Grid>
      <Grid>{text}</Grid>
    </Grid>
  )
}
