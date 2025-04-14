const IS_DEV = process.env.REACT_ENV == 'development';
const BASE_URL = "http://localhost";
const SITE_TITLE = "قطعه یار";
const MEDIA_ROOT = `/media`;
const STATIC_ROOT = `/`;
const FAVICON = 'logo/ghateyar_2.jpg'
const LOGO_PRIMARY = 'logo/ghateyar_transparent_1.png';
const LOGO_SECONDARY = 'logo/ghateyar_transparent_2.png';
const PROTOCOL = window.location.protocol;
const HOSTNAME = window.location.hostname;
const BACKEND_URL = IS_DEV ? 'http://localhost:8000' : `${PROTOCOL}//${HOSTNAME}`;
const MOBILE_BREAKPOINT = 768;


export default {
  IS_DEV, BASE_URL, SITE_TITLE, MEDIA_ROOT, STATIC_ROOT, LOGO_PRIMARY, LOGO_SECONDARY, FAVICON,
  PROTOCOL, HOSTNAME, BACKEND_URL, MOBILE_BREAKPOINT
}
