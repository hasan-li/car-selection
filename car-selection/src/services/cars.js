import axios from 'axios';

import { baseUrl } from 'src/const/api';

export const getMakes = async () => {
  try {
    const url = `${baseUrl}makes`
    const { data, status } = await axios(url);
    return { status, data };
  } catch (e) {
		return { error: true };
	}
};

export const getModels = async (make) => {
  try {
    const url = `${baseUrl}models?make=${make}`
    const { data, status } = await axios(url);
    return { status, data };
  } catch (e) {
		return { error: true };
	}
};

export const getVehicles = async (make, model) => {
  try {
    const url = `${baseUrl}vehicles?make=${make}&model=${model}`
    const { data, status } = await axios(url);
    return { status, data };
  } catch (e) {
		return { error: true };
	}
};