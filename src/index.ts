import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


// Create the main Hono app
const app = new Hono<{   // generic code  it means typecasting that wheneve dadabse_url used its basiclly means
    //  its alwais be string 
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET:string
	}
}>();

app.post('/api/v1/signin', (c) => {
	return c.text('signup route')
})


app.get('/',(c)=>{


     return c.text("tested ok ");
});
//@ts-ignore
app.post('/api/v1/signup',async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const  body = await  c.req.json();
     const user =  await  prisma.user.create({
        data:{
            email : body.email,
            password : body.password
        },
     })
      if(!user){
        
         c.status(501)
         return c.json({ 
            message: "failed to register "
         });
      }

const token = await sign({userId: user.id}, c.env.JWT_SECRET);


	return c.json({jwt:token});
})

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app;
