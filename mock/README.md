# Mock Server

## Usage
### 1. Proxy request to mock server
package.json
```json
"devEnvironments": {
    "servers": {
		"local": 8080,
      	"mock": 3000
    },
    "proxies": {
    	"(/proxy)": "http://localhost:3000"
    },
	...
},
```

### 2. Set mock data
/mock/data/sample.js
```js
module.exports = [{
	url: '/user/:id',
  	method: 'get',
  	response: {
      	body: {
			id: 123,
			name: 'Stephen',
			age: 30
		}
	}
}];
```

### 3. Start mock server
```
npm run mock
```
Or run 
```
/bin/mock.bat	// Windows
/bin/mock.sh	// Linux
```


## Data format
```js
{ 
	url: '/xxx/xxx',		// use for compare request url, require.
  	method: 'post',			// use for compare request method.
  	response: {				// use for set response data, require.
    	delay: 3000,		// use for delay response time, default to 0.
    	status: 200,		// use for delay response time, default to 200.
      	headers: {			// use for set response header. default to below.
			'Mock-Data': 'true',
			'Content-Type': 'application/json; charset=UTF-8',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      	},
      	body: {				// use for set response body, type to String means this is a file path and root path is "/mock/files/", you can change it in /mock/settings.js file.
			...
		}
	}
}
```


## APIs

You can refer the document of [json-server](https://github.com/typicode/json-server) to see the full APIs. 

Also here are some APIs you might want to use:

### Get agents list

```
GET http://localhost:3001/agents
```

The response of this request would be the json of all agents list.

### Get one agent

```
GET http://localhost:3001/agents/{id}
```

The response of this request would be the json of the agent which match the id.

### Change one agent

```
PUT http://localhost:3001/agents/{id}
{
    "headers": {
        "Content-Type": "application/json"
    },
    "body": {MODIFIED AGENT}
}
```

## Data Format
The mock data format is a object of the modified agent, here is an example:
```
"body": {
      "name": "bjstdmngbdr10.thoughtworks.com",
      "os": "ubuntu",
      "status": "building",
      "type": "physical",
      "ip": "192.168.1.117",
      "location": "/var/lib/cruise-agent",
      "resources": [
        "Firefox",
        "Safari"
      ],
      "id": 3
    }
```