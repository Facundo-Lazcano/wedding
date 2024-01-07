import BackgroundImage from '../assets/parallax.jpg'
import { Parallax } from 'react-parallax'
const useStyles = () => ({
  parallax: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '300px'
  }
})

const ParallaxBackground = () => {
  const styles = useStyles()
  return (
    <Parallax bgImage={BackgroundImage} strength={100}>
      <div className='parallax' style={styles.parallax}></div>
    </Parallax>
  )
}

export default ParallaxBackground
