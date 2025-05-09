<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');


$host = 'manan14'; 
$user = 'manankhandelwal2020';   
$pass = 'gXMBcGEI8TsLOOI1';      
$db = 'geo-bharat';  

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

if (!isset($_GET['pincode'])) {
    echo json_encode(['error' => 'No pincode provided']);
    exit;
}

$pincode = $conn->real_escape_string($_GET['pincode']);

$sql = "SELECT * FROM pincodes WHERE pincode = '$pincode'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $data = $result->fetch_assoc();
    echo json_encode($data);
} else {
    echo json_encode(['error' => 'Area not found']);
}

$conn->close();
?>