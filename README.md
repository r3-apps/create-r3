
# R3-APP


## Sample Project 
### [PayLink](https://github.com/r3-apps/create-r3/tree/main/example/paylink)
 - fullstack app with R-3 app and [Paymongo](https://www.paymongo.com/)
 ### [BlogCMS](https://github.com/kalib-code/create-r3-app-demo)
 - Create a Blog management with the power of R-3 app 

 

The R3-App Tech Stack: The R3-App comprises three key components that work seamlessly together to create a robust full-stack development environment.

## Next.js
Next.js is a React framework that provides essential building blocks for creating web applications. It takes care of the tooling and configuration needed for React, adding structure, features, and optimizations to your application. By including Next.js in the R3-App stack, developers can focus on writing code without worrying about the underlying setup.

## Refine.dev
Refine is a React-based framework that accelerates web application development by eliminating repetitive tasks associated with CRUD operations. It offers industry-standard solutions for critical project components such as authentication, access control, routing, networking, state management, and i18n. As a headless framework, Refine provides unlimited styling and customization options, making it an ideal choice for the R3-App stack.

## Remult.dev
Remult is a full stack CRUD framework that leverages your TypeScript model types to deliver a secure and highly configurable REST API, a type-safe frontend API client, and a type-safe backend query builder. By integrating Remult into the R3-App stack, developers can enjoy an efficient and secure development environment that promotes type safety across the entire application.

Combining the features of React( Nextjs ), Refine and Remult, the resulting R3 App offers an impressive suite of functionalities that streamline the process of full-stack web application development:

1. **Zero-Configuration, Rapid Setup**: The R3 App enables quick project initialization with minimal manual configuration, thanks to Refine's one-click setup.

2. **Type-Safe REST API and Clients**: With Remult's features, the R3 App offers a secure and highly configurable REST API, a type-safe frontend API client, and a type-safe backend query builder. This extends type safety across the entire application and ensures code robustness and reliability.

3. **Auto-Generated CRUD Operations**: Refine's auto-generation of CRUD UIs based on API data structure makes the R3 App a powerful tool for quickly developing applications that require CRUD functionalities.

4. **Context-Aware Validations and Lifecycle Hooks**: Remult allows for context-aware data validations and entity lifecycle hooks, making it easier to manage application logic across both frontend and backend.

5. **Authentication and Access Control**: Thanks to Refine's built-in providers, the R3 App simplifies the implementation of seamless authentication and access control flows.

6. **Network Handling**: With Refine, network operations are simplified with its hook-based interface for API interaction, abstracting away the complexities of managing API requests.

7. **Flexible Customization**: As Refine is a headless framework, the R3 App gives developers unlimited styling and customization options, maintaining a clear separation between UI components and business logic.

8. **Internationalization (i18n) Support**: Refine's compatibility with any i18n framework makes the R3 App suitable for creating multi-language applications.

9. **Server-Side Rendering (SSR) Support**: Refine's built-in SSR support allows the R3 App to create robust, customer-facing applications like storefronts.

10. **Backend Service Connectors**: Refine's backend connectors and Remult's support for complex operations like transactions make the R3 App a versatile tool adaptable for different backend setups and database operations.

Overall, the R3 App combines the strengths of Refine and Remult to provide a comprehensive, type-safe, and efficient environment for full-stack web application development. Whether it's handling CRUD operations, managing network requests, implementing authentication, or ensuring seamless UI customization, the R3 App has it covered.



## Usage

```bash
npx create-r3
```

it will generate a fullstack App with sample remult usage.

for more advanced tutorials you might want to check out [refine.dev](refine.dev) and [remult.dev](remult.dev) documentation.