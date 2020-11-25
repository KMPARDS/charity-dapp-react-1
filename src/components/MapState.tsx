import React, { createContext, useReducer, useContext, ReactNode } from 'react';


type MapState = {
  userName: string;
  userAge: string;
  userDesignation: string;
  Category : string;
  Organization:string;
  Address: string;
  RaisedFund: string;
  Benificery : string;
  Img : string[];
  Description : string;
  Stakes : string;
  stakesTime : string;
  fullExtraction : boolean;
  link : string;
  endTime : string;
};

const initialState: MapState = {
    userName: '',
    userAge: '',
    userDesignation: '',
    Category : 'Medical',
    Organization:'',
    Address: '',
    RaisedFund: '',
    Benificery : '',
    Img : ['','',''],
    Description : '',
    Stakes : '',
    stakesTime : '',
    fullExtraction : false,
    link : '',
    endTime:'',
};

const initialMapContext: { mapState: MapState; setMapState: React.Dispatch<any> } = {
  mapState: initialState,
  setMapState: () => {},
};

const MapContext = createContext(initialMapContext);


const reducer = (state: MapState, action: any) => {
      return {
        ...state,
        ...action,
      };
};
interface MapProviderProps {
  children?: ReactNode;
}

export function MapProvider({ children }: MapProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapState = state;
  const setMapState = dispatch;
  return <MapContext.Provider value={{ mapState, setMapState }}>{children}</MapContext.Provider>;
}

export const useMapState = () => useContext(MapContext);