import axios from 'axios'; 



export const fetchShow = () => {
   return axios
      .get(
        "https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes"
      )
      .then(res => {
        console.log('this is res', res.data)
        return res.data; 
      })
      .catch( err => {
          console.error('Error in fetching data from api', err); 
          return err; 
      }); 
  }