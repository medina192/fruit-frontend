import {
    Platform
} from "react-native";

//Dev
export const backendUrl = Platform.OS === 'ios' ? "http://localhost:3000" : "http://10.0.2.2:3000"

// Production it doesn't works yet, the aws ec2 server is running, but there is a problem
// with the security configuration 
//export const backendUrl = "http://3.134.113.195:3000"