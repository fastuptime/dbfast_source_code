const fs = require('fs-extra');

function checkFileExists(path) {
    try {
        fs.accessSync(path, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
};

if (!checkFileExists('./fast_db')) {
    fs.mkdirSync('./fast_db');
}

const db = {
    delete: (key, data) => {
        if (!key) return console.error('No key provided');
        if (!data) return console.error('No data provided');
        if (!checkFileExists(`./fast_db/${key}.json`)) return console.log(`${key} adında bir dosya bulunamadı!`);
        return new Promise((resolve, reject) => {
            fs.readFile(`./fast_db/${key}.json`, (err, file) => {
                if (err) {
                    reject(err);
                } else {
                    let fileData = JSON.parse(file);
                    delete fileData[data];
                    fs.writeFile(`./fast_db/${key}.json`, JSON.stringify(fileData), (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    },
    add: (key, data, value) => {
        if (!key) return console.error('No key provided');
        if (!data) return console.error('No data provided');
        if (!value) return console.error('No value provided');
        if (!checkFileExists(`./fast_db/${key}.json`)) {
            fs.writeFile(`./fast_db/${key}.json`, JSON.stringify({ [data]: value }), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${key} adında bir dosya oluşturuldu!`);
                }
            });
        }
        return new Promise((resolve, reject) => {
            fs.readFile(`./fast_db/${key}.json`, (err, file) => {
                if (err) {
                    reject(err);
                } else {
                    let fileData = JSON.parse(file);
                    fileData[data] = value;
                    fs.writeFile(`./fast_db/${key}.json`, JSON.stringify(fileData), (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    },
    set: (key, data, value) => {
        if (!key) return console.error('No key provided');
        if (!data) return console.error('No data provided');
        if (!value) return console.error('No value provided');
        if (!checkFileExists(`./fast_db/${key}.json`)) return console.log(`${key} adında bir dosya bulunamadı!`);
        return new Promise((resolve, reject) => {
            fs.readFile(`./fast_db/${key}.json`, (err, file) => {
                if (err) {
                    reject(err);
                } else {
                    let fileData = JSON.parse(file);
                    fileData[data] = value;
                    fs.writeFile(`./fast_db/${key}.json`, JSON.stringify(fileData), (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    },
    get: (key, data) => {
        if (!key) return console.error('No key provided');
        if (!data) return console.error('No data provided');
        if (!checkFileExists(`./fast_db/${key}.json`)) return console.log(`${key} adında bir dosya bulunamadı!`);
        return new Promise((resolve, reject) => {
            fs.readFile(`./fast_db/${key}.json`, (err, file) => {
                if (err) {
                    reject(err);
                } else {
                    let fileData = JSON.parse(file);
                    resolve(fileData[data]);
                }
            });
        });
    },
    has: (key, data) => {
        if (!key) return console.error('No key provided');
        if (!data) return console.error('No data provided');
        if (!checkFileExists(`./fast_db/${key}.json`)) return console.log(`${key} adında bir dosya bulunamadı!`);
        return new Promise((resolve, reject) => {
            fs.readFile(`./fast_db/${key}.json`, (err, file) => {
                if (err) {
                    reject(err);
                } else {
                    let fileData = JSON.parse(file);
                    resolve(fileData.hasOwnProperty(data));
                }
            });
        });
    },
    push: (key, data, value) => {
        if (!key) return console.error('No key provided');
        if (!data) return console.error('No data provided');
        if (!value) return console.error('No value provided');
        if (!checkFileExists(`./fast_db/${key}.json`)) return console.log(`${key} adında bir dosya bulunamadı!`);
        return new Promise((resolve, reject) => {
            fs.readFile(`./fast_db/${key}.json`, (err, file) => {
                if (err) {
                    reject(err);
                } else {
                    let fileData = JSON.parse(file);
                    if (fileData[data] && Array.isArray(fileData[data])) {
                        fileData[data].push(value);
                    } else {
                        fileData[data] = [fileData[data], value];
                    }
                    fs.writeFile(`./fast_db/${key}.json`, JSON.stringify(fileData), (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    },
    pull: (key, data, value) => {
        if (!key) return console.error('No key provided');
        if (!data) return console.error('No data provided');
        if (!value) return console.error('No value provided');
        if (!checkFileExists(`./fast_db/${key}.json`)) return console.log(`${key} adında bir dosya bulunamadı!`);
        return new Promise((resolve, reject) => {
            fs.readFile(`./fast_db/${key}.json`, (err, file) => {
                if (err) {
                    reject(err);
                } else {
                    let fileData = JSON.parse(file);
                    if (fileData[data] && Array.isArray(fileData[data])) {
                        if (fileData[data].includes(value)) {
                            fileData[data] = fileData[data].filter((item) => item !== value);
                            fs.writeFile(`./fast_db/${key}.json`, JSON.stringify(fileData), (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve();
                                }
                            });
                        } else {
                            reject('Value not found in array');
                        }
                    } else {
                        reject('Data is not an array');
                    }
                }
            });
        });
    }
};

module.exports = db;