let ApiURL = ''
let ChatUri = ""
console.log('process.env.MODE::', process.env.MODE);
if(process.env.MODE === 'production-develop'){
    ApiURL = 'https://api.staging.quilt.vogdevelopment.com/api'
    ChatUri = "wss://api.staging.quilt.vogdevelopment.com/chat"
}
if(process.env.MODE === 'production'){
    ApiURL = 'https://api.quilt.net'
}
if(process.env.MODE === 'uat'){
    ApiURL = 'https://api.uat.quilt.vogdevelopment.com/api'
    ChatUri = "wss://api.uat.quilt.vogdevelopment.com/chat"
}
//  console.log(ApiURL);
export const baseURL = ApiURL
export const chatURI = ChatUri
