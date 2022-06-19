<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    public function index() {
        $products = Product::paginate();

        return ProductResource::collection($products);
    }

    public function show($id) {
        return new ProductResource(Product::find($id));
    }

    public function store(Request $request) {
        $product = Product::create($request->only('name', 'description', 'image_url', 'price'));
        
        return response($product, Response::HTTP_CREATED);
    }

    public function update(Request $request, $id) {
        $product = Product::find($id);

        $product->update($request->only('name', 'description', 'image_url', 'price'));

        return response($product, Response::HTTP_ACCEPTED);
    }

    public function destroy($id) {
        Product::destroy($id);

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
