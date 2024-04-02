// window.onload = function () {
  
// };
var flag_username = false;
var flag_password = false;
var flag_re_password = false;
var flag_email = false;
var flag_chk01 = false;
var grade=0;//確認是否為最高等級用, 在登入及 Check UID 都用到
var flag_root_btn=false;//響應式在按漢堡圖時, 決定是否顯示網站管理用.
//registermodal
$(function () {
  //原先javascript

  const toggleButton = document.getElementsByClassName("navbar-toggle")[0];
  const navbarLinks = document.getElementsByClassName("navbar-links");
  const btnc = document.getElementsByClassName("btna");

  
  toggleButton.addEventListener("click", function () {
    
    for (var i = 0; i < navbarLinks.length; i++) {
      if(i==(navbarLinks.length-1)){ //navbarLinks 的最後一項就是網站管理  
           if(flag_root_btn==false)  //若未登入, 則不顯示網站管理
          continue;
        }
      navbarLinks[i].classList.toggle("active");
    }
    for (var i = 0; i < btnc.length; i++) {
      btnc[i].classList.toggle("active_btn");
    }
  });

  //loginmodal
  var login_modal = document.getElementById("loginModal");
  var btn = document.getElementById("s02_login_btn");
  var span = document.getElementsByClassName("close")[0];
  var span02 = document.getElementsByClassName("close02")[0];
  btn.onclick = function () {
    login_modal.style.display = "block";
  };
  span.onclick = function () {
    login_modal.style.display = "none";
    $("#login_username").val(""); //清空 input 內的值
    $("#login_password").val("");
  };
  span02.onclick = function () {
    login_modal.style.display = "none";
    $("#login_username").val(""); //清空 input 內的值
    $("#login_password").val("");
  };

  //registermodal
  var register_modal = document.getElementById("regesterModal");
  var btn = document.getElementById("s02_reg_btn");
  var span = document.getElementsByClassName("close_reg")[0];
  var span02 = document.getElementsByClassName("close_reg_02")[0];
  btn.onclick = function () {
    register_modal.style.display = "block";
  };
  span.onclick = function () {
    register_modal.style.display = "none";
    $("#username").val(""); //清空 input 內的值
    $("#password").val("");
    $("#re_password").val("");
    $("#email").val("");
    $("#chk01").prop("checked", false); //取消 checkbox 的勾選,
    //若要讓 checkbox 變成有勾選要用 $("#chk01").prop("checked",true);
  };
  span02.onclick = function () {
    register_modal.style.display = "none";
    $("#username").val(""); //清空 input 內的值
    $("#password").val("");
    $("#re_password").val("");
    $("#email").val("");
    $("#chk01").prop("checked", false); //取消 checkbox 的勾選,
    //若要讓 checkbox 變成有勾選要用 $("#chk01").prop("checked",true);
  };
  //以上是原先 javascript

  //判斷是否登入
  if(getCookie("UID01")!=""){
    //UID01存在, 傳遞到後端 api 判斷是否合法
    var dataJSON={};
    dataJSON["UID01"]=getCookie("UID01");
    $.ajax({
      type:"POST",
      url:"serenty_member_Check_UID_api_20240318.php",
      data:JSON.stringify(dataJSON),
      dataType:"json",
      success:showdata_Check_UID,
      error:function(){
        alert(error_serenty_member_Check_UID_api_20240318.php);
      }
    });
  }


  //即時監聽註冊帳號 input id:username
  $("#username").bind("input propertychange", function () {
    if ($(this).val().length == 0) {
      $("#username_conforming").css("display", "none");
      $("#username_not_conforming").css("display", "none");
      flag_username = false;
    } else if ($(this).val().length > 3 && $(this).val().length < 9) {
      //字數符合規定, 傳遞至後端檢查帳號是否存在
      var dataJSON = {};
      dataJSON["Username"] = $("#username").val();
      $.ajax({
        type: "POST",
        url: "serenty_member_Check_uni_api_20230318.php",
        data: JSON.stringify(dataJSON),
        dataType: "json",
        success: showdata_check_uni,
        error: function () {
          alert("error_serenty_member_Check_uni_api_20230318.php");
        },
      });
    } else {
      //字數不符合規定
      $("#username_conforming").css("display", "none");
      $("#username_not_conforming").css("display", "block");
      flag_username = false;
    }
  });
  //即時監聽 id:password
  $("#password").bind("input propertychaange", function () {
    if ($(this).val().length == 0) {
      $("#password_conforming").css("display", "none");
      $("#password_not_conforming").css("display", "none");
      flag_password = false;
    } else if ($(this).val().length > 4 && $(this).val().length < 11) {
      $("#password_conforming").css("display", "block");
      $("#password_not_conforming").css("display", "none");
      flag_password = true;
    } else {
      $("#password_conforming").css("display", "none");
      $("#password_not_conforming").css("display", "block");
      flag_password = false;
    }
  });

  //即時監聽 id:re_password
  $("#re_password").bind("input propertychaange", function () {
    if ($(this).val().length == 0) {
      $("#re_password_conforming").css("display", "none");
      $("#re_password_not_conforming").css("display", "none");
      flag_re_password = false;
    } else if ($(this).val() == $("#password").val()) {
      $("#re_password_conforming").css("display", "block");
      $("#re_password_not_conforming").css("display", "none");
      flag_re_password = true;
    } else {
      $("#re_password_conforming").css("display", "none");
      $("#re_password_not_conforming").css("display", "block");
      flag_re_password = false;
    }
  });

  //即時監聽 id:email
  $("#email").bind("input propertychaange", function () {
    if ($(this).val().length == 0) {
      $("#email_not_conforming").css("display", "none");
      $("#email_conforming").css("display", "none");
      flag_email = false;
    } else if ($(this).val().length > 0 && $(this).val().length < 11) {
      $("#email_not_conforming").css("display", "none");
      $("#email_conforming").css("display", "block");
      flag_email = true;
    } else {
      $("#email_not_conforming").css("display", "block");
      $("#email_conforming").css("display", "none");
      flag_email = false;
    }
  });
  //監聽 checkbox id:chk01 同意會員守則
  $("#chk01").bind("input propertychange", function () {
    if ($(this).is(":checked")) {
      flag_chk01 = true;
    } else {
      flag_chk01 = false;
    }
  });

  //註冊按鈕監聽 #reg_btn
  $("#reg_btn").click(function () {
    //{"Username":"XX", "Password":"XXX", "Email":"XXXXX"}
    if (
      flag_username &&
      flag_password &&
      flag_re_password &&
      flag_email &&
      flag_chk01
    ) {
      var dataJSON = {};
      dataJSON["Username"] = $("#username").val();
      dataJSON["Password"] = $("#password").val();
      dataJSON["Email"] = $("#email").val();
      //傳遞至後端執行註冊行為
      $.ajax({
        type: "POST",
        url: "serenty_member_Creat_api_20240318.php",
        data: JSON.stringify(dataJSON),
        dataType: "json",
        success: showdata,
        error: function () {
          alert("error-serenty_member_Creat_api_20240318.php");
        },
      });
    } else {
      alert("欄位有錯誤, 請修正.");
    }
  });

  //登入按鈕監聽 id:login_btn
  $("#login_btn").click(function () {
    //{"Username":"XXX", "Password:XXXXXX"}
    
    var dataJSON = {};
    dataJSON["Username"] = $("#login_username").val();
    dataJSON["Password"] = $("#login_password").val();
    
    //傳遞至後端執行登入行為
    $.ajax({
      type: "POST",
      url: "serenty_member_login_api_20230318.php",
      data: JSON.stringify(dataJSON),
      dataType: "json",
      success: showdata_login,
      error: function () {
        alert("error_serenty_member_login_api_20230318.php");
      },
    });
  });

  //登出按鈕監聽 id:s02_logout_btn
  $("#s02_logout_btn").click(function () {
 
    setCookie("UID01", "", 7);
    location.href = "serenty_20240323.html";
  });

  //讀取產品 01 資料
  $.ajax({
    type:"GET",
    url:"product01_Read_api_serenty_20240323.php?datasheet=product01",
    async:false,
    dataType:"json",
    success:showdata_product01,
    error:function(){
      alert("error_product01_Read_api_serenty_20240323.php?datasheet=product01");
    }
  });

  //讀取產品 02 資料
  $.ajax({
    type:"GET",
    url:"product01_Read_api_serenty_20240323.php?datasheet=product02",
    async:false,
    dataType:"json",
    success:showdata_product02,
    error:function(){
      alert("error_product01_Read_api_serenty_20240323.php?datasheet=product02");
    }
  });


});
//此處是 $(function(){}); 底部 
//輪播 slide show
//顯示的圖片下標
let index = 3;
let check = true; //確認按鈕可執行
function refresh() {
  //獲取輪播框元素
  check = false;
  let carousel_main = document.querySelector(".carousel_main");

  //獲取輪播框的寬度
  let width = parseInt($(".carousel_main").css("width"));
  carousel_main.querySelector(".container_main").style.left =
    index * width * -1 + "px";

  setTimeout(function () {
    if (index == 0) {
      $("#container_id").removeClass("container_tran");
      let temp = -5 * width;
      let temp1 = temp + "px";
      
      $(".container_main").css("left", temp1);
      index = 5;
     
      $("#container_id").addClass("container_tran");
    }
  }, 800);

  setTimeout(function () {
    if (index == 6) {
      $("#container_id").removeClass("container_tran");
      let temp = -1 * width;
      let temp1 = temp + "px";
      
      $(".container_main").css("left", temp1);
      index = 1;
     
      $("#container_id").addClass("container_tran");
     
    }
  }, 800);
  setTimeout(function () {
    check = true;
  }, 800);
}

