<?php

use App\Http\Controllers\ActividadController;
use App\Http\Controllers\AtractivoController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BazarController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\CategoriaExperienciasController;
use App\Http\Controllers\DelegacionController;
use App\Http\Controllers\EventoController;
use App\Http\Controllers\IdentidadCulturalController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\NegocioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\WelcomeController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');
Route::get('/bazar', [BazarController::class, 'index'])->name('bazar-index');
Route::get('/bazar-registrado', [BazarController::class, 'registrado'])->name('bazar-registrado');
Route::post('/bazar', [BazarController::class, 'store'])->name('bazar.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Users
    Route::get('users', [UsersController::class, 'index'])->name('users');
    Route::get('users/create', [UsersController::class, 'create'])->name('users.create');
    Route::post('users', [UsersController::class, 'store'])->name('users.store');
    Route::get('users/{user}/edit', [UsersController::class, 'edit'])->name('users.edit');
    Route::put('users/{user}', [UsersController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UsersController::class, 'destroy'])->name('users.destroy');
    Route::put('users/{user}/restore', [UsersController::class, 'crrestoreeate'])->name('users.restore');


    // Categorias
    Route::get('/categorias', [CategoriaController::class, 'index'])->name('categorias');
    Route::get('/categorias/create', [CategoriaController::class, 'create'])->name('categorias.create');
    Route::post('/categorias', [CategoriaController::class, 'store'])->name('categorias.store');
    Route::get('/categorias/{categoria}/edit', [CategoriaController::class, 'edit'])->name('categorias.edit');
    Route::put('/categorias/{categoria}', [CategoriaController::class, 'update'])->name('categorias.update');
    Route::delete('/categorias/{categoria}', [CategoriaController::class, 'destroy'])->name('categorias.destroy');
    Route::put('/categorias/{categoria}/restore', [CategoriaController::class, 'restore'])->name('categorias.restore');

  
    // CategoriasExperiencia
    Route::get('/categorias-experiencia', [CategoriaExperienciasController::class, 'index'])->name('categorias-experiencia');
    Route::get('/categorias-experiencia/create', [CategoriaExperienciasController::class, 'create'])->name('categorias-experiencia.create');
    Route::post('/categorias-experiencia', [CategoriaExperienciasController::class, 'store'])->name('categorias-experiencia.store');
    Route::get('/categorias-experiencia/{categoria}/edit', [CategoriaExperienciasController::class, 'edit'])->name('categorias-experiencia.edit');
    Route::put('/categorias-experiencia/{categoria}', [CategoriaExperienciasController::class, 'update'])->name('categorias-experiencia.update');
    Route::delete('/categorias-experiencia/{categoria}', [CategoriaExperienciasController::class, 'destroy'])->name('categorias-experiencia.destroy');
    Route::put('/categorias-experiencia/{categoria}/restore', [CategoriaExperienciasController::class, 'restore'])->name('categorias-experiencia.restore');

    // Servicios
    Route::get('/servicios', [ServicioController::class, 'index'])->name('servicios');
    Route::get('/servicios/create', [ServicioController::class, 'create'])->name('servicios.create');
    Route::post('/servicios', [ServicioController::class, 'store'])->name('servicios.store');
    Route::get('/servicios/{servicio}/edit', [ServicioController::class, 'edit'])->name('servicios.edit');
    Route::put('/servicios/{servicio}', [ServicioController::class, 'update'])->name('servicios.update');
    Route::delete('/servicios/{servicio}', [ServicioController::class, 'destroy'])->name('servicios.destroy');
    Route::put('/servicios/{servicio}/restore', [ServicioController::class, 'restore'])->name('servicios.restore');

     // Actividades
     Route::get('/actividades', [ActividadController::class, 'index'])->name('actividades');
     Route::get('/actividades/create', [ActividadController::class, 'create'])->name('actividades.create');
     Route::post('/actividades', [ActividadController::class, 'store'])->name('actividades.store');
     Route::get('/actividades/{actividad}/edit', [ActividadController::class, 'edit'])->name('actividades.edit');
     Route::put('/actividades/{actividad}', [ActividadController::class, 'update'])->name('actividades.update');
     Route::delete('/actividades/{actividad}', [ActividadController::class, 'destroy'])->name('actividades.destroy');
     Route::put('/actividades/{actividad}/restore', [ActividadController::class, 'restore'])->name('actividades.restore');


    // Eventos
    Route::get('/eventos', [EventoController::class, 'index'])->name('eventos');
    Route::get('/eventos/create', [EventoController::class, 'create'])->name('eventos.create');
    Route::post('/eventos', [EventoController::class, 'store'])->name('eventos.store');
    Route::get('/eventos/{evento}/edit', [EventoController::class, 'edit'])->name('eventos.edit');
    Route::put('/eventos/{evento}', [EventoController::class, 'update'])->name('eventos.update');
    Route::delete('/eventos/{evento}', [EventoController::class, 'destroy'])->name('eventos.destroy');
    Route::put('/eventos/{evento}/restore', [EventoController::class, 'restore'])->name('eventos.restore');


     // Delegaciones
     Route::get('/delegaciones', [DelegacionController::class, 'index'])->name('delegaciones');
     Route::get('/delegaciones/create', [DelegacionController::class, 'create'])->name('delegaciones.create');
     Route::post('/delegaciones', [DelegacionController::class, 'store'])->name('delegaciones.store');
     Route::get('/delegaciones/{delegacion}/edit', [DelegacionController::class, 'edit'])->name('delegaciones.edit');
     Route::put('/delegaciones/{delegacion}', [DelegacionController::class, 'update'])->name('delegaciones.update');
     Route::delete('/delegaciones/{delegacion}', [DelegacionController::class, 'destroy'])->name('delegaciones.destroy');
     Route::put('/delegaciones/{delegacion}/restore', [DelegacionController::class, 'restore'])->name('delegaciones.restore');


        // Banners
        Route::get('/banners', [BannerController::class, 'index'])->name('banners');
        Route::get('/banners/create', [BannerController::class, 'create'])->name('banners.create');
        Route::post('/banners', [BannerController::class, 'store'])->name('banners.store');
        Route::get('/banners/{banner}/edit', [BannerController::class, 'edit'])->name('banners.edit');
        Route::put('/banners/{banner}', [BannerController::class, 'update'])->name('banners.update');
        Route::delete('/banners/{banner}', [BannerController::class, 'destroy'])->name('banners.destroy');
        Route::put('/banners/{banner}/restore', [BannerController::class, 'restore'])->name('banners.restore');
    

    // Atractivo
    Route::get('/atractivos', [AtractivoController::class, 'index'])->name('atractivos');
    Route::get('/atractivos/create', [AtractivoController::class, 'create'])->name('atractivos.create');
    Route::get('/atractivos/refreshSlugs', [AtractivoController::class, 'refreshSlugs'])->name('atractivos.refreshSlugs');
    Route::post('/atractivos', [AtractivoController::class, 'store'])->name('atractivos.store');
    Route::get('/atractivos/{atractivo}/edit', [AtractivoController::class, 'edit'])->name('atractivos.edit');
    Route::put('/atractivos/{atractivo}', [AtractivoController::class, 'update'])->name('atractivos.update');
    Route::delete('/atractivos/{atractivo}', [AtractivoController::class, 'destroy'])->name('atractivos.destroy');
    Route::delete('/atractivos/{atractivo}/{fotoId}', [AtractivoController::class, 'destroyFoto'])->name('atractivos.destroyFoto');
    Route::put('/atractivos/{atractivo}/restore', [AtractivoController::class, 'restore'])->name('atractivos.restore');
    Route::put('/atractivos/{atractivo}/validar', [AtractivoController::class, 'validar'])->name('atractivos.validar');
    Route::put('/atractivos/{atractivo}/novalidar', [AtractivoController::class, 'novalidar'])->name('atractivos.novalidar');

      // negocios
      Route::get('/negocios', [NegocioController::class, 'index'])->name('negocios');
      Route::get('/negocios/create', [NegocioController::class, 'create'])->name('negocios.create');
      Route::post('/negocios', [NegocioController::class, 'store'])->name('negocios.store');
      Route::get('/negocios/{negocio}/edit', [NegocioController::class, 'edit'])->name('negocios.edit');
      Route::put('/negocios/{negocio}', [NegocioController::class, 'update'])->name('negocios.update');
      Route::delete('/negocios/{negocio}', [NegocioController::class, 'destroy'])->name('negocios.destroy');
      Route::delete('/negocios/{negocio}/{fotoId}', [NegocioController::class, 'destroyFoto'])->name('negocios.destroyFoto');
      Route::put('/negocios/{negocio}/restore', [NegocioController::class, 'restore'])->name('negocios.restore');
      Route::put('/negocios/{negocio}/validar', [NegocioController::class, 'validar'])->name('negocios.validar');
      Route::put('/negocios/{negocio}/novalidar', [NegocioController::class, 'novalidar'])->name('negocios.novalidar');
      Route::get('/negocioscomercio', [NegocioController::class, 'getNegociosComercio'])->name('negocios.getNegociosComercio');

       // Identidad Cultural
    Route::get('/identidad-cultural', [IdentidadCulturalController::class, 'index'])->name('identidad-cultural');
    Route::get('/identidad-cultural/create', [IdentidadCulturalController::class, 'create'])->name('identidad-cultural.create');
    Route::get('/identidad-cultural/refreshSlugs', [IdentidadCulturalController::class, 'refreshSlugs'])->name('identidad-cultural.refreshSlugs');
    Route::post('/identidad-cultural', [IdentidadCulturalController::class, 'store'])->name('identidad-cultural.store');
    Route::get('/identidad-cultural/{identidad_cultural}/edit', [IdentidadCulturalController::class, 'edit'])->name('identidad-cultural.edit');
    Route::put('/identidad-cultural/{identidad_cultural}', [IdentidadCulturalController::class, 'update'])->name('identidad-cultural.update');
    Route::delete('/identidad-cultural/{identidad_cultural}', [IdentidadCulturalController::class, 'destroy'])->name('identidad-cultural.destroy');
    Route::delete('/identidad-cultural/{identidad_cultural}/{fotoId}', [IdentidadCulturalController::class, 'destroyFoto'])->name('identidad-cultural.destroyFoto');
    Route::put('/identidad-cultural/{identidad_cultural}/restore', [IdentidadCulturalController::class, 'restore'])->name('identidad-cultural.restore');
    Route::put('/identidad-cultural/{identidad_cultural}/validar', [IdentidadCulturalController::class, 'validar'])->name('identidad-cultural.validar');
    Route::put('/identidad-cultural/{identidad_cultural}/novalidar', [IdentidadCulturalController::class, 'novalidar'])->name('identidad-cultural.novalidar');

    //bazar
    Route::get('/bazar', [BazarController::class, 'indexAdmin'])->name('bazar-admin');
    Route::get('/bazar-export', [BazarController::class, 'export'])->name('bazar-export');

   
});

