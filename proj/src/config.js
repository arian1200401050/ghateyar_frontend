const IS_DEV = process.env.REACT_ENV == 'development';
const BASE_URL = "http://localhost";
const SITE_TITLE = "قطعه یار";
const MEDIA_ROOT = `/static_media`;
const STATIC_ROOT = `/`;
const FAVICON = 'logo/favicon_1.png'
const LOGO_PRIMARY = 'logo/ghateyar_transparent_1.png';
const LOGO_SECONDARY = 'logo/ghateyar_transparent_2.png';
const PROTOCOL = window.location.protocol;
const HOSTNAME = window.location.hostname;
const BACKEND_URL = IS_DEV ? 'http://192.168.43.201:8000' : `${PROTOCOL}//${HOSTNAME}`;
const MOBILE_BREAKPOINT = 768;
const CKEDITOR_LICENSE_KEY = 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDg1NjMxOTksImp0aSI6IjA5ODM5OGI3LTcyMDEtNGMyOS04ZTJjLTc0Njc1YTZiYzQ0MiIsImxpY2Vuc2VkSG9zdHMiOlsiKi53ZWJjb250YWluZXIuaW8iLCIqLmpzaGVsbC5uZXQiLCIqLmNzcC5hcHAiLCJjZHBuLmlvIiwiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIiwic2giXSwibGljZW5zZVR5cGUiOiJldmFsdWF0aW9uIiwidmMiOiIwN2YxM2Q5YSJ9.qMU8MsQE0SQkjqKKDBLrB44JJSPaZ4vPitYk4ChmZ2QmhWIjzjep0qFuxSqSuXULERQxnaFm3IDoMWR49kGdcA';


export default {
  IS_DEV, BASE_URL, SITE_TITLE, MEDIA_ROOT, STATIC_ROOT, LOGO_PRIMARY, LOGO_SECONDARY, FAVICON,
  PROTOCOL, HOSTNAME, BACKEND_URL, MOBILE_BREAKPOINT, CKEDITOR_LICENSE_KEY
}
