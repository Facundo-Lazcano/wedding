/* eslint-disable react/prop-types */
import { Grid } from '@mui/material'
import useIsMobile from '../hooks/useIsMobile'
import dressCode from '../assets/nosotros/casamientoGiuli.png'
import musicImg from '../assets/musicImg.png'
import Music from './Music'

const useStyles = isMobile => ({
  dressCodeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '20px',
    alignItems: 'center',
    width: '90vw',
    margin: 'auto'
  },
  text: {
    textAlign: 'center'
  },
  title: {
    fontFamily: 'Button',
    fontSize: '30px',
    borderTop: '1px solid #1b1b1b'
  },
  image: { maxHeight: '55%', borderRadius: '30px 30px 0 0' },
  description: {
    fontFamily: 'Centaur, sans-serif'
  },
  cardContainer: {
    border: '1px solid #1b1b1b',
    borderRadius: '45px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: isMobile ? '40vw' : '20vw',
    height: '300px'
  }
})
export default function DressCode () {
  const isMobile = useIsMobile()
  const styles = useStyles(isMobile)
  return (
    <Grid style={styles.dressCodeContainer}>
      <Card
        img={musicImg}
        title='Musica'
        description='Qué canción no puede faltar en la noche'
        modal={<Music />}
      />
      <Card
        img={dressCode}
        title='Dress Code'
        description='Formal elegante. Evitar blanco y similares'
      />
    </Grid>
  )
}

function Card ({ img, title, description, modal }) {
  const styles = useStyles(useIsMobile())
  return (
    <Grid style={styles.cardContainer}>
      <img style={styles.image} src={img} />
      <Grid style={styles.title}>{title}</Grid>
      <Grid style={styles.description}>{description}</Grid>
      {modal ? modal : null}
    </Grid>
  )
}
