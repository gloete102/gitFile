<?php
    //{"ID":"XX", "Email":"XXXXX", "Grade":XXX}
    // {"state" : true, "message" : "更新成功!"}
    // {"state" : false, "message" : "更新失敗!"}
    // {"state" : false, "message" : "傳遞參數格式錯誤!"}
    // {"state" : false, "message" : "未傳遞任何參數!"}

    $data=file_get_contents("php://input","r");
    if($data!=""){
        $mydata=array();
        $mydata=json_decode($data,true);

        if(isset($mydata["ID"]) && isset($mydata["Email"]) && isset($mydata["Grade"]) && $mydata["ID"]!="" && $mydata["Email"]!="" && $mydata["Grade"]!=""){
            $p_ID=$mydata["ID"];
            $p_Email=$mydata["Email"];
            $p_Grade=$mydata["Grade"];

            $servername = "localhost";
            $username = "owner01";
            $password = "123456";
            $dbname = "testdb07";
            $port="3306";

            $conn=mysqli_connect($servername, $username, $password, $dbname, $port);

            if(!$conn){
                die("連線失敗" . mysqli_connect_error());
            }
            $sql="UPDATE member SET Email='$p_Email', Grade='$p_Grade' WHERE ID='$p_ID'";

            if (mysqli_query($conn, $sql)) {
                echo '{"state": true, "message":"更新成功"}';
              } else {
                echo '{"state": false, "message":"更新失敗"}' . $sql . "<br>" . mysqli_error($conn);
              }
              
              mysqli_close($conn);

        }else{
            echo '{"state": false, "message":"傳遞參數格式錯誤!"}';
        }
        }else{
            echo '{"state": false, "message":"未傳遞任何參數!"}';

    }

?>