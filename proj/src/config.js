const IS_DEV = process.env.REACT_ENV == 'development';
const BASE_URL = "http://localhost";
const SITE_TITLE = "قطعه یار";
const MEDIA_ROOT = `/media`;
const FAVICON = 'logo/ghateyar_2.jpg'
const LOGO_FILEPATH = 'logo/ghateyar_2.jpg';
const PROTOCOL = window.location.protocol;
const HOSTNAME = window.location.hostname;
const BACKEND_URL = IS_DEV ? 'http://localhost:8000' : `${PROTOCOL}//${HOSTNAME}`;
const MOBILE_BREAKPOINT = 768;


export default {
  IS_DEV, BASE_URL, SITE_TITLE, MEDIA_ROOT, LOGO_FILEPATH, FAVICON,
  PROTOCOL, HOSTNAME, BACKEND_URL, MOBILE_BREAKPOINT
}