function leftShift() {
  if (check == true) {
   
    index--;
    refresh();
  }
}
function rightShift() {
  if (check == true) {
 
    index++;
    refresh();
  }
}
function setIndex(idx) {

  index = idx;
  refresh();
}
//確認帳號是否重複
function showdata_check_uni(data) {

  if (data.state) {
    //帳號不存在, 可以使用!
    //"#username" 不可寫 this
    $("#username_conforming").css("display", "block");
    $("#username_not_conforming").css("display", "none");
    flag_username = true;
  } else {
    $("#username_conforming").css("display", "none");
    $("#username_not_conforming").css("display", "block");
    flag_username = false;
  }
}
//註冊按鈕監聽 #reg_btn 執行成功後
function showdata(data) {
 
  if (data.state) {
    alert(data.message);
    location.href = "serenty_20240323.html";
  } else {
    alert(data.message);
  }
}

//登入按鈕監聽 id:login_btn
function showdata_login(data) {
 
  if (data.state) {
    //Cookie
    var uid01=data.data[0].UID01;
    grade=data.data[0].Grade;
   
    setCookie("UID01",uid01,7);
    alert(data.message);
    // 增加登錄者資訊
    $("#user_message").text(data.data[0].Username + "登入中");
    //隱藏登入註冊按鈕
    $("#s02_login_btn").css("display", "none");
    $("#s02_reg_btn").css("display", "none");
    //顯示登出按鈕
    $("#s02_logout_btn").css("display", "block");
    //當最高權限時(Grade=100)顯示管理員按鈕 root_btn
    if(grade==100)
    {
    $("#root_btn").removeClass("display_None");
    flag_root_btn=true; //響應式在按漢堡圖時, 決定是否顯示網站管理用.
    }
  } else {
    alert(data.message);
  }
}

