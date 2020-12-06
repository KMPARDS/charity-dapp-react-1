import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Button, ProgressBar, Spinner } from 'react-bootstrap';
import { ethers } from 'ethers';
import { timeStamptodays } from '../../utils';
import Swal from 'sweetalert2';
type State = {
  spin: boolean;
  allCampaign: any[];
  charityPool: number;
};
export class Home extends Component<State> {
  state: State = {
    spin : true,
    allCampaign: [],
    charityPool: 0,
  };
  poolDonation = async () => {
    if (window.wallet) {
      // const A = await window.charityInstance.connect(window.wallet).populateTransaction.addComments(hash,comment);
      // console.log("call : ",A);
      Swal.fire({
        title: 'Nice !',
        text: 'Please enter amount',
        input: 'number',
        showCancelButton: true,
        cancelButtonText: 'cancel',
        confirmButtonText: 'Confirm',
        showLoaderOnConfirm: true,
        preConfirm: (val) => {
          return window.charityInstance
            .connect(window.wallet)
            .donateToCharityPool( { value: ethers.utils.parseEther(val) })
            .then(
              () => {
                Swal.fire({
                  title: 'Good job!',
                  icon: 'success',
                  text: `You have donated ${val} ES `,
                });
              },
              (e) => Swal.fire('Oops...!', `${JSON.stringify(e)}`, 'error')
            );
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
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please Connect to wallet ...',
      });
    }
  };
  getCampaign = async () => {
    const getPool = await window.charityInstance.getCharityPool();
    const pool = ethers.utils.formatEther(getPool);
    const filter = window.charityInstance.filters.ProposalAproved(null, null, null);
    const logs = await window.charityInstance.queryFilter(filter);
    const parseLogs = logs.map((log) => window.charityInstance.interface.parseLog(log));
    const campaignAll = parseLogs.map((ele) => ele.args[0]);
    console.log('All :', campaignAll);
    const detailsAll = await Promise.all(
      campaignAll.map(async (ele) => {
        const x = await window.charityInstance.campaigns(ele);
        const goal = parseInt(ethers.utils.formatEther(x[6]));
        const raise = parseInt(ethers.utils.formatEther(x[7]));
        const time = x[5].toNumber();
        const support = x[9].toNumber();
        const p = [x[1], x[2], time, goal, raise, support, ele];
        return p;
      })
    );
    this.setState({ ...this.state, allCampaign: detailsAll, charityPool : pool });
    console.log('All :', detailsAll);
  };

  componentDidMount = async () => {
    await this.getCampaign();    
    this.setState({ ...this.state, spin : false });


  };
  render() {
    return (
      <>
        <div className="al-hero-header">
          <section id="hero" className="d-flex align-items-center justify-content-center">
            <div className="container" data-aos="fade-up">
              <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="150">
                <div className="col-xl-9 col-lg-9">
                  <h1>
                    WILL YOU SPARE SOME <span className="">ERA SWAP </span>
                    <br />
                    TO SHOW YOU CARE
                  </h1>

                  <br />
                  <Link
                    className="get-started-btn btn-yellow btn btn-lg scrollto"
                    to="/ExploreCampaign"
                  >
                    Explore Campaigns
                  </Link>
                  <Link
                    to="/CreateCampaign"
                    className="get-started-btn btn scrollto btn-lg"
                    
                  >
                    Create Your Campaign
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
        <main id="main">
          {this.state.spin ? <Spinner animation="border" style={{ position:'absolute', left: "50%",margin : '20px'}} />:
          <section id="services" className="services about">
            <div className="container" data-aos="fade-up">
              <div className="row justify-content-center ">
                <div
                  className="col-lg-8 pt-4 pt-lg-0 order-2 order-lg-1 content text-center mx"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <h3>Active Campaigns</h3>
                </div>
              </div>
              <div className="row mt40">
                {this.state.allCampaign.map((ele) => {
                  return (
                    <div
                      className="col-lg-4 col-md-4 d-flex align-items-stretch mt-4 mt-md-0"
                      data-aos="zoom-in"
                      data-aos-delay="200"
                    >
                      <div className="icon-box cha-list-box">
                        <div className="cha-list-box-text mt10">
                          <h4>{ele[0]}</h4>
                          <div className="brand-color-1-text text-left amount-raised">
                            <strong>{ele[4]} </strong>
                            <span className="text-dark">Raised out of {ele[3]}</span>
                          </div>
                          <ProgressBar
                            animated
                            now={Math.floor((ele[4] * 100) / ele[3])}
                            variant="info"
                          />
                          <div className="cha-list-box-footer d-flex flex-column flex-md-row mt10">
                            <div className="timeleft">
                              <i className="fa fa-clock-o" aria-hidden="true"></i> &nbsp;{' '}
                              {timeStamptodays(ele[2])} days remaining{' '}
                            </div>
                            <div className="Suppoter ml-auto">
                              <i className="fa fa-heart text-danger" aria-hidden="true"></i>{' '}
                              {ele[5]} Supporters{' '}
                            </div>
                          </div>
                          <Link
                            to={'/CampaignDetails/' + ele[6]}
                            className="ml-auto get-started-btn btn-yellow scrollto btn btn-lg text-center "
                          >
                            See Campaign
                          </Link>
                          <div className="card-footer">
                            <small className="text-muted">{ele[1]}</small>{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div><hr/> 
          <div className="container" data-aos="fade-up">
            
              <div className="row justify-content-center ">
                <div
                  className="col-lg-8 pt-4 pt-lg-0 order-2 order-lg-1 content text-center mx"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <h3>Charity Pool</h3>
                </div>
              </div>
              <h4 className="text-center">Total collection by charity pool is : <b>{this.state.charityPool} {'  '} ES</b></h4>
              <Button style={{ position:'absolute', left: "45%" }} onClick={this.poolDonation} className="text-center btn btn-lg">Donate to pool </Button>
            </div>
          </section>}
          <section id="aboutus" className="features about">
            <div className="container" data-aos="fade-up">
              <div className="row justify-content-center ">
                <div
                  className="col-lg-8 pt-4 pt-lg-0 order-2 order-lg-1 content text-center mx"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <h3>About us</h3>
                </div>
              </div>
              <div className="row mt40">
                <div className="col-lg-6" data-aos="fade-left" data-aos-delay="100">
                  <h3 className="icon-box mt-5 mt-lg-0">
                    {' '}
                    Initiating the transparent P2P Network for Charitable Causes.{' '}
                  </h3>
                  <p className="icon-box mt10 mt-lg-0">
                    Charity DApp is powered by Era Swap DAO. Era Swap is the utility token that
                    powers multiple decentralized P2P Platforms. Charity DApp is a digital platform
                    built with the objective of re-imagining a non-profit organization by merging
                    Smart Contracts, and distributed blockchain technology – Era Swap Decentralized
                    Blockchain Network.
                  </p>

                  <div className="icon-box  mt40" data-aos="zoom-in" data-aos-delay="150">
                    <i className="bx bx-receipt"></i>
                    <h4>Our Strategic</h4>
                    <p>
                      {' '}
                      1. Increase Accountability & Transparency
                      <br />
                      2. P2P Charity Transfers i.e. No middlemen
                      <br />
                      3. Multi-level Blockchain KYC Verification
                    </p>
                  </div>

                  <div className="icon-box mt20" data-aos="zoom-in" data-aos-delay="150">
                    <i className="bx bx-shield"></i>
                    <h4>Goals</h4>
                    <p>
                      1. Re-design Charity with Decentralization
                      <br />
                      2. Adopt Innovative Techs
                      <br />
                      3. Make Charity Available for Needy
                      <br />
                    </p>
                  </div>
                </div>
                <div
                  className="image col-lg-6"
                  style={{ backgroundImage: 'url("assets/img/tree.png")' }}
                  data-aos="fade-right"
                ></div>
              </div>
            </div>
          </section>

          <section id="why" className="services about">
            <div className="container" data-aos="fade-up">
              <div className="row justify-content-center ">
                <div
                  className="col-lg-8 pt-4 pt-lg-0 order-2 order-lg-1 content text-center mx"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <h3>Why Charity DApp?</h3>
                </div>
              </div>
              <div className="row mt40">
                <div
                  className="col-lg-3 col-md-6 d-flex align-items-stretch"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <div className="icon-box">
                    <img alt="img" src="assets/img/blockchain-transparency-01.png" width="150" />
                    <h4>
                      <a href="/">Blockchain Transparency</a>
                    </h4>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <div className="icon-box">
                    <img
                      alt="img"
                      src="assets/img/contribute-with-donations-rates-02.png"
                      width="150"
                    />
                    <h4>
                      <a href="/"> Contribute with Donations or Rates</a>
                    </h4>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <div className="icon-box">
                    <img
                      alt="img"
                      src="assets/img/supported-by-era-wap-charity pool-03.png"
                      width="150"
                    />
                    <h4>
                      <a href="/"> Supported by Era Swap Charity Pool</a>
                    </h4>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <div className="icon-box">
                    <img alt="img" src="assets/img/automated-escrow-04.png" width="150" />
                    <h4>
                      <a href="/"> Automated Escrow </a>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="row mt40">
                <div
                  className="col-lg-3 col-md-6 d-flex align-items-stretch"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <div className="icon-box">
                    <img
                      alt="img"
                      src="assets/img/withdraw-donations-hassle-free-05.png"
                      width="150"
                    />
                    <h4>
                      <a href="/"> Withdraw Donations Hassle-free</a>
                    </h4>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <div className="icon-box">
                    <img alt="img" src="assets/img/easy-to-manage-promote-06.png" width="150" />
                    <h4>
                      <a href="/"> Easy-To-Manage & Promote</a>
                    </h4>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <div className="icon-box">
                    <img alt="img" src="assets/img/global-payment-support-07.png" width="150" />
                    <h4>Global Payment Support</h4>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <div className="icon-box">
                    <img
                      alt="img"
                      src="assets/img/non-manipulated-reviews-ratings-08.png"
                      width="150"
                    />
                    <h4>Non-manipulated reviews and ratings</h4>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="al-hero-header mobile-app">
            <section id="hero" className="d-flex align-items-center justify-content-center">
              <div className="container" data-aos="fade-up">
                <div className="row" data-aos="fade-up" data-aos-delay="150">
                  <div className="col-lg-5">
                    <img src="assets/img/mobile-app.png" className="img-fluid" alt="" />
                  </div>
                  <div className="col-lg-7 download-app-con text-left">
                    <h2>SIGN UP FOR AMAZING OFFERS</h2>
                    <p>EXCLUSIVE ACCESS FOR OFFERS AND PROMOTIONS</p>
                    <div className=" footer-newsletter">
                      <form action="" method="post">
                        <input type="email" name="email" />
                        <input type="submit" value="Subscribe" className="btn-primary" />
                      </form>
                    </div>
                    <p>Faster, easier access to car rental services </p>
                    <h1>DOWNLOAD OUR APP</h1>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.eraswaponeapp&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      <img
                        src="assets/img/google-play-btn.png"
                        className="img-fluid"
                        alt=""
                        width="210"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </main>
      </>
    );
  }
}
