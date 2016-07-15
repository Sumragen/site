# Download
####[link](https://github.com/Sumragen/site/archive/development.zip) (development branch) **_or_** clone
```
https://github.com/Sumragen/site.git
```
# Init
```
npm install
bower install
```
# Grunt
* For developing
```
grunt serve --env=devci
```
use **_devci_** if you want use your server for development, **_dev_** to use fake backEnd;

#### All configs in config file
```
/config/env.js
```

* To generate **_dist_** folder
```
grunt dist
```

# Api endpoints documentation

# Routes
### Availible routes name :  
```
"event", 
"lesson", 
"role", 
"stage", 
"subject", 
"teacher", 
"user"
```

### Default routes
| Name   | Method | URL                   | Param      | Returns                  |Comment                             |
| ------ | ------ | --------------------- | ---------- | ------------------------ |----------------------------------- |
| list   | GET    | /ROUTE_NAME**_s_**    | none       | Array                    |to get all records from table       |
| get    | GET    | /ROUTE_NAME/RECORD_ID | int/string | Object             |to get one record from table by record id |
| put    | PUT    | /ROUTE_NAME/RECORD_ID | Object     | Object                   |to update one record                |
| post   | POST   | /ROUTE_NAME/add       | Object     | Object                   |to add new record                   |
| delete | DELETE | /ROUTE_NAME/RECORD_ID | Object     | { id : REMOVED_OBJECT_ID } |to remove record from table         |

#### All routes in file
```
/app/scripts/modules/Common/endpoint.js
```
