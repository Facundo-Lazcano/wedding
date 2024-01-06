/* eslint-disable react/prop-types */
import {
  Backdrop,
  Button,
  Checkbox,
  Fade,
  FormGroup,
  Grid,
  MenuItem,
  Modal,
  TextField
} from '@mui/material'
import useIsMobile from '../hooks/useIsMobile'
import { useCallback, useState } from 'react'
import Swal from 'sweetalert2'

const useStyles = isMobile => ({
  confirmationContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '50px'
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
  button: {
    borderRadius: '30px',
    backgroundColor: '#1b1b1b',
    color: '#f6f5f1'
  }
})

export default function Confirmation () {
  const isMobile = useIsMobile()
  const styles = useStyles(isMobile)
  return (
    <Grid style={styles.confirmationContainer}>
      <ConfirmationModal />
    </Grid>
  )
}

function ConfirmationModal () {
  const isMobile = useIsMobile()
  const styles = useStyles(isMobile)
  const [open, setOpen] = useState(false)
  const initialInputs = {
    firstName: '',
    lastName: '',
    special: false,
    age: 'Mayor',
    companion: false
  }
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
        cloneState.push({
          firstName: '',
          lastName: '',
          special: false,
          specialDescription: '',
          age: '',
          companion: true
        })
        return cloneState
      }),
    []
  )

  async function handleConfirm (e) {
    e.preventDefault()
    try {
      Swal.showLoading()
      const scriptUrl =
        'https://script.google.com/macros/s/AKfycbyIulG_TX4GyWHzIohoM09uzBdeXVVPSgbMEclBp40wZWz_R8Gx8Rq8RS0NawDdmFzU/exec'
      const reqPromises = inputs.map(async (input, idx) => {
        const reqBody = {
          sheetName: 'Casamiento',
          Nombre: input.firstName.trim(),
          Apellido: input.lastName.trim(),
          Menu: input.special ? input.specialDescription.trim() : 'No',
          Edad: input.age,
          'Acompañante de':
            idx === 0 ? '' : `${inputs[0].firstName} ${inputs[0].lastName}`
        }
        return await fetch(scriptUrl, {
          method: 'POST',
          body: JSON.stringify(reqBody)
        })
      })
      handleClose()
      await Promise.all(reqPromises)
      Swal.fire({
        title: 'Asistencia Confirmada',
        text: 'Gracias por confirmar tu asistencia. Te esperamos!',
        icon: 'success'
      })
    } catch (error) {
      Swal.fire({
        title: 'Ocurrió un error',
        icon: 'error'
      })
    }
  }
  return (
    <Grid>
      <Button style={styles.button} variant='outlined' onClick={handleOpen}>
        Confirmar Asistencia
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
                <ConfirmationInput
                  key={idx}
                  idx={idx}
                  setInputs={setInputs}
                  firstName={input.firstName}
                  lastName={input.lastName}
                  special={input.special}
                  age={input.age}
                  companion={input.companion}
                />
              )
            })}
            <Grid style={styles.modalButtons}>
              <Button variant='outlined' onClick={handleAdd}>
                Agregar acompañante
              </Button>
              <Button
                variant='outlined'
                color='success'
                onClick={handleConfirm}
              >
                Confirmar Asistencia
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  )
}

function ConfirmationInput ({
  setInputs,
  idx,
  firstName,
  lastName,
  special,
  specialDescription,
  age,
  companion
}) {
  const isMobile = useIsMobile()
  const styles = useStyles(isMobile)

  const handleFirstNameChange = useCallback(
    e =>
      setInputs(prevState => {
        const cloneState = JSON.parse(JSON.stringify(prevState))
        cloneState[idx].firstName = e.target.value
        return cloneState
      }),
    [idx, setInputs]
  )
  const handleLastNameChange = useCallback(
    e =>
      setInputs(prevState => {
        const cloneState = JSON.parse(JSON.stringify(prevState))
        cloneState[idx].lastName = e.target.value
        return cloneState
      }),
    [idx, setInputs]
  )
  const handleSpecialMenuDescriptionChange = useCallback(
    e =>
      setInputs(prevState => {
        const cloneState = JSON.parse(JSON.stringify(prevState))
        cloneState[idx].specialDescription = e.target.value
        return cloneState
      }),
    [idx, setInputs]
  )
  const handleSpecialMenuChange = useCallback(
    () =>
      setInputs(prevState => {
        const cloneState = JSON.parse(JSON.stringify(prevState))
        cloneState[idx].special = !cloneState[idx].special
        return cloneState
      }),
    [idx, setInputs]
  )

  const handleAgeChange = useCallback(
    e =>
      setInputs(prevState => {
        const cloneState = JSON.parse(JSON.stringify(prevState))
        cloneState[idx].age = e.target.value
        return cloneState
      }),
    [idx, setInputs]
  )

  return (
    <Grid style={styles.input}>
      <TextField
        style={styles.textfield}
        required
        name='Nombre'
        value={firstName}
        onChange={handleFirstNameChange}
        label='Nombre'
      />
      <TextField
        style={styles.textfield}
        required
        name='Apellido'
        value={lastName}
        onChange={handleLastNameChange}
        label='Apellido'
      />
      <FormGroup>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <Checkbox
            checked={special}
            onChange={handleSpecialMenuChange}
            style={{ position: 'absolute', right: '0' }}
          />
          <TextField
            inputProps={{
              style: styles.inputWithCheckbox
            }}
            style={styles.textfield}
            required={special}
            name='Especial'
            disabled={!special}
            value={specialDescription}
            onChange={handleSpecialMenuDescriptionChange}
            label='Menu especial'
          />
        </div>
      </FormGroup>
      {companion ? (
        <TextField
          select
          value={age}
          onChange={handleAgeChange}
          label='Edad'
          style={styles.textfield}
          required
        >
          <MenuItem value='Mayor'>+12</MenuItem>
          <MenuItem value='Cadete'>+4/-12</MenuItem>
          <MenuItem value='Menor'>-4</MenuItem>
        </TextField>
      ) : null}
    </Grid>
  )
}
