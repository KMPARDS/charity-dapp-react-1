import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { CreateCampaign } from './components/CreateCampaign/CreateCampaign';
// import { Profile } from './components/Profile/Profile';
import { ExploreCampaign } from './components/ExploreCampaign/ExploreCampaign';
import { CampaignDetails } from './components/CampaignDetails/CampaignDetails';
import WalletContext from './components/WalletContext';

import './App.css';
import { NavbarMain } from './components/Navbar/';
import { Footer } from './components/Footer/';
import { MapProvider } from './components/MapState';

function App() {
  const [state, setState] = useState();
  return (
    <MapProvider>
      <div className="App">
        <WalletContext.Provider value={{ state, setState }}>
          <NavbarMain />
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/CreateCampaign" exact component={CreateCampaign} />
              {/* <Route path="/Profile" exact component={Profile} /> */}
              <Route path="/ExploreCampaign" exact component={ExploreCampaign} />
              <Route path="/CampaignDetails/:hash" exact component={CampaignDetails} />
            </Switch>
          </BrowserRouter>
          <Footer />
        </WalletContext.Provider>
      </div>
    </MapProvider>
  );
}

export default App;
