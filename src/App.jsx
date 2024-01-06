/* eslint-disable react/prop-types */
import { Divider, Grid } from '@mui/material'
import TimeLeftCounter from './components/Counter'
import Header from './components/Header'
import Addresses from './components/Addresses'
import DressCode from './components/DressCode'
import ParallaxBackground from './components/ParallaxBackground'
import Gifts from './components/Gifts'
import Confirmation from './components/Confirmation'
import AboutUs from './components/AboutUs'
import Music from './components/Music'
import Greetings from './components/Greetings'
import BackgroundImage from './assets/background.jpg'
import Title from './components/Title'
const styles = {
  main: {
    backgroundColor: '#e1e1ew1',
    backgroundImage: `url(${BackgroundImage})`,
    overFlow: 'scroll',
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
        <Title />
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
        <AboutUs />
        <Divider style={styles.divider} />
        <Music />
        <Divider style={styles.divider} />
        <Greetings />
      </Grid>
    </main>
  )
}
