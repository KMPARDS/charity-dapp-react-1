import React, { Component } from 'react';
import './ExploreCampaign.css';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Card,
  Col,
  InputGroup,
  FormControl,
  ProgressBar,
} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { Sidebar } from '../Sidebar';
import { ethers } from 'ethers';
import { timeStamptodays } from '../../utils';
type State = {
  bunchModal: boolean;
  allCampaign : any[];
};
export class ExploreCampaign extends Component<State> {
  state: State = {
    bunchModal: false,
    allCampaign : [],
  };
  handleClose = () => {
    this.setState({
      bunchModal: false,
    });
  };

  getCampaign = async () => {
    const filter = window.charityInstance.filters.ProposalAdded(null,null);
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
        const p = [ x[1], x[2], time, goal, raise,support,ele,x[4]];
        return p;
      })
    );
    this.setState({ ...this.state, allCampaign: detailsAll });
    console.log('All :', detailsAll);    
  };
  componentDidMount = async () => {
    await this.getCampaign();
  }
  render() {
    return (
      <>
        <main id="main">
          <div className="inner-page">
            <section className="breadcrumbs">
              <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                  <h2>Explore Campaign</h2>
                  <ol>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>Explore Campaign</li>
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
                            {this.state.allCampaign.map((ele) => {
                    return (
                      <div className="col-lg-4 col-md-4 d-flex align-items-stretch mt-4 mt-md-0"
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
                            <ProgressBar animated now={Math.floor(ele[4]*100/ele[3])} variant="info" />
                            <div className="cha-list-box-footer d-flex flex-column flex-md-row mt10">
                              <div className="timeleft">
                                <i className="fa fa-clock-o" aria-hidden="true"></i>  &nbsp; { timeStamptodays(ele[2])} days remaining{' '}
                              </div>
                              <div className="Suppoter ml-auto">
                                <i className="fa fa-heart text-danger" aria-hidden="true"></i> {ele[5]} {' '}
                                Supporters{' '}
                              </div>
                            </div>
                            <Link to={"/CampaignDetails/" + ele[6]} className="get-started-btn btn-yellow scrollto btn btn-lg text-center ">
                              See Campaign
                            </Link>
                            <div className="card-footer"><small className="text-muted">{ele[1]}</small> </div>
                          </div>
                        </div>
                      </div>
                          )}
                        )}

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
