import React, { useState } from 'react';
import './CreateCampaign.css';
import { Link } from 'react-router-dom';
import { InputGroup, FormControl, Card, Col, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useMapState } from '../MapState';
import ipfs from '../ipfs';
import { ethers } from 'ethers';
import { renderTimeStamp } from '../../utils';
import Swal from 'sweetalert2';

type State = {
  bunchModal: boolean;
};
// function validURL(str) {
//     var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
//       '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
//       '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
//       '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
//       '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
//       '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

//     return !!pattern.test(str);
//   }

// const fileToDataUri = (file) => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       resolve(event.target.result)
//     };
//     reader.readAsDataURL(file);
//     })

type inputProps = {
  prevStep?: (e: any) => void;
  nextStep?: (e: any) => void;
};
function Step4(props: inputProps) {
  const { mapState, setMapState } = useMapState();
  const handleChange = (e: React.ChangeEvent<any>) => {
    setMapState({ [e.target.name]: e.target.value });
  };

  // const [isSubmit, setisSubmit] = useState<boolean>(false);
  // const [txn,setTxn] = useState({hash:' ',timestamp : 0});
  // const [spin, setSpin] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [hash, setHash] = useState('loading...');
  const [byte, setByte] = useState('loading...');

  const handleChange1 = (e: React.ChangeEvent<any>) => {
    setMapState({ [e.target.name]: e.target.value });
    setValid(validURL);
  };
  const [valid, setValid] = useState(null);

  const validURL = () => {
    // eslint-disable-next-line no-useless-escape
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    var res = mapState.link.match(regex);
    if (res == null) return false;
    else return true;
  };
  const loadIPFS = async () => {
    let asyncGenerator = await ipfs.add(JSON.stringify(mapState));
    console.log(asyncGenerator);
    return asyncGenerator.path;
  };

  const handleSubmit = async () => {
    const Hash = await loadIPFS();
    if (window.wallet) {
      const A = await window.charityInstance
        .connect(window.wallet)
        .populateTransaction.newCampaign(
          Hash,
          mapState.Benificery,
          ethers.utils.parseEther(mapState.RaisedFund),
          mapState.fullExtraction,
          renderTimeStamp(mapState.endTime)
        );
      console.log('call : ', A);
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to undo this action!',
        html: `<p>You will not be able to undo this action!</p>
                  <h1 style={{fontStyle:"bold"}}> Value : ${
                    A.value ? ethers.utils.formatEther(A?.value) : '0'
                  } </h1>
                  <small> To : ${A.to} </small><br/><small> From : ${A.from} ES </small>
                  <p> gasFee : ${A?.gasPrice || '0'} </p>`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No, cancel!',
        confirmButtonText: 'Yes, do it!',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return window.charityInstance
            .connect(window.wallet)
            .newCampaign(
              Hash,
              mapState.Benificery,
              ethers.utils.parseEther(mapState.RaisedFund),
              mapState.fullExtraction,
              renderTimeStamp(mapState.endTime)
            )
            .then(async (res) => {
              const x = await res.wait();
              const event = await window.charityInstance.interface.parseLog(x.logs[0]);
              setHash(res.hash);
              setByte(event.args[0]);
              setDone(true);
              Swal.fire({
                title: 'Good job!',
                icon: 'success',
                html: `<p>You Proposal has been Added</p><br/>Transaction Hash<a>${res.hash}</a><br/>
                                <a href="/CampaignDetails/${event.args[0]}" >  go here  : ${event.args[0]}</a>`,
              });
            })
            .catch(async () => {
              const add = window.wallet.address
                ? window.wallet.address
                : await window.wallet.getAddress();
              const x = new ethers.VoidSigner(add, window.providerESN);
              try {
                const A = await window.charityInstance
                  .connect(x)
                  .estimateGas.newCampaign(
                    Hash,
                    mapState.Benificery,
                    ethers.utils.parseEther(mapState.RaisedFund),
                    mapState.fullExtraction,
                    renderTimeStamp(mapState.endTime)
                  );
                console.log(A);
              } catch (e) {
                console.log('Error is : ', e);
                Swal.fire('Oops...!', `${e}`, 'error');
              }
            });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please Connect to wallet ...',
      });
    }
  };

  const TxnDetails = ({ hash, byte }) => {
    return (
      <>
        <br />
        <i
          className="fa fa-check-circle text-center"
          style={{ fontSize: '8em', color: '#54BE3D' }}
        ></i>
        <p className="text-center">
          {' '}
          Transaction Sussessful <br /> Your Survey has been created{' '}
        </p>
        <br /> <br /> <br />
        <table className="table">
          <tr>
            <td> Transaction Hash : </td>
            <td>
              <a href={'https://eraswap.info/txn/' + hash}>{hash} </a>{' '}
            </td>
          </tr>
          <tr>
            <td>TimeStamp</td>
            <td>{Date.now()}</td>
          </tr>
          <tr>
            <td>Your Survey </td>
            <td>
              <Link to={'/CampaignDetails/' + byte}>{byte}</Link>
            </td>
          </tr>
          <hr />
        </table>
      </>
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-lg-12 text-center mx" data-aos="fade-right" data-aos-delay="100">
          <h3>Explore Campaign Step 4</h3>
        </div>
      </div>
      <div className="row mt40">
        <div
          className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto  mb40 "
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <Card className="shadow">
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="font-weight-bold">
                    Stakes to be delegated fir the charity
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="0xb662f94a0383C089529097d21D8e66476de30d46"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="font-weight-bold">
                    Delegated Time Period for the stake
                  </Form.Label>

                  <Form.Control type="datetime-local" placeholder="" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="font-weight-bold">
                    Do you need Full Extraction ?
                  </Form.Label>
                  <Form.Check
                    custom
                    type="switch"
                    id="custom-switch"
                    checked={mapState.fullExtraction}
                    onChange={() => setMapState({ fullExtraction: !mapState.fullExtraction })}
                    label=""
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="font-weight-bold">End Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="endTime"
                    value={mapState.endTime}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="font-weight-bold">Add Link</Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i className="fa fa-link" aria-hidden="true"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      id="inlineFormInputGroup"
                      placeholder=""
                      name="link"
                      isValid={valid}
                      isInvalid={!valid && !(mapState.link === '')}
                      value={mapState.link}
                      onChange={handleChange1}
                    />
                  </InputGroup>
                </Form.Group>
                <Button className="mb10 btn btn-dark" variant="dark" onClick={props.prevStep}>
                  Previous
                </Button>

                <Button className="mb10 ml10 btn btn-dark" onClick={handleSubmit} variant="dark">
                  Submit
                </Button>

                {/* <Modal
                    show={this.state.bunchModal}
                    onHide={this.handleClose}
                    className="com-modal"
                    >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body className="text-center">
                    <h2 className="font-weight-bold mb20 text-info">Congratulations!!!</h2>
                        <h5 className="font-weight-bold mb20">You have successfully created your Campaign</h5>
                        <a
                        href="/CampaignDetails"
                        className="btn btn-default btn-yellow mb20 text-white"
                        onClick={this.handleClose}
                        >
                        OK
                        </a>
                    </Modal.Body>
                    </Modal> */}
              </Form>
            </Card.Body>
            {done ? <TxnDetails hash={hash} byte={byte} /> : null}
          </Card>
        </div>
      </div>
    </div>
  );
}

