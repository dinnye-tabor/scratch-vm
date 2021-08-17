const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const fetchWithTimeout = require('../../util/fetch-with-timeout');

const serverURL = 'https://dinnye-tabor.herokuapp.com/api/boards';
const serverTimeoutMs = 1000; // 1 sec

const delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

const apiCalls = {
	distance: { lastCall: null, lastValue: null }
	rawdistance: { lastCall: null, lastValue: null }
	gesture: { lastCall: null, lastValue: null }
	voltage: { lastCall: null, lastValue: null }
	wifi: { lastCall: null, lastValue: null }
	temperature: { lastCall: null, lastValue: null }
	button: { lastCall: null, lastValue: null }
	input: { lastCall: null, lastValue: null }
}

class Scratch3Dinnye {
    constructor (runtime) {
        this.runtime = runtime;
		this.panelName = null;
		
		this.getIntegerValue = async function (valueType) {
			await delay(200);
			let responseBase = `${serverURL}/${this.panelName}/response`;

			const promise = fetchWithTimeout(responseBase, {}, serverTimeoutMs)
				.then(response => {
					let result = parseInt(response);
					apiCalls[valueType].lastCall = new Date().getTime();
					apiCalls[valueType].lastValue = result;
					return result;
				})
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return -1;
				});
			return promise;
		};
		
		this.getFloatValue = async function (valueType) {
			await delay(200);
			let responseBase = `${serverURL}/${this.panelName}/response`;
			
			const promise = fetchWithTimeout(responseBase, {}, serverTimeoutMs)
				.then(response => {
					let result = parseFloat(response);
					apiCalls[valueType].lastCall = new Date().getTime();
					apiCalls[valueType].lastValue = result;
					return result;
				})
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return -1;
				});
			return promise;
		};
		
		this.getStringValue = async function (valueType) {
			await delay(200);
			let responseBase = `${serverURL}/${this.panelName}/response`;
			
			const promise = fetchWithTimeout(responseBase, {}, serverTimeoutMs)
				.then(response => {
					let result = response;
					apiCalls[valueType].lastCall = new Date().getTime();
					apiCalls[valueType].lastValue = result;
					return result;
				})
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return -1;
				});
			return promise;
		}
		
		this.getBooleanValue = async function (valueType) {
			await delay(200); 
			let responseBase = `${serverURL}/${this.panelName}/response`;
			
			const promise = fetchWithTimeout(responseBase, {}, serverTimeoutMs)
				.then(response => {
					let result = (response === "on");
					apiCalls[valueType].lastCall = new Date().getTime();
					apiCalls[valueType].lastValue = result;
					return result;
				})
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return -1;
				});
			return promise;
		}
    }

    getInfo () {
        return {
            id: 'dinnye',
            name: 'DINNYE',
            blocks: [
			
				// COMMANDS
	
				{
                    opcode: 'setPanelName',
                    blockType: BlockType.COMMAND,
                    text: 'set panel name [NAME]',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
							defaultValue: "74-A8-81"
                        }
                    }
                },
				
				{
                    opcode: 'led',
                    blockType: BlockType.COMMAND,
                    text: 'led [PORT] [VALUE]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        VALUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50
                        }
                    }
                },
				
				{
                    opcode: 'ledOn',
                    blockType: BlockType.COMMAND,
                    text: 'led [PORT] on',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
				
				{
                    opcode: 'ledOff',
                    blockType: BlockType.COMMAND,
                    text: 'led [PORT] off',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
				
				{
                    opcode: 'rgbledsimple',
                    blockType: BlockType.COMMAND,
                    text: 'rgbled [PATTERN]',
                    arguments: {
                        PATTERN: {
                            type: ArgumentType.STRING,
                            defaultValue: "rrr-ggg"
                        }
                    }
                },
				
				{
                    opcode: 'motor',
                    blockType: BlockType.COMMAND,
                    text: 'motor [PORT] [VALUE]',
                    arguments: {
						PORT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        },
                        VALUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50
                        }
                    }
                },
			
				{
                    opcode: 'drive',
                    blockType: BlockType.COMMAND,
                    text: 'drive [C]',
                    arguments: {
                        C: {
                            type: ArgumentType.STRING,
                            defaultValue: "forward",
                            menu: "cs"
                        }
                    }
                },
				
				// REPORTERS
				{
                    opcode: 'distance',
                    blockType: BlockType.REPORTER,
                    text: 'distance'
                },
				{
                    opcode: 'rawdistance',
                    blockType: BlockType.REPORTER,
                    text: 'rawdistance'
                },
				{
                    opcode: 'gesture',
                    blockType: BlockType.REPORTER,
                    text: 'gesture'
                },
				{
                    opcode: 'voltage',
                    blockType: BlockType.REPORTER,
                    text: 'voltage'
                },
				{
                    opcode: 'wifi',
                    blockType: BlockType.REPORTER,
                    text: 'wifi'
                },
				{
                    opcode: 'temperature',
                    blockType: BlockType.REPORTER,
                    text: 'temperature'
                },
				
				// BOOLEAN
				{
                    opcode: 'button',
                    blockType: BlockType.BOOLEAN,
                    text: 'button [PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    }
                },
				
				{
                    opcode: 'input',
                    blockType: BlockType.BOOLEAN,
                    text: 'input [PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                }
				
            ],
            menus: {
                cs: [ "forward", "stop",  "backward", "turnleft", "turnright", "left", "right" ],
                st: [ "on", "off" ]
            }
        };
    }
	
	// ---------
	// FUNCTIONS
	// ---------
	
	// HELPER
	
	setPanelName (args) {
		this.panelName = args.NAME
    }
	
	// COMMANDS
	
	led (args) {
		if (this.panelName === null) return
		
		let urlBase = `${serverURL}/${this.panelName}/command/led/${args.PORT}/${args.VALUE}`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => {
                log.warn(response);
            })
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
            });
    }
	
	ledOn (args) {
		if (this.panelName === null) return
		
		let urlBase = `${serverURL}/${this.panelName}/command/led/${args.PORT}/on`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => {
                log.warn(response);
            })
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
            });
    }
	
	ledOff (args) {
		if (this.panelName === null) return
		
		let urlBase = `${serverURL}/${this.panelName}/command/led/${args.PORT}/off`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => {
                log.warn(response);
            })
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
            });
    }
	
	rgbledsimple (args) {
		if (this.panelName === null) return
		
		let urlBase = `${serverURL}/${this.panelName}/command/rgbled/${args.PATTERN}`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => {
                log.warn(response);
            })
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
            });
    }
	
	motor (args) {
		if (this.panelName === null) return
		
		let urlBase = `${serverURL}/${this.panelName}/command/motor/${args.PORT}/${args.VALUE}`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => {
                log.warn(response);
            })
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
            });
    }
	
    drive (args) {
		if (this.panelName === null) return
		
		let urlBase = `${serverURL}/${this.panelName}/command/drive/${args.C}`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => {
                log.warn(response);
            })
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
            });
    }
	
	// REPORTERS
    distance (args) {
		if (this.panelName === null) return
		
		if (apiCalls.distance.lastCall + 100 > new Date().getTime()) {
			return apiCalls.distance.lastValue
		} else {
			let urlBase = `${serverURL}/${this.panelName}/command/distance`;
		
			const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
				.then(response => this.getIntegerValue('distance'))
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return '';
				});
			return promise;
		}		
    }
	
	rawdistance (args) {
		if (this.panelName === null) return
		
		if (apiCalls.rawdistance.lastCall + 100 > new Date().getTime()) {
			return apiCalls.rawdistance.lastValue
		} else {
			let urlBase = `${serverURL}/${this.panelName}/command/rawdistance`;

			const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
				.then(response => this.getIntegerValue('rawdistance'))
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return '';
				});
			return promise;
		}
    }
	
	gesture (args) {
		if (this.panelName === null) return
		
		if (apiCalls.gesture.lastCall + 100 > new Date().getTime()) {
			return apiCalls.gesture.lastValue
		} else {	
			let urlBase = `${serverURL}/${this.panelName}/command/gesture`;

			const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
				.then(response => this.getStringValue('gesture'))
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return '';
				});
			return promise;
		} 
    }
	
	voltage (args) {
		if (this.panelName === null) return
		
		if (apiCalls.voltage.lastCall + 100 > new Date().getTime()) {
			return apiCalls.voltage.lastValue
		} else {
		
			let urlBase = `${serverURL}/${this.panelName}/command/voltage`;

			const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
				.then(response => this.getFloatValue('voltage'))
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return '';
				});
			return promise;
		}
    }
	
	wifi (args) {
		if (this.panelName === null) return
		
		if (apiCalls.wifi.lastCall + 100 > new Date().getTime()) {
			return apiCalls.wifi.lastValue
		} else {
			let urlBase = `${serverURL}/${this.panelName}/command/wifi`;

			const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
				.then(response => this.getIntegerValue('wifi'))
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return '';
				});
			return promise;
		}
    }
	
	temperature (args) {
		if (this.panelName === null) return
		
		if (apiCalls.temperature.lastCall + 100 > new Date().getTime()) {
			return apiCalls.temperature.lastValue
		} else {
		
			let urlBase = `${serverURL}/${this.panelName}/command/temperature`;

			const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
				.then(response => this.getIntegerValue('temperature'))
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return '';
				});
			return promise;
		}
    }
	
	// BOOLEAN
	button (args) {
		if (this.panelName === null) return
		
		if (apiCalls.button.lastCall + 100 > new Date().getTime()) {
			return apiCalls.button.lastValue
		} else {
			
			let urlBase = `${serverURL}/${this.panelName}/command/button/${args.PORT}`;

			const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
				.then(response => this.getBooleanValue('button'))
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return '';
				});
			return promise;
		}
    }
	
	input (args) {
		if (this.panelName === null) return
		
		if (apiCalls.input.lastCall + 100 > new Date().getTime()) {
			return apiCalls.input.lastValue
		} else {
			let urlBase = `${serverURL}/${this.panelName}/command/input/${args.PORT}`;

			const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
				.then(response => this.getBooleanValue('input'))
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return '';
				});
			return promise;
		}
    }
	
}

module.exports = Scratch3Dinnye;
