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
  TextField,
  styled
} from '@mui/material'
import useIsMobile from '../hooks/useIsMobile'
import { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import BackgroundImage from '../assets/background.jpg'
import { grey } from '@mui/material/colors'
import { DeleteForever } from '@mui/icons-material'

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
    flexDirection: 'column',
    margin: '5px 0',
    gap: 10,
    border: '1px solid #1b1b1b',
    borderRadius: '5px',
    padding: '10px',
    position: 'relative'
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundImage: `url(${BackgroundImage})`,
    border: '2px solid #000',
    borderRadius: '3px',
    boxShadow: 24,
    padding: '20px',
    width: isMobile ? '95vw' : '600px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '85vh',
    overflow: 'auto',
    overflowX: 'hidden'
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10
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
    width: '100%'
  },
  button: {
    borderRadius: '30px',
    backgroundColor: '#1b1b1b',
    color: '#f6f5f1'
  }
})

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[800]),
  backgroundColor: grey[800],
  borderColor: grey[900],
  '&:hover': {
    backgroundColor: grey[900]
  }
}))

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
    companion: false,
    specialDetail: '',
    specialDescription: ''
  }
  const [inputs, setInputs] = useState([initialInputs])
  const [disableConfirm, setDisableConfirm] = useState(true)

  useEffect(() => {
    inputs.forEach(input => {
      const {
        firstName,
        lastName,
        special,
        specialDescription,
        specialDetail,
        age
      } = input

      setDisableConfirm(
        firstName === '' ||
          lastName === '' ||
          age === '' ||
          (special && specialDescription === '') ||
          (specialDescription === 'otro' && specialDetail === '')
      )
    })
  }, [inputs])

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => {
    setOpen(false)
    setInputs([initialInputs])
    setDisableConfirm(true)
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
          companion: true,
          specialDetail: ''
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
          Menu: input.special
            ? input.specialDescription === 'otro'
              ? input.specialDetail
              : input.specialDescription.trim()
            : 'No',
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
        background: `url(${BackgroundImage})`,
        icon: 'success'
      })
    } catch (error) {
      Swal.fire({
        title: 'Ocurrió un error',
        background: `url(${BackgroundImage})`,
        icon: 'error'
      })
    }
  }

  const renderInputs = useCallback(() => {
    return inputs.map((input, idx) => {
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
          specialDetail={input.specialDetail}
          specialDescription={input.specialDescription}
        />
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(inputs)])
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
            <Grid>{renderInputs()}</Grid>

            <Grid style={styles.modalButtons}>
              <ColorButton
                variant='outlined'
                disabled={inputs.length >= 2}
                onClick={handleAdd}
              >
                Agregar acompañante
              </ColorButton>
              <ColorButton
                variant='outlined'
                color='success'
                disabled={disableConfirm}
                onClick={handleConfirm}
              >
                Confirmar Asistencia
              </ColorButton>
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
  companion,
  specialDetail
}) {
  const isMobile = useIsMobile()
  const styles = useStyles(isMobile)

  function handleDeleteInput () {
    setInputs(prevState => {
      const cloneState = JSON.parse(JSON.stringify(prevState))
      cloneState.splice(idx, 1)
      return cloneState
    })
  }

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

  const handleSpecialMenuChange = useCallback(
    () =>
      setInputs(prevState => {
        const cloneState = JSON.parse(JSON.stringify(prevState))
        cloneState[idx].special = !cloneState[idx].special
        return cloneState
      }),
    [idx, setInputs]
  )

  function handleAgeChange (e) {
    setInputs(prevState => {
      const cloneState = JSON.parse(JSON.stringify(prevState))
      cloneState[idx].age = e.target.value
      return cloneState
    })
  }
  function handleSpecialMenuDescriptionChange (e) {
    setInputs(prevState => {
      const cloneState = JSON.parse(JSON.stringify(prevState))
      cloneState[idx].specialDescription = e.target.value
      return cloneState
    })
  }

  const handleSpecialDetailChange = useCallback(
    e =>
      setInputs(prevState => {
        const cloneState = JSON.parse(JSON.stringify(prevState))
        cloneState[idx].specialDetail = e.target.value
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
            select
            style={styles.textfield}
            required={special}
            name='Especial'
            disabled={!special}
            value={specialDescription}
            onChange={handleSpecialMenuDescriptionChange}
            label='Menu especial'
          >
            <MenuItem value='vegano'>Vegano</MenuItem>
            <MenuItem value='vegetariano'>Vegetariano</MenuItem>
            <MenuItem value='celiaco'>Celiaco</MenuItem>
            <MenuItem value='otro'>Otro</MenuItem>
          </TextField>
        </div>
        {specialDescription === 'otro' ? (
          <TextField
            style={{ position: 'absolute', left: '30%' }}
            disabled={specialDescription !== 'otro' || !special}
            value={specialDetail}
            label='Detalle'
            onChange={handleSpecialDetailChange}
          />
        ) : null}
      </FormGroup>

      {companion ? (
        <>
          <TextField
            select
            value={age}
            onChange={handleAgeChange}
            label='Edad'
            style={styles.textfield}
            required
          >
            <MenuItem value='Mayor'>Mayor de 12 años</MenuItem>
            <MenuItem value='Cadete'>Entre 4 y 12 años</MenuItem>
            <MenuItem value='Menor'>Menor a 4 años</MenuItem>
          </TextField>
          <ColorButton onClick={handleDeleteInput}>
            <DeleteForever />
          </ColorButton>
        </>
      ) : null}
    </Grid>
  )
}
