        let name=document.getElementById("name");
        let pass =document.getElementById("pass");
        var flag=1;

        function ValidateFun()
        {
            if(name.value =="")
            {
                document.getElementById("userError").innerHTML="Username is Empty ";
                flag=0;
            }    
            else if(name.value.length < 3)
            {
                document.getElementById("userError").innerHTML="Username must be greater than 3 characters ";
                flag=0;
            }
            else
            {
                document.getElementById("userError").innerHTML=" ";
                flag=1;
            }
            if(pass.value =="")
            {
                document.getElementById("passError").innerHTML="Password is Empty ";
                flag=0;
            }
            else
            {
                document.getElementById("passError").innerHTML=" ";
                flag=1;
            }

            if(flag)
                return true;
            else 
                return false;
        }
