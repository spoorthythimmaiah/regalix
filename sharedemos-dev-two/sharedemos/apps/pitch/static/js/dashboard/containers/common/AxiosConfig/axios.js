import axios from 'axios'


const csrfToken = document.querySelector("meta[name=csrf-token]").getAttribute('content');
/**
 * Config global for axios
 */
axios.defaults.headers.common['X-CSRFToken'] = csrfToken;

export default axios