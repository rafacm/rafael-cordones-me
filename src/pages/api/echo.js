export default (request, response) => {
  response
    .status(200)
    .json({
      echo: {
        query: request.query,
        cookies: request.cookies,
        body: request.body
      }
    })
}
