export const setBlvIsONStateAction = () => {
  return {
    type: "BlvIsON",
  };
};
export const setPassageIsONStateAction = () => {
  return {
    type: "PassageIsON",
  };
};
export const setPelatinIsONStateAction = () => {
  return {
    type: "PelatinIsON",
  };
};
export const setBlvIsOFFStateAction = () => {
  return {
    type: "BlvIsOFF",
  };
};
export const setPassageIsOFFStateAction = () => {
  return {
    type: "PassageIsOFF",
  };
};
export const setPelatinIsOFFStateAction = () => {
  return {
    type: "PelatinIsOFF",
  };
};

export const ConfigAction = (
  blvUpdateSite,
  pelatinUpdateSite,
  pasagUpdateSite,

  blvUpdateTablo,
  pasagUpdateTablo,
  pelatinUpdateTablo,

  blvTurnONOFFTablo,
  pasagTurnONOFFTablo,
  pelatinTurnONOFFTablo,

  blvUpdateVoip,
  pasagUpdateVoip,
  pelatinUpdateVoip
) => {
  return {
    type: "ConfigAction",
    blvUpdateSite,
    pelatinUpdateSite,
    pasagUpdateSite,

    blvUpdateTablo,
    pasagUpdateTablo,
    pelatinUpdateTablo,

    blvTurnONOFFTablo,
    pasagTurnONOFFTablo,
    pelatinTurnONOFFTablo,

    blvUpdateVoip,
    pasagUpdateVoip,
    pelatinUpdateVoip,
  };
};
