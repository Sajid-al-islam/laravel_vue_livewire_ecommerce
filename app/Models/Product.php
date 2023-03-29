<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use function PHPUnit\Framework\isNull;

class Product extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $appends = [
        'hs_codes_json',
        'modifier_options_json',
        'category_json',
        'selected_variant_option_json',
        'bulk_pricing_discount_options_json',
        'custom_fields_json',
        'variant_values_json',
        'related_categories',
        'related_images',
    ];

    public function getRelatedCategoriesAttribute()
    {
        if (!isNull($this->selected_categories)) {
            $json_categories_id = json_decode($this->selected_categories);
            $category = [];

            foreach ($json_categories_id as $id) {
                if (Category::where('id', $id)->exists()) {
                    array_push($category, Category::where('id', $id)->select('id', 'name')->first());
                }
            }
            return $category;
        }
    }
    public function getRelatedImagesAttribute()
    {
        return ProductImage::where('product_id', $this->id)->get();
    }
    public function getHsCodesJsonAttribute()
    {
        if (isset($this->hs_codes)) {
            return json_decode($this->hs_codes);
        }
        return 0;
    }
    public function getModifierOptionsJsonAttribute()
    {
        if (isset($this->modifier_options)) {
            return json_decode($this->modifier_options);
        }
        return 0;
    }
    public function getVariantValuesJsonAttribute()
    {
        if (isset($this->variant_values)) {
            return json_decode($this->variant_values);
        }
        return 0;
    }

    public function getCategoryJsonAttribute()
    {
        if (isset($this->selected_categories)) {
            return json_decode($this->selected_categories);
        }
        return 0;
    }

    public function getCustomFieldsJsonAttribute()
    {
        if (isset($this->custom_fields)) {
            return json_decode($this->custom_fields);
        }
        return 0;
    }

    public function getBulkPricingDiscountOptionsJsonAttribute()
    {
        if (isset($this->bulk_pricing_discount_options)) {
            return json_decode($this->bulk_pricing_discount_options);
        }
        return 0;
    }

    public function getSelectedVariantOptionJsonAttribute()
    {
        if (isset($this->selected_variant_options)) {
            return json_decode($this->selected_variant_options);
        }
        return 0;
    }

    public function related_image()
    {
        return $this->hasMany(ProductImage::class, 'product_id');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class)->withTimestamps();
    }

    public function stocks()
    {
        return $this->hasMany(ProductStock::class,'product_id');
    }

    public function sales()
    {
        return $this->hasMany(OrderDetails::class,'product_id');
    }
}
