<?php
//input: {"ID":"XX","product_type":"product01"}

$data=file_get_contents("php://input","r");
if($data!=""){
    $mydata=array();
    $mydata=json_decode($data, true);

    $p_ID=$mydata["ID"];
    $product_type=$mydata["product_type"];

    $servername="localhost";
    $username="owner01";
    $password="123456";
    $dbname="testdb07";
    $port="3306";

    $conn=mysqli_connect($servername, $username, $password, $dbname, $port);
    if(!$conn){
        die("連線失敗".mysqli_connect_error());
    }

    if($product_type=="product01"){
        $sql="DELETE FROM product01 WHERE ID='$p_ID'";
       
    }elseif($product_type=="product02"){
        $sql="DELETE FROM product02 WHERE ID='$p_ID'";
    
    }

    if(mysqli_query($conn, $sql)){
        
        echo '{"state" : true, "message" : "刪除成功!"}';
    }else{
       
        echo '{"state" : false, "message" : "刪除失敗!'.$sql.'"}';
    }
    mysqli_close($conn);
}



?>