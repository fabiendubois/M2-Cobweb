define({ "api": [
  {
    "type": "post",
    "url": "/applications",
    "title": "Applications Add",
    "version": "0.0.1",
    "name": "Add",
    "group": "Applications",
    "permission": [
      {
        "name": "Bearer Token. Need to be an admin."
      }
    ],
    "description": "<p>Add an application.</p>",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Application name.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Application description.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team",
            "description": "<p>Application team.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succes 201": [
          {
            "group": "Succes 201",
            "type": "JSON",
            "optional": false,
            "field": "Technology",
            "description": "<p>Id.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "0",
            "description": "<p>Missing param(s).</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "1",
            "description": "<p>Name empty or null.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "2",
            "description": "<p>Name is not string.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "3",
            "description": "<p>Description empty.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "4",
            "description": "<p>Team empty.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "5",
            "description": "<p>This application with this name already exists.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./applications.path.js",
    "groupTitle": "Applications"
  },
  {
    "type": "post",
    "url": "/applications/:id/technologies",
    "title": "Applications Add Technology",
    "version": "0.0.1",
    "name": "AddTechnology",
    "group": "Applications",
    "permission": [
      {
        "name": "Bearer Token. Need to be an admin."
      }
    ],
    "description": "<p>Add an existing technology to an application.</p>",
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Application id.</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Technology id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succes 201": [
          {
            "group": "Succes 201",
            "type": "JSON",
            "optional": false,
            "field": "Technology",
            "description": "<p>Technology.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "0",
            "description": "<p>Missing param(s).</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./applications.path.js",
    "groupTitle": "Applications"
  },
  {
    "type": "delete",
    "url": "/applications/:id",
    "title": "Applications Delete By Id",
    "version": "0.0.1",
    "name": "Delete",
    "group": "Applications",
    "permission": [
      {
        "name": "Bearer Token. Need to be an admin."
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl --request DELETE --url http://127.0.0.1:8080/api/v1/applications/1 --header 'Authorization: Bearer <YOUR TOKEN>'",
        "type": "curl"
      }
    ],
    "description": "<p>Delete an application by id.</p>",
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Application id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succes 204": [
          {
            "group": "Succes 204",
            "type": "String",
            "optional": false,
            "field": "Accepted",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "0",
            "description": "<p>Missing param(s).</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "1",
            "description": "<p>Id is not a number.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "2",
            "description": "<p>This resource cannot be deleted. It is already in use.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./applications.path.js",
    "groupTitle": "Applications"
  },
  {
    "type": "post",
    "url": "/applications/:id/technologies",
    "title": "Applications Delete Technology",
    "version": "0.0.1",
    "name": "DeleteTechnology",
    "group": "Applications",
    "permission": [
      {
        "name": "Bearer Token. Need to be an admin."
      }
    ],
    "description": "<p>Delete an existing technology to an application.</p>",
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Application id.</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Technology id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succes 201": [
          {
            "group": "Succes 201",
            "type": "JSON",
            "optional": false,
            "field": "Technology",
            "description": "<p>Technology.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "0",
            "description": "<p>Missing param(s).</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./applications.path.js",
    "groupTitle": "Applications"
  },
  {
    "type": "get",
    "url": "/applications",
    "title": "Applications Find All",
    "version": "0.0.1",
    "name": "FindAll",
    "group": "Applications",
    "permission": [
      {
        "name": "Bearer Token."
      }
    ],
    "description": "<p>Find all applications.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl --request GET --url http://127.0.0.1:8080/api/v1/applications --header 'Authorization: Bearer <YOUR TOKEN>'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Succes 200": [
          {
            "group": "Succes 200",
            "type": "JSON",
            "optional": false,
            "field": "applications",
            "description": "<p>Applications.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "HTTP/1.1 200 OK\n [{\n     \"id\": 1,\n     \"name\": \"Application Cobweb\",\n     \"description\": \"Applications flows graph\",\n     \"team\": \"iii\"\n },\n {\n     \"id\": 2,\n     \"name\": \"Application Walrus\",\n     \"description\": \"It's a mentimeterLike\",\n     \"team\": \"iii\"\n }]",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./applications.path.js",
    "groupTitle": "Applications"
  },
  {
    "type": "get",
    "url": "/applications/:id",
    "title": "Applications Find By Id",
    "version": "0.0.1",
    "name": "FindById",
    "group": "Applications",
    "permission": [
      {
        "name": "Bearer Token."
      }
    ],
    "description": "<p>Find an applications by id.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl --request GET --url http://127.0.0.1:8080/api/v1/applications/1 --header 'Authorization: Bearer <YOUR TOKEN>'",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Application id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succes 200": [
          {
            "group": "Succes 200",
            "type": "JSON",
            "optional": false,
            "field": "applications",
            "description": "<p>Applications.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "HTTP/1.1 200 OK\n [{\n     \"id\": 1,\n     \"name\": \"Application Cobweb\",\n     \"description\": \"Applications flows graph\",\n     \"team\": \"iii\"\n }]",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "0",
            "description": "<p>Missing param(s).</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "1",
            "description": "<p>Id is not a number.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./applications.path.js",
    "groupTitle": "Applications"
  },
  {
    "type": "put",
    "url": "/applications/:id",
    "title": "Applications Update By Id",
    "version": "0.0.1",
    "name": "Update",
    "group": "Applications",
    "permission": [
      {
        "name": "Bearer Token. Need to be an admin."
      }
    ],
    "description": "<p>Update an application by id.</p>",
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Application id.</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Application name.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "deascription",
            "description": "<p>Application deascription.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team",
            "description": "<p>Application team.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succes 204": [
          {
            "group": "Succes 204",
            "type": "String",
            "optional": false,
            "field": "Accepted",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "0",
            "description": "<p>Missing param(s).</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "1",
            "description": "<p>Id is not a number.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "2",
            "description": "<p>Name is not string.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "3",
            "description": "<p>This technology with this name already exists.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./applications.path.js",
    "groupTitle": "Applications"
  },
  {
    "type": "get",
    "url": "/applications/:id/technologies",
    "title": "Applications Find All Technologies",
    "version": "0.0.1",
    "name": "findAllTechnologies",
    "group": "Applications",
    "permission": [
      {
        "name": "Bearer Token."
      }
    ],
    "description": "<p>Find all technologies for an application</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl --request GET --url http://127.0.0.1:8080/api/v1/applications/1/technologies/ --header 'Authorization: Bearer <YOUR TOKEN>'",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Application id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succes 200": [
          {
            "group": "Succes 200",
            "type": "JSON",
            "optional": false,
            "field": "technologies",
            "description": "<p>Technologies.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "0",
            "description": "<p>Missing param(s).</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "1",
            "description": "<p>Id is not a number.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./applications.path.js",
    "groupTitle": "Applications"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "C__Users_fadubois_Documents_LAB_Fabien_Cobweb_back_src_paths_doc_main_js",
    "groupTitle": "C__Users_fadubois_Documents_LAB_Fabien_Cobweb_back_src_paths_doc_main_js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/flows",
    "title": "Flows Find All",
    "version": "0.0.1",
    "name": "FindAll",
    "group": "Flows",
    "permission": [
      {
        "name": "Bearer Token."
      }
    ],
    "description": "<p>Find all flows.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl --request GET --url http://127.0.0.1:8080/api/v1/flows --header 'Authorization: Bearer <YOUR TOKEN>'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Succes 200": [
          {
            "group": "Succes 200",
            "type": "JSON",
            "optional": false,
            "field": "applications",
            "description": "<p>Applications.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./flows.path.js",
    "groupTitle": "Flows"
  },
  {
    "type": "get",
    "url": "/flows/:id",
    "title": "Flows Find By Id",
    "version": "0.0.1",
    "name": "FindById",
    "group": "Flows",
    "permission": [
      {
        "name": "Bearer Token."
      }
    ],
    "description": "<p>Find a flow by id.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl --request GET --url http://127.0.0.1:8080/api/v1/flows/1 --header 'Authorization: Bearer <YOUR TOKEN>'",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Flow id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succes 200": [
          {
            "group": "Succes 200",
            "type": "JSON",
            "optional": false,
            "field": "flows",
            "description": "<p>Flows.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "0",
            "description": "<p>Missing param(s).</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "1",
            "description": "<p>Id is not a number.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./flows.path.js",
    "groupTitle": "Flows"
  },
  {
    "type": "get",
    "url": "/ping",
    "title": "Ping",
    "version": "0.0.1",
    "name": "Ping",
    "group": "General",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ping",
            "description": "<p>Pong.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"ping\":\"pong\",\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://exemple.com/api/v1/ping"
      }
    ],
    "filename": "./ping.path.js",
    "groupTitle": "General"
  },
  {
    "type": "post",
    "url": "/technologies",
    "title": "Technologies Add",
    "version": "0.0.1",
    "name": "Add",
    "group": "Technologies",
    "permission": [
      {
        "name": "Bearer Token. Need to be an admin."
      }
    ],
    "description": "<p>Add a technology.</p>",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Technology Name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succes 201": [
          {
            "group": "Succes 201",
            "type": "JSON",
            "optional": false,
            "field": "Technology",
            "description": "<p>Technology.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "0",
            "description": "<p>Missing param(s).</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "1",
            "description": "<p>Name empty or null.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "2",
            "description": "<p>Name is not string.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "3",
            "description": "<p>This technology with this name already exists.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./technologies.path.js",
    "groupTitle": "Technologies"
  },
  {
    "type": "delete",
    "url": "/technologies/:id",
    "title": "Technologies Delete By Id",
    "version": "0.0.1",
    "name": "Delete",
    "group": "Technologies",
    "permission": [
      {
        "name": "Bearer Token. Need to be an admin."
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl --request DELETE --url http://127.0.0.1:8080/api/v1/technologies/1 --header 'Authorization: Bearer <YOUR TOKEN>'",
        "type": "curl"
      }
    ],
    "description": "<p>Delete a technology by id.</p>",
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Technology id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succes 204": [
          {
            "group": "Succes 204",
            "type": "String",
            "optional": false,
            "field": "Accepted",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "0",
            "description": "<p>Missing param(s).</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "1",
            "description": "<p>Id is not a number.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "2",
            "description": "<p>This resource cannot be deleted. It is already in use.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./technologies.path.js",
    "groupTitle": "Technologies"
  },
  {
    "type": "get",
    "url": "/technologies",
    "title": "Technologies FindAll",
    "version": "0.0.1",
    "name": "FindAll",
    "group": "Technologies",
    "permission": [
      {
        "name": "Bearer Token."
      }
    ],
    "description": "<p>Find all technologies.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl --request GET --url http://127.0.0.1:8080/api/v1/technologies --header 'Authorization: Bearer <YOUR TOKEN>'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Succes 200": [
          {
            "group": "Succes 200",
            "type": "JSON",
            "optional": false,
            "field": "technologies",
            "description": "<p>Technologies.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "HTTP/1.1 200 OK\n [{\n     \"id\": 1,\n     \"name\": \"Java\"\n },\n {\n     \"id\": 2,\n     \"name\": \"Php\"\n }]",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./technologies.path.js",
    "groupTitle": "Technologies"
  },
  {
    "type": "get",
    "url": "/technologies/:id",
    "title": "Technologies Find By Id",
    "version": "0.0.1",
    "name": "FindById",
    "group": "Technologies",
    "permission": [
      {
        "name": "Bearer Token."
      }
    ],
    "description": "<p>Find a technology by id.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl --request GET --url http://127.0.0.1:8080/api/v1/technologies/1 --header 'Authorization: Bearer <YOUR TOKEN>'",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Technology id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succes 200": [
          {
            "group": "Succes 200",
            "type": "JSON",
            "optional": false,
            "field": "technologies",
            "description": "<p>Technologies.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "HTTP/1.1 200 OK\n [{\n     \"id\": 1,\n     \"name\": \"Java\"\n }]",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "0",
            "description": "<p>Missing param(s).</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "1",
            "description": "<p>Id is not a number.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./technologies.path.js",
    "groupTitle": "Technologies"
  },
  {
    "type": "put",
    "url": "/technologies/:id",
    "title": "Technologies Update By Id",
    "version": "0.0.1",
    "name": "Update",
    "group": "Technologies",
    "permission": [
      {
        "name": "Bearer Token. Need to be an admin."
      }
    ],
    "description": "<p>Update a technology by id.</p>",
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Technology id.</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Technology name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succes 204": [
          {
            "group": "Succes 204",
            "type": "String",
            "optional": false,
            "field": "Accepted",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "0",
            "description": "<p>Missing param(s).</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "1",
            "description": "<p>Id is not a number.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "2",
            "description": "<p>Name is not string.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "3",
            "description": "<p>This technology with this name already exists.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Auth",
            "description": "<p>Forbidden Access.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./technologies.path.js",
    "groupTitle": "Technologies"
  },
  {
    "type": "post",
    "url": "/users/sign_in",
    "title": "Sign In",
    "version": "0.0.1",
    "name": "Sign_In",
    "group": "Users",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>User login.</p>",
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email adress.</p>"
          },
          {
            "group": "Params",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succes 201": [
          {
            "group": "Succes 201",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>User id.</p>"
          },
          {
            "group": "Succes 201",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token --&gt; users_id, admin,  expiresIn: 1H</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "0",
            "description": "<p>Missing param(s).</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "1",
            "description": "<p>Email Not Found.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "2",
            "description": "<p>Bad Password.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./users.path.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/sign_up",
    "title": "Sign Up",
    "version": "0.0.1",
    "name": "Sign_Up",
    "group": "Users",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>User registration.</p>",
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email adress.</p>"
          },
          {
            "group": "Params",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password.</p>"
          },
          {
            "group": "Params",
            "type": "Boolean",
            "optional": false,
            "field": "admin",
            "description": "<p>User status.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succes 201": [
          {
            "group": "Succes 201",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>User id.</p>"
          },
          {
            "group": "Succes 201",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email adress.</p>"
          },
          {
            "group": "Succes 201",
            "type": "Boolean",
            "optional": false,
            "field": "admin",
            "description": "<p>User status.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "0",
            "description": "<p>General Missing param(s).</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "1",
            "description": "<p>Email empty or null.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "2",
            "description": "<p>Password empty or null.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "3",
            "description": "<p>Admin empty or null.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "4",
            "description": "<p>Email is not string.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "5",
            "description": "<p>Password is not string.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "6",
            "description": "<p>Admin is not boolean.</p>"
          },
          {
            "group": "Error 400",
            "type": "String",
            "optional": false,
            "field": "7",
            "description": "<p>This email is already exists.</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "Internal",
            "description": "<p>Database Error.</p>"
          }
        ]
      }
    },
    "filename": "./users.path.js",
    "groupTitle": "Users"
  }
] });
