import { Grid, Typography } from '@mui/material'

const useStyles = () => ({
  titleContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontFamily: 'Button, sans-serif',
    fontSize: '60px',
    fontWeight: 'bold',
    color: '#1b1b1b',
    textAlign: 'center'
  },
  text: {
    fontFamily: 'Centaur, sans-serif',
    fontSize: '24px',
    textAlign: 'center'
  }
})

export default function Title () {
  const styles = useStyles()

  return (
    <Grid style={styles.titleContainer} className='box'>
      <Typography
        style={{ ...styles.title, marginRight: '15vw', marginBottom: '-35px' }}
      >
        Giuliana
      </Typography>
      <Grid
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          maxHeight: '100px'
        }}
      >
        <p
          style={{
            fontSize: '60px',
            fontFamily: 'Centaur, sans-serif',
            marginTop: '-15px',
            marginLeft: '35px'
          }}
        >
          &
        </p>
        <Typography
          style={{
            ...styles.title,
            marginBottom: '-25px'
          }}
        >
          Facundo
        </Typography>
      </Grid>
      <Grid style={styles.text}>¡¡¡NOS CASAMOS!!!</Grid>
    </Grid>
  )
}
