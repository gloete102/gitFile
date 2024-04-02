<?php
$servername="localhost";
$username="owner01";
$password="123456";
$dbname="testdb07";
$port="3306";

$conn=new mysqli($servername, $username, $password, $dbname, $port);

if($conn->connect_error){
    die("connect failed" . $conn->connect_error);
}

if($_SERVER['REQUEST_METHOD']=='POST'){
   
    if(0<$_FILES['myFileInput']['error']){
        echo '{"state":false, "message":"新增失敗"}' . $_FILES['file']['error'] . '<br>';
    }else{
        move_uploaded_file($_FILES['myFileInput']['tmp_name'],'img_product01/'. $_FILES['myFileInput']['name']);
    }

    $P_category=$_POST['pcategory'];

    if($P_category=="product01"){
        $stmt=$conn->prepare("insert into product01(Name, P_src, P_describe, P_count, Price, P_order )values(?,?,?,?,?,?)");
    }elseif ($P_category=="product02"){
        $stmt=$conn->prepare("insert into product02(Name, P_src, P_describe, P_count, Price, P_order )values(?,?,?,?,?,?)");
    }
    
    $stmt->bind_param("ssssss", $Name, $P_src, $P_describe, $P_count, $Price, $P_order);
    $Name=$_POST['pname'];
    $P_src=$_FILES['myFileInput']['name'];

    if($P_src==""){
        $P_src="img_product01/simple_color.jpg";
    }else{
        $P_src='img_product01/'. $P_src;
    }


    $P_describe=$_POST['p_describe'];
    $P_count=$_POST['p_number'];
    $Price=$_POST['p_price'];
    $P_order=$_POST['p_order'];
    
    if($P_count==""){
        $P_count=0;
    }
    if($Price==""){
        $Price=0;
    }
    if($P_order==""){
        $P_order=0;
    }

    if($stmt->execute()){
        echo 1;
    }else{
        echo 0;
    }
    $stmt->close();
    $conn->close();
}


?>