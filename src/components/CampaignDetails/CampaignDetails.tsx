import React, { Component, useEffect, useState } from 'react';
import {  Spinner } from 'react-bootstrap';
import './CampaignDetails.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  InputGroup,
  FormControl,
  ProgressBar,Modal
} from 'react-bootstrap';


import { ethers } from 'ethers';
import {  renderTimestampRemaining, timeStamptodays } from '../../utils';
import Swal from 'sweetalert2';

type DataType ={
  title? : string;
  Address? : string;
  about ?: string;
  image1 ?: string;
  image2 ?: string;
  image3 ?: string;
  Category ?: string;
  user ?: string;
  designation ?: string;
  link ?: string;
  deadline ?: number;
  organization ?: string ;
  address ?: string;
  raised ?: number;
  goal ?: number; 
  supporter ?: number;
  approved ?: boolean;
  claimed ?: number;
}


export function CampaignDetails()  {

  const { hash } = useParams() as { hash: string };
  const [campaigner, setCampaigner] = useState(false);
  const [exist, setExist] = useState<boolean>(true);
  const [spin, setSpin] = useState<boolean>(true);
  const [details, setDetails] = useState<DataType>({});
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<any>([]);
  const [recent, setRecent] = useState<any>([]);
  console.log(hash);
  const getData = async () => {
    const Hash = await window.charityInstance.campaigns(hash);
    const ipfshash = Hash[0];
    console.log(ipfshash); 
    const data = await axios.get(`https://ipfs.eraswap.cloud/ipfs/${ipfshash}`);
    console.log(data);
     if(data.status !== 200)setExist(false);
    setDetails(data.data);

    const newDetail :DataType ={
      title : data.data?.Benificery,
      Address : Hash[2],
      about : data.data?.Description,
      image1 : data.data?.Img[0],
      image2 : data.data?.Img[1],
      image3 : data.data?.Img[2],
      Category : data.data?.Category, 
      user : data.data?.userName,
      designation : data.data?.userDesignation,
      link : data.data?.link,
      deadline : Hash[5].toNumber() ,
      organization : data.data?.Organization,
      address : data.data?.Address,
      raised : parseInt(ethers.utils.formatEther(Hash[7])),
      goal : parseInt(ethers.utils.formatEther(Hash[6])),
      claimed : parseInt(ethers.utils.formatEther(Hash[8])),
      supporter : Hash[9].toNumber(),
      approved : Hash[4]
    }
    setDetails(newDetail);
    console.log(details);
        
  }; 
  const SupportCampaign = async () => {
    if(window.wallet){
      const A = await window.charityInstance.connect(window.wallet).populateTransaction.Support(hash);
      console.log("call : ",A); 
      Swal.fire({
        title: "Are you sure?", 
        text: "You will not be able to undo this action!",
        html: `<p>You will not be able to undo this action!</p>
                <h1 style={{fontStyle:"bold"}}> Value : ${A.value ? ethers.utils.formatEther(A?.value) : '0'} </h1>
                <small> To : ${A.to} </small><br/><small> From : ${A.from} ES </small>
                <p> gasFee : ${A?.gasPrice || '0'} </p>`,
        icon: "warning", 
        showCancelButton: true,
        cancelButtonText: 'No, cancel!',
        confirmButtonText: "Yes, do it!",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return window.charityInstance.connect(window.wallet).Support(hash)
          .then(async res => {
            Swal.fire({title : 'Good job!',
                       icon : 'success',
                       text : 'You have post your comment '})
          }).catch(async ()=>{
            const add = (window.wallet.address)?window.wallet.address:(await window.wallet.getAddress());
            const x = new ethers.VoidSigner(add, window.provider);
            try {
              const A = await window.charityInstance.connect(x).estimateGas.Support(hash)
              console.log(A);
            } catch (e) {
              console.log('Error is : ', e);
              Swal.fire('Oops...!', `${e}`, 'error')
            }
          });
        }
  
      });

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Please Connect to wallet to support ', 
      });
    }
  }

  const claimCampaign = async () => {
    if(window.wallet){
      
      const A = await window.charityInstance.connect(window.wallet).populateTransaction.claimFunds(hash);
      console.log("call : ",A); 
      Swal.fire({
        title: "Are you sure?", 
        html: `<p>You have claimed ${details.claimed}  ES already </p>
                <h1 style={{fontStyle:"bold"}}> Value : ${A.value ? ethers.utils.formatEther(A?.value) : '0'} </h1>
                <small> To : ${A.to} </small><br/><small> From : ${A.from} ES </small>
                <p> gasFee : ${A?.gasPrice || '0'} </p>`,
        icon: "warning", 
        showCancelButton: true,
        cancelButtonText: 'No, cancel!',
        confirmButtonText: "Yes, do it!",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return window.charityInstance.connect(window.wallet).claimFunds(hash)
          .then(async res => {
            Swal.fire({title : 'Good job!',
                       icon : 'success',
                       text : 'You have post your comment '})
          }).catch(async ()=>{
            const add = (window.wallet.address)?window.wallet.address:(await window.wallet.getAddress());
            const x = new ethers.VoidSigner(add, window.provider);
            try {
              const A = await window.charityInstance.connect(x).estimateGas.claimFunds(hash)
              console.log(A);
            } catch (e) {
              console.log('Error is : ', e);
              Swal.fire('Oops...!', `${e}`, 'error')
            }
          });
        }
  
      });

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Please Connect to wallet to support ', 
      });
    }
  }
  const showComments = async () => {
    const filter = window.charityInstance.filters.Comments(hash,null, null, null);
    const logs = await window.charityInstance.queryFilter(filter);
    const parsedLogs = logs.map((log) => window.charityInstance.interface.parseLog(log));
    const updatevalues = parsedLogs.map((parsedLogs) => parsedLogs.args);
    console.log('All Comments: ', updatevalues);
    setComments(updatevalues);    
  }

  const recentTxn = async () => {
    const filter = window.charityInstance.filters.Donated(hash,null, null);
    const logs = await window.charityInstance.queryFilter(filter);
    const parsedLogs = logs.map((log) => window.charityInstance.interface.parseLog(log));
    let updatevalues = parsedLogs.map((parsedLogs) => parsedLogs.args);
    console.log('All Comments: ', updatevalues);
    updatevalues.reverse();
    if(updatevalues.length > 3)updatevalues = updatevalues.slice(0,3);
    setRecent(updatevalues);    
  }
  
  const postComment = async () => {
    // e.preventDefault();
    if(window.wallet){
      const A = await window.charityInstance.connect(window.wallet).populateTransaction.addComments(hash,comment);
      console.log("call : ",A); 
      Swal.fire({
        title: "Are you sure?", 
        text: "You will not be able to undo this action!",
        html: `<p>You will not be able to undo this action!</p>
                <h1 style={{fontStyle:"bold"}}> Value : ${A.value ? ethers.utils.formatEther(A?.value) : '0'} </h1>
                <small> To : ${A.to} </small><br/><small> From : ${A.from} ES </small>
                <p> gasFee : ${A?.gasPrice || '0'} </p>`,
        icon: "warning", 
        showCancelButton: true,
        cancelButtonText: 'No, cancel!',
        confirmButtonText: "Yes, do it!",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return window.charityInstance.connect(window.wallet).addComments(hash,comment)
          .then(async res => {
            Swal.fire({title : 'Good job!',
                       icon : 'success',
                       text : 'You have post your comment '})
          }).catch(async ()=>{
            const add = (window.wallet.address)?window.wallet.address:(await window.wallet.getAddress());
            const x = new ethers.VoidSigner(add, window.providerESN);
            try {
              const A = await window.charityInstance.connect(window.wallet).estimateGas.addComments(hash,comment)
              console.log(A);
            } catch (e) {
              console.log('Error is : ', e);
              Swal.fire('Oops...!', `${e}`, 'error')
            }
          });
        }
  
      });

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Please Connect to wallet ...', 
      });
    }
  }

  const Donate = async () => {
    if(window.wallet){
      // const A = await window.charityInstance.connect(window.wallet).populateTransaction.addComments(hash,comment);
      // console.log("call : ",A); 
      Swal.fire({
        title: "Nice !", 
        text: "Please enter amount",
        input: 'number',
        showCancelButton: true,
        cancelButtonText: 'cancel',
        confirmButtonText: "Confirm",
        showLoaderOnConfirm: true,
        preConfirm:  (val) => {
          return  window.charityInstance.connect(window.wallet).donate(hash,{value: ethers.utils.parseEther(val)})
          .then( res => {
            Swal.fire({title : 'Good job!',
                       icon : 'success',
                       text : `You have donated ${val} ES `})
          },e =>Swal.fire('Oops...!', `${JSON.stringify(e)}`, 'error'));
          // .catch(async ()=>{
          //   const add = (window.wallet.address)?window.wallet.address:(await window.wallet.getAddress());
          //   const x = new ethers.VoidSigner(add, window.provider);
          //   try {
          //     const A = await window.charityInstance.connect(x).estimateGas.donate(hash,{value: ethers.utils.parseEther(val)})
          //     console.log(A);
          //   } catch (e) { 
          //     console.log('Error is : ', e);
          //     Swal.fire('Oops...!', `${e}`, 'error')
          //   }
          // });
        }
  
      });

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Please Connect to wallet ...', 
      });
    }
  }

  
  //  { mapState, setMapState } = useMapState();  
  useEffect(() => {
    (async () => {
      try {
        await getData();
        await showComments();
        await recentTxn();
      } catch {
        setExist(false);
      }
      setSpin(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spin]);
  
 
     
    return (
      <div>
        {spin ? (
        <div className="preloader">
          <Spinner className="loader" animation="border" variant="primary" />
        </div>
      ) : null}
      { exist ? (
        <main id="main">
          <div className="inner-page">
            <section className="breadcrumbs">
              <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                  <h2>Campaign Details</h2>
                  <ol>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>Campaign Details</li>
                  </ol>
                </div>
              </div>
            </section>
            <section id="portfolio-details" className="portfolio-details">
              <div className="container" data-aos="fade-up">
                <div className="portfolio-details-container">
                  <div className="row justify-content-center ">
                    <div
                      className="col-lg-8 pt-4 pt-lg-0 order-2 order-lg-1 content text-center mx"
                      data-aos="fade-right"
                      data-aos-delay="100"
                    >
                      <h3 className="font-weight-bold">
                        {details.title}
                      </h3>
                    </div>
                  </div>
                  <div className="row mt40">
                    <div className="col-lg-8">
                      <Card className="shadow">
                        <Card.Body>
                          <div className="owl-carousel portfolio-details-carousel mt20">
                            <img alt="img" src={'https://ipfs.eraswap.cloud/ipfs/' + details?.image1} className="img-fluid"  />
                            <img alt="img" src={'https://ipfs.eraswap.cloud/ipfs/' + details?.image2} className="img-fluid"  />
                            <img alt="img" src={'https://ipfs.eraswap.cloud/ipfs/' + details?.image3} className="img-fluid"  />
                          </div>

                          <div className="portfolio-description">
                            <h2>About the Fundraiser</h2>
                            <p className="alert alert-warning alert-dismissible fade show">
                              *CharityDApp is not charging any fee on this fundraiser*
                            </p>
                            <p>{details?.about} </p>
                            <div className="alert alert-secondary" role="alert">
                              <h4 className="Font-weight-bold">
                                Followon SwappersWall:
                                <a href={details?.link} className="">
                                  {details?.link}
                                </a>
                              </h4>
                            </div>
                          </div>
                        </Card.Body> 
                      </Card>
                    </div>
                    <div className="col-lg-4">
                      <div className="icon-box cha-list-box">
                        <div className="cha-list-box-">
                          <Button
                            onClick={Donate}
                            className="get-started-btn scrollto dontate-btn text-center btn-lg btn-yellow btn-block"
                          >
                            Donate Now
                          </Button>
                          <div className="brand-color-1-text text-left amount-raised">
                            <h2>{details.raised} ES</h2>
                            <small className="text-dark">Raised out of {details?.goal}ES Goal</small>
                          </div>
                          <ProgressBar animated now={Math.floor(details?.raised*100/details.goal)} variant="info" />
                          <div className="cha-list-box-footer d-flex flex-column flex-md-row mt10">
                            <div className="timeleft"> 
                              <i className="fa fa-clock-o" aria-hidden="true"></i> &nbsp; { timeStamptodays(details.deadline)} days remaining
                            </div>
                            <div className="Suppoter ml-auto">
                              <i onClick={SupportCampaign} className="fa fa-heart text-danger" aria-hidden="true"></i> {details?.supporter}
                              {' '}Supporters
                            </div>
                          </div>
                          {/* <div className="kyclevel d-flex flex-column flex-md-row mt20">
                            <div className="kyc-level-text font-weight-bold">KYC Level</div>
                            <div className="">
                              <img alt="img"
                                src={process.env.PUBLIC_URL+"/assets/img/kyc-level-1.png"}
                                width="45px"
                                className="text-left"
                              />
                              <img alt="img"
                                src={process.env.PUBLIC_URL+"/assets/img/kyc-level-2.png"}
                                width="45px"
                                className="text-left"
                              />
                              <img alt="img"
                                src={process.env.PUBLIC_URL+"/assets/img/kyc-level-3.png"}
                                width="45px"
                                className="text-left"
                              />
                            </div>
                          </div>*/}
                        </div> 
                      </div>
                      <div className="portfolio-info">
                       
                            <ul className="com-list">
                                <li>
                                    <div className="pull-left">
                                            <span className="profile-image center-block initialsProfile">Org</span>	
                                    </div>
                                      <div className="backers-details">
                                          <small className="donor-name font-weight-bold"> Organization 	</small>
                                          <span className="donor-name text-success"> {details?.organization}</span>
                                          <span className="contributed-amt pull-right">  <img alt="img" src={process.env.PUBLIC_URL+"/assets/img/verifiednew.png"} width="45px" className="text-left"/></span>
                                          
                                    </div>
                                </li>
                                <li>
                                    <div className="pull-left">
                                            <span className="profile-image center-block initialsProfile">Cp</span>	
                                    </div>
                                    <div className="backers-details">
                                          <small className="donor-name font-weight-bold"> Campaigner </small>
                                          <span className="donor-name text-success"> {details?.user}</span>
                                          <span className="contributed-amt pull-right">  <img alt="img"  src={process.env.PUBLIC_URL+"/assets/img/verifiednew.png"} width="45px" className="text-left"/></span>
                                    </div>
                                </li>
                            </ul>
                      </div>
                      <div className="portfolio-info">
                        <h3><i className="fa fa-trophy" aria-hidden="true"></i> Recent Donors</h3>

                      
                        <ul className="com-list">
                        {recent.map((ele) => {
                          return (
                          <li> 
                            <span title={ele[1]} className="donor-name d-inline-block text-truncate " style={{maxWidth : '200px'}}> {ele[1]}	</span>
                            <span className="contributed-amt pull-right">{ethers.utils.formatEther(ele[2])} &nbsp; ES</span>
                            {/* <div className="blackquote"><i className="fa fa-clock-o" aria-hidden="true"></i> 2 days ago</div>             */}
                          </li>
                          );
                        })}{' '}
                          
                        </ul>
                      </div> <br/>
                      <Button
                        onClick={claimCampaign}
                        className="get-started-btn scrollto dontate-btn text-center btn-lg btn-yellow btn-block"
                      >
                        Claim Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt40" style={{maxWidth:"540px",marginLeft:'20px'}}>
                <div className="container" >
                  <div className="row">
                    <div className="col-sm-12">
                      <h3>Comments</h3> <hr/>
                    </div>
                  </div>
                <div className="comments">                
                  
                {/* Start here  */}
                {comments.map((ele) => {
                    return (
                      <div className="row">
                    <div className="col-1">
                      <div className="thumbnail">
                        <img alt="img" className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                      </div>
                    </div>
                    <div className="col-11">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <strong className="text-bold ">{ele[1]}</strong> <span className="text-muted"> { renderTimestampRemaining(ele[3].toNumber())} ago</span>
                        </div>
                        <div className="panel-body">{ele[2]}</div>
                      </div> 
                    </div>
                  </div>
                    );
                  })}{' '}
                  
                {/* End here */}
                </div>
                 
                    <textarea rows={4} onChange={e=> setComment(e.target.value)} value={comment} className="form-control m-2 col-sm-8 p-3" placeholder="Write Something here ..."></textarea>
                    <button onClick={postComment} className="btn btn-primary">Post</button>
                
                </div>
              </div>



              
            </section>          
          </div>
        </main>
       ):<div className="error"> </div>}
    </div>
    );
}
