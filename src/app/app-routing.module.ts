import { NgModule }             from '@angular/core'
import { CommonModule }         from '@angular/common'
import { Routes, RouterModule } from '@angular/router'

import { AppComponent }           from './app.component'
import { RecipesComponent }       from './recipes/recipes.component'
import { ShoppingListComponent }  from './shopping-list/shopping-list.component'
import { RecipeStartComponent }   from './recipes/recipe-start/recipe-start.component'
import { RecipeDetailComponent }  from './recipes/recipe-detail/recipe-detail.component'
import { RecipeEditComponent }    from './recipes/recipe-edit/recipe-edit.component'
import { RecipesResolverService } from './services/recipes-resolver.service'
import { AuthComponent }          from './auth/auth.component'

const appRoutes: Routes = [
    {
        path:       '',
        redirectTo: '/recipes',
        pathMatch:  'full'
    },
    {
        path:      'recipes',
        component: RecipesComponent,
        children:  [
            { path: '',         component: RecipeStartComponent },
            { path: 'new',      component: RecipeEditComponent },
            { path: ':id',      component: RecipeDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent }
        ]
    },
    {
        path:      'shopping-list',
        component: ShoppingListComponent
    },
    {
        path:      'auth',
        component: AuthComponent
    },
    { path: '**', component: AppComponent }
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
