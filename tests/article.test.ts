
import { sequelizeConnection, sequelizeDisconnection } from "./utils/bulks";

import { ArticleMocks, UserMocks } from "./mocks";
import { authenticatedRequest } from "./utils/supertest";

describe( "Article Routes", () => {
  const request = authenticatedRequest;

  beforeAll( async () => {
    await sequelizeConnection();
  }, 30000 );

  afterAll( async () => {
    await sequelizeDisconnection();
  }, 30000 );

  describe( "POST /api/article", () => {

    test( "should create an article correctly", async () => {
      await request
        .post( "/api/user" )
        .send( UserMocks[0] );

      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request
        .post( "/api/article" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( ArticleMocks[0] );

      await request
        .post( "/api/article" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( ArticleMocks[1] );

      await request
        .post( "/api/article" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( ArticleMocks[2] );

      expect( status ).toBe( 201 );
      expect( body ).toEqual( { message: "New Article created successfully with id 1." } );

    } );

    test( "should fail article creation because of required attributes", async () => {
      const { status, body } = await request.post( "/api/article" ).send( {} );
      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          errors: [
            {
              msg: "The title is required.",
              path: "title",
            },
            {
              msg: "The body is required.",
              path: "body"
            }
          ]
        }
      );

    } );

    test( "should fail article creation because of common error", async () => {
      const wrongArticle = {
        title: "************************************************************",
        body: "**",
        image_url: "pepe"
      };
      const { status, body } = await request.post( "/api/article" ).send( wrongArticle );
      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          errors: [
            {
              "msg": "One of the special characters entered is not allowed. \nOnly /  , . ( ) and : are allowed.",
              "path": "title",
            },
            {
              "msg": "The title must be between 1 and 50 characters.",
              "path": "title",
            },
            {
              "msg": "One of the special characters entered is not allowed. \nOnly / * + - _ , . () and : are allowed.",
              "path": "body",
            },
            {
              "msg": "The image URL is not valid.",
              "path": "image_url",
            }
          ]
        }
      );
    } );

    test( "should fail article creation because of invalid token", async () => {
      const { status, body } = await request.post( "/api/article" )
        .set( "Authorization", "Bearer cualquiercosa" )
        .send( ArticleMocks[2] );

      expect( status ).toBe( 401 );
      expect( body ).toEqual(
        {
          "message": "Invalid Token. Please login again."
        }
      );
    } );

    test( "should fail article creation because of missing token", async () => {
      const { status, body } = await request.post( "/api/article" )
        .send( ArticleMocks[2] );

      expect( status ).toBe( 401 );
      expect( body ).toEqual(
        {
          "message": "The JWT is required."
        }
      );
    } );
  } );

  describe( "GET /api/article", () => {

    test( "should get articles correctly", async () => {
      const { status, body } = await request.get( "/api/article" );
      expect( status ).toBe( 200 );
      expect( body ).toMatchObject(
        {
          totalItems: 3,
          totalPages: 1,
          results: [
            {
              id: 1,
              ...ArticleMocks[0],
              author:{
                id: 1,
                name: UserMocks[0].name,
                lastname: UserMocks[0].lastname
              }
            },
            {
              id: 2,
              ...ArticleMocks[1],
              author:{
                id: 1,
                name: UserMocks[0].name,
                lastname: UserMocks[0].lastname
              }
            },
            {
              id: 3,
              ...ArticleMocks[2],
              author:{
                id: 1,
                name: UserMocks[0].name,
                lastname: UserMocks[0].lastname
              }
            }
          ]

        }
      );

    } );

    test( "should fail to get articles because of query format", async () => {
      const { status, body } = await request.get( "/api/article?order=asx&page=l" );
      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          errors: [
            {
              "msg": "Page must be a number",
              "path": "page",
            },
            {
              "msg": "No valid value was provided for the search, use ASC or DESC",
              "path": "order",
            }

          ]
        }
      );

    } );

  } );

  describe( "GET /api/article/:id", () => {

    test( "should get article by id correctly", async () => {
      const { status, body } = await request.get( "/api/article/2" );
      expect( status ).toBe( 200 );
      expect( body ).toMatchObject(
        {
          id: 2,
          ...ArticleMocks[1],
          author:{
            id: 1,
            name: UserMocks[0].name,
            lastname: UserMocks[0].lastname
          }
        }
      );
    } );

    test( "should fail to get article by id correctly because of id type", async () => {
      const { status, body } = await request.get( "/api/article/a" );
      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          errors: [
            {
              value: "a",
              msg: "The id value must be a number.",
              path: "id",
            }
          ]
        }
      );
    } );

    test( "should fail to get article by id correctly because id doesnt exists", async () => {
      const { status, body } = await request.get( "/api/article/5" );
      expect( status ).toBe( 404 );
      expect( body ).toMatchObject(
        {
          "error": "There is no Article registered with that id."
        }
      );
    } );



  } );

  describe( "PUT /api/article/:id", () => {

    test( "should update article by id correctly", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request
        .put( "/api/article/2" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( { title: "Updated title" } );

      expect( status ).toBe( 200 );
      expect( body ).toMatchObject( {
        message: "Article updated successfully."
      } );


    } );

    test( "should fail to update article by id correctly because of id type", async () => {
      const wrongArticle = {
        title: "************************************************************",
        body: "**",
        image_url: "pepe"
      };
      const { status, body } = await request.put( "/api/article/1" )
        .send( wrongArticle );
      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          errors: [
            {
              "msg": "One of the special characters entered is not allowed. \nOnly /  , . ( ) and : are allowed.",
              "path": "title",
            },
            {
              "msg": "The title must be between 1 and 50 characters.",
              "path": "title",
            },
            {
              "msg": "One of the special characters entered is not allowed. \nOnly / * + - _ , . () and : are allowed.",
              "path": "body",
            },
            {
              "msg": "The image URL is not valid.",
              "path": "image_url",
            }
          ]
        }
      );
    } );

    test( "should fail article update because of invalid token", async () => {
      const { status, body } = await request.put( "/api/article/1" )
        .set( "Authorization", "Bearer cualquiercosa" )
        .send( ArticleMocks[2] );

      expect( status ).toBe( 401 );
      expect( body ).toEqual(
        {
          "message": "Invalid Token. Please login again."
        }
      );
    } );

    test( "should fail article update because of missing token", async () => {
      const { status, body } = await request.put( "/api/article/1" )
        .send( ArticleMocks[2] );

      expect( status ).toBe( 401 );
      expect( body ).toEqual(
        {
          "message": "The JWT is required."
        }
      );
    } );

    test( "should fail article update because id doesnt exists", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request
        .put( "/api/article/333" )
        .set( "Authorization", `Bearer ${tokenBody.token}` )
        .send( { title: "Updated title" } );

      expect( status ).toBe( 404 );
      expect( body ).toMatchObject( {
        error: "There is no Article registered with that id."
      } );


    } );



  } );

  describe( "DELETE /api/article/:id", () => {

    test( "should delete article by id correctly", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request
        .delete( "/api/article/2" )
        .set( "Authorization", `Bearer ${tokenBody.token}` );

      expect( status ).toBe( 200 );
      expect( body ).toMatchObject( {
        message: "Article with id 2 deleted successfully."
      } );
    } );

    test( "should fail to delete article by id correctly because of id type", async () => {
      const { status, body } = await request.delete( "/api/article/a" );
      expect( status ).toBe( 400 );
      expect( body ).toMatchObject(
        {
          errors: [
            {
              value: "a",
              msg: "The id value must be a number.",
              path: "id",
            }
          ]
        }
      );
    } );

    test( "should fail article delete because of invalid token", async () => {
      const { status, body } = await request.delete( "/api/article/1" )
        .set( "Authorization", "Bearer cualquiercosa" );

      expect( status ).toBe( 401 );
      expect( body ).toEqual(
        {
          "message": "Invalid Token. Please login again."
        }
      );
    } );

    test( "should fail article delete because of missing token", async () => {
      const { status, body } = await request.delete( "/api/article/1" );

      expect( status ).toBe( 401 );
      expect( body ).toEqual(
        {
          "message": "The JWT is required."
        }
      );
    } );

    test( "should fail article delete because id doesnt exists", async () => {
      const { body: tokenBody } = await request
        .post( "/api/auth/login" )
        .send(
          {
            username: UserMocks[0].username,
            password: UserMocks[0].password
          } );

      const { status, body } = await request
        .delete( "/api/article/2" )
        .set( "Authorization", `Bearer ${tokenBody.token}` );

      expect( status ).toBe( 404 );
      expect( body ).toMatchObject( {
        error: "There is no Article registered with that id."
      } );
    } );
  } );
} );