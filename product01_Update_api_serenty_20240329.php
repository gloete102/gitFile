<?php
$servername="localhost";
$username="owner01";
$password="123456";
$dbname="testdb07";
$port="3306";


$conn=new mysqli($servername, $username, $password, $dbname, $port);

if($conn->connect_error){
    die("connect failed" . $conn->connect_error);
}else{
    echo "資料連結成功";
}

var_dump($username);
var_dump($_POST);
var_dump($port);

if($_SERVER['REQUEST_METHOD']=='POST'){
    if(0<$_FILES['myFileInput']['error']){
        echo '{"state":false, "message":"新增失敗"}' . $_FILES['myFileInput']['error'] . '<br>';
    }else{
        move_uploaded_file($_FILES['myFileInput']['tmp_name'],'img_product01/'. $_FILES['myFileInput']['name']);
        echo "新增成功";
    }

    
    $product_type=$_POST['product_type'];

    if($product_type=="product01"){
    $stmt=$conn->prepare("update `product01` set Name=?,P_src=?, P_describe=?, P_count=?, Price=?, P_order=? where ID=?");
    $stmt->bind_param("sssiiii", $Name, $P_src, $P_describe, $P_count, $Price, $P_order,$ID);
    }elseif($product_type=="product02"){
        $stmt=$conn->prepare("update `product02` set Name=?,P_src=?, P_describe=?, P_count=?, Price=?, P_order=? where ID=?");
    $stmt->bind_param("sssiiii", $Name, $P_src, $P_describe, $P_count, $Price, $P_order,$ID);
    }
    
    $Name=$_POST['pname'];

    
    $p_src_check=$_POST['P_src_check'];
    echo $p_src_check;
    if($p_src_check==1)//有選新圖
    {
        $P_src=$_FILES['myFileInput']['name'];
        $P_src='img_product01/'. $P_src;
        echo "p_src_check=1";
    }elseif($p_src_check==2)//有按清空鍵
    {
        $P_src= $_POST['P_src_clear'];  
        echo "p_src_check=2";
    }elseif($p_src_check==3)//沒有選新圖, 也沒按清空鍵
    {
        $P_src= $_POST['P_src_oringin'];  
        echo "p_src_check=3";
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
    $ID=$_POST['pid'];
    
    if($stmt->execute()){
        echo 1;
    }else{
        echo 0;
    }
    
    $stmt->close();

}
$conn->close();
?>