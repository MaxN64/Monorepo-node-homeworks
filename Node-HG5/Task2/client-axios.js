import axios from 'axios';

axios.get('http://localhost:3000/',{

})
.then(response => {
    console.log('Status:', response.status);
    console.log('Status Data:', response.data);
})
.catch(error => {
    if(error.response){
        console.log(error.response.data);
    }else{
        console.log('Error:', error.message);
    }
});
