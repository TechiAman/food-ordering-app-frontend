import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Delievery from '../Delievery/delievery';
import PaymentMode from '../PaymentMode/payment-mode';
import Summary from '../../Summary/summary';
import './main.css'

const useStyles = makeStyles(theme => ({
  root: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row'
  },
  rootMain: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    marginRight: "40px",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
	},
	paymentSteps: {
		width: '100%'
	}
}));

function getSteps() {
  return ['Delievery', 'Payment'];
}

function getStepContent(step, baseUrl, handleSteps, setPaymentMethod, setDeliveryAddress) {
  switch (step) {
    case 0:
      return <Delievery handleSteps={handleSteps} setDeliveryAddress={setDeliveryAddress} baseUrl={baseUrl}/>;
    case 1:
      return <PaymentMode handleSteps={handleSteps} setPaymentMethod={setPaymentMethod} baseUrl={baseUrl}/>;
    default:
      return 'Unknown step';
  }
}

export default function Main(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [moveNext, shouldMoveNext] = React.useState(false);
  const [paymentId, setPaymentId] = React.useState(0);
  const [addressId, setDeliveryAddressId] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (moveNext) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const setPaymentMethod = (id) => {
    setPaymentId(id);
  }

  const setDeliveryAddress = (id) => {
    setDeliveryAddressId(id);
  }

  const handleSteps = (val) => {
    shouldMoveNext(val)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setPaymentId(0);
    setDeliveryAddressId(0);
  };

  return (
    <div className={`${classes.root} main-container`}>
      <div className={`${classes.rootMain} root-container`}>
      <Stepper activeStep={activeStep} orientation="vertical" className={classes.paymentSteps}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index, props.baseUrl, handleSteps, setPaymentMethod, setDeliveryAddress)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>View the summary and place your order now!</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Change
          </Button>
        </Paper>
      )}
      </div>			
      <Summary props={props} baseUrl={props.baseUrl} paymentId={paymentId} addressId={addressId}/>
    </div>
  );
}