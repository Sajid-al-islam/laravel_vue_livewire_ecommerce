{{-- @extends('layouts.app',[
    'title' => 'login',
    'meta_image' => 'https://www.prossodprokashon.com/uploads/file_manager/fm_image_350x500_106195df55457491637211989.jpg',
]) --}}
{{-- @section('content') --}}
<div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <div wire:loading.delay>...</div>
                        <h1>login</h1>
                    </div>
                    <div class="card-body">
                        <form wire:submit.prevent="login_submit" action="">
                            <div class="form-group mb-4">
                                <label for="">email</label>
                                <input wire:model="email" type="email" class="form-control" name="email">
                            </div>
                            <div class="form-group mb-4">
                                <label for="">password</label>
                                <input wire:model="password" type="password" class="form-control" name="password">
                            </div>
                            <button class="btn btn-success btn-sm">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


{{-- @endsection --}}
