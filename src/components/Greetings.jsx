import { Grid } from '@mui/material'
import useIsMobile from '../hooks/useIsMobile'

const useStyles = isMobile => ({
  greetingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px 10px ',
    position: 'relative'
  },
  text: {
    fontFamily: 'Bell, sans-serif',
    fontWeight: 'bolder',
    fontSize: isMobile ? '16px' : '24px',
    textAlign: 'center'
  }
})
export default function Greetings () {
  const styles = useStyles(useIsMobile())
  return (
    <Grid style={styles.greetingsContainer}>
      <Grid style={styles.text}>
        ¡Gracias por acompañarnos en este día tan especial!
      </Grid>
    </Grid>
  )
}
