/* https://www.restapitutorial.com/httpstatuscodes.html */

export enum HttpStatusCode {

    //TODO ?1xx Informational
    CONTINUE=100,

    //TODO ?2xx Success

    //The request has succeeded. The information returned with the response is dependent on the method used in the request
    //General status code. Most common code used to indicate success.
    OK = 200,
    //Successful creation occurred (via either POST or PUT). 
    //Set the Location header to contain a link to the newly-created resource (on POST). Response body content may or may not be present.
    CREATED=201,
    ACCEPTED=202,
    NO_CONTENT=204,

    //TODO 3xx Redirection

    //TODO ?4xx Client Error
    BAD_REQUEST=400,
    UNAUTHORIZED=401,
    FORBIDDEN=403,
    NOT_FOUND=404,
    CONFLICT=409,

    //TODO ?5xx Server Error
    INTERNAL_SERVER_ERROR=500
}