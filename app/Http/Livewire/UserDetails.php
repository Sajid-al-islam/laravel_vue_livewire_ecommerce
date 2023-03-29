<?php

namespace App\Http\Livewire;

use App\Models\User;
use Livewire\Component;

class UserDetails extends Component
{
    protected User $user;

    public function mount($user)
    {
        $this->user = $user;
    }

    public function render()
    {
        return view('livewire.user-details');
    }
}
