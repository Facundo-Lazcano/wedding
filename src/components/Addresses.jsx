/* eslint-disable react/prop-types */
import { Button, Grid, Link } from '@mui/material'
import useIsMobile from '../hooks/useIsMobile'
import { AccessTime, Nightlife, Today } from '@mui/icons-material'
import Confirmation from './Confirmation'
import { CrossIcon } from '../assets/componentHelper'

function useStyles (isMobile) {
  return {
    addressContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: isMobile ? '95vw' : '80vw',
      margin: 'auto',
      gap: '30px',
      position: 'relative'
    },
    timeLine: {
      height: '70%',
      position: 'absolute',
      left: '50%',
      border: '2px solid #1b1b1b',
      top: '15%'
    },
    addressCard: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '40%',
      fontFamily: 'Bell, sans-serif',
      height: isMobile ? 'auto' : '20vh',
      textAlign: 'center'
    },
    place: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '16px'
    },
    address: {
      textAlign: 'center'
    },
    time: {
      display: 'flex',
      justifyContent: 'center',
      fontWeight: 'bold',
      alignSelf: 'center'
    },
    mapButton: {
      marginTop: '10px',
      maxWidth: '120px',
      margin: 'auto',
      borderRadius: '30px',
      backgroundColor: '#1b1b1b',
      color: '#f6f5f1'
    },
    title: {
      fontFamily: 'Button, sans-serif',
      textAlign: 'center',
      fontSize: '36px'
    },
    header: {
      fontFamily: 'Button, sans-serif',
      textAlign: 'center',
      fontSize: '48px'
    },
    date: {
      alignSelf: 'flex-end'
    },
    church: {
      alignSelf: 'flex-start'
    },
    party: {
      alignSelf: 'flex-end'
    }
  }
}

export default function Addresses () {
  const isMobile = useIsMobile()
  const styles = useStyles(isMobile)
  return (
    <Grid style={styles.addressContainer}>
      <Grid style={styles.timeLine} />
      <TimeLineIcon top='17%' icon={<Today fontSize='smaller' />} />
      <TimeLineIcon top='35%' icon={<CrossIcon fontSize='smaller' />} />
      <TimeLineIcon top='60%' icon={<Nightlife fontSize='smaller' />} />
      <TimeLineIcon end top='80%' />
      <Grid style={styles.header}>Ceremonia y Fiesta</Grid>
      <AdressCard style={styles.date} title='Fecha' place='Sábado 9 de Marzo' />
      <AdressCard
        style={styles.church}
        title='Iglesia'
        place='Iglesia Nuestra Señora del Carmen.'
        time='16:30'
        mapUrl='https://maps.app.goo.gl/ZAeNKpKsS4teY5mz5'
      />
      <AdressCard
        style={styles.party}
        title='Salon'
        place='Estancia Victoria'
        time='Despues de la iglesia'
        mapUrl='https://maps.app.goo.gl/5TN68N2W3jzDU7jEA'
      />
      <Grid style={{ height: '20px' }} />
      <Confirmation />
    </Grid>
  )
}

function TimeLineIcon ({ top, icon, end }) {
  const isMobile = useIsMobile()
  if (end) {
    return (
      <Grid
        style={{
          backgroundColor: 'white',
          borderRadius: '50%',
          height: '15px',
          width: '15px',
          border: '1px solid #1b1b1b',
          position: 'absolute',
          left: isMobile ? '48.5%' : '49.5%',
          top
        }}
      />
    )
  }
  return (
    <Grid
      style={{
        borderRadius: '50%',
        border: '1px solid #1b1b1b',
        padding: '5px 5px 0px 5px',
        position: 'absolute',
        left: isMobile ? '47%' : '49%',
        backgroundColor: 'white',
        top
      }}
    >
      {icon}
    </Grid>
  )
}

function AdressCard ({ title, place, time, mapUrl, style }) {
  const isMobile = useIsMobile()
  const styles = useStyles(isMobile)
  return (
    <Grid style={{ ...styles.addressCard, ...style }}>
      <Grid style={styles.title}>{title}</Grid>
      <Grid style={styles.place}>{place}</Grid>
      {time ? (
        <Grid style={styles.time}>
          <AccessTime /> {time}
        </Grid>
      ) : null}
      {mapUrl ? (
        <Button style={styles.mapButton}>
          <Link
            style={{ textDecoration: 'none', color: 'white' }}
            target='_blank'
            href={mapUrl}
          >
            VER MAPA
          </Link>
        </Button>
      ) : null}
    </Grid>
  )
}
