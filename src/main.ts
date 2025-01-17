import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost) ;
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

  app.setGlobalPrefix(process.env.GLOBAL_PREFIX);
  await app.listen(process.env.PORT);
}
bootstrap();
