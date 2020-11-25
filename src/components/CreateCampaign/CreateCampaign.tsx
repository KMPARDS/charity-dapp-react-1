import React, { useState } from 'react';
import './CreateCampaign.css';
import { Link } from 'react-router-dom';
import { InputGroup,FormControl,Card,Col,Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useMapState } from '../MapState';
import ipfs from '../ipfs';

type State = {
  bunchModal: boolean;
};
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    return !!pattern.test(str);
  }

// const fileToDataUri = (file) => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       resolve(event.target.result)
//     };
//     reader.readAsDataURL(file);
//     })


type inputProps = {
  prevStep ?: (e:any) => void; 
  nextStep ?: (e:any) => void;
}
function Step4(props : inputProps){
    const { mapState,setMapState } = useMapState();
    const handleChange = (e: React.ChangeEvent<any>) => {
        setMapState( { [e.target.name]: e.target.value } );
    };

    const handleChange1 = (e: React.ChangeEvent<any>) => {
        setMapState( { [e.target.name]: e.target.value } );
        setValid(validURL);
    };
    const [valid, setValid] = useState(null)

    const validURL = () => {
        var expression =  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi; 
        var regex = new RegExp(expression);  
        var res = mapState.link.match(regex);
            if(res == null)
                return false;
            else
                return true;
      } 

    const handleSubmit = async ()=>{
        
    }
   
  return (
    <div className="container">
        <div className="row justify-content-center ">
            <div className="col-lg-12 text-center mx"
            data-aos="fade-right"
            data-aos-delay="100"
            >
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
                    
                    <Form.Control
                        type="datetime-local"
                        placeholder=""
                    />
                    
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
                            onChange={()=>setMapState({fullExtraction : !mapState.fullExtraction})}
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
                    <Form.Label className="font-weight-bold">Add  Link</Form.Label>
                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text><i className="fa fa-link" aria-hidden="true"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                            id="inlineFormInputGroup" placeholder=""
                            name="link" 
                            isValid={valid}
                            isInvalid={!valid && !(mapState.link === "")}
                            value={mapState.link}
                            onChange={handleChange1} />
                    </InputGroup>
                    </Form.Group>
                    <Button className="mb10 btn btn-dark" variant="dark" onClick={props.prevStep} >Previous</Button>


                    <Button className="mb10 ml10 btn btn-dark" onClick={props.prevStep} variant="dark">Submit</Button>

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
            </Card>
            </div>
        </div>
    </div>
            
  )
}

function Step3(props : inputProps){ 
    const { mapState,setMapState } = useMapState();
    const handleChange = (e: React.ChangeEvent<any>) => {
        setMapState( { [e.target.name]: e.target.value } );
    };
    const [img,setImg] = useState<any>({});

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
        
          if (asyncGenerator){
            x[index] = asyncGenerator.path;
            setMapState({Img : [...x]})
          }
        };
      };
  return (
  
              <div className="container">
                <div className="row justify-content-center ">
                  <div
                    className="col-lg-12 text-center mx"
                    data-aos="fade-right"
                    data-aos-delay="100"
                  >
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
                            <Form.Control type="text" placeholder="" name="Benificery" value={mapState.Benificery} onChange={handleChange} />
                          </Form.Group>
                          
                          <label className="font-weight-bold">Attach Files</label>
                          <img src={img} alt="img" />
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
                            <textarea className="form-control" name="Description" value={mapState.Description} onChange={handleChange} rows={3} placeholder="Message"/>
                          </Form.Group>
                          <Button className="mb10      btn btn-dark " variant="dark" onClick={props.prevStep}>Previous</Button>
                          <Button className="mb10 ml10 btn btn-dark" variant="dark" onClick={props.nextStep}>Next</Button>
                        </Form>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
     
  )
}


