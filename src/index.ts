import { Hono } from 'hono';

import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';


// Create the main Hono app
const app = new Hono<{   // generic code  it means typecasting that wheneve dadabse_url used its basiclly means
    //  its alwais be string 
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET:string
	}
}>();

app.get('/', (c) => {
	return c.text('tested ok')
})



//@ts-ignore



app.route('/api/v1/user', userRouter)
app.route('/api/v1/book', blogRouter)


export default app;