function Step3(props: inputProps) {
  const { mapState, setMapState } = useMapState();
  const handleChange = (e: React.ChangeEvent<any>) => {
    setMapState({ [e.target.name]: e.target.value });
  };

  const captureFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log('hello world');
    const index = parseInt(event.target.name);

    const file = event.target.files[0];
    // fileToDataUri(file)
    // .then(async dataUri => {
    //     console.log('uri',dataUri);
    //     let asyncGenerator = await ipfs.add(dataUri);
    //   console.log(asyncGenerator);
    //   setImg(dataUri)
    // })
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      console.log(reader.result);
      const buf = Buffer.from(reader.result);
      let asyncGenerator = await ipfs.add(buf);
      console.log(asyncGenerator);
      console.log('buffer', buf);

      let x = mapState.Img;

      if (asyncGenerator) {
        x[index] = asyncGenerator.path;
        setMapState({ Img: [...x] });
      }
    };
  };
  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-lg-12 text-center mx" data-aos="fade-right" data-aos-delay="100">
          <h3>Explore Campaign Step 3</h3>
        </div>
      </div>
      <div className="row mt40">
        <div
          className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto  mb40 "
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <Card className="shadow">
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="font-weight-bold">Name Your Benificery</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="Benificery"
                    value={mapState.Benificery}
                    onChange={handleChange}
                  />
                </Form.Group>

                <label className="font-weight-bold">Attach Files</label>
                <div className="row">
                  <div className="col-md-4">
                    <form method="post" action="#" id="#">
                      <div className="form-group files">
                        <Form.File
                          className="position-relative"
                          required
                          name="0"
                          accept="image/*"
                          onChange={captureFile}
                          label="Upload Your File "
                        />
                      </div>
                    </form>
                  </div>
                  <div className="col-md-4">
                    <form method="post" action="#" id="#">
                      <div className="form-group files">
                        <Form.File
                          className="position-relative"
                          required
                          name="1"
                          accept="image/*"
                          onChange={captureFile}
                          label="Upload Your File "
                        />
                      </div>
                    </form>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group files">
                      <Form.File
                        className="position-relative"
                        required
                        name="2"
                        accept="image/*"
                        label="Upload Your File "
                        onChange={captureFile}
                      />
                    </div>
                  </div>
                </div>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="font-weight-bold">About Benificery</Form.Label>
                  <textarea
                    className="form-control"
                    name="Description"
                    value={mapState.Description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Message"
                  />
                </Form.Group>
                <Button className="mb10      btn btn-dark " variant="dark" onClick={props.prevStep}>
                  Previous
                </Button>
                <Button className="mb10 ml10 btn btn-dark" variant="dark" onClick={props.nextStep}>
                  Next
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Step2(props: inputProps) {
  const { mapState, setMapState } = useMapState();
  const handleChange = (e: React.ChangeEvent<any>) => {
    setMapState({ [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-lg-12 text-center mx" data-aos="fade-right" data-aos-delay="100">
          <h3>Explore Campaign step 2</h3>
        </div>
      </div>
      <div className="row mt40">
        <div
          className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto  mb40 "
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <Card className="shadow">
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="font-weight-bold">Raising Funds For </Form.Label>
                  <Form.Control
                    as="select"
                    onChange={handleChange}
                    name="Category"
                    value={mapState.Category}
                  >
                    <option>Medical</option>
                    <option>Education</option>
                    <option>Memorial</option>
                    <option>Others</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="font-weight-bold"> I want ot Raise</Form.Label>

                  <InputGroup className="mb-2">
                    <InputGroup.Prepend>
                      <InputGroup.Text>ES </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      type="number"
                      name="RaisedFund"
                      value={mapState.RaisedFund}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="font-weight-bold">Name of the Organization</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="Organization"
                    value={mapState.Organization}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="font-weight-bold">Address Of Organization</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="Address"
                    value={mapState.Address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button className="mb10 btn btn-dark" variant="dark" onClick={props.prevStep}>
                  Previous
                </Button>
                <Button className="mb10 btn btn-dark" variant="dark" onClick={props.nextStep}>
                  Next
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Step1(props: inputProps) {
  const { mapState, setMapState } = useMapState();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapState({ [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-lg-12 text-center mx" data-aos="fade-right" data-aos-delay="100">
          <h3>Explore Campaign</h3>
        </div>
      </div>
      <div className="row mt40">
        <div
          className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto  mb40 "
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <Card className="shadow">
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label className="font-weight-bold">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="userName"
                    value={mapState.userName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Row>
                  <Col lg={6}>
                    <Form.Label className="font-weight-bold">Age</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder=""
                      name="userAge"
                      value={mapState.userAge}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col lg={6}>
                    <Form.Label className="font-weight-bold">designation</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      name="userDesignation"
                      value={mapState.userDesignation}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Row>
                <Form.Group controlId="formBasic" className="mt20">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="inlineCheckbox1"
                      name="option1"
                    />
                    <label className="form-check-label">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="inlineCheckbox2"
                      name="option1"
                    />
                    <label className="form-check-label">Female</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="inlineCheckbox3"
                      name="option1"
                    />
                    <label className="form-check-label">Other</label>
                  </div>
                </Form.Group>
                <Button className="mb10 btn btn-dark" variant="dark" onClick={props.nextStep}>
                  Next
                </Button>

                {/* <Link to="/CreateCampaignStep2"  className="mb10 btn btn-dark">Next</Link> */}
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
export function CreateCampaign() {
  // const {  setMapState } = useMapState();
  // const [isOn, setIsOn] = useState(false);
  const [step, setStep] = useState(1);
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setMapState( { [e.target.name]: e.target.value } );
  // };

  const nextStep = (e: any) => setStep(step + 1);
  const prevStep = (e: any) => setStep(step - 1);
  return (
    <>
      <main id="main">
        <div className="inner-page">
          <section className="inner-page">
            {(() => {
              switch (step) {
                case 1:
                  return <Step1 nextStep={nextStep} />;

                case 2:
                  return <Step2 nextStep={nextStep} prevStep={prevStep} />;
                case 3:
                  return <Step3 nextStep={nextStep} prevStep={prevStep} />;
                case 4:
                  return <Step4 prevStep={prevStep} />;
                default:
                  console.log('Create Campign');
              }
            })()}
          </section>
        </div>
      </main>
    </>
  );
}
