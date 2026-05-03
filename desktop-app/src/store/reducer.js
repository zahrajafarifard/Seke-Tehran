const initialState = {
  blvIsON: false,
  passageIsON: false,
  pelatinIsON: false,

  blvUpdateSite: false,
  pelatinUpdateSite: false,
  pasagUpdateSite: false,

  blvUpdateTablo: false,
  pasagUpdateTablo: false,
  pelatinUpdateTablo: false,

  blvTurnONOFFTablo: false,
  pasagTurnONOFFTablo: false,
  pelatinTurnONOFFTablo: false,

  blvUpdateVoip: false,
  pasagUpdateVoip: false,
  pelatinUpdateVoip: false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ConfigAction":
      return {
        ...state,
        blvUpdateSite: action.blvUpdateSite,
        pelatinUpdateSite: action.pelatinUpdateSite,
        pasagUpdateSite: action.pasagUpdateSite,

        blvUpdateTablo: action.blvUpdateTablo,
        pasagUpdateTablo: action.pasagUpdateTablo,
        pelatinUpdateTablo: action.pelatinUpdateTablo,

        blvTurnONOFFTablo: action.blvTurnONOFFTablo,
        pasagTurnONOFFTablo: action.pasagTurnONOFFTablo,
        pelatinTurnONOFFTablo: action.pelatinTurnONOFFTablo,

        blvUpdateVoip: action.blvUpdateVoip,
        pasagUpdateVoip: action.pasagUpdateVoip,
        pelatinUpdateVoip: action.pelatinUpdateVoip,
      };
    case "BlvIsON":
      return {
        ...state,
        blvIsON: true,
      };
    case "PelatinIsON":
      return {
        ...state,
        pelatinIsON: true,
      };
    case "PassageIsON":
      return {
        ...state,
        passageIsON: true,
      };
    case "BlvIsOFF":
      return {
        ...state,
        blvIsON: false,
      };
    case "PelatinIsOFF":
      return {
        ...state,
        pelatinIsON: false,
      };
    case "PassageIsOFF":
      return {
        ...state,
        passageIsON: false,
      };

    default:
      return state;
  }
};

export default Reducer;
