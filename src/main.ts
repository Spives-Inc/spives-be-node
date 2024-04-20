import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import basicAuth from "express-basic-auth";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const environment = configService.get("environment");
  const appPort = configService.get("app.port");
  const appHost = configService.get("app.host");
  const appHostname = configService.get("app.hostname");

  const swaggerUser = configService.get("swagger.users");
  if (swaggerUser) {
    app.use(
      ["/swagger", "/swagger-json"],
      basicAuth({
        challenge: true,
        users: swaggerUser,
      }),
    );
  }

  const initSwagger = (app: INestApplication, serverUrl: string) => {
    const config = new DocumentBuilder()
      .setTitle("Spives BE API Documentation")
      .setDescription(
        "Spives is a platform for scouting and managing football talents. This API documentation provides a detailed guide on how to interact with the Spives RESTful API.",
      )
      .setVersion("1.0")
      .addServer(serverUrl)
      .addBearerAuth()
      .addTag("Spives RESTful API Documentation")
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("/swagger", app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  };
  // app.enableCors();
  const allowedOrigins = [
    /^(https:\/\/([^\.]*\.)?ngrok\.io)$/i,
    /^(https:\/\/([^\.]*\.)?amplifyapp\.com)$/i,
    "http://localhost:3000",
    "https://gospives.netlify.app/",
  ];
  const allowedOriginsProd = ["https://gospives.netlify.app/"];
  const origins =
    environment === "production" ? allowedOriginsProd : allowedOrigins;

  app.enableCors({
    origin: origins,
    credentials: true,
  });

  if (environment !== "production") {
    initSwagger(app, appHost);
  }

  // Validation pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appPort, appHostname);
}
bootstrap();
