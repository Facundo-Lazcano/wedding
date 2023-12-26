import { Grid } from '@mui/material'
import useIsMobile from '../hooks/useIsMobile'
import dressCode from '../assets/dressCode.png'

const useStyles = isMobile => ({
  dressCodeContainer: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90vw',
    margin: 'auto'
  },
  text: {
    textAlign: 'center'
  },
  title: {
    fontWeight: 'bolder',
    fontSize: '25px'
  },
  image: {
    maxHeight: '20vh'
  },
  dressCode: {
    fontWeight: 'bold'
  },
  description: {
    fontSize: 'smaller'
  }
})
export default function DressCode () {
  const isMobile = useIsMobile()
  const styles = useStyles(isMobile)
  return (
    <Grid style={styles.dressCodeContainer}>
      <Grid style={styles.text}>
        <Grid style={styles.title}>Dress Code</Grid>
        <Grid style={styles.dressCode}>Formal elegante</Grid>
        <Grid style={styles.description}>Evitar blanco y similares</Grid>
      </Grid>
      <Grid>
        <img src={dressCode} style={styles.image} />
      </Grid>
    </Grid>
  )
}
