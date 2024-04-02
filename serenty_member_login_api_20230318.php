<?php
//input:{"Username":"XX", "Password":"XXX"}
//{"state":true, "data":"登入後的帳號資料(密碼除外)", "message":"登入成功!"}
//{"state":false, "message":" 登入失敗!"}
//{"state":false, "message":"傳遞參數格式錯誤!"}
//{"state":false, "message":"未傳遞任何參數!"}

$data=file_get_contents("php://input","r");

if($data!=""){
    $mydata=array();
    $mydata=json_decode($data, true);
        if(isset($mydata["Username"]) && isset($mydata["Password"]) && ($mydata["Username"])!="" && ($mydata["Password"])!=""){
            $p_Username=$mydata["Username"];
            $p_Password=$mydata["Password"];
        
            $servername="localhost";
            $username="owner01";
            $password="123456";
            $dbname="testdb07";
            $port="3306";

            //Create connection
            $conn=mysqli_connect($servername, $username, $password, $dbname, $port);
            //Check connection
            if(!$conn){
                die("連線失敗 " . mysqli_connect_errno());
            }
            $sql="SELECT Username, Password, Email FROM member WHERE Username='$p_Username'";
            $result=mysqli_query($conn, $sql);

            if(mysqli_num_rows($result)==1){
                $row=mysqli_fetch_assoc($result);
                if(password_verify($p_Password, $row['Password'])){
                    //密碼比對正確, 撈取不包含密碼的使用者資料並產生 UID
                    $uid=substr(hash('sha256',uniqid(time())),0,8);
                    //更新 uid 至資料庫
                    $sql="UPDATE member SET UID01='$uid' WHERE Username='$p_Username'";
                    if(mysqli_query($conn,$sql)){
                        $sql="SELECT Username,Email,UID01,Grade FROM member WHERE Username='$p_Username'";
                        $result=mysqli_query($conn,$sql);
                        $row=mysqli_fetch_assoc($result);
                        $mydata=array();
                        $mydata[]=$row;//因此時 row 只有一筆資料, $mydata 後方可以不加 [].
                         echo '{"state":true, "data":'.json_encode($mydata).', "message":"登入成功!"}';
                    }else{
                        //uid 更新錯誤
                        echo '{"state":false, "message":"登入失敗, uid 更新錯誤."}';
                    }

                    
                }else{
                    //密碼比對錯誤
                    echo '{"state":false, "message":"密碼錯誤, 登入失敗!"}';
                }

            }else{
               //此帳號未註冊
                echo '{"state":false, "message":"無此帳號, 登入失敗!"}';
            }

        }else{
            echo '{"state":false, "message":"傳遞參數格式錯誤!"}';
        }
}else{
    echo '{"state":false, "message":"未傳遞任何參數!"}';
}




?>