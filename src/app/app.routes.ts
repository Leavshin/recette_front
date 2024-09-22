import {Routes} from '@angular/router';
import {UserComponent} from './pages/user/user.component';
import {AdminComponent} from './pages/admin/admin.component';
import {AdminUserComponent} from './pages/admin/admin-user/admin-user.component';
import {AdminRecipeComponent} from './pages/admin/admin-recipe/admin-recipe.component';
import {SelectedRecipeComponent} from './components/child/selected-recipe/selected-recipe.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HomeComponent} from './pages/home/home.component';
import {AuthComponent} from './pages/auth/auth.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {RecipesComponent} from "./pages/recipes/recipes.component";
import {InventoryComponent} from "./pages/inventory/inventory.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {
    path: 'admin', component: AdminComponent, children: [
      {path: 'user', component: AdminUserComponent},
      {path: 'recipe', component: AdminRecipeComponent},
    ]
  },
  {
    path: 'auth', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
  {path: 'recipe/:id', component: RecipesComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'home', redirectTo: ''},
  {path: '**', component: NotFoundComponent},
];
