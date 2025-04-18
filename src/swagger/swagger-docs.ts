import { response } from "express";

export const swaggerDocs = {
  paths: {
    "/auth/register": {
      post: {
        summary: "Cadastro de usuário",
        tags: ["Autenticação"],
        requestBody: {
          description: "Dados para cadastro de usuário",
          required: true, 
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string", 
                    description: "Nome do usuário", 
                  },
                  email: {
                    type: "string", 
                    description: "Email do usuário", 
                  },
                  cpf: {
                    type: "string", 
                    description: "CPF do usuário",
                  },
                  password: {
                    type: "string", 
                    description: "Senha do usuário",
                  },
                },
                required: ["name", "email", "cpf", "password"], 
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Usuário criado com sucesso.",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E1 - Informe os campos obrigatórios corretamente.",
                    },
                  },
                },
              },
            },
          },
          409: {
            description: "Conflict",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E3 - O e-mail ou CPF informado já pertence a outro usuário.",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/sign-in": {
      post: {
        summary: "Login de usuário",
        tags: ["Autenticação"],
        requestBody: {
          required: true, 
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string", 
                    format: "string", 
                    description: "Email do usuário", 
                  },
                  password: {
                    type: "string", 
                    description: "Senha do usuário",
                  },
                },
                required: [ "email", "password"], 
              },
            },
          },
        },
        responses: {

          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                    },
                    id: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    cpf: {
                      type: "string",
                    },
                    avatar: {
                      type: "string",
                    },
                    xp: {
                      type: "integer",
                    },
                    level: {
                      type: "integer",
                    },
                    achievements: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                          criterion: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          
  
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E1 - Informe os campos obrigatórios corretamente.",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E5 - Senha incorreta. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E6 - Essa conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Not Found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E4 - Usuário não encontrado ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/user": {
      get: {
        summary: "Buscar dados do usuário",
        tags: ["Usuários"],
          "security": [{ "bearerAuth": [] }],
        responses: {
          
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    cpf: {
                      type: "string",
                    },
                    avatar: {
                      type: "string",
                    },
                    xp: {
                      type: "integer",
                    },
                    level: {
                      type: "integer",
                    },
                    achievements: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                          criterion: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E19 - Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E6 - Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/user/preferences": {
      get: {
        summary: "Buscar interesses do usuário",
        tags: ["Usuários"],
        "security": [{ "bearerAuth": [] }],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    typeId: {
                      type: "string",
                      example: "00000000-0000-0000-0000-000000000000"
                    },
                    typeName: {
                      type: "string",
                    },
                    typeDescription: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E19 - Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E6 - Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/user/preferences/define": {
      post: {
        summary: "Definir interesses do usuário",
        tags: ["Usuários"],
        "security": [{ "bearerAuth": [] }],
          "requestBody": {
            "required": true,
              "content": {
            "application/json": {
              "schema": {
                "type": "array",
                  "items": {
                    "type": "string",
                    "example": "00000000-0000-0000-0000-000000000000",
                      "description": "00000000-0000-0000-0000-000000000000"
                        },
                        "description": "Array de IDs de tipos de atividades"
                        }
                      }
                    }
                  },
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Preferências atualizadas com sucesso. ",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Um ou mais IDs informados são inválidos. ",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E19 - Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E6 - Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/user/avatar": {
      put: {
      summary: "Editar foto de perfil do usuário",
      tags: ["Usuários"],
      "security": [{ "bearerAuth": [] }],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                avatar: {
                  type: "file", 
                  format: "binary", 
                    },
                  },
                  required: ["avatar"]
                },
              },
            },
          },
          responses: {
            "200": {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      avatar: {
                        type: "string",
                        description: "URL da nova foto de perfil",
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad Request",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        example: "E2 - A imagem deve ser um arquivo PNG ou JPG. ",
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      erro: {
                        type: "string",
                        example: "E19 - Autenticação necessária. ",
                      },
                    },
                  },
                },
              },
            },
            "403": {
              description: "Forbidden",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      erro: {
                        type: "string",
                        example: "E6 - Esta conta foi desativada e não pode ser utilizada. ",
                      },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      erro: {
                        type: "string",
                        example: "Erro inesperado. ",
                      },
                    },
                  },
                },
              },
            },
          }          
        },
      },
    "/user/update": {
      put: {
        summary: "Editar dados do usuário",
        tags: ["Usuários"],
          "security": [{ "bearerAuth": [] }],
          requestBody: {
            required: true, 
            content: {
              "application/json": {
                schema: {
                  type: "object", 
                  properties: {
                    name: {
                      type: "string", 
                      format: "string", 
                      description: "Nome do usuário", 
                    },
                    email: {
                      type: "string", 
                      format: "string", 
                      description: "Email do usuário", 
                    },
                    password: {
                      type: "string",
                      description: "Senha do usuário",
                    },
                  },
                  required: [ "nome", "email", "password"], 
                },
              },
            },
          },
        responses: {
          
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    cpf: {
                      type: "string",
                    },
                    avatar: {
                      type: "string",
                    },
                    xp: {
                      type: "integer",
                    },
                    level: {
                      type: "integer",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E19 - Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E6 - Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          409: {
            description: "Conflict",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E3 - O e-mail ou CPF informado já pertence a outro usuário.",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    
    "/user/deactivate": {
      delete: {
        summary: "Desativar conta do usuário",
        tags: ["Usuários"],
        "security": [{ "bearerAuth": [] }],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Conta desativada com sucesso. ",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E19 - Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E6 - Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities/types": {
      get: {
        summary: "Listar tipos de atividades",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "00000000-0000-0000-0000-000000000000"
                    },
                    name: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                    image: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E19 - Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E6 - Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities": {
      get: {
        summary: "Listar atividades com paginação, filtro por tipo e ordenação",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        parameters: [
          {
            name: "page",             
            in: "query",              
            type: "string",          
            description: "Número da página", 
            required: false, 
            schema: {
              type: "integer" 
            }
          },
          {
            name: "pageSize",          
            in: "query",               
            type: "integer",          
            description: "Tamanho da página", 
            required: false,     
            schema: {
              type: "integer" 
            }
          },
          {
            name: "typeId",           
            in: "query",               
            type: "string",           
            description: "Filtrar atividades por tipo", 
            required: false,     
            schema: {
              type: "string" 
            }
          },
          {
            name: "orderBy",           
            in: "query",               
            type: "string",            
            description: "Ordenar as atividades por um campo específico", 
            required: false,  
            schema: {
              type: "string" 
            }
                
          },
          {
            name: "order",             
            in: "query",               
            type: "string",           
            description: "Ordem pela qual ordenar as atividades", 
            required: false,           
            schema: {
              type: "string" 
            }
          }
        ],        
        responses: {
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E19 - Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E6 - Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities/all": {
      get: {
        summary: "Listar todas as atividades com filtro por tipo e ordenação",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        parameters: [
          {
            name: "typeId",          
            in: "query",              
            type: "string",          
            description: "Filtrar atividades por tipo", 
            required: false,     
            schema: {
              type: "string" 
            }
          },
          {
            name: "orderBy",          
            in: "query",              
            type: "string",            
            description: "Ordenar as atividades por um campo específico", 
            required: false,  
            schema: {
              type: "string" 
            }
                
          },
          {
            name: "order",            
            in: "query",              
            type: "string",           
            description: "Ordem pela qual ordenar as atividades",
            required: false,          
            schema: {
              type: "string" 
            }
          }
        ],        
        responses: {
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E19 - Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E6 - Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities/user/creator": {
      get: {
        summary: "Buscar atividade criadas pelo usuário",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        parameters: [
          {
            name: "page",              
            in: "query",               
            type: "string",         
            description: "Número da página", 
            required: false, 
            schema: {
              type: "integer" 
            }
          },
          {
            name: "pageSize",         
            in: "query",               
            type: "integer",           
            description: "Tamanho da página", 
            required: false,     
            schema: {
              type: "integer" 
            }
          },
        ],        
        responses: {
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E19 - Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: " E6 - Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities/user/creator/all": {
      get: {
        summary: "Buscar todas as atividades criadas pelo usuário",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        responses: {
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E19 - Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "E6 - Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities/user/participant": {
      get: {
        summary: "Buscar atividades em que o usuário se inscreveu",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        parameters: [
          {
            name: "page",              
            in: "query",               
            type: "string",          
            description: "Número da página", 
            required: false, 
            schema: {
              type: "integer" 
            }
          },
          {
            name: "pageSize",          
            in: "query",              
            type: "integer",          
            description: "Tamanho da página", 
            required: false,     
            schema: {
              type: "integer" 
            }
          },
        ],        
        responses: {
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities/user/participant/all": {
      get: {
        summary: "Buscar todas as atividades em que o usuário se inscreveu",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    typeId: {
                      type: "string",
                      example: "00000000-0000-0000-0000-000000000000"
                    },
                    typeName: {
                      type: "string",
                    },
                    typeDescription: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities/{id}/participants": {
      get: {
        summary: "Buscar participantes de uma atividade",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string", 
            required: true,
            description: "ID da atividade", 
            schema: {
              type: "string" ,
              format: "uuid",
            }
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    typeId: {
                      type: "string",
                      example: "00000000-0000-0000-0000-000000000000"
                    },
                    typeName: {
                      type: "string",
                    },
                    typeDescription: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Not Found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Atividade não encontrada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities/new": {
      post: {
      summary: "Criar uma atividade",
      tags: ["Atividades"],
      "security": [{ "bearerAuth": [] }],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object", 
              properties: {
                title: {
                  type: "string", 
                      format: "string", 
                      },
                description: {
                    type: "string", 
                      format: "string",
                        },
                type: {
                    type: "string", 
                    format: "uuid",
                        },
                address: {
                    type: "string", 
                    format: "string",
                    example: "7.9920, 34.8422"
                        },
                image: {
                      type: "file", 
                      format: "binary", 
                        },
                scheduledDate: {
                      type: "string", 
                      format: "date-time", 
                            },
                isPrivate:{
                      type: "boolean",
                      format: "boolean",
                    },
                    
                  },
                  required: ["title", "description", "type", "address", "image", "scheduledDate", "isPrivate"], 
                },
              },
            },
          },
          responses: {
            '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: 'ID da atividade',
                    },
                    title: {
                      type: 'string',
                      description: 'Título da atividade',
                    },
                    description: {
                      type: 'string',
                      description: 'Descrição da atividade',
                    },
                    type: {
                      type: 'string',
                      description: 'Tipo da atividade',
                    },
                    image: {
                      type: 'string',
                      description: 'Imagem associada à atividade',
                    },
                    address: {
                      type: 'object',
                      properties: {
                        latitude: {
                          type: 'number',
                          description: 'Latitude do endereço',
                        },
                        longitude: {
                          type: 'number',
                          description: 'Longitude do endereço',
                        },
                      },
                    },
                    scheduledDate: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Data programada para a atividade',
                    },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Data de criação da atividade',
                    },
                    completedAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Data de conclusão da atividade',
                    },
                    private: {
                      type: 'boolean',
                      description: 'Indica se a atividade é privada',
                    },
                    creator: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          description: 'ID do criador',
                        },
                        name: {
                          type: 'string',
                          description: 'Nome do criador',
                        },
                        avatar: {
                          type: 'string',
                          description: 'URL do avatar do criador',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
            "400": {
              description: "Bad Request",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        example: "A imagem deve ser um arquivo PNG ou JPG. ",
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      erro: {
                        type: "string",
                        example: "Autenticação necessária. ",
                      },
                    },
                  },
                },
              },
            },
            "403": {
              description: "Forbidden",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      erro: {
                        type: "string",
                        example: "Esta conta foi desativada e não pode ser utilizada. ",
                      },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      erro: {
                        type: "string",
                        example: "Erro inesperado. ",
                      },
                    },
                  },
                },
              },
            },
          }          
        },
      },
    "/activities/{id}/subscribe": {
      post: {
        summary: "Inscrever-se em uma atividade",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string", 
            required: true,
            description: "ID da atividade em que o usuário deseja se inscrever", 
            schema: {
              type: "string" ,
              format: "uuid"
            }
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      format: "uuid"
                    },
                    subscriptionStatus: {
                      type: "string",
                    },
                    confirmedAt: {
                      type: "string",
                      format: "date-time"
                    },
                    activityId: {
                      type: "string",
                      format: "uuid"
                    },
                    userId: {
                      type: "string",
                      format: "uuid"
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "O criador de uma atividade não pode se inscrever como um participante. ",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Not Found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Atividade não encontrada. ",
                    },
                  },
                },
              },
            },
          },
          409: {
            description: "Conflict",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: " Você já se registrou nessa atividade. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities/{id}/update": {
      put: {
        summary: "Editar uma atividade existente",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string", 
            required: true, 
            description: "ID da atividade", 
            schema: {
              type: "string" ,
              format: "uuid"
            }
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object", 
                properties: {
                  title: {
                    type: "string", 
                      format: "string", 
                        },
                  description: {
                      type: "string", 
                        format: "string", 
                          },
                  type: {
                      type: "string", 
                      format: "uuid",
                          },
                  address: {
                      type: "string", 
                      format: "string",
                      example: "7.9920, 34.8422",
                          },
                  image: {
                        type: "file", 
                        format: "binary", 
                          },
                  scheduledDate: {
                        type: "string", 
                        format: "date-time", 
                              },
                  isPrivate:{
                        type: "boolean",
                        format: "boolean",
                      },
                    },
                    required: ["title", "description", "type", "address", "image", "scheduledDate", "isPrivate"], 
                  },
                },
              },
            },
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: 'ID da atividade',
                    },
                    title: {
                      type: 'string',
                      description: 'Título da atividade',
                    },
                    description: {
                      type: 'string',
                      description: 'Descrição da atividade',
                    },
                    type: {
                      type: 'string',
                      description: 'Tipo da atividade',
                    },
                    image: {
                      type: 'string',
                      description: 'Imagem associada à atividade',
                    },
                    address: {
                      type: 'object',
                      properties: {
                        latitude: {
                          type: 'number',
                          description: 'Latitude do endereço',
                        },
                        longitude: {
                          type: 'number',
                          description: 'Longitude do endereço',
                        },
                      },
                    },
                    scheduledDate: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Data programada para a atividade',
                    },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Data de criação da atividade',
                    },
                    completedAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Data de conclusão da atividade',
                    },
                    private: {
                      type: 'boolean',
                      description: 'Indica se a atividade é privada',
                    },
                    creator: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          description: 'ID do criador',
                        },
                        name: {
                          type: 'string',
                          description: 'Nome do criador',
                        },
                        avatar: {
                          type: 'string',
                          description: 'URL do avatar do criador',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "A imagem deve ser um arquivo PNG ou JPG. ",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Atividade não encontrada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities/{id}/conclude": {
      put: {
        summary: "Concluir uma atividade",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string", 
            required: true, 
            description: "ID da atividade ", 
            schema: {
              type: "string" ,
              format: "uuid"
            }
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Atividade concluída com sucesso.",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Not Found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Atividade não encontrada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities/{id}/approve": {
      put: {
        summary: "Aprovar ou negar inscrição de participante em atividades privadas",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true, 
            description: "ID da atividade", 
            schema: {
              type: "string" ,
              format: "uuid"
            }
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object", 
                properties: {
                  participantId: {
                    type: "string", 
                        format: "uuid", 
                        },
                  approved: {
                    type: "boolean",
                        format: "string",
                      },
                    },
                  },
                },
              },
            },
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Solicitação de participação aprovada com sucesso. ",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Informe os campos obrigatórios corretamente. ",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Not Found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Participante não encontrado. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities/{id}/check-in": {
      put: {
        summary: "Fazer check-in em uma atividade usando código de confirmação",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string", 
            required: true, 
            description: "ID da atividade", 
            schema: {
              type: "string" ,
              format: "uuid"
            }
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object", 
                properties: {
                  confirmationCode: {
                    type: "string", 
                      },
                    },
                  },
                },
              },
            },
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Participação confirmada com sucesso. ",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Um ou mais IDs informados são inválidos. ",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities/{id}/unsubscribe": {
      delete: {
        summary: "Cancelar inscrição do usuáro em uma atividade",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string", 
            required: true, 
            description: "ID da atividade", 
            schema: {
              type: "string" ,
              format: "uuid"
            }
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Participação cancelada com sucesso. ",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Você não se inscreveu nessa atividade. ",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Not Found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Atividade não encontrada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/activities/{id}/delete": {
      delete: {
        summary: "Excluir uma atividade existente",
        tags: ["Atividades"],
        "security": [{ "bearerAuth": [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string", 
            required: true, 
            description: "ID da atividade", 
            schema: {
              type: "string" ,
              format: "uuid"
            }
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Atividade escluída com sucesso. ",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Um ou mais IDs informados são inválidos. ",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Autenticação necessária. ",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Esta conta foi desativada e não pode ser utilizada. ",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Not Foubd",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Atividade não encontrada. ",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Erro inesperado.  ",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};



