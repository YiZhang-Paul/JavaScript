<?php 
//detect request type 
if($_SERVER["REQUEST_METHOD"] === "GET") {
	getAllRecord();
} else if($_SERVER["REQUEST_METHOD"] === "POST") {
	updateTime($_POST["id"], $_POST["dateNtime"]);
}
/**
 * connect to database 
 */
function connectDB() {
	//database credentials
	$server = "localhost";
	$username = "root";
	$password = "chaplinli";
	$db = "chaplin01";
	$connection = new mysqli($server, $username, $password, $db);
	if($connection->connect_errno) {
		printf("Connect failed: %s\n", $connection->connect_error);
    exit();
	}
	return $connection;
}
/**
 * retrieve record
 */
function getAllRecord() {
	//get connection
	$connection = connectDB();
	if($connection) {
		$sql = "SELECT m.locationID, m.deviceID, alias, IMEI, m.dateNtime, lat, lon
		          FROM 
		       	(SELECT max(locationID) as locationID, deviceID, max(dateNtime) as dateNtime 
		       	   FROM location 
		       	  GROUP BY deviceID) m, location l, device d
		         WHERE m.locationID = l.locationID
		           AND l.deviceID = d.deviceID
		         ORDER BY locationID DESC";
		$resultSet = $connection->query($sql);
		//return records
		if($resultSet->num_rows > 0) {
			$result = array();
			while($row = $resultSet->fetch_assoc()) {
				array_push($result, $row);
				array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
				// array_push($result, $row);
			}
			echo json_encode($result);
		}
		//close connection
		$connection->close();
	}
}
/**
 * update current time to database record
 * @param String, String
 *
 * id        : ID of record to be updated
 * dateNtime : current date and time
 */
function updateTime($id, $dateNtime) {
	//get connection
	$connection = connectDB();
	if($connection) {
		$stmt = $connection->prepare("UPDATE location
			                               SET dateNtime = ?
			                             WHERE locationID = ?");
		$stmt->bind_param("ss", $curTime, $locationID);
		$curTime = $dateNtime;
		$locationID = $id;
		$stmt->execute();
		$stmt->close();
		//close connection
		$connection->close();
	}
}
?>