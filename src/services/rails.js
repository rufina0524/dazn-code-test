import { RAILS_PATH } from './constants/paths';

const get = async () => {
    const response = await window.fetch(RAILS_PATH);

    if (!response.ok) throw new Error(response.status);

    const json = await response.json();

    return json;
};

export { get };
