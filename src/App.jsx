/* eslint-disable react/prop-types */
import { Divider, Grid } from '@mui/material'
import TimeLeftCounter from './components/Counter'
import Header from './components/Header'
import Addresses from './components/Addresses'
import DressCode from './components/DressCode'
import ParallaxBackground from './components/ParallaxBackground'
import Gifts from './components/Gifts'
import Confirmation from './components/Confirmation'
const styles = {
  main: {
    backgroundColor: '#e1e1e1',
    overFlow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    color: '#000000',
    fontFamily: 'Montserrat, sans-serif !important'
  },
  body: {
    margin: 'auto'
  },
  divider: {
    width: '50vw',
    height: '2px',
    margin: '10px auto'
  }
}

export default function App () {
  return (
    <main style={styles.main}>
      <Grid style={styles.body}>
        <Header />
        <TimeLeftCounter />
        <Divider style={styles.divider} />
        <ParallaxBackground />
        <Divider style={styles.divider} />
        <Addresses />
        <Divider style={styles.divider} />
        <DressCode />
        <Divider style={styles.divider} />
        <Gifts />
        <Divider style={styles.divider} />
        <Confirmation />
        <Divider style={styles.divider} />
      </Grid>
    </main>
  )
}
