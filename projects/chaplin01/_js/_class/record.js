/* jslint esversion: 6 */
/**
 * record class
 * @param obj {}, obj {}
 *
 * owner      : result tab currently holding the record
 * clientInfo : object containing client information 
 */
class Record {
	constructor(owner, clientInfo) {
		this.owner = owner;
		this.locationID = clientInfo.locationID;
		this.alias = clientInfo.alias;
		this.imei = this.reformatIMEI(clientInfo.IMEI);
		//get address
		this.lat = clientInfo.lat;
		this.lon = clientInfo.lon;
		this.address = "Pending...";
		//get and re-format date
		this.date = this.reformatDate(clientInfo.dateNtime.split(" ")[0]);
		//get and re-format time
		this.time = this.reformatTime(clientInfo.dateNtime.split(" ")[1]);
	}
	/**
	 * get current address
	 * @param float, float
	 *
	 * lat : latitude of current location
	 * lon : longitude of current location 
	 *
	 * return String
	 */
	getAddress(lat, lon) {
		if(window.navigator.geolocation) {
			return new Promise((resolve, reject) => {
				let position = new google.maps.LatLng(lat, lon);
				let geocoder = new google.maps.Geocoder();
				geocoder.geocode({'latLng': position}, (results, status) => {
					if(status == "OK") resolve({record : this, addr : results});	
					else {
						reject(this);	
					}
			  });
			});
		}
		console.log("Geolocation Not Supported.");
	}
	/** 
	 * re-format IMEI
	 * @param String
	 * 
	 * imei : IMEI to be reformated
	 *
	 * return String
	 */
	reformatIMEI(imei) {
		return imei == "NULL" ? "000000000000000" : Number(imei).toString();
	} 
	/** 
	 * re-format date
	 * @param String
	 * 
	 * date : date to be reformated
	 *
	 * return String
	 */
	reformatDate(date) {
		let dateSegment = date.split("-");
		dateSegment.push(dateSegment.shift());
		//re-join date string
		return dateSegment.join("/");
	} 
	/**
	 * re-format time
	 * @param String
	 * 
	 * time : time to be reformated
	 *
	 * return String
	 */ 
	reformatTime(time) {
		let timeSegment = time.split(":");
		let suffix = timeSegment[0] >= 12 ? " PM" : " AM";
		timeSegment[0] -= timeSegment[0] > 12 ? 12 : 0;
		//re-join time string 
		return timeSegment.join(":") + suffix;
	} 
} 