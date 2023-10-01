/* eslint-disable react/prop-types */
import { Grid, Typography } from '@mui/material'
import HeaderImage from './assets/header.jpg'
import { useEffect, useState } from 'react'
import useIsMobile from './hooks/useIsMobile'
const styles = {
  main: {
    width: '100vw',
    backgroundColor: '#e1e1e1',
    overFlow: 'hidden'
  },
  body: {
    width: '80vw',
    margin: 'auto'
  },
  drawer: {
    position: 'fixed',
    top: '5vh',
    right: '10vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: '10px',
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '80vw'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${HeaderImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw'
  },
  names: {
    fontWeight: 'bold',
    fontSize: '5vw',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    alignSelf: 'center',
    justifySelf: 'center',
    margin: 'auto'
  },
  timeLeft: {
    textAlign: 'center',
    width: '100vw',
    margin: '20px 0'
  },
  timeLeftContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px'
  },
  timeLeftCard: {
    textAlign: 'center',
    border: '1px solid white',
    borderRadius: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90px',
    height: '90px',
    padding: '10px'
  }
}

export default function App () {
  return (
    <main className={styles.main}>
      <Grid style={styles.body}>
        <Header />
        <NavDrawer />
        <TimeLeftCounter />
        <Addresses />
      </Grid>
    </main>
  )
}

function NavDrawer () {
  return (
    <Grid style={styles.drawer}>
      <Grid>Cuando Falta</Grid>
      <Grid>Lugar y Horario</Grid>
      <Grid>Datos Bancarios</Grid>
      <Grid>Nosotros</Grid>
    </Grid>
  )
}

function Header () {
  const isMobile = useIsMobile()
  return (
    <Grid style={{ ...styles.header, marginTop: isMobile ? '60vh' : 'auto' }}>
      <Grid>
        <p style={styles.names}>#LACHINAYELWOMO</p>
      </Grid>
    </Grid>
  )
}

function TimeLeftCounter () {
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
      <Grid style={styles.timeLeftContainer}>
        <TimeLeftCard time={timeLeft.days} text={'Días'} />
        <TimeLeftCard time={timeLeft.hours} text={'Horas'} />
        <TimeLeftCard time={timeLeft.minutes} text={'Minutos'} />
        <TimeLeftCard time={timeLeft.seconds} text={'Segundos'} />
      </Grid>
    </Grid>
  )
}

function TimeLeftCard ({ time, text }) {
  return (
    <Grid style={styles.timeLeftCard}>
      <Grid>{time}</Grid>
      <Grid>{text}</Grid>
    </Grid>
  )
}

function Addresses () {
  const isMobile = useIsMobile()

  return (
    <Grid
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: isMobile ? '100vw' : '80vw',
        margin: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <AdressCard
        title='Ceremonia'
        icon={''}
        description='Parroquia Nuestra Señora del Carmen, Villa Allende. Comienza 17hs puntual, llegar por lo menos con 15 minutos de antelación'
        iframeSrc='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3409.3831818772187!2d-64.30116082469738!3d-31.293152774318756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94329d056aa66e5f%3A0x8d59cccda2c33d4f!2sIglesia%20Nuestra%20Se%C3%B1ora%20del%20Carmen!5e0!3m2!1ses-419!2sar!4v1694998845902!5m2!1ses-419!2sar'
      />
      <AdressCard
        title='Fiesta'
        icon={''}
        description='Estancia Victoria, Villa Allende. Después de la ceremonia o a partir de las 17:30'
        iframeSrc='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1205.726141067716!2d-64.33273009909868!3d-31.267560165522426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943282a956aeb473%3A0x5b82fc9c9d94de6b!2sEstancia%20Victoria!5e0!3m2!1ses-419!2sar!4v1694999251096!5m2!1ses-419!2sar'
      />
    </Grid>
  )
}

function AdressCard ({ title, icon, description, iframeSrc }) {
  return (
    <Grid style={styles.addressCard}>
      <Typography>{title}</Typography>
      {icon}
      <Grid>{description}</Grid>
      <iframe
        src={iframeSrc}
        width='400'
        height='300'
        style={{ border: '0' }}
        allowfullscreen=''
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </Grid>
  )
}
