import { Grid, ImageList, ImageListItem } from '@mui/material'
import { Images } from '../assets/nosotros/index'
import { Favorite } from '@mui/icons-material'
import useIsMobile from '../hooks/useIsMobile'
import { useState } from 'react'

const useStyles = isMobile => ({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageList: {
    width: isMobile ? '100vw' : '70vw',
    overflow: 'hidden'
  },
  title: {
    fontWeight: 'bolder',
    fontSize: isMobile ? '16px' : '24px'
  },
  image: { borderRadius: '3px' },
  imageHover: {
    borderRadius: '3px',
    transform: 'scale(1.2)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 1
  },
  imageListItem: {
    transition: 'transform 0.3s ease-in-out'
  }
})
export default function AboutUs () {
  const styles = useStyles(useIsMobile())
  const [isHovered, setIsHovered] = useState(false)
  return (
    <Grid style={styles.imageContainer}>
      <Grid style={styles.title}>
        Nosotros <Favorite />
      </Grid>
      <ImageList style={styles.imageList} cols={3}>
        {Images.map((img, idx) => {
          return (
            <ImageListItem style={styles.imageListItem} key={img}>
              <img
                style={isHovered === idx ? styles.imageHover : styles.image}
                srcSet={`${img}`}
                src={`${img}`}
                loading='lazy'
                onMouseEnter={() => setIsHovered(idx)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </ImageListItem>
          )
        })}
      </ImageList>
    </Grid>
  )
}