function Step2(props : inputProps){ 
    const { mapState,setMapState } = useMapState();
    const handleChange = (e: React.ChangeEvent<any>) => {
        setMapState( { [e.target.name]: e.target.value } );
    };
  return (
    <div className="container">
    <div className="row justify-content-center ">
      <div
        className="col-lg-12 text-center mx"
        data-aos="fade-right"
        data-aos-delay="100"
      >
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
                <Form.Control as="select"  onChange={handleChange} name="Category" value={mapState.Category}>
                  <option>Medical</option>
                  <option>Education</option>
                  <option>Memorial</option>
                  <option>Others</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label className="font-weight-bold" > I want ot Raise</Form.Label>
                
                
                <InputGroup className="mb-2">
                  <InputGroup.Prepend> 
                    <InputGroup.Text>ES </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl type="number" name="RaisedFund" value={mapState.RaisedFund} onChange={handleChange}/>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label className="font-weight-bold" >Name of the Organization</Form.Label>
                <Form.Control 
                 type="text" 
                 placeholder=""
                 name="Organization" 
                 value={mapState.Organization} 
                 onChange={handleChange} />
              </Form.Group>
              
                <Form.Group controlId="formBasicEmail">
                <Form.Label className="font-weight-bold">Address Of Organization</Form.Label>
                <Form.Control type="text" placeholder="" name="Address" value={mapState.Address} onChange={handleChange} />
              </Form.Group>

              <Button className="mb10 btn btn-dark" variant="dark" onClick={props.prevStep}>Previous</Button>
              <Button className="mb10 btn btn-dark" variant="dark" onClick={props.nextStep}>Next</Button>
              
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  </div>

  )
}

function Step1(props : inputProps){
    const { mapState,setMapState } = useMapState();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMapState( { [e.target.name]: e.target.value } );
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
                  <Col  lg={6} >
                    <Form.Label className="font-weight-bold">Age</Form.Label>
                    <Form.Control 
                      type="number"
                      placeholder=""
                      name="userAge"
                      value={mapState.userAge}
                      onChange={handleChange} />
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
                    <div  className="form-check form-check-inline">
                      <input  className="form-check-input" type="radio" id="inlineCheckbox1" name="option1"/>
                      <label  className="form-check-label" >Male</label>
                    </div>
                    <div  className="form-check form-check-inline">
                      <input  className="form-check-input" type="radio" id="inlineCheckbox2" name="option1"/>
                      <label  className="form-check-label">Female</label>
                    </div>
                    <div  className="form-check form-check-inline">
                      <input  className="form-check-input" type="radio" id="inlineCheckbox3" name="option1" />
                      <label  className="form-check-label" >Other</label>
                    </div>
                </Form.Group>
                <Button className="mb10 btn btn-dark" variant="dark" onClick={props.nextStep}>Next</Button>
                

                {/* <Link to="/CreateCampaignStep2"  className="mb10 btn btn-dark">Next</Link> */}
              </Form>


                </Card.Body>  
              </Card>
              
              
              
            </div>
          </div>
        </div>
      
    )
}
export function CreateCampaign()  {
  const {  setMapState } = useMapState();
  const [isOn, setIsOn] = useState(false);
  const [step,setStep] = useState(4);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapState( { [e.target.name]: e.target.value } );
  };

  const nextStep = (e:any)=> setStep(step+1);
  const prevStep = (e:any)=> setStep(step-1);
    return (
      <>
        <main id="main">
          <div className="inner-page">
            <section className="inner-page">
              {(()=> 
              {switch (step) {
                case 1:
                  return (<Step1 nextStep={nextStep} />);
                  
                case 2:
                  return (<Step2 nextStep={nextStep} prevStep={prevStep}/> );
                case 3:
                  return (<Step3 nextStep={nextStep} prevStep={prevStep}/> );
                case 4:
                  return <Step4 prevStep={prevStep} />
                default:
                  console.log('Create Campign');
                  
              }})()}            
            </section>  
          </div>
        </main>
      </> 
    )
  
}
