<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;

class ProductController extends Controller
{
    public function index() {
        Gate::authorize('view', 'products');
        
        $products = Product::paginate();

        return ProductResource::collection($products);
    }

    public function show($id) {
        Gate::authorize('view', 'products');
        
        return new ProductResource(Product::find($id));
    }

    public function store(Request $request) {
        Gate::authorize('edit', 'products');
        
        $product = Product::create($request->only('name', 'description', 'image_url', 'price'));
        
        return response(new ProductResource($product), Response::HTTP_CREATED);
    }

    public function update(Request $request, $id) {
        Gate::authorize('edit', 'products');
        
        $product = Product::find($id);

        $product->update($request->only('name', 'description', 'image_url', 'price'));

        return response(new ProductResource($product), Response::HTTP_ACCEPTED);
    }

    public function destroy($id) {
        Gate::authorize('edit', 'products');
        
        Product::destroy($id);

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
