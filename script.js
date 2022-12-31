// Dispaly model
var registerForm = document.querySelector("#register-form");
var allInput=document.querySelectorAll("input");
var addBtn = document.querySelector("#add-btn");
var model = document.querySelector(".model");
var closeBtn = document.querySelector(".close-icon");

addBtn.onclick = () => {
  model.classList.add("active");
};

closeBtn.addEventListener("click", () => {
  model.classList.remove("active");
  var i;
  for(i=0;i<allInput.length;i++){
    allInput[i].value="";
  }
});

// Start all global Variable
var userData = [];
var profilePic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-field");
var idEl = document.getElementById("id");
var nameEl = document.querySelector("#name");
var l_nameEl = document.getElementById("l-name");
var emailEl = document.querySelector("#e-mail");
var officeEl = document.getElementById("office-code");
var jobTitleEl = document.getElementById("job-title");
var registerBtn = document.querySelector("#register-btn");
var updateBtn = document.querySelector("#update-Btn");
var imgUrl;
// End all global Variable

// start register coding
registerBtn.onclick = function (event) {
  event.preventDefault();
  regitrationData();
  getDataFromLocal();
  registerForm.reset("");
  closeBtn.click();
  console.log("click");
};

if (localStorage.getItem("userData") !== null) {
  userData = JSON.parse(localStorage.getItem("userData"));
}

function regitrationData() {
  userData.push({
    id: idEl.value,
    name: nameEl.value,
    l_name: l_nameEl.value,
    email: emailEl.value,
    officeCode: officeEl.value,
    jobTitle: jobTitleEl.value,
    profilePic: imgUrl == undefined ? "img/avatar.png" : imgUrl,
  });
  var userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
  swal("Good job!", "Registration Success!", "success");
}

// start returining data on page from localStorage
var tableData = document.querySelector("#table-data");

const getDataFromLocal = () => {
  tableData.innerHTML = " ";
  userData.forEach((data, index) => {
    tableData.innerHTML += `
        <tr index=${index}>
        <td>${index + 1}</td>
        <td><img src="${data.profilePic}" width="40" height="40"></td>
        <td>${data.id}</td>
        <td>${data.name}</td>
        <td>${data.l_name}</td>
        <td>${data.email}</td>
        <td>${data.officeCode}</td>
        <td>${data.jobTitle}</td>
        <td>
            <button class="edit-btn">👁</button>
            <button class="del-btn" style="background-color: #d9534f;">✂</button>
        </td>
    </tr>`;
  });

  // start deltet coding
  var i;
  var allDelBtn = document.querySelectorAll(".del-btn");
  for (i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = function () {
      var tr = this.parentElement.parentElement;
      var id = tr.getAttribute("index");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          userData.splice(id, 1);
          localStorage.setItem("userData", JSON.stringify(userData));
          tr.remove();
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    };
  }

  //start Eidting coding
  var allEdit = document.querySelectorAll(".edit-btn");
  for (i = 0; i < allEdit.length; i++) {
    allEdit[i].onclick = function () {
      var tr = this.parentElement.parentElement;
      var td = tr.getElementsByTagName("td");
      var index = tr.getAttribute("index");
      var imgTag = td[1].getElementsByTagName("img");
      var profile_pic = imgTag[0].src;
      var id = td[2].innerHTML;
      var name = td[3].innerHTML;
      var l_name = td[4].innerHTML;
      var email = td[5].innerHTML;
      var officeCode = td[6].innerHTML;
      var jobTitle = td[7].innerHTML;
      addBtn.click();
      registerBtn.disabled = true;
      updateBtn.disabled = false;
      idEl.value = id;
      nameEl.value = name;
      l_nameEl.value = l_name;
      emailEl.value = email;
      officeEl.value = officeCode;
      jobTitleEl.value = jobTitle;
      profilePic.src = profile_pic;

      updateBtn.onclick = function (e) {        
        userData[index] = {
          id: idEl.value,
          name: nameEl.value,
          l_name: l_nameEl.value,
          email: emailEl.value,
          officeCode: officeEl.value,
          jobTitle: jobTitleEl.value,
          profilePic: uploadPic.value == "" ? profile_pic : imgUrl,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
      };
    };
  }
};
getDataFromLocal();

// image Uploading/processing
uploadPic.onchange = function () {
  if (uploadPic.files[0].size < 1000000) {
    var fReader = new FileReader();
    fReader.onload = function (e) {
      imgUrl = e.target.result;
      profilePic.src = imgUrl;
    };
    fReader.readAsDataURL(uploadPic.files[0]);
  } else {
    alert("file size is to long");
  }
};

//Start search coding
var searchEl=document.querySelector('#empId');
searchEl.oninput=function(){
  searchFun();
}

function searchFun(){
  var tr=tableData.querySelectorAll("tr");
  var filter=searchEl.value.toLowerCase();
  var i;
  for(i=0;i<tr.length;i++){
    var id=tr[i].getElementsByTagName("td")[2].innerHTML;
    var name=tr[i].getElementsByTagName("td")[3].innerHTML;
    var l_name=tr[i].getElementsByTagName("td")[4].innerHTML;   
    var email=tr[i].getElementsByTagName("td")[5].innerHTML;
    if(id.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display="";
    }else if(name.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display="";
    }else if(l_name.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display="";
    }else if(email.toLowerCase().indexOf(filter) > -1){
      tr[i].style.display="";
    }
    else{
      tr[i].style.display="none"; 
    }
  }
}

//Clear all data
var delAllBtn=document.querySelector('#del-all-btn');
var allDelBox=document.querySelector('#del-all-box');
delAllBtn.addEventListener('click',()=>{
  if(allDelBox.checked==true){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("userData");
        window.location=location.href;
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
    
  }else{
    swal("Check the box", "Please check the box to delete data","warning")
  }
})
