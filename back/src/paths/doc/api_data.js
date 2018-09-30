define({ "api": [  {    "type": "get",    "url": "/ping",    "title": "Ping",    "version": "0.0.1",    "name": "Ping",    "group": "General",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "ping",            "description": "<p>Pong.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"ping\":\"pong\",\n}",          "type": "json"        }      ]    },    "sampleRequest": [      {        "url": "http://127.0.0.1:8080/api/v1/ping"      }    ],    "filename": "./ping.path.js",    "groupTitle": "General"  },  {    "type": "post",    "url": "/technologies",    "title": "Technologies Add",    "version": "0.0.1",    "name": "Add",    "group": "Technologies",    "permission": [      {        "name": "Bearer Token"      }    ],    "description": "<p>Add a technology.</p>",    "parameter": {      "fields": {        "Params": [          {            "group": "Params",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>Technology Name.</p>"          }        ]      }    },    "success": {      "fields": {        "Succes 201": [          {            "group": "Succes 201",            "type": "Integer",            "optional": false,            "field": "id",            "description": "<p>Technology Id.</p>"          },          {            "group": "Succes 201",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>Technology Name.</p>"          }        ]      }    },    "error": {      "fields": {        "Error 400": [          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "0",            "description": "<p>Missing param(s).</p>"          },          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "1",            "description": "<p>Name empty or null.</p>"          },          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "2",            "description": "<p>Name is not string.</p>"          },          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "3",            "description": "<p>This technology with this name already exists.</p>"          }        ],        "Error 403": [          {            "group": "Error 403",            "type": "String",            "optional": false,            "field": "Auth",            "description": "<p>Forbidden Access.</p>"          }        ]      }    },    "filename": "./technologies.path.js",    "groupTitle": "Technologies"  },  {    "type": "get",    "url": "/technologies",    "title": "Technologies FindAll",    "version": "0.0.1",    "name": "FindAll",    "group": "Technologies",    "permission": [      {        "name": "Bearer Token"      }    ],    "description": "<p>Find all technologies.</p>",    "success": {      "fields": {        "Succes 200": [          {            "group": "Succes 200",            "type": "json",            "optional": false,            "field": "technologies",            "description": "<p>Technologies.</p>"          }        ]      }    },    "error": {      "fields": {        "Error 403": [          {            "group": "Error 403",            "type": "String",            "optional": false,            "field": "Auth",            "description": "<p>Forbidden Access.</p>"          }        ]      }    },    "filename": "./technologies.path.js",    "groupTitle": "Technologies"  },  {    "type": "post",    "url": "/users/sign_in",    "title": "Sign In",    "version": "0.0.1",    "name": "Sign_In",    "group": "Users",    "permission": [      {        "name": "none"      }    ],    "description": "<p>User login.</p>",    "parameter": {      "fields": {        "Params": [          {            "group": "Params",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>User email adress.</p>"          },          {            "group": "Params",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>User password.</p>"          }        ]      }    },    "success": {      "fields": {        "Succes 201": [          {            "group": "Succes 201",            "type": "Integer",            "optional": false,            "field": "id",            "description": "<p>User id.</p>"          },          {            "group": "Succes 201",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>User token.</p>"          }        ]      }    },    "error": {      "fields": {        "Error 400": [          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "0",            "description": "<p>Missing param(s).</p>"          },          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "1",            "description": "<p>Email Not Found.</p>"          },          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "2",            "description": "<p>Bad Password.</p>"          }        ]      }    },    "filename": "./users.path.js",    "groupTitle": "Users"  },  {    "type": "post",    "url": "/users/sign_up",    "title": "Sign Up",    "version": "0.0.1",    "name": "Sign_Up",    "group": "Users",    "permission": [      {        "name": "none"      }    ],    "description": "<p>User registration.</p>",    "parameter": {      "fields": {        "Params": [          {            "group": "Params",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>User email adress.</p>"          },          {            "group": "Params",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>User password.</p>"          },          {            "group": "Params",            "type": "Boolean",            "optional": false,            "field": "admin",            "description": "<p>User status.</p>"          }        ]      }    },    "success": {      "fields": {        "Succes 201": [          {            "group": "Succes 201",            "type": "Integer",            "optional": false,            "field": "id",            "description": "<p>User id.</p>"          },          {            "group": "Succes 201",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>User email adress.</p>"          },          {            "group": "Succes 201",            "type": "Boolean",            "optional": false,            "field": "admin",            "description": "<p>User status.</p>"          }        ]      }    },    "error": {      "fields": {        "Error 400": [          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "0",            "description": "<p>General Missing param(s).</p>"          },          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "1",            "description": "<p>Email empty or null.</p>"          },          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "2",            "description": "<p>Password empty or null.</p>"          },          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "3",            "description": "<p>Admin empty or null.</p>"          },          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "4",            "description": "<p>Email is not string.</p>"          },          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "5",            "description": "<p>Password is not string.</p>"          },          {            "group": "Error 400",            "type": "String",            "optional": false,            "field": "6",            "description": "<p>Admin is not boolean.</p>"          }        ]      }    },    "filename": "./users.path.js",    "groupTitle": "Users"  },  {    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "varname1",            "description": "<p>No type.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "varname2",            "description": "<p>With type.</p>"          }        ]      }    },    "type": "",    "url": "",    "version": "0.0.0",    "filename": "./doc/main.js",    "group": "_Users_fabien_Documents_Cours_M2___III_Web_M2_III_Web_back_src_paths_doc_main_js",    "groupTitle": "_Users_fabien_Documents_Cours_M2___III_Web_M2_III_Web_back_src_paths_doc_main_js",    "name": ""  }] });
