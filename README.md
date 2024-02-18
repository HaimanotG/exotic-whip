# Folder Structure

The folder structure of the application is organized as follows:

- **src**: The main application source code folder.
  - **app**: Contains the core application modules.
    - **core**: Contains modules for shared functionalities like authentication, database access, and utilities.
      - **auth**: Holds authentication modules (UserService, AuthService, etc.).
      - **db**: Handles database interactions (DatabaseModule, models, etc.).
      - **utils**: Includes common helper functions and services.
    - **features**: Contains feature-specific modules, each with its own substructure.
      - **products**: Modules related to product management (ProductController, ProductService, etc.).
      - **users**: Modules for user management (UserController, UserService, etc.).
      - **orders**: Modules for order processing (OrderController, OrderService, etc.).
      - **categories**: Modules for category management (CategoryController, CategoryService, etc.).
      - **promotions**: Modules for handling promotions (PromotionController, PromotionService, etc.).
      - ... (similar structures for additional functionalities)
  - **main.ts**: The application entry point.
  - **shared**: Contains globally used components like filters, interceptors, guards, etc.
  - **test**: Holds unit and integration tests for your application modules.

## Placement of Controllers, Models, and Services

When organizing your controllers, models, and services within the application, follow these guidelines:

- **Models**: Place them in `app/features/<feature name>/models` (e.g., `app/features/products/models`). This aligns with feature-based organization.
- **Controllers**: Place them in `app/features/<feature name>/controllers` (e.g., `app/features/products/controllers`). This keeps controllers close to their related models and services.
- **Services**: Place them in `app/features/<feature name>/services` (e.g., `app/features/products/services`). This ensures services are well-organized within their respective features.

## Additional Considerations

Here are some additional considerations for building your application:

- **Microservices**: For large-scale apps, consider adopting a microservices architecture, splitting functionalities into independent services for better scalability and maintainability.
- **GraphQL**: Implement a GraphQL API alongside REST for flexibility and improved developer experience. Consider using Apollo Server or Nexus.
- **Headless Commerce**: Integrate with a headless commerce platform for omnichannel capabilities and flexibility.
- **Authentication & Authorization**: Utilize strong authentication and authorization mechanisms using libraries like passport.js or JWT, following best practices like OAuth2 or OpenID Connect.
- **Security**: Implement robust security measures throughout your application, including regular vulnerability scans, user input validation, secure password hashing, and data encryption.
- **Documentation**: Use tools like Swagger or OpenAPI to generate API documentation for developers and potential users.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

