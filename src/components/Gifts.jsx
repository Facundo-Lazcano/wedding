/* eslint-disable react/prop-types */
import { Backdrop, Button, Fade, Grid, Modal, Tooltip } from '@mui/material'
import useIsMobile from '../hooks/useIsMobile'
import { useCallback, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import gift from '../assets/gift.png'
import plane from '../assets/plane.png'

const useStyles = isMobile => ({
  giftsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    border: '1px solid rgb(219,172,52)',
    backgroundColor: 'rgba(219,172,52,0.2)',
    padding: '50px'
  },
  text: {
    textAlign: 'center',
    marginBottom: '15px',
    fontFamily: 'Montserrat'
  },
  bankAccountsContainer: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-around',
    width: '100%',
    textAlign: 'center'
  },
  bankAccountCard: {
    border: '1px solid rgb(219,172,52)',
    backgroundColor: 'rgba(219,172,52,0.5)',
    borderRadius: '3px',
    width: '50%',
    margin: '10px',
    marginBottom: '15px',
    cursor: 'pointer'
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0,0,0,0.4)',
    border: '2px solid #000',
    borderRadius: '3px',
    boxShadow: 24,
    padding: '10px'
  },
  gift: {
    position: 'absolute',
    top: '20%',
    left: isMobile ? '2%' : '27%',
    height: '50px'
  },
  plane: {
    position: 'absolute',
    top: '40%',
    right: isMobile ? '2%' : '27%',
    height: '50px'
  },
  button: {
    color: 'white',
    borderColor: 'white'
  }
})
export default function Gifts () {
  const isMobile = useIsMobile()
  const styles = useStyles(isMobile)
  return (
    <Grid style={styles.giftsContainer}>
      <Grid style={styles.text}>
        <Grid style={styles.title}>El mejor regalo es tu presencia</Grid>
        <Grid style={styles.title}>Si queres dejarnos un regalito</Grid>
        <Grid style={styles.gifts}>
          te invitamos a colaborar con nuestra luna de miel
        </Grid>
      </Grid>
      <img style={styles.gift} src={gift} alt='gift' />
      <img style={styles.plane} src={plane} alt='plane' />
      <BankDetailsModal />
    </Grid>
  )
}

function BankAccountCard ({
  alias,
  cbu,
  bank,
  owner,
  type,
  aliasCopy,
  setAliasCopy
}) {
  const styles = useStyles()
  const [tooltipText, setTooltipText] = useState('Copiar alias')
  const handleOnCopy = useCallback(() => {
    setTooltipText('Alias copiado!')
    setAliasCopy(alias)
  }, [alias, setAliasCopy])

  useEffect(() => {
    if (aliasCopy !== alias) {
      setTooltipText('Copiar alias')
    }
  }, [aliasCopy, alias])
  return (
    <CopyToClipboard text={alias} onCopy={handleOnCopy}>
      <Tooltip title={tooltipText}>
        <Grid style={styles.bankAccountCard}>
          <Grid>
            <span style={{ fontWeight: 'bold' }}>Banco:</span> {bank}
          </Grid>
          <Grid>
            <span style={{ fontWeight: 'bold' }}>Alias:</span> {alias}
          </Grid>
          <Grid>
            <span style={{ fontWeight: 'bold' }}>Moneda:</span> {type}
          </Grid>
          <Grid>
            <span style={{ fontWeight: 'bold' }}>CBU:</span> {cbu}
          </Grid>
          <Grid>
            <span style={{ fontWeight: 'bold' }}>Titular:</span> {owner}
          </Grid>
        </Grid>
      </Tooltip>
    </CopyToClipboard>
  )
}

function BankDetailsModal () {
  const styles = useStyles()
  const [openModal, setOpenModal] = useState(false)
  const handleClose = useCallback(() => setOpenModal(false), [])
  const handleOpenModal = useCallback(() => setOpenModal(true), [])
  const [aliasCopy, setAliasCopy] = useState('')
  return (
    <Grid>
      <Button
        style={styles.button}
        variant='outlined'
        onClick={handleOpenModal}
      >
        Ver datos bancarios
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={openModal}>
          <Grid style={styles.modal}>
            <Grid style={styles.bankAccountsContainer}>
              <BankAccountCard
                alias='GIULI.APOSTOLI'
                type='$'
                cbu='0720247888000038225440'
                bank='Santander'
                owner='GIULIANA MICAELA APOSTOLI'
                aliasCopy={aliasCopy}
                setAliasCopy={setAliasCopy}
              />
              <BankAccountCard
                alias='WOMO.DOLARES'
                type='USD'
                cbu='0720247888000038225440'
                bank='Hipotecario'
                owner='FACUNDO GASTON LAZCANO COLODRERO'
                aliasCopy={aliasCopy}
                setAliasCopy={setAliasCopy}
              />
            </Grid>
            <Grid style={styles.description}>
              Si lo deseas, tambien podes colaborar con efectivo o crypto,
              escribinos para coordinar.
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  )
}
