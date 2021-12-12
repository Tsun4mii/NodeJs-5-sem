const url = require('url');
const http = require('http');
const fs = require('fs');

const Db = require('./db')
let DB = new Db();
let data_json = '';
module.exports = (req, res) => {
    let path = url.parse(req.url).pathname;
    switch(true)
    {
        case path ==='/api/faculties':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.getFaculty(data_json.faculty).
                then((res)=>{if(res.recordset.length == 0) throw 'No such faculty'}).
                catch(error=>{write_error_400(res,error)});
                DB.putFaculties(data_json.faculty, data_json.faculty_name).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        case path === '/api/pulpits':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                DB.getPulpit(data_json.pulpit).
                then((res)=>{if(res.recordset.length == 0) throw 'No such pulpit'}).
                catch(error=>{write_error_400(res,error)});
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.putPulpits(data_json.pulpit, data_json.pulpit_name, data_json.faculty).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        case path === '/api/subjects':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.getSubject(data_json.subject).
                then((res)=>{if(res.recordset.length == 0) throw 'No such subject'}).
                catch(error=>{write_error_400(res,error)});
                DB.putSubjects(data_json.subject, data_json.subject_name, data_json.pulpit).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        case path === '/api/auditoriumstypes':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                DB.putAuditoriums_Types(data_json.auditorium_type, data_json.auditorium_typename).then(records => {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(data_json));
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        case path === '/api/auditorims':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                DB.getAuditorim(data_json.auditorium).
                then((res)=>{if(res.recordset.length == 0) throw 'No such auditorium'}).
                catch(error=>{write_error_400(res,error)});
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.putAuditoriums(data_json.auditorium, data_json.auditorium_name, data_json.auditorium_capacity, data_json.auditorium_type).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
    }
}

function write_error_400(res, error) {
    res.statusCode = 400;
    res.statusMessage = 'Invalid method';
    res.end('<h1>error</h1></br>'+'<h3>'+error+'</h3>');
}