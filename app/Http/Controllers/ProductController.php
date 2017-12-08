<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\SubmitFormRequest;

class ProductController extends Controller
{
    public function index()
    {
    	$product = new Product();
    	return view('welcome')->withProduct('product');
    }

    public function submit(SubmitFormRequest $request, Product $product)
    {
        $product->id = $request->id;
    	$product->name = $request->name;
    	$product->quantity = $request->quantity;
    	$product->price = $request->price;
    	$product->date = $request->date;

        $this->toJSON($product);

        return $product;
    }

    protected function toJSON($product)
    {
        if (Storage::exists('product.json')) {
            $file = Storage::get('product.json');
            $arr = json_decode($file);
            $arr[] = $product;
            $json = json_encode($arr);
            Storage::delete('product.json');
            Storage::put('product.json', $json);
        } else {
            $arr[] = $product;
            $json = json_encode($arr);
            Storage::put('product.json', $json);
        }
    }
}