//w3school
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//w3school
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function showdata_Check_UID(data){
  
  if(data.state){
    // 增加登錄者資訊
    $("#user_message").text(data.data[0].Username + "登入中");
    //隱藏登入註冊按鈕
    $("#s02_login_btn").css("display", "none");
    $("#s02_reg_btn").css("display", "none");
    //顯示登出按鈕
    $("#s02_logout_btn").css("display", "block");
    //當最高權限時(Grade=100)顯示管理員按鈕 root_btn
   
    if(data.data[0].Grade=="100"){
    $("#root_btn").removeClass("display_None");
    flag_root_btn=true; //響應式在按漢堡圖時, 決定是否顯示網站管理用.
     }
  }else{
    flag_root_btn=false;//響應式在按漢堡圖時, 決定是否顯示網站管理用.
  }
}
//渲染出產品01頁面
function showdata_product01(data){
  $("#product_01_item_id").empty();
  
  data.data.forEach(function(item){
    var strHTML='<div class="card_item" id="card_item_id" style="order: '+item.P_order+';" ><img src="'+item.P_src+'"alt=""/><div class="item_name">'+item.Name+'</div><div class="item_describe">'+item.P_describe+'</div><div class="buy_row"><div class="item_price_title">數量 : </div><div class="item_price">'+item.P_count+'</div></div><div class="buy_row"><div class="item_price_title">價錢 : </div><div class="item_price">'+item.Price+'</div><button data-name="'+item.Name+'" data-describe="'+item.P_describe+'" data-count="'+item.P_count+'" data-price="'+item.Price+'" data-itemOrder="'+item.P_order+'" data-position="'+item.P_src+'" id="buy_btn" class="buy_btn_class" type="button">購買</button></div></div>';
    $("#product_01_item_id").append(strHTML);
  }); 
}

//渲染出產品02頁面
function showdata_product02(data){
  
  $("#product_02_item_id").empty();
  
  data.data.forEach(function(item){
    var strHTML='<div class="card_item" id="card_item_id" style="order: '+item.P_order+';" ><img src="'+item.P_src+'"alt=""/><div class="item_name">'+item.Name+'</div><div class="item_describe">'+item.P_describe+'</div><div class="buy_row"><div class="item_price_title">數量 : </div><div class="item_price">'+item.P_count+'</div></div><div class="buy_row"><div class="item_price_title">價錢 : </div><div class="item_price">'+item.Price+'</div><button data-name="'+item.Name+'" data-describe="'+item.P_describe+'" data-count="'+item.P_count+'" data-price="'+item.Price+'" data-itemOrder="'+item.P_order+'" data-position="'+item.P_src+'" id="buy_btn" class="buy_btn_class" type="button">購買</button></div></div>';
    $("#product_02_item_id").append(strHTML);
  }); 
}
