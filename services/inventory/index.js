const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const products = require('./products.json');

const packageDefinition = protoLoader.loadSync('proto/inventory.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const inventoryProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(inventoryProto.InventoryService.service, {
    SearchAllProducts: (_, callback) => {
        callback(null, {
            products: products,
        });
    },

    SearchProductByID: (payload, callback) => {
        const product = products.find(
            (product) => product.id == payload.request.id
        );
        callback(null, product ? { product } : {});
    },
});