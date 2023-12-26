import { Grid } from '@mui/material'
import HeaderImage from '../assets/header.jpg'

const useStyles = () => ({
  main: {
    backgroundColor: '#e1e1e1',
    overFlow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    margin: 'auto'
  },
  body: {
    margin: 'auto'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundImage: `url(${HeaderImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    position: 'relative'
  },
  names: {
    fontWeight: 'bold',
    fontSize: '5vw',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    alignSelf: 'center',
    justifySelf: 'center',
    margin: 'auto',
    color: 'white',
    position: 'absolute',
    bottom: '10vh'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bolder',
    color: 'white',
    fontSize: '7vw',
    margin: 'auto',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: '10vh'
  }
})

export default function Header () {
  const styles = useStyles()
  return (
    <Grid style={styles.header}>
      <Grid style={styles.title}>NOS CASAMOS!!!</Grid>
      <Grid style={styles.names}>
        <Grid>GIULI</Grid>
        <Grid>&</Grid>
        <Grid>FACU</Grid>
      </Grid>
    </Grid>
  )
}
