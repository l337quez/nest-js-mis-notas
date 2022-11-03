// no estoy seguro que esto funcione porque son puras notas... Yo intentaba setear los header en graphql y pense que tenia algo que ver con el framework del servicor
// Esto son simplemente notas.... 


import { FastifyReply, FastifyRequest } from 'fastify';




  const res = ctx.switchToHttp().getResponse<Response>()
    console.log(ctx.switchToHttp().getResponse<Response>())

  //const req = ctx.switchToHttp().getRequest<FastifyRequest>();
  
    //const res = ctx.switchToHttp().getResponse<ServerResponse>();
    //const req: Request = ctx.switchToHttp().getRequest()
    //req.set('x-access-token', 'Your Data' );


    //const response: FastifyReply = gqlExecutionContext.getContext().res;
          //response.headers({dsd:'sdsd'})
          //const res = ctx.switchToHttp().getResponse<FastifyReply>();
          //res.header('foo', 'bar')
          //res.headers({...res, CORRELATION_ID_HEADER:id })
          //res.header(CORRELATION_ID_HEADER,id)
          //res.send({...res, CORRELATION_ID_HEADER: id});
          
          //console.log("HEADER MODIFICADO",res)





      /* const req = ctx.getRequest<FastifyRequest>();
      const res = ctx.getResponse<FastifyReply<ServerResponse>>();
      const res = context.switchToHttp().getResponse<FastifyReply<any>>(); */


//https://progressivecoder.com/nestjs-interceptors-and-how-to-use-them-learn-nestjs-series-part-8/

//https://stackoverflow.com/questions/61796828/fastify-nestjs-how-to-set-response-headers-in-interceptor
