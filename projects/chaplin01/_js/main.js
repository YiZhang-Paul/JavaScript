/* jslint esversion: 6 */
(() => {
	document.addEventListener("DOMContentLoaded", () => {
		/**
		 * get all records from database
		 */
		let xhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		xhttp.onreadystatechange = function() {
			if(this.readyState === 4 && this.status === 200) {
				let records = JSON.parse(this.response);
				//create result tab
				let resultTab = new ResultTab(records);
			}
		}; 
		xhttp.open("GET", "_php/getRecord.php", true);
		xhttp.send();
	});
})();