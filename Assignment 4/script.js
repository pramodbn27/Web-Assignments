
var counter = 0;
function onSelect(object){
    var a = document.getElementById("subjects").value;
    document.getElementById('addon').style.display = "block";
    switch(a){
        case 'AED': document.getElementById("addontext").innerHTML = "Prof. Kal Bugrara";
                                break;
        case 'Web Design': document.getElementById("addontext").innerHTML = "Prof. Vishal Chawla";
                                break;
        case 'OOD': document.getElementById("addontext").innerHTML = "Prof. Daniel Peters";
                                break;
        case 'Cloud Computing': document.getElementById("addontext").innerHTML = "Prof. Tejas Parikh";
                                break;
        case 'DMDD': document.getElementById("addontext").innerHTML = "Prof. Manuel Montrond";
                                break;
        default: document.getElementById('addon').style.display = "none";
                document.getElementById("addontext").innerHTML = "";
                break;
    }

 }

 function onchecked(object){
    console.log("in oncheck");
    if(object.checked){
        console.log("checked");
        ischecked = true;
        document.getElementById('suggest').style.display = "block";
        document.getElementById('suggestion').style.display = "block";
    }
    else{
        // console.log(ischecked);
        ischecked = false;
        document.getElementById('suggest').style.display = "none";
        document.getElementById('suggestion').style.display = "none";
    }
 }

 function validateInput(object,type,nameType){
     var regexName = /^[a-zA-Z]+$/
     var name="errorMsg"+nameType;
     var regexemail = /([\w\.]+)@([\w\.]+)\.(\w+)/;
     var regexphonenum= /\d{3}-?\d{3}-\d{4}$/;
     var regexzipcode = /\d{5}$/;
     switch(type){
            
                case 1: if(!object.value.trim().match(regexemail)){
                    console.log("print")
                    object.style.border = "2px solid red";
                    document.getElementById('errorMsgEmailid').style.display = "block";
                    object.value ="";
                }
                else{
                    object.style.border="";
                    document.getElementById('errorMsgEmailid').style.display = "none";
                }
                break;

                case 2: if(!object.value.trim().match(regexphonenum)){
                    object.style.border = "2px solid red";
                    document.getElementById('errorMsgphoneNumber').style.display = "block";
                    object.value ="";
                }
                else{
                    object.style.border="";
                    document.getElementById('errorMsgphoneNumber').style.display = "none";
                }
                break;

                case 3: if(!object.value.trim().match(regexzipcode)){
                    object.style.border = "2px solid red";
                    document.getElementById('errorMsgZipCode').style.display = "block";
                    object.value ="";
                }
                else{
                    object.style.border="";
                    document.getElementById('errorMsgZipCode').style.display = "none";
                }
                break;
         }
     }




function submitform(){
    let params = new URLSearchParams(location.search);
    let newparams = (new URL(url)).searchParams;
    let title = newparams.getAll('title');
    
    
    var table = document.getElementById("myTable");

    var row = table.insertRow(counter);
    counter++;

    var cell1 =  row.insertCell(0);
    var cell2 =  row.insertCell(1);
    var cell3 =  row.insertCell(2);
    var cell4 =  row.insertCell(3);
    var cell5 =  row.insertCell(4);
    var cell6 =  row.insertCell(5);
    var cell7 =  row.insertCell(6);
    var cell8 =  row.insertCell(7);
    var cell9 =  row.insertCell(8);
    var cell10 = row.insertCell(9);
    var cell12=  row.insertCell(10);
    var cell13=  row.insertCell(11);

    cell1.innerHTML = title;
    cell2.innerHTML = firstname;
    cell3.innerHTML = lastname;
    cell4.innerHTML = emailId;
    cell5.innerHTML = phoneNumber;
    cell6.innerHTML = address1;
    cell7.innerHTML = address2;
    cell8.innerHTML = zipcode;
    cell9.innerHTML = source;
    cell10.innerHTML = subjects;
    cell11.innerHTML = addon;
    cell12.innerHTML = suggestion;
    cell13.innerHTML = comments;

}