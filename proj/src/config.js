const BASE_URL = "http://localhost";
const SITE_TITLE = "قطعه یار";
const MEDIA_ROOT = `/image`;
const LOGO_FILEPATH = 'logo/ghateyar_2.jpg';
const PROTOCOL = window.location.protocol;
const HOSTNAME = window.location.hostname;
const BACKEND_URL = `${PROTOCOL}//${HOSTNAME}`;

console.log(BACKEND_URL);

export default {
  BASE_URL, SITE_TITLE, MEDIA_ROOT, LOGO_FILEPATH, PROTOCOL, HOSTNAME, BACKEND_URL
}
