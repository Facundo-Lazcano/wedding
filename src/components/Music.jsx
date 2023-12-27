/* eslint-disable react/prop-types */
import { Backdrop, Button, Fade, Grid, Modal, TextField } from '@mui/material'
import useIsMobile from '../hooks/useIsMobile'
import { useCallback, useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import music from '../assets/music.png'
import music2 from '../assets/music2.png'

const useStyles = isMobile => ({
  musicContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '50px',
    position: 'relative'
  },
  input: {
    justifyContent: 'space-between',
    display: 'flex',
    margin: '10px 0',
    gap: 10
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '2px solid #000',
    borderRadius: '3px',
    boxShadow: 24,
    padding: '20px',
    width: isMobile ? '95vw' : '600px'
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputWithCheckbox: {
    width: isMobile ? '60%' : '75%'
  },
  text: {
    marginBottom: '15px',
    textAlign: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 'larger',
    marginBottom: '15px'
  },
  textfield: {
    minWidth: '18%'
  },
  music: {
    position: 'absolute',
    top: '20%',
    left: isMobile ? '2%' : '27%',
    height: '50px'
  },
  music2: {
    position: 'absolute',
    top: '40%',
    right: isMobile ? '2%' : '27%',
    height: '50px'
  }
})

export default function Music () {
  const styles = useStyles(useIsMobile())

  return (
    <Grid style={styles.musicContainer}>
      <Grid style={styles.title}>
        Que canciones no pueden faltar en la noche?
      </Grid>
      <img style={styles.music} src={music} alt='music' />
      <img style={styles.music2} src={music2} alt='music2' />
      <MusicModal />
    </Grid>
  )
}

function MusicModal () {
  const isMobile = useIsMobile()
  const styles = useStyles(isMobile)
  const [open, setOpen] = useState(false)
  const initialInputs = useMemo(() => {
    return {
      title: '',
      artist: ''
    }
  }, [])
  const [inputs, setInputs] = useState([initialInputs])

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => {
    setOpen(false)
    setInputs([initialInputs])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleAdd = useCallback(
    () =>
      setInputs(prevState => {
        const cloneState = JSON.parse(JSON.stringify(prevState))
        cloneState.push(initialInputs)
        return cloneState
      }),
    [initialInputs]
  )

  async function handleConfirm (e) {
    e.preventDefault()
    try {
      Swal.showLoading()
      const scriptUrl =
        'https://script.google.com/macros/s/AKfycbyIulG_TX4GyWHzIohoM09uzBdeXVVPSgbMEclBp40wZWz_R8Gx8Rq8RS0NawDdmFzU/exec'
      const reqPromises = inputs.map(async input => {
        const reqBody = {
          sheetName: 'Musica',
          Cancion: input.title,
          Artista: input.artist
        }
        return await fetch(scriptUrl, {
          method: 'POST',
          body: JSON.stringify(reqBody)
        })
      })
      handleClose()
      await Promise.all(reqPromises)
      Swal.fire({
        title: 'Temas guardados',
        text: 'Gracias por solicitar esas canciones. Se las vamos a pasar al DJ para hacer esta noche especial.',
        icon: 'success'
      })
    } catch (error) {
      Swal.fire({
        title: 'Ocurrió un error',
        text: error,
        icon: 'error'
      })
    }
  }
  return (
    <Grid>
      <Button variant='outlined' onClick={handleOpen}>
        Solicitar temas
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Grid style={styles.modal}>
            {inputs.map((input, idx) => {
              return (
                <MusicInput
                  key={idx}
                  idx={idx}
                  setInputs={setInputs}
                  title={input.title}
                  artist={input.lastName}
                />
              )
            })}
            <Grid style={styles.modalButtons}>
              <Button variant='outlined' onClick={handleAdd}>
                Agregar cancion
              </Button>
              <Button
                variant='outlined'
                color='success'
                onClick={handleConfirm}
              >
                Solicitar canciones
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  )
}

function MusicInput ({ setInputs, idx, title, artist }) {
  const isMobile = useIsMobile()
  const styles = useStyles(isMobile)

  const handleTitleChange = useCallback(
    e =>
      setInputs(prevState => {
        const cloneState = JSON.parse(JSON.stringify(prevState))
        cloneState[idx].title = e.target.value
        return cloneState
      }),
    [idx, setInputs]
  )
  const handleArtistChange = useCallback(
    e =>
      setInputs(prevState => {
        const cloneState = JSON.parse(JSON.stringify(prevState))
        cloneState[idx].artist = e.target.value
        return cloneState
      }),
    [idx, setInputs]
  )

  return (
    <Grid style={styles.input}>
      <TextField
        style={styles.textfield}
        required
        name='Cancion'
        value={title}
        onChange={handleTitleChange}
        label='Cancion'
      />
      <TextField
        style={styles.textfield}
        required
        name='Artista'
        value={artist}
        onChange={handleArtistChange}
        label='Artista'
      />
    </Grid>
  )
}
