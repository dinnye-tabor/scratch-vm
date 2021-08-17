const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const fetchWithTimeout = require('../../util/fetch-with-timeout');

const serverURL = 'https://dinnye-tabor.herokuapp.com/api/boards';
const serverTimeoutMs = 1000; // 1 sec

class Scratch3Dinnye {
    constructor (runtime) {
        this.runtime = runtime;
		this.panelName = null;
		
		this.getIntegerValue = function () {
			let responseBase = `${serverURL}/${this.panelName}/response`;
			
			const promise = fetchWithTimeout(responseBase, {}, serverTimeoutMs)
				.then(response => parseInt(response))
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return -1;
				});
			return promise;
		};
		
		this.getFloatValue = function () {
			let responseBase = `${serverURL}/${this.panelName}/response`;
			
			const promise = fetchWithTimeout(responseBase, {}, serverTimeoutMs)
				.then(response => parseFloat(response))
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return -1;
				});
			return promise;
		};
		
		this.getStringValue = function () {
			let responseBase = `${serverURL}/${this.panelName}/response`;
			
			const promise = fetchWithTimeout(responseBase, {}, serverTimeoutMs)
				.then(response => response)
				.catch(err => {
					log.warn(`error fetching value! ${err}`);
					return -1;
				});
			return promise;
		}
		
		this.getBooleanValue = function () {
			let responseBase = `${serverURL}/${this.panelName}/response`;
			
			const promise = fetchWithTimeout(responseBase, {}, serverTimeoutMs)
				.then(response => (response === "on"))
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
		
		let urlBase = `${serverURL}/${this.panelName}/command/drive/${args.COMMAND}`;

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
		
		let urlBase = `${serverURL}/${this.panelName}/command/distance`;
		
        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => this.getIntegerValue())
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
		
    }
	
	rawdistance (args) {
		if (this.panelName === null) return
		
		let urlBase = `${serverURL}/${this.panelName}/command/rawdistance`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => this.getIntegerValue())
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
	gesture (args) {
		if (this.panelName === null) return
		
		let urlBase = `${serverURL}/${this.panelName}/command/gesture`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => this.getStringValue())
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
	voltage (args) {
		if (this.panelName === null) return
		
		let urlBase = `${serverURL}/${this.panelName}/command/voltage`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => this.getFloatValue())
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
	wifi (args) {
		if (this.panelName === null) return
		
		let urlBase = `${serverURL}/${this.panelName}/command/wifi`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => this.getIntegerValue())
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
	temperature (args) {
		if (this.panelName === null) return
		
		let urlBase = `${serverURL}/${this.panelName}/command/temperature`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => this.getIntegerValue())
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
	// BOOLEAN
	button (args) {
		if (this.panelName === null) return
		
		let urlBase = `${serverURL}/${this.panelName}/command/button/${args.PORT}`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => this.getBooleanValue())
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
	input (args) {
		if (this.panelName === null) return
		
		let urlBase = `${serverURL}/${this.panelName}/command/input/${args.PORT}`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => this.getBooleanValue())
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
}

module.exports = Scratch3Dinnye;
