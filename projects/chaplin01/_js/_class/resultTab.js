/* jslint esversion: 6 */
/**
 * result tab class
 * @param array []
 * 
 * allClientInfo : array containing all client records 
 */
class ResultTab {
	constructor(allClientInfo) {
		this.tracker = [];        //track all records returned from database
		this.currentRecords = []; //current displaying records
		this.sortCategory = null; //indicate current sorting category
		this.sortOrder = null;    //indicate direction of sorting
		this.addrRetrieved = 0;
		//store all record objects
		allClientInfo.forEach((clientInfo, index) => {
			this.tracker.push(new Record(this, clientInfo));
		});
		//initialize search box
		this.initSearchBox();
		//load table
		this.makeTable();
		//load addresses
		this.loadAddress(this.tracker.slice());
	}
	/**
	 * load all addresses
	 */
	loadAddress(records) {
		let start = new Date().getTime();
		//update address on record page
		let refreshAddr = results => results.forEach(result => {
			result.record.address = result.addr[0].formatted_address;
			this.updateData(result.record, "address");
		});
		//promises to get all addresses
		let promises = [];
		records.forEach(record => {
			promises.push(record.getAddress(record.lat, record.lon));
		});
		Promise.all(promises)
			//when all promises are resolved
			.then(results => {
				refreshAddr(results);	
			})
			//find index of the first rejected promise
			.catch(rejectedItem => {
				return records.indexOf(rejectedItem)	;	
			})
			.then(index => {
				if(index >= 0) {
					//update resolved promises results
					Promise.all(promises.slice(0, index))
						.then(results => {
							refreshAddr(results);	
							//pass rejected promises to resolve again
							let unResolved = records.slice(index);
							let end = new Date().getTime();
							setTimeout(() => {
								this.loadAddress(unResolved);
							}, 200 - (end - start));
						});
				}
			});
	} 
	/**
	 * clear all records
	 * @param obj {}
	 *
	 * table : table to clear
	 */
	clearRecord(table) {
		let rowCount = document.getElementsByClassName("recordRow").length;
		for(let i = 0; i < rowCount; i++) {
			table.deleteRow(-1);
		}	
	} 
	/**
	 * initialize headings for the sort functionality
	 * @param obj {}
	 *
	 * headRow : headings to be initialized
	 */
	initHeadings(headRow) {
		headRow.addEventListener("click", event => {
			//header item being clicked
			let sortItem = event.target.innerHTML.toLowerCase();
			let ascSort = (a, b) => a - b;
			let descSort = (a, b) => b - a;
			//data re-formatting for better sorting results
			let reformData = (sortItem, itemType) => {
				switch(itemType) {
					case "imei" :
						sortItem = Number(sortItem);
						break;	
					case "alias" :	
					case "address" :
						sortItem = sortItem[0].charCodeAt();
						break;
					case "date" :
						sortItem = new Date(sortItem.split("-")).getTime();
						break;
					case "time" :
						sortItem = sortItem.split(/[: ]/g).slice(0, 3).map(a => +a);
						sortItem[0] += sortItem[0] < 12 ? 12 : 0; 
						sortItem = sortItem[0] * 60 * 60 + sortItem[1] * 60 + sortItem[2];
						break;			
				}
				return sortItem;
			};
			//execute respective sort function
			if(sortItem) {
				//reset sort order
				if(this.sortCategory != sortItem) {
					this.sortOrder = null;
				}
				this.sortCategory = sortItem;
				//sort current displaying records
				this.sortOrder = !this.sortOrder || this.sortOrder == "DESC" ? "ASC" : "DESC";
				let sortFunc = this.sortOrder == "ASC" ? ascSort : descSort;
				this.currentRecords.sort((a, b) => 
					sortFunc(reformData(a[sortItem], sortItem), reformData(b[sortItem], sortItem))
				);
				//re-attach sorted records to result table
				let table = document.getElementById("resultTable");
				this.attachRecords(table, this.currentRecords);
			}
		});
	}
	/**
	 * attach headings for result table
	 * @param obj {}
	 *
	 * table : result table
	 */
	attachHeading(table) {
		let titles = ["", "Alias", "IMEI", "Address", "Date", "Time", "", ""];
		//create heading row
		let headRow = document.createElement("tr");
		headRow.id = "headRow";
		titles.forEach(title => {
			let heading = document.createElement("th");
			heading.innerHTML = title;
			headRow.appendChild(heading);
		});
		//attach headings
		table.appendChild(headRow);
		//initialize headings sort functions
		this.initHeadings(headRow);
	}
	/**
	 * attach records to result table 
	 * @param obj {}, array []
	 *
	 * table   : result table
	 * records : array containing all records to be displayed
	 */ 
	attachRecords(table, records = this.tracker) {
		//update current displaying records
		this.currentRecords = records.slice();
		//clear current records if found any
		this.clearRecord(table);
		//add new records
		records.forEach((record, itemNum) => {
			let titles = table.getElementsByTagName("th");
			//create record rows
			let recordRow = document.createElement("tr");
			recordRow.className = "recordRow";
			[].forEach.call(titles, (title, index) => {
				let dataItem = document.createElement("td");
				//insert item number and other data items
				if(!index) {
					dataItem.className = "recordNum";
					dataItem.innerHTML = itemNum + 1;
				} else if(title.innerHTML) {
					if(title.innerHTML == "Alias") {
						let wrapper = document.createElement("div");
						wrapper.className = "alias";
						wrapper.innerHTML = record[title.innerHTML.toLowerCase()];
						dataItem.appendChild(wrapper);
					} else {
						dataItem.innerHTML = record[title.innerHTML.toLowerCase()];
					}
				} else if(index == titles.length - 2) {
					this.addMapBtn(record, dataItem);
				} else {
					this.addLocateBtn(record, dataItem);
				}
				recordRow.appendChild(dataItem);
			});
			//attach record row
			table.appendChild(recordRow);
		});
	}
	/**
	 * construct result table
	 */
	makeTable() {
		let table = document.createElement("table");
		table.id = "resultTable";
		table.className = "resultTable";
		//attach headings
		this.attachHeading(table);
		//attach records
		this.attachRecords(table);
		//attach table to the result tab
		document.getElementById("table").appendChild(table);
	} 
	/**
	 * initialize search box
	 */
	initSearchBox() {
		//get current text in search box display search result
		let getText = () => {
			//current result table
			let table = document.getElementById("resultTable");
			//trim input string
			let currentText = searchBox.value.trim().toLowerCase();
			if(currentText) {
				//search and display result if found any
				let result = this.searchRecord(currentText);
				if(result.length > 0) {
					this.sortOrder = null;
					let recordRows = document.getElementsByClassName("recordRow");
					for(let i = 0; i < this.currentRecords.length; i++) {
						if(result.indexOf(this.currentRecords[i]) != -1) {
							continue;
						}
						recordRows[i].className += " notResult";
					}
				}
			} else {
				this.sortOrder = null;
				let recordRows = document.getElementsByClassName("recordRow");
				for(let i = 0; i < this.tracker.length; i++) {
					recordRows[i].className = "recordRow";
				}
			}
		};
		//add change event to search box
		let searchBox = document.getElementById("searchBox");
		searchBox.addEventListener("keyup", getText);
		searchBox.addEventListener("search", getText);
	} 
	/**
	 * search records
	 * @param String
	 *
	 * input : input string for search
	 */
	searchRecord(input) {
		//search all records
		let result = this.tracker.filter(record => {
			let alias = record.alias.toLowerCase();
			let imei = record.imei.toLowerCase();
			return alias.search(input) != -1 || imei.search(input) != -1;
		});
		return result;
	} 
	/**
	 * add button
	 * @param obj {}, String
	 * 
	 * domElement : DOM element to attach button
	 * name       : button name 
	 *
	 * returns obj {}
	 */
	addButton(domElement, name) {
		let button = document.createElement("button");
		let span = document.createElement("span");
		span.innerHTML = name;
		button.appendChild(span);
		domElement.appendChild(button);
		return button;
	} 
	/**
	 * add map button
	 * @param obj {}, obj {}
	 * 
	 * owner      : client record binding to the button
	 * domElement : DOM element to attach button
	 */
	addMapBtn(owner, domElement) {
		//create a button and add listener
		let button = this.addButton(domElement, "Map");
		button.className = "mapBtn";
		button.addEventListener("click", () => {
			this.showMap(owner);
		});	
	} 
	/**
	 * create a google map
	 * @param obj {}
	 * 
	 * record : current record to be updated
	 *
	 * returns obj {}
	 */
	createMap(record) {
		//current location
		let latLon = {lat : +record.lat, lng : +record.lon};
		//put map
		let container = document.getElementById("container");
		let map = new google.maps.Map(container, {
			zoom : 15,
			center : latLon
		});
		//put a marker on map center
		let marker = new google.maps.Marker({
			position : latLon,
			map : map
		});
		return map;
	} 
	/**
	 * show google map
	 * @param obj {}
	 * 
	 * record : current record to be updated
	 */
	showMap(record) {
		//create a overlay
		let overlay = new Overlay();		
		//create map
		let map = this.createMap(record);
		//re-center map on resize
		let center = map.getCenter();
		window.addEventListener("resize", () => {
	    map.setCenter(center);
		});
	} 
	/**
	 * add locate button
	 * @param obj {}, obj {}
	 * 
	 * owner      : client record binding to the button
	 * domElement : DOM element to attach button
	 */
	addLocateBtn(owner, domElement) {
		//create a button and add listener
		let button = this.addButton(domElement, "Locate");
		button.className = "locateBtn";
		button.addEventListener("click", () => {
			this.relocate(owner);
		});
	} 
	/**
	 * re-format date for database storage
	 * @param obj {}, obj {}
	 *
	 * timeObj : date object
	 * rule    : rule for formatting (function)
	 *
	 * returns String
	 */
	reformatDate(timeObj, rule) {
		let month = rule(timeObj.getMonth() + 1);
		let day = rule(timeObj.getDate());
		return timeObj.getFullYear() + "-" + month + "-" + day;
	}
	/**
	 * re-format time for database storage
	 * @param obj {}, obj {}
	 *
	 * timeObj : date object
	 * rule    : rule for formatting (function)
	 *
	 * returns String
	 */
	reformatTime(timeObj, rule) {
		let hour = rule(timeObj.getHours());
		let minute = rule(timeObj.getMinutes());
		let second = rule(timeObj.getSeconds());
		return hour + ":" + minute + ":" + second;
	}
	/**
	 * store date in database
	 * @param String, String
	 *
	 * id        : ID of record in database to be updated
	 * dateNtime : date and time to be stored in database
	 */
	storeDate(id, dateNtime) {
		let xhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		xhttp.open("POST", "_php/getRecord.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(`id=${id}&dateNtime=${dateNtime}`);
	} 
	/**
	 * relocate a device
	 * @param obj {}
	 * 
	 * record : current record to be updated
	 */
	relocate(record) {
		//retrieve current time
		let curTime = new Date();
		//reformat date and time for database storage
		let prependZero = num => num < 10 ? "0" + num : num;  
		let date = this.reformatDate(curTime, prependZero);
		let time = this.reformatTime(curTime, prependZero);
		let dateNtime = date + " " + time;
		//store new date and time in database
		this.storeDate(record.locationID, dateNtime);
		//reformat date and time for current record display
		record.date = record.reformatDate(date);
		record.time = record.reformatTime(time);
		//reflect changes on the result table
		this.updateData(record, "date");
		this.updateData(record, "time");
	}  
	/**
	 * refresh record data
	 * @param obj {}, String
	 *
	 * record   : record to be updated
	 * category : category in the record to be updated
	 */ 
	updateData(record, category) {
		let headings = document.getElementsByTagName("th");
		//find category index
		let index = [].findIndex.call(headings, heading => {
			return heading.innerHTML.toLowerCase() == category;	
		}); 
		//row count for current record
		let rowCount = this.currentRecords.indexOf(record);
		let recordRow = document.getElementsByClassName("recordRow")[rowCount];
		let rowColumns = recordRow.getElementsByTagName("td"); 
		//update data
		rowColumns[index].innerHTML = record[category];
	} 
} 