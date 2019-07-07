import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.giphy.com/v1/gifs/search?api_key=XqQAx4Op1WG9CSMHRTFW3rsWQ43IVuQ9&q='
});