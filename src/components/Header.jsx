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
    position: 'relative',
    border: '2px solid black'
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Bell, sans-serif',
    fontWeight: 'bold',
    color: '#1b1b1b',
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
      <Grid style={styles.title}>#CHINAYWOMO</Grid>
    </Grid>
  )
}
