/* eslint-disable react/prop-types */
import { Grid } from '@mui/material'
import useIsMobile from '../hooks/useIsMobile'
import church from '../assets/church.png'
import party from '../assets/party.png'
import { AccessTime } from '@mui/icons-material'

function styles (isMobile) {
  return {
    addressContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: isMobile ? '95vw' : '80vw',
      margin: 'auto',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '30px'
    },
    addressCard: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: isMobile ? 'auto' : '20vh'
    },
    leftAddress: {
      display: 'flex',
      flexDirection: 'row',
      border: '1px solid rgb(219, 172, 52)',
      borderRadius: '3px',
      padding: '10px',
      backgroundColor: 'rgba(219,172,52,0.2)',
      width: isMobile ? '100%' : '45%',
      marginBottom: isMobile ? '5px' : '0',
      alignSelf: 'center'
    },
    leftAddressText: {
      diaplay: 'flex',
      flexDirection: 'column',
      fontSize: 'small',
      alignSelf: 'center',
      width: '80%'
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
    map: {
      borderRadius: '3px',
      border: isMobile ? 'none' : '2px solid black'
    },
    image: {
      display: 'flex',
      margin: 'auto',
      maxHeight: '10vh',
      width: '30%'
    }
  }
}

export default function Addresses () {
  const isMobile = useIsMobile()
  const style = styles(isMobile)
  return (
    <Grid style={style.addressContainer}>
      <AdressCard
        image={church}
        place='Iglesia Nuestra Señora del Carmen.'
        address='Av. Del Carmen 200, Villa Allende'
        time='16:30'
        iframeSrc='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3409.3831818772187!2d-64.30116082469738!3d-31.293152774318756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94329d056aa66e5f%3A0x8d59cccda2c33d4f!2sIglesia%20Nuestra%20Se%C3%B1ora%20del%20Carmen!5e0!3m2!1ses-419!2sar!4v1694998845902!5m2!1ses-419!2sar'
      />
      <AdressCard
        image={party}
        place='Estancia Victoria'
        address='Ruta E54 KM 1.5 camino al Cerro Pan de Azucar, Villa Allende'
        time='Despues de la iglesia'
        iframeSrc='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1205.726141067716!2d-64.33273009909868!3d-31.267560165522426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943282a956aeb473%3A0x5b82fc9c9d94de6b!2sEstancia%20Victoria!5e0!3m2!1ses-419!2sar!4v1694999251096!5m2!1ses-419!2sar'
      />
    </Grid>
  )
}

function AdressCard ({ image, place, address, time, iframeSrc }) {
  const isMobile = useIsMobile()
  const style = styles(isMobile)
  return (
    <Grid style={style.addressCard}>
      <Grid style={style.leftAddress}>
        <img style={style.image} src={image}></img>
        <Grid style={style.leftAddressText}>
          <Grid style={style.place}>{place}</Grid>
          <Grid style={style.address}>{address}</Grid>
          <Grid style={style.time}>
            <AccessTime /> {time}
          </Grid>
        </Grid>
      </Grid>
      <Grid style={style.map}>
        <iframe
          src={iframeSrc}
          style={{
            width: '99%',
            height: '98%',
            borderRadius: '3px'
          }}
          allowFullScreen=''
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </Grid>
    </Grid>
  )
}
