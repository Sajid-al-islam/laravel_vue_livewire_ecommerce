<?php

namespace App\Http\Livewire;

use App\Models\User;
use Livewire\Component;

class ShowPosts extends Component
{
    public $users;

    public function mount()
    {
        $this->users = User::get();
    }
    public function render()
    {
        return view('livewire.show-posts')
            ->extends('layouts.app', [
                'title' => 'home',
                'meta_image' => 'https://www.prossodprokashon.com/uploads/file_manager/fm_image_350x500_10628497e549aa41652856805.jpg',
            ]);
    }
}
