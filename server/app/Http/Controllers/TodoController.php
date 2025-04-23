<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;


class TodoController extends Controller
{
    // Get all todos
    public function index()
    {
        return Todo::all();
    }

    // Create a new todo
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        return Todo::create($validated);
    }

    // Get a single todo
    public function show(Todo $todo)
    {
        return $todo;
    }

    // Update a todo
    public function update(Request $request, Todo $todo)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'sometimes|boolean'
        ]);

        $todo->update($validated);
        return $todo;
    }

    // Delete a todo
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response(null, 204);
    }
}