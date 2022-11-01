var c =3;
function addRcords() {
  c++;
  var innerTbody = document.getElementById("tbody").innerHTML;
  // console.log(c);
  var row = (((innerTbody.match(new RegExp("</tr>", "g")) || []).length)/2)+1;
  var record = document.getElementById("tbody").innerHTML+'<tr id="tbody-row-'+c+'"><td><input class="check-box" type="checkbox" onclick="checkedAction(this)" /> <br/><br/> <img src="down.png" width="25px" onclick="showHide(this)" /></td><td>Student '+row+'</td><td>Teacher '+row+'</td><td>Approved</td><td>Fall</td><td>TA</td><td>34567</td><td>100%</td><td class="delete" hidden><button onclick="deleteFun(this)">Delete</button></td><td class="edit" hidden><button onclick="editFun(this)">Edit</button></td></tr><tr class="dropDownTextArea tbody-row-'+c+'" hidden><td colspan="8">Advisor:<br /><br />Award Details<br />Summer 1-2014(TA)<br />Budget Number: <br />Tuition Number: <br />Comments:<br /><br /><br />Award Status:<br /><br /><br /></td></tr>';
    document.getElementById("tbody").innerHTML = record;
    alert("Record successfully added..!!");
}

function editFun(arg) {
  var parentRow = arg.parentNode.parentNode;
  var msg = "Edit student "+(parentRow.id).split("-")[2]+" details !";
  prompt(msg);
}

function deleteFun(arg) {
  var parentRow = arg.parentNode.parentNode;
  document.getElementById(parentRow.id).remove();
  document.getElementsByClassName(parentRow.id)[0].remove();
  var msg = "Record of Student "+(parentRow.id).split("-")[2]+" deleted successfully..!!";
  alert(msg);
  allUnchecked();
}

function checkedAction(arg) {
  var parentRow = arg.parentNode.parentNode;
  if(arg.checked){
    allUnchecked();
    parentRow.getElementsByClassName('delete')[0].hidden = false;
    parentRow.getElementsByClassName('edit')[0].hidden = false;
    document.getElementById(parentRow.id).style.backgroundColor ='orange';
  }
  else{
    allUnchecked();
    parentRow.getElementsByClassName('delete')[0].hidden = true;
    parentRow.getElementsByClassName('edit')[0].hidden = true;
    document.getElementById(parentRow.id).style.backgroundColor ='transparent';
  }
}

function showHide(arg) {
  var parentRow = arg.parentNode.parentNode;
  var sliderRow = document.getElementsByClassName(parentRow.id);
  if(sliderRow[0].hidden){
    sliderRow[0].hidden = false;
  }
  else{
    sliderRow[0].hidden = true;
  }
}

function allUnchecked() {
  var f =0;
  var allInputs = document.getElementsByClassName("check-box");
  for (var i = 0, max = allInputs.length; i < max; i++){
      if (allInputs[i].checked){
        f=1;
        break;
      }
  }
  if(f){
      document.getElementById("head-del").hidden = false;
      document.getElementById("head-edit").hidden = false;
      document.getElementById("button").style.backgroundColor ='orange';
      document.getElementById("button").disabled = false;
  }
  else{
      document.getElementById("head-del").hidden = true;
      document.getElementById("head-edit").hidden = true;
      document.getElementById("button").style.backgroundColor = 'gray';
      document.getElementById("button").disabled = true;
  }
}