import React, { Component } from 'react';
import './Profile.css';
import {
  Card,
  ProgressBar,
} from 'react-bootstrap';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { timeStamptodays } from '../../utils';
type State = {
  Address : string |null ;
  allCampaign : any[];
  donation : any[];
};
export class Profile extends Component<State> {
  state: State = {
    Address : null, 
    allCampaign : [],
    donation : [],
  };

  getDonation = async () =>{
    if(this.state.Address){
      const filter = window.charityInstance.filters.Donated(null, null,null); // second arg shoul be this.state.Address
      const logs = await window.charityInstance.queryFilter(filter);
      const parseLogs = logs.map((log) => window.charityInstance.interface.parseLog(log));
      const donationAll = parseLogs.map((ele) => [ele.args[0], parseInt(ethers.utils.formatEther(ele.args[2]))]);
      console.log('All :', donationAll);
      
      this.setState({ ...this.state, donation: donationAll });
      console.log('All :', donationAll);
    };

  }

  getCampaign = async () => {
    if(this.state.Address){
    const filter = window.charityInstance.filters.ProposalAdded(null, this.state.Address);
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
        const p = [x[1], x[2], time, goal, raise, support, ele, x[4]];
        return p;
      })
    );
    this.setState({ ...this.state, allCampaign: detailsAll });
    console.log('All :', detailsAll);
  };
  }
  componentDidMount = async () =>  {
    await this.getCampaign();
    await this.getDonation();
    if(window.wallet){
      const add = window.wallet.address ? window.wallet.address : (await window.wallet.getAddress());
      this.setState({...this.state,Address : add});
    }

  }
  render() {
    return (
      <>
        <main id="main">
          <div className="inner-page">
            <section className="breadcrumbs">
              <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                  <h2>Profile</h2>
                  <ol>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>Profile</li>
                  </ol>
                </div>
              </div>
            </section>
            <section className="inner-page">
              <div className="container">
                <div className="row">
                  <div className="col-12 " data-aos="zoom-in" data-aos-delay="200">
                    <Card className="shadow">
                      <Card.Body>
                        <div className="services about">
                          <div className="container" data-aos="fade-up">
                            <div className="row">
                              <div className="col-lg-12 mt20">
                                <div className="alert alert-secondary" role="alert">
                                  <h4 className="Font-weight-bold">
                                    WALLET ADDRESS:{' '}
                                    <small className="">{this.state.Address}</small>
                                  </h4>
                                </div>
                              </div>
                              <div className="col-lg-12 mt40">
                                <h4 className="font-weight-bold mb20"> Your Participation</h4>
                              </div>
                              <div className="clear"></div>
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
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>{' '}
                                            &nbsp; {timeStamptodays(ele[2])} days remaining{' '}
                                          </div>
                                          <div className="Suppoter ml-auto">
                                            <i
                                              className="fa fa-heart text-danger"
                                              aria-hidden="true"
                                            ></i>{' '}
                                            {ele[5]} Supporters{' '}
                                          </div>
                                        </div>{' '}
                                        <br />
                                        <Link
                                          to={'/CampaignDetails/' + ele[6]}
                                          className="get-started-btn btn-yellow scrollto btn btn-lg text-center "
                                        >
                                          See Campaign
                                        </Link>{' '}
                                        <br />
                                        {ele[7] ? (
                                          <span
                                            className="badge badge-success mx-auto"
                                            style={{ background: '#28A745' }}
                                          >
                                            Campaign Approved
                                          </span>
                                        ) : (
                                          <span
                                            className="badge badge-danger mx-auto"
                                            style={{ background: '#DC3545' }}
                                          >
                                            Campaign Not Approved yet
                                          </span>
                                        )}
                                        <div className="card-footer">
                                          <small className="text-muted">{ele[1]}</small>{' '}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                              
                            </div>

                            <div className="row mt40">
                              <div className="col-lg-12">
                                <h4 className="font-weight-bold">Donated On</h4>
                              </div>
                              <div className="clear"></div>

                                <table className="table table-hover">
                                  <thead>
                                    <tr>
                                      <th scope="col"># Campaign Hash</th>
                                      <th scope="col">Donated Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                {this.state.donation.map((ele) => {
                                return (
                                    <tr>
                                      <td>{ele[0]}</td>
                                      <td>{ ele[1]}{' '} ES</td>
                                    </tr>
                                  );
                                  })}
                                  </tbody>
                                </table>

                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </>
    );
  }
}