Route::get('/img/{path}', [ImageController::class, 'show'])->where('path', '.*');

Route::get('/banners', [WelcomeController::class, 'getBanners'])->name('banners.getAll');
Route::get('/eventos', [WelcomeController::class, 'getEventos'])->name('eventos.getAll');
Route::get('/delegacion/{delegacion:slug}', [WelcomeController::class, 'showDelegacion'])->name('delegacion.show');
Route::get('/delegacion/{delegacion:slug}/atractivos', [WelcomeController::class, 'showAtractivos'])->name('delegacion.showAtractivos');
Route::get('/delegacion/{delegacion:slug}/identidad-cultural', [WelcomeController::class, 'showIdentidadCulturals'])->name('delegacion.showIdentidadCulturals');
Route::get('/delegacion/{delegacion:slug}/hoteles', [WelcomeController::class, 'showHoteles'])->name('delegacion.showHoteles');
Route::get('/delegacion/{delegacion:slug}/restaurantes', [WelcomeController::class, 'showRestaurantes'])->name('delegacion.showRestaurantes');
Route::get('/delegacion/{delegacion:slug}/experiencias', [WelcomeController::class, 'showExperiencias'])->name('delegacion.showExperiencias');
Route::get('/delegacion/{delegacion:slug}/artesanias', [WelcomeController::class, 'showArtesanias'])->name('delegacion.showArtesanias');
Route::get('/atractivos/{atractivo:slug}', [WelcomeController::class, 'showAtractivo'])->name('atractivos.show');
Route::get('/identidad-cultural/{identidad_cultural:slug}', [WelcomeController::class, 'showIdentidadCultural'])->name('identidad-cultural.show');
Route::get('/negocios/{negocio:slug}', [WelcomeController::class, 'showNegocio'])->name('negocios.show');
Route::get('/terminos', [WelcomeController::class, 'showTerminos'])->name('terminos');
Route::get('/avisoprivacidad', [WelcomeController::class, 'showAviso'])->name('avisoprivacidad');

require __DIR__ . '/auth.php';
