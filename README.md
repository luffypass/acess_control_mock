# acess_control_mock
telegram bot

# workpass upload format 
in order for opencert's ```getData()``` to work, the workpass sent as the request body must have the following keys/ structure.

entire workpass must be uploaded for verification purposes, with unneccessary fields obfuscated

```{
    document: {
        "schema": "example/1.0",
        "data": [Object],
        "privacy" : [Object],
        "signature": [Object]
    }
}```


- ```document.data.recipient.photo``` must be a base64 encoded string based off a jpeg image, without the ```content:image/jpeg;base64,``` prefix