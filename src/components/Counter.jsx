/* eslint-disable react/prop-types */
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { AddToCalendarButton } from 'add-to-calendar-button-react'
import useIsMobile from '../hooks/useIsMobile'

const useStyles = () => ({
  timeLeft: {
    textAlign: 'center',
    width: '100vw',
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  timeLeftContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    padding: '10px',
    fontWeight: 'bold'
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
    width: '90px',
    height: '90px',
    padding: '10px',
    color: '#000000'
  },
  date: {
    fontWeight: 'bold',
    fontSize: '3vh'
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
        <Grid>9 de Marzo, 2024</Grid>
        <Grid>Solo faltan...</Grid>
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
  const styles = useStyles()
  return (
    <Grid style={styles.timeLeftCard}>
      <Grid>{time}</Grid>
      <Grid>{text}</Grid>
    </Grid>
  )
}
