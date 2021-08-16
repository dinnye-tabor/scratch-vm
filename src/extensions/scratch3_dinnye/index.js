const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const fetchWithTimeout = require('../../util/fetch-with-timeout');

const serverURL = '/';
const serverTimeoutMs = 1000; // 1 sec

class Scratch3Dinnye {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'dinnye',
            name: 'DINNYE',
            blocks: [
			
				// COMMANDS
				
				{
                    opcode: 'led',
                    blockType: BlockType.COMMAND,
                    text: 'led [PORT] [VALUE]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.Number,
                            defaultValue: "1"
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: "on"
                        }
                    }
                },
				
				{
                    opcode: 'rgbled',
                    blockType: BlockType.COMMAND,
                    text: 'rgbled [PORT] [PATTERN]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.Number,
                            defaultValue: "1"
                        },
                        PATTERN: {
                            type: ArgumentType.STRING,
                            defaultValue: "rrr-ggg"
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
                            type: ArgumentType.Number,
                            defaultValue: "1"
                        },
                        VALUE: {
                            type: ArgumentType.Number,
                            defaultValue: "10"
                        }
                    }
                },
			
				{
                    opcode: 'drive',
                    blockType: BlockType.COMMAND,
                    text: 'drive [COMMAND]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "forward",
                            menu: "commands"
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
                            type: ArgumentType.Number,
                            defaultValue: "1"
                        }
                    }
                },
				
				{
                    opcode: 'input',
                    blockType: BlockType.BOOLEAN,
                    text: 'input [PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.Number,
                            defaultValue: "1"
                        }
                    }
                }
				
            ],
            menus: {
                commands: {
                    acceptReporters: true,
                    items: [
						{text: "forward", value: "forward"}, 
						{text: "stop", value: "stop"},
						{text: "backward", value: "backward"},
						{text: "turnleft", value: "turnleft"},
						{text: "turnright", value: "turnright"},
						{text: "left", value: "left"},
						{text: "right", value: "right"}
					]
                },
				ports: {
                    acceptReporters: true,
                    items: [
						{text: "1", value: "forward"}, 
						{text: "stop", value: "stop"},
						{text: "backward", value: "backward"},
						{text: "turnleft", value: "turnleft"},
						{text: "turnright", value: "turnright"},
						{text: "left", value: "left"},
						{text: "right", value: "right"}
					]
                }
            }
        };
    }
	
	// ---------
	// FUNCTIONS
	// ---------
	
	// COMMANDS
	
	led (args) {
		let urlBase = `${serverURL}led/${args.PORT}/${args.VALUE}`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => {
                log.warn(response);
            })
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
            });
    }
	
	rgbled (args) {
		let urlBase = `${serverURL}rgbled/${args.PORT}/${args.PATTERN}`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => {
                log.warn(response);
            })
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
            });
    }
	
	rgbledsimple (args) {
		let urlBase = `${serverURL}rgbled/${args.PATTERN}`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => {
                log.warn(response);
            })
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
            });
    }
	
	motor (args) {
		let urlBase = `${serverURL}motor/${args.PORT}/${args.VALUE}`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => {
                log.warn(response);
            })
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
            });
    }
	
    drive (args) {
		let urlBase = `${serverURL}drive/${args.COMMAND}`;

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
		let urlBase = `${serverURL}distance`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => parseInt(response.text()))
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
	rawdistance (args) {
		let urlBase = `${serverURL}rawdistance`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => parseInt(response.text()))
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
	gesture (args) {
		let urlBase = `${serverURL}gesture`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text())
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
	voltage (args) {
		let urlBase = `${serverURL}voltage`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => parseInt(response.text()))
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
	wifi (args) {
		let urlBase = `${serverURL}wifi`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => parseInt(response.text()))
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
	temperature (args) {
		let urlBase = `${serverURL}temperature`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => parseInt(response.text()))
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
	// BOOLEAN
	button (args) {
		let urlBase = `${serverURL}button/${args.PORT}`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text() === "on")
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
	input (args) {
		let urlBase = `${serverURL}input/${args.PORT}`;

        const promise = fetchWithTimeout(urlBase, {}, serverTimeoutMs)
            .then(response => response.text() === "on")
            .catch(err => {
                log.warn(`error fetching value! ${err}`);
                return '';
            });
        return promise;
    }
	
}

module.exports = Scratch3Dinnye;
