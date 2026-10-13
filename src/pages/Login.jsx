import {useState} from "react";

import InputField from "../components/InputField";

import Logo from "../components/Logo";


function Login(){


const [username,setUsername]=useState("");

const [password,setPassword]=useState("");

const [showPassword,setShowPassword]=useState(false);

const [remember,setRemember]=useState(false);

const [error,setError]=useState("");

const [loading,setLoading]=useState(false);



function handleLogin(e){

e.preventDefault();


setLoading(true);


setTimeout(()=>{


if(username==="student" && password==="12345"){

alert(
"Welcome to EduSmart Dashboard"
);

setError("");

}

else{

setError(
"Invalid username or password"
);

}


setLoading(false);


},1500)



}



return(

<div className="login-container">


<div className="left-panel">


<h1>
Smart Education Platform
</h1>


<p>

Access your online classes,
assignments and academic data.

</p>



<div className="feature">


<div>
📚 Digital Course
</div>

<div>
🎓 Student Dashboard
</div>

<div>
📊 Learning Analytics
</div>


</div>


</div>




<div className="login-card">


<Logo/>


<form onSubmit={handleLogin}>


<InputField

label="Username"

type="text"

placeholder="Enter username"

value={username}

onChange={(e)=>setUsername(e.target.value)}

/>



<div>

<InputField

label="Password"

type={
showPassword?
"text":
"password"
}

placeholder="Enter password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>


<button

type="button"

className="show-btn"

onClick={()=>
setShowPassword(!showPassword)
}

>

{
showPassword?
"Hide":
"Show"
}

</button>


</div>




<div className="option">


<label>

<input

type="checkbox"

checked={remember}

onChange={
(e)=>
setRemember(e.target.checked)
}

/>

Remember me


</label>


</div>



{
error &&
<p className="error">
{error}
</p>
}



<button

className="login-btn"

>

{
loading?
"Checking...":
"Login"
}


</button>



</form>


</div>


</div>

)


}


export default Login;