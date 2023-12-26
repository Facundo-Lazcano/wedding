import BackgroundImage from '../assets/background.jpg'

const useStyles = () => ({
  parallax: {
    position: 'relative',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: `url(${BackgroundImage})`,
    height: '30vh'
  }
})

const ParallaxBackground = () => {
  const styles = useStyles()
  return <div className='parallax' style={styles.parallax}></div>
}

export default ParallaxBackground
