workspace "Playground" "Demo microservices architecture for erode testing" {

    model {
        frontend = softwareSystem "Web Frontend" "Customer-facing web application" {
            tags "ui"
            technology "TypeScript"
            url "https://github.com/erode-app/playground"
            properties {
                "erode.id" "frontend"
            }
        }

        api_gateway = softwareSystem "API Gateway" "Central entry point for all API requests" {
            tags "backend"
            technology "TypeScript"
            url "https://github.com/erode-app/playground"
            properties {
                "erode.id" "api_gateway"
            }
        }

        user_service = softwareSystem "User Service" "Manages user accounts and authentication" {
            tags "backend" "microservice"
            technology "TypeScript"
            url "https://github.com/erode-app/playground"
            properties {
                "erode.id" "user_service"
            }
        }

        product_service = softwareSystem "Product Service" "Manages product catalog and inventory" {
            tags "backend" "microservice"
            technology "TypeScript"
            url "https://github.com/erode-app/playground"
            properties {
                "erode.id" "product_service"
            }
        }

        database = softwareSystem "Database" "In-memory data store" {
            tags "storage"
            technology "TypeScript"
            url "https://github.com/erode-app/playground"
            properties {
                "erode.id" "database"
            }
        }

        frontend -> api_gateway "sends requests" "https"
        api_gateway -> user_service "routes user requests" "https"
        api_gateway -> product_service "routes product requests" "https"
        user_service -> database "reads and writes data" "database"
        product_service -> database "reads and writes data" "database"
    }
}
